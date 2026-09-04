import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type CurrentLocation = {
  hash: string;
  pathname: string;
  search: string;
};

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  activeProps?: { className?: string };
  params?: Record<string, string>;
  to: string;
};

const LocationContext = createContext<CurrentLocation>({
  hash: "",
  pathname: "/",
  search: "",
});

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(readCurrentLocation);

  useEffect(() => {
    function handleLocationChange() {
      setLocation(readCurrentLocation());
    }

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("app:navigate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("app:navigate", handleLocationChange);
    };
  }, []);

  return <LocationContext.Provider value={location}>{children}</LocationContext.Provider>;
}

export function useCurrentLocation() {
  return useContext(LocationContext);
}

export function useSearchParams() {
  const location = useCurrentLocation();

  return useMemo(() => new URLSearchParams(location.search), [location.search]);
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);

  if (url.origin !== window.location.origin) {
    window.location.href = to;
    return;
  }

  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (next !== current) {
    window.history.pushState({}, "", next);
    window.dispatchEvent(new Event("app:navigate"));
  }

  if (url.hash) {
    requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView());
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ activeProps, className, onClick, params, target, to, ...props }, ref) => {
    const href = buildPath(to, params);
    const location = useCurrentLocation();
    const isActive = isActivePath(location.pathname, href);

    return (
      <a
        className={cn(className, isActive && activeProps?.className)}
        href={href}
        onClick={(event) => {
          onClick?.(event);

          if (
            event.defaultPrevented ||
            target === "_blank" ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {
            return;
          }

          const url = new URL(href, window.location.origin);
          if (url.origin !== window.location.origin) {
            return;
          }

          event.preventDefault();
          navigate(href);
        }}
        ref={ref}
        target={target}
        {...props}
      />
    );
  },
);

Link.displayName = "Link";

export function buildPath(to: string, params?: Record<string, string>) {
  return to.replace(/\$([A-Za-z][A-Za-z0-9_]*)/g, (_, key: string) =>
    encodeURIComponent(params?.[key] ?? ""),
  );
}

function readCurrentLocation(): CurrentLocation {
  if (typeof window === "undefined") {
    return { hash: "", pathname: "/", search: "" };
  }

  return {
    hash: window.location.hash,
    pathname: normalizePath(window.location.pathname),
    search: window.location.search,
  };
}

function isActivePath(currentPathname: string, href: string) {
  const pathname = normalizePath(new URL(href, window.location.origin).pathname);

  if (pathname === "/") {
    return currentPathname === "/";
  }

  return currentPathname === pathname || currentPathname.startsWith(`${pathname}/`);
}

function normalizePath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}
