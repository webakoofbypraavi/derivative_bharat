import { ArrowRight, CheckCircle2, Compass, MapPin } from "lucide-react";

import {
  CTASection,
  DestinationCard,
  SectionHeader,
  StatPill,
  TourCard,
} from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import { destinations, images, stats, tours } from "@/data/site";
import { Link } from "@/lib/simple-router";
import { breadcrumbJsonLd, jsonLdScript, pageMeta } from "@/lib/seo";

export function getDestinationsHead() {
  return {
    meta: pageMeta({
      title: "Destinations",
      description:
        "Explore Derivative Bharat heritage journeys across Mumbai, Delhi, Jaipur, Varanasi, Kolkata, Hyderabad, Pune and Goa.",
      path: "/destinations",
      image: images.galleryMarket,
    }),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
        ]),
      ),
    ],
  };
}

export function DestinationsPage() {
  const popularTours = tours.filter((tour) => tour.popular).slice(0, 3);
  const routeNotes = [
    {
      title: "Neighbourhood histories",
      detail: "Street names, communities and old trade routes.",
    },
    {
      title: "Architectural periods",
      detail: "Materials, patronage, climate and changing styles.",
    },
    {
      title: "Food lineages",
      detail: "Markets, migration stories and kitchens still working.",
    },
    {
      title: "Craft access",
      detail: "Workshops, studios and practitioners open to visitors.",
    },
    {
      title: "Festival calendars",
      detail: "Seasonal rituals, crowd patterns and local timings.",
    },
    {
      title: "Walking comfort",
      detail: "Shade, traffic, transit links and realistic pacing.",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          src={images.galleryMarket}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <p className="eyebrow text-gold">Destinations</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-5xl">
            Cities where history is still part of the day.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/78">
            Start with a city, then choose the lens: architecture, food, craft, neighbourhoods,
            water systems, markets or multi-day routes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <SectionHeader
          description="Each destination page gathers the local story, key neighbourhoods, best season and journeys currently available."
          eyebrow="City guide"
          title="Explore by destination"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <DestinationCard destination={destination} key={destination.slug} />
          ))}
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch lg:px-8">
          <div className="flex h-full flex-col">
            <SectionHeader
              className="mb-0"
              description="Routes are researched city by city, then refreshed as communities, access and conservation conditions change."
              eyebrow="Field coverage"
              title="A growing archive of Indian urban memory"
            />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <StatPill key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>

            <div className="relative mt-6 min-h-[260px] flex-1 overflow-hidden rounded-md shadow-panel">
              <img
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                src={images.galleryGroup}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/92 via-primary/45 to-transparent" />
              <div className="relative flex min-h-[260px] h-full flex-col justify-end p-6 text-primary-foreground">
                <p className="eyebrow text-gold">Field file</p>
                <h3 className="mt-3 text-2xl font-bold leading-tight">
                  Walks are checked on the street, not just on the map.
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-primary-foreground/78">
                  Local access, route timing and neighbourhood context are reviewed before each city
                  guide is refreshed.
                </p>
                <Button
                  asChild
                  className="mt-5 w-fit bg-gold text-gold-foreground hover:bg-gold/90"
                  size="sm"
                >
                  <Link to="/experiences">
                    Browse Walks
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col rounded-md border bg-background p-6 shadow-card">
            <div className="max-w-2xl">
              <p className="eyebrow">How routes stay current</p>
              <h2 className="mt-3 text-2xl font-bold text-primary">
                Route notes we track in every city
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Every destination is maintained like a living field file. We record what is worth
                reading closely, what has changed on the ground, and which routes still feel humane
                at the hour travellers will actually walk them.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {routeNotes.map((item) => (
                <div className="rounded-md bg-paper p-4" key={item.title}>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0 text-accent" />
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 border-t pt-5 sm:grid-cols-2">
              <div className="rounded-md bg-primary p-5 text-primary-foreground">
                <Compass className="size-5 text-gold" />
                <h3 className="mt-3 text-base font-bold">Field checked before publishing</h3>
                <p className="mt-2 text-xs leading-5 text-primary-foreground/75">
                  Timings, access notes and walking conditions are reviewed before routes are listed
                  for a new season.
                </p>
              </div>
              <div className="rounded-md border bg-card p-5">
                <CheckCircle2 className="size-5 text-accent" />
                <h3 className="mt-3 text-base font-bold text-primary">Built for useful context</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Notes help guides connect monuments to markets, homes, food, language and the city
                  people still use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <SectionHeader
          action={
            <Button asChild variant="outline">
              <Link to="/experiences">
                Browse All
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
          eyebrow="Popular across cities"
          title="Journeys travellers book first"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {popularTours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </section>

      <CTASection
        description="Choose a city you know, one you are visiting for the first time, or a route that links several places into a longer story."
        image={images.signatureJourney}
        title="Not sure where to begin?"
      />
    </>
  );
}
