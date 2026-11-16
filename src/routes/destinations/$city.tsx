import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { CTASection, SectionHeader, TourCard } from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { destinations, images, tours } from "@/data/site";
import { Link } from "@/lib/simple-router";
import { breadcrumbJsonLd, jsonLdScript, pageMeta, touristDestinationJsonLd } from "@/lib/seo";

export function getDestinationHead(city: string) {
  const destination = destinations.find((item) => item.slug === city);

  if (!destination) {
    return {
      meta: pageMeta({
        title: "Destination Not Found",
        description: "This Derivative Bharat destination could not be found.",
        path: "/destinations",
      }),
    };
  }

  return {
    meta: pageMeta({
      title: `${destination.city} Heritage Tours`,
      description: destination.intro,
      path: `/destinations/${destination.slug}`,
      image: destination.image,
    }),
    scripts: [
      jsonLdScript(touristDestinationJsonLd(destination)),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: destination.city, path: `/destinations/${destination.slug}` },
        ]),
      ),
    ],
  };
}

export function DestinationDetailPage({ city }: { city: string }) {
  const destination = destinations.find((item) => item.slug === city);

  if (!destination) {
    return <DestinationNotFound />;
  }

  const cityTours = tours.filter((tour) => tour.destinationSlug === destination.slug);
  const categories = Array.from(new Set(cityTours.map((tour) => tour.category)));
  const destinationGallery = destination.gallery ?? [destination.image];

  return (
    <>
      <section className="relative min-h-[56svh] overflow-hidden bg-primary text-primary-foreground">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          src={destination.image}
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative mx-auto flex min-h-[56svh] max-w-7xl items-end px-4 py-14 lg:px-8">
          <div className="max-w-4xl">
            <p className="eyebrow text-gold">{destination.state}</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-6xl">
              {destination.city}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/82 sm:text-lg">
              {destination.intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-2 text-sm font-semibold">
                <CalendarDays className="size-4 text-gold" />
                {destination.bestTime}
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-2 text-sm font-semibold">
                <MapPin className="size-4 text-gold" />
                {cityTours.length} journeys
              </span>
            </div>
          </div>
        </div>
      </section>

      {destinationGallery.length > 1 ? (
        <section className="border-b bg-paper-deep">
          <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Field images</p>
                <h2 className="mt-2 text-2xl font-bold text-primary">Along this route</h2>
              </div>
              <p className="hidden text-sm text-muted-foreground sm:block">
                Places and landmarks included in the journey.
              </p>
            </div>
            <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-3 lg:auto-rows-[220px] lg:grid-cols-4">
              {destinationGallery.map((image, index) => (
                <img
                  alt={`${destination.city} route image ${index + 1}`}
                  className={`h-full w-full rounded-md object-cover shadow-card ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                  key={image}
                  loading={index === 0 ? "eager" : "lazy"}
                  src={image}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="eyebrow">City note</p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            {destination.tagline}
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">{destination.about}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {destination.neighbourhoods.map((neighbourhood) => (
              <span
                className="rounded-md border bg-background px-3 py-2 text-sm font-semibold shadow-card"
                key={neighbourhood}
              >
                {neighbourhood}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-md border bg-background p-5 shadow-card">
          <Tabs defaultValue="food">
            <TabsList className="grid h-auto w-full grid-cols-1 gap-1 sm:grid-cols-3">
              <TabsTrigger className="justify-start sm:justify-center" value="food">
                Food
              </TabsTrigger>
              <TabsTrigger className="justify-start sm:justify-center" value="architecture">
                Architecture
              </TabsTrigger>
              <TabsTrigger className="justify-start sm:justify-center" value="stories">
                Stories
              </TabsTrigger>
            </TabsList>
            <TabsContent className="mt-6" value="food">
              <PanelText title="Food lineages" text={destination.food} />
            </TabsContent>
            <TabsContent className="mt-6" value="architecture">
              <PanelText title="Built form" text={destination.architecture} />
            </TabsContent>
            <TabsContent className="mt-6" value="stories">
              <PanelText title="Local stories" text={destination.localStories} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <SectionHeader
            action={
              <Button asChild className="w-full sm:w-auto" variant="outline">
                <a href={`/experiences?destination=${destination.slug}`}>
                  Filter All {destination.city} Tours
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            }
            description={
              categories.length
                ? `Available lenses include ${categories.join(", ")}.`
                : "Private routes can be designed around this city."
            }
            eyebrow="Journeys"
            title={`Explore ${destination.city} with us`}
          />

          {cityTours.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cityTours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border bg-paper p-8 text-center">
              <h2 className="text-2xl font-bold text-primary">Private routes available</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Share a theme and we will shape a city route with the right specialist.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        description={`Plan ${destination.city} as a half-day walk, a full-day deep dive or one stop in a longer regional journey.`}
        image={images.galleryGroup}
        title={`Build a ${destination.city} journey around your interests`}
      />
    </>
  );
}

function PanelText({ text, title }: { text: string; title: string }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-primary">{title}</h3>
      <p className="mt-3 text-base leading-8 text-muted-foreground">{text}</p>
    </div>
  );
}

function DestinationNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <p className="eyebrow">Destination not found</p>
      <h1 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">This city page has moved</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        Browse the current destination guide or ask us about a custom route.
      </p>
      <Button asChild className="mt-7">
        <Link to="/destinations">
          Browse Destinations
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </section>
  );
}
