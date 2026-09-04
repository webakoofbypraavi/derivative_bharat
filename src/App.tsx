import { useEffect, type ReactNode } from "react";

import { SiteLayout } from "@/components/site/layout";
import { Button } from "@/components/ui/button";
import { applyHead, type HeadConfig } from "@/lib/head";
import { Link, useCurrentLocation, useSearchParams } from "@/lib/simple-router";
import { pageMeta } from "@/lib/seo";
import { AboutPage, getAboutHead } from "@/routes/about";
import { ContactPage, getContactHead } from "@/routes/contact";
import { DestinationDetailPage, getDestinationHead } from "@/routes/destinations/$city";
import { DestinationsPage, getDestinationsHead } from "@/routes/destinations";
import { ExperienceDetailPage, getExperienceHead } from "@/routes/experiences/$slug";
import { ExperiencesPage, getExperiencesHead } from "@/routes/experiences";
import { HomePage, getHomeHead } from "@/routes";
import { PlanPage, getPlanHead } from "@/routes/plan";
import { StoriesPage, getStoriesHead } from "@/routes/stories";

type RouteMatch = {
  element: ReactNode;
  head: HeadConfig;
};

export function App() {
  const location = useCurrentLocation();
  const searchParams = useSearchParams();
  const route = matchRoute(location.pathname, searchParams);

  useEffect(() => {
    applyHead(route.head);
  }, [route.head]);

  return <SiteLayout>{route.element}</SiteLayout>;
}

function matchRoute(pathname: string, searchParams: URLSearchParams): RouteMatch {
  const parts = pathname.split("/").filter(Boolean).map(decodeURIComponent);

  if (pathname === "/") {
    return {
      element: <HomePage key="home" />,
      head: getHomeHead(),
    };
  }

  if (parts[0] === "experiences" && parts.length === 1) {
    return {
      element: (
        <ExperiencesPage
          key={`experiences-${searchParams.toString()}`}
          searchParams={searchParams}
        />
      ),
      head: getExperiencesHead(),
    };
  }

  if (parts[0] === "experiences" && parts[1] && parts.length === 2) {
    return {
      element: <ExperienceDetailPage key={`experience-${parts[1]}`} slug={parts[1]} />,
      head: getExperienceHead(parts[1]),
    };
  }

  if (parts[0] === "destinations" && parts.length === 1) {
    return {
      element: <DestinationsPage key="destinations" />,
      head: getDestinationsHead(),
    };
  }

  if (parts[0] === "destinations" && parts[1] && parts.length === 2) {
    return {
      element: <DestinationDetailPage city={parts[1]} key={`destination-${parts[1]}`} />,
      head: getDestinationHead(parts[1]),
    };
  }

  if (pathname === "/about") {
    return {
      element: <AboutPage key="about" />,
      head: getAboutHead(),
    };
  }

  if (pathname === "/stories") {
    return {
      element: <StoriesPage key="stories" />,
      head: getStoriesHead(),
    };
  }

  if (pathname === "/contact") {
    return {
      element: <ContactPage key="contact" />,
      head: getContactHead(),
    };
  }

  if (pathname === "/plan") {
    return {
      element: <PlanPage key={`plan-${searchParams.toString()}`} searchParams={searchParams} />,
      head: getPlanHead(),
    };
  }

  return {
    element: <NotFoundPage />,
    head: {
      meta: pageMeta({
        title: "Page Not Found",
        description: "This Derivative Bharat page could not be found.",
        path: pathname,
      }),
    },
  };
}

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-bold text-primary">Page not found</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        The page may have moved, or the route may not exist in this React build.
      </p>
      <Button asChild className="mt-7">
        <Link to="/">Go home</Link>
      </Button>
    </section>
  );
}
