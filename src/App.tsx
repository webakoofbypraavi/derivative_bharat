import { useEffect, useState, type ReactNode } from "react";

import { SiteLayout } from "@/components/site/layout";
import { Button } from "@/components/ui/button";
import { applyHead, type HeadConfig } from "@/lib/head";
import { Link, useCurrentLocation, useSearchParams } from "@/lib/simple-router";
import { pageMeta } from "@/lib/seo";
import { setPublishedCatalog, setPublishedTours } from "@/data/site";
import { AboutPage, getAboutHead } from "@/routes/about";
import { ContactPage, getContactHead } from "@/routes/contact";
import { AdminPage } from "@/routes/admin";
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

function experienceDurationBand(duration: unknown) {
  const value = String(duration ?? "").toLowerCase();
  const amounts = value.match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  const maximum = Math.max(0, ...amounts);
  if (/multi|overnight/.test(value) || (/days?/.test(value) && maximum > 1)) return "Multi-day";
  if (/day/.test(value)) return "Full day";
  if (/min/.test(value) && !/hour|hr/.test(value)) return "Under 3 hours";
  if (/hour|hr/.test(value) && maximum > 0) {
    return maximum < 3 ? "Under 3 hours" : maximum <= 5 ? "3–5 hours" : "Full day";
  }
  return "Multi-day";
}

export function App() {
  const [, setContentRevision] = useState(0);
  const location = useCurrentLocation();
  const searchParams = useSearchParams();
  const route = matchRoute(location.pathname, searchParams);

  useEffect(() => {
    applyHead(route.head);
  }, [route.head]);

  useEffect(() => {
    let active = true;
    async function refreshCatalog() {
      try {
        const resources = [
          "tours",
          "destinations",
          "categories",
          "stories",
          "experiences",
        ] as const;
        const responses = await Promise.all(
          resources.map(async (resource) => {
            const response = await fetch(`/api/content/${resource}`);
            return response.ok ? await response.json() : null;
          }),
        );
        if (active) {
          const [
            tourRecords,
            destinationRecords,
            categoryRecords,
            storyRecords,
            experienceRecords,
          ] = responses;
          if (Array.isArray(tourRecords)) {
            const tourSlugs = new Set(tourRecords.map((record) => record.slug));
            const experiences = Array.isArray(experienceRecords)
              ? experienceRecords
                  .filter((record) => !tourSlugs.has(record.slug))
                  .map((record) => ({
                    ...record,
                    overview: record.summary,
                    gallery: record.image_url ? [record.image_url] : [],
                    duration_band: experienceDurationBand(record.duration),
                  }))
              : [];
            setPublishedTours([...tourRecords, ...experiences]);
          }
          setPublishedCatalog({
            ...(Array.isArray(destinationRecords) ? { destinations: destinationRecords } : {}),
            ...(Array.isArray(categoryRecords) ? { categories: categoryRecords } : {}),
            ...(Array.isArray(storyRecords) ? { stories: storyRecords } : {}),
          });
          setContentRevision((revision) => revision + 1);
        }
      } catch {
        // Keep the bundled catalog available when the CMS API is offline.
      }
    }
    const handleContentUpdate = () => void refreshCatalog();
    void refreshCatalog();
    window.addEventListener("site:content-updated", handleContentUpdate);
    return () => {
      active = false;
      window.removeEventListener("site:content-updated", handleContentUpdate);
    };
  }, []);

  return location.pathname === "/admin" || location.pathname === "/admin/login" ? (
    <>{route.element}</>
  ) : (
    <SiteLayout>{route.element}</SiteLayout>
  );
}

function matchRoute(pathname: string, searchParams: URLSearchParams): RouteMatch {
  const parts = pathname.split("/").filter(Boolean).map(decodeURIComponent);

  if (pathname === "/admin" || pathname === "/admin/login") {
    return {
      element: <AdminPage key="admin" />,
      head: {
        meta: pageMeta({
          title: "Admin CMS | Derivative Bharat",
          description: "Derivative Bharat content management studio.",
          path: pathname,
        }),
      },
    };
  }

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
