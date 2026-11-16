import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Landmark,
  MapPin,
  Pause,
  Play,
  Route,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  BlogCard,
  CarouselRow,
  CTASection,
  ExperienceCard,
  SearchPanel,
  SectionHeader,
  TestimonialCard,
  TourCard,
} from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import {
  destinations,
  experienceCategories,
  images,
  stories,
  testimonials,
  tours,
  type Destination,
} from "@/data/site";
import { Link } from "@/lib/simple-router";
import { jsonLdScript, organizationJsonLd, pageMeta } from "@/lib/seo";

export function getHomeHead() {
  return {
    meta: pageMeta({
      title: "Derivative Bharat",
      description:
        "Historian-led heritage walks, food trails, architecture tours and curated cultural journeys across India.",
      path: "/",
      image: images.heroHeritage,
    }),
    scripts: [jsonLdScript(organizationJsonLd())],
  };
}

export function HomePage() {
  const featuredTours = tours.filter((tour) => tour.trending || tour.popular).slice(0, 6);

  return (
    <>
      <section className="home-hero-section relative overflow-hidden">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
          fetchPriority="high"
          src={images.heroHeritage}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/25" />
        <div className="relative mx-auto flex h-full w-[calc(100%-2rem)] max-w-[1520px] items-center px-0 py-14 sm:w-[calc(100%-4rem)] lg:w-[calc(100%-4rem)]">
          <div className="home-hero-copy w-full min-w-0 max-w-4xl text-primary-foreground fade-up">
            <p className="eyebrow text-gold">India, read closely</p>
            <h1 className="mt-4 max-w-full font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-[5.35rem]">
              Derivative Bharat
            </h1>
            <p className="mt-5 max-w-full text-base leading-7 text-primary-foreground/85 sm:max-w-3xl sm:text-lg sm:leading-8 lg:text-[1.35rem] lg:leading-9">
              Heritage journeys led by historians, architects, food researchers and local keepers of
              memory across India's old quarters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-12 w-full max-w-[21rem] bg-gold px-8 text-gold-foreground hover:bg-gold/90 sm:w-auto sm:max-w-none"
                size="lg"
              >
                <Link to="/experiences">
                  Explore Experiences
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="h-12 w-full max-w-[21rem] border-primary-foreground/40 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground hover:text-primary sm:w-auto sm:max-w-none"
                size="lg"
                variant="outline"
              >
                <Link to="/plan">Plan a Private Route</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="hero-search-wrap relative z-10 mx-auto w-[calc(100%-2rem)] max-w-[1520px] px-0 sm:w-[calc(100%-4rem)] lg:w-[calc(100%-4rem)]">
        <SearchPanel className="hero-search-panel border-gold/30" />
      </div>

      <TrendingDestinationsSection />

      <TravelPortalOffers />

      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-x-0 top-0 h-px bg-border" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 lg:px-8 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-end">
            <div className="experience-section-intro">
              <p className="eyebrow">Experience categories</p>
              <h2 className="mt-3 max-w-4xl break-words font-display text-3xl font-bold leading-tight text-primary sm:text-5xl">
                Choose the lens before you choose the city
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Each route is built from archival research, on-street observation and relationships
                with the communities who keep the city working.
              </p>
            </div>

            <div className="experience-lens-panel rounded-md border border-border/80 bg-paper p-5 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Route lenses
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold text-primary">
                    {experienceCategories.length}
                  </p>
                </div>
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="size-5" />
                </span>
              </div>

              <div className="mt-5 space-y-3 border-t pt-5">
                {[
                  { icon: Landmark, text: "Architecture, food, craft and living traditions" },
                  { icon: Route, text: "Short walks through multi-day regional routes" },
                  { icon: Users, text: "Small-group pacing with specialist context" },
                ].map((item) => (
                  <div className="flex items-start gap-3 text-sm leading-6" key={item.text}>
                    <item.icon className="mt-1 size-4 shrink-0 text-accent" />
                    <span className="text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button asChild className="mt-6 w-full" variant="outline">
                <Link to="/experiences">
                  View All Tours
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {experienceCategories.map((category, index) => (
              <ExperienceCard category={category} index={index} key={category.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="overflow-hidden rounded-md shadow-panel">
            <img
              alt=""
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
              src={images.signatureJourney}
            />
          </div>
          <div>
            <p className="eyebrow">Signature journey</p>
            <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
              One journey, many Indias: cities, kitchens, craft and stone.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Our multi-day curated routes connect forts, river towns, market streets and living
              workshops into a single story. Travel is slow, groups are small, and the route bends
              around access that mass itineraries usually miss.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Historian-led interpretation",
                "Small group departures",
                "Local specialist access",
                "Carefully paced travel days",
              ].map((item) => (
                <span className="inline-flex items-center gap-2 text-sm font-semibold" key={item}>
                  <CheckCircle2 className="size-4 text-accent" />
                  {item}
                </span>
              ))}
            </div>
            <Button asChild className="mt-8">
              <Link to="/plan">
                Build a Curated Route
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeader
          description="A tight edit of walks and journeys travellers return for, from dawn river routes to architecture days and food histories."
          eyebrow="Popular departures"
          title="Journeys with a following"
        />
        <CarouselRow moving>
          {featuredTours.map((tour) => (
            <div
              className="w-[82vw] max-w-[300px] shrink-0 snap-start sm:w-[360px] sm:max-w-none"
              key={tour.slug}
            >
              <TourCard tour={tour} />
            </div>
          ))}
        </CarouselRow>
      </section>

      <RegionalDestinationsSection />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeader
          align="center"
          description="A few notes from travellers who wanted context, pace and care more than a checklist."
          eyebrow="Traveller notes"
          title="Small groups, deeper conversations"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <SectionHeader
            action={
              <Button asChild variant="outline">
                <Link to="/stories">
                  Read Stories
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            }
            description="Short essays from our field notes on buildings, kitchens and communities."
            eyebrow="Field notes"
            title="Stories before the walk begins"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {stories.map((story) => (
              <BlogCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        description="Tell us where you are starting, who is travelling and what kind of history you want to follow. We will shape a route with the right pace, access and guide."
        image={images.galleryGroup}
        title="Have a city, family story or theme in mind?"
      />
    </>
  );
}

type PortalOffer = {
  cta?: string;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  image: string;
  locationLabel: string;
  priceLabel: string;
  routeLabel: string;
  title: string;
  to: string;
};

function TravelPortalOffers() {
  const varanasiDawn = tours.find((tour) => tour.slug === "south-goa-temple-run") ?? tours[0];
  const sahyadriRoute =
    tours.find((tour) => tour.slug === "hampi-heritage-trail") ?? tours[0];
  const oldDelhiFood =
    tours.find((tour) => tour.slug === "coastal-karnataka-heritage") ?? tours[0];
  const mumbaiWalk =
    tours.find((tour) => tour.slug === "marathwada-heritage-trail") ?? tours[0];
  const jaipurCraft = tours.find((tour) => tour.slug === "western-maharashtra-heritage") ?? tours[0];
  const hyderabad = destinations.find((destination) => destination.slug === "marathwada-heritage-trail");
  const goa = destinations.find((destination) => destination.slug === "south-goa-temple-run");

  const offers: PortalOffer[] = [
    {
      description: varanasiDawn.summary,
      eyebrow: "Temple heritage",
      icon: Sparkles,
      image: varanasiDawn.image,
      locationLabel: varanasiDawn.destination,
      priceLabel: "Price on request",
      routeLabel: varanasiDawn.duration,
      title: varanasiDawn.title,
      to: `/experiences/${varanasiDawn.slug}`,
    },
    {
      description: sahyadriRoute.summary,
      eyebrow: "Signature route",
      icon: Route,
      image: sahyadriRoute.image,
      locationLabel: sahyadriRoute.destination,
      priceLabel: "Price on request",
      routeLabel: sahyadriRoute.duration,
      title: sahyadriRoute.title,
      to: `/experiences/${sahyadriRoute.slug}`,
    },
    {
      description: "Private historians, city researchers and specialist access for careful groups.",
      eyebrow: "Escorted by specialists",
      icon: Users,
      image: images.galleryGroup,
      locationLabel: "India-wide",
      priceLabel: "By request",
      routeLabel: "Private group",
      title: "Escorted tours by local partners",
      to: "/plan",
    },
    {
      description: "Choose your city, pace, language and route lens in one simple request.",
      eyebrow: "Custom plan",
      icon: CalendarCheck,
      image: images.galleryMarket,
      locationLabel: "Flexible city",
      priceLabel: "Custom quote",
      routeLabel: "Built around dates",
      title: "Build your own itinerary",
      to: "/plan",
    },
    {
      description: oldDelhiFood.summary,
      eyebrow: "Coastal heritage",
      icon: Sparkles,
      image: oldDelhiFood.image,
      locationLabel: oldDelhiFood.destination,
      priceLabel: "Price on request",
      routeLabel: oldDelhiFood.duration,
      title: oldDelhiFood.title,
      to: `/experiences/${oldDelhiFood.slug}`,
    },
    {
      description: mumbaiWalk.summary,
      eyebrow: "Deccan history",
      icon: Landmark,
      image: mumbaiWalk.image,
      locationLabel: mumbaiWalk.destination,
      priceLabel: "Price on request",
      routeLabel: mumbaiWalk.duration,
      title: mumbaiWalk.title,
      to: `/experiences/${mumbaiWalk.slug}`,
    },
    {
      description: jaipurCraft.summary,
      eyebrow: "Maratha heartland",
      icon: Sparkles,
      image: jaipurCraft.image,
      locationLabel: jaipurCraft.destination,
      priceLabel: "Price on request",
      routeLabel: jaipurCraft.duration,
      title: jaipurCraft.title,
      to: `/experiences/${jaipurCraft.slug}`,
    },
    {
      description: "Explore the early temple architecture of Badami, Aihole and Pattadakal.",
      eyebrow: "Temple architecture",
      icon: Route,
      image: hyderabad?.image ?? goa?.image ?? images.galleryMarket,
      locationLabel: "Northern Karnataka",
      priceLabel: "Custom quote",
      routeLabel: "3-4 days",
      title: "Northern Karnataka Heritage",
      to: "/destinations",
    },
  ];

  return (
    <section className="border-y bg-paper-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Heritage journeys</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-primary sm:text-4xl">
              Ready routes, private departures and city stories worth planning around.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Book ready walks, escorted city routes, or a private itinerary built around your
              dates.
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto" variant="outline">
            <Link to="/experiences">
              Browse All Journeys
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, index) => (
            <PortalOfferCard index={index} key={offer.title} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortalOfferCard({ index, offer }: { index: number; offer: PortalOffer }) {
  const Icon = offer.icon;

  return (
    <Link
      className="journey-offer-card group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-md border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-lift"
      style={{ animationDelay: `${index * 70}ms` }}
      to={offer.to}
    >
      <span className="relative block aspect-[1.18/1] overflow-hidden bg-primary">
        <img
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          src={offer.image}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-primary/78 via-primary/10 to-transparent" />
        <span className="journey-card-shine absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/95 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-primary shadow-card backdrop-blur">
          <Icon className="size-4" />
          {offer.eyebrow}
        </span>
        <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 text-primary-foreground">
          <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-bold">
            <MapPin className="size-3.5 shrink-0 text-gold" />
            <span className="truncate">{offer.locationLabel}</span>
          </span>
          <span className="shrink-0 rounded-full bg-gold px-3 py-1 text-[0.68rem] font-bold text-gold-foreground">
            {offer.routeLabel}
          </span>
        </span>
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="block text-xl font-bold leading-tight text-primary transition group-hover:text-accent">
          {offer.title}
        </span>
        <span className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
          {offer.description}
        </span>
        <span className="mt-5 grid grid-cols-[1fr_auto] items-center gap-3 border-t pt-4">
          <span>
            <span className="block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Planning
            </span>
            <span className="mt-1 block text-sm font-bold text-foreground">{offer.priceLabel}</span>
          </span>
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:bg-accent">
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        </span>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
          {offer.cta ?? "View More"}
        </span>
      </span>
    </Link>
  );
}

type RegionKey = "north" | "south" | "east" | "west" | "central";

const regionalDestinationTabs: {
  key: RegionKey;
  label: string;
  slugs: string[];
}[] = [
  {
    key: "north",
    label: "Karnataka",
    slugs: ["hampi-heritage-trail", "northern-karnataka-heritage", "marathwada-heritage-trail"],
  },
  {
    key: "south",
    label: "Goa & Coast",
    slugs: ["south-goa-temple-run", "coastal-karnataka-heritage", "northern-karnataka-heritage"],
  },
  {
    key: "east",
    label: "Temple Trails",
    slugs: ["coastal-karnataka-heritage", "south-goa-temple-run", "hampi-heritage-trail"],
  },
  {
    key: "west",
    label: "Maharashtra",
    slugs: ["western-maharashtra-heritage", "south-goa-temple-run", "marathwada-heritage-trail"],
  },
  {
    key: "central",
    label: "Deccan",
    slugs: ["western-maharashtra-heritage", "marathwada-heritage-trail", "hampi-heritage-trail"],
  },
];

function RegionalDestinationsSection() {
  const [activeRegion, setActiveRegion] = useState<RegionKey>("north");
  const activeTab =
    regionalDestinationTabs.find((tab) => tab.key === activeRegion) ?? regionalDestinationTabs[0];
  const activeDestinations = activeTab.slugs
    .map((slug) => destinations.find((destination) => destination.slug === slug))
    .filter((destination): destination is Destination => Boolean(destination))
    .slice(0, 7);
  const [featuredDestination, ...secondaryDestinations] = activeDestinations;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-8">
        <h2 className="max-w-5xl text-3xl font-extrabold leading-tight text-slate-700 sm:text-5xl lg:text-6xl">
          Explore Top Destinations by Region
        </h2>

        <div className="mt-8 border-b border-border">
          <div className="hide-scrollbar flex gap-8 overflow-x-auto sm:gap-12" role="tablist">
            {regionalDestinationTabs.map((tab) => {
              const isActive = tab.key === activeRegion;

              return (
                <button
                  aria-selected={isActive}
                  className={`shrink-0 border-b-[3px] px-0 pb-5 text-base font-semibold transition sm:text-lg ${
                    isActive
                      ? "border-accent text-slate-800"
                      : "border-transparent text-slate-600 hover:text-primary"
                  }`}
                  key={tab.key}
                  onClick={() => setActiveRegion(tab.key)}
                  role="tab"
                  type="button"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {featuredDestination ? (
          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1.15fr_1fr]">
            <RegionalDestinationCard destination={featuredDestination} featured />
            <div className="grid auto-rows-fr gap-6 sm:grid-cols-2">
              {secondaryDestinations.map((destination) => (
                <RegionalDestinationCard destination={destination} key={destination.slug} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function RegionalDestinationCard({
  destination,
  featured = false,
}: {
  destination: Destination;
  featured?: boolean;
}) {
  const routeCount = tours.filter((tour) => tour.destinationSlug === destination.slug).length;
  const journeyLabel = `${Math.max(routeCount, 1)}+ ROUTES`;

  return (
    <Link
      className={`group relative block min-h-[280px] overflow-hidden rounded-lg bg-primary shadow-card transition hover:-translate-y-1 hover:shadow-lift ${
        featured ? "min-h-[360px] lg:min-h-[500px]" : "min-h-[280px] lg:min-h-[500px]"
      }`}
      params={{ city: destination.slug }}
      to="/destinations/$city"
    >
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        loading="lazy"
        src={destination.image}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/24 to-transparent" />
      <span className={`absolute ${featured ? "inset-x-7 bottom-7" : "inset-x-5 bottom-5"}`}>
        <span
          className={`block font-extrabold leading-tight text-white drop-shadow ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {destination.city}
        </span>
        <span className="mt-2 inline-flex text-xs font-extrabold uppercase tracking-wide text-white">
          {journeyLabel}
        </span>
      </span>
    </Link>
  );
}

type SpotlightMode = "cities" | "experiences";

function TrendingDestinationsSection() {
  const [mode, setMode] = useState<SpotlightMode>("cities");
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const segmentWidthRef = useRef(0);
  const pauseRef = useRef(false);
  const focusRef = useRef(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);

  const spotlightItems =
    mode === "cities"
      ? destinations.map((destination) => ({
          image: destination.image,
          label: destination.city,
          meta: destination.state,
          params: { city: destination.slug },
          to: "/destinations/$city",
        }))
      : experienceCategories.map((category) => ({
          image: category.image,
          label: category.title,
          meta: category.short,
          to: `/experiences?category=${encodeURIComponent(category.slug)}`,
        }));

  const itemCount = spotlightItems.length;

  useEffect(() => {
    pauseRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const track = trackRef.current;
    const segment = segmentRef.current;
    if (!track || !segment) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousTime = 0;
    offsetRef.current = 0;
    segmentWidthRef.current = 0;

    function measure() {
      const width = segment!.getBoundingClientRect().width;
      const previousWidth = segmentWidthRef.current;
      offsetRef.current = previousWidth ? (offsetRef.current / previousWidth) * width : width;
      segmentWidthRef.current = width;
      track!.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }

    function tick(time: number) {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 0;
      previousTime = time;
      const width = segmentWidthRef.current;

      if (
        width &&
        !pauseRef.current &&
        !focusRef.current &&
        !document.hidden &&
        !motion.matches &&
        itemCount > 1
      ) {
        // Move at a constant 32 pixels per second, then wrap to the identical copy.
        offsetRef.current = width + ((offsetRef.current - width + elapsed * 0.032) % width);
        track!.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(segment);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [itemCount, mode]);

  function scrollSpotlights(direction: "left" | "right") {
    if (itemCount < 2) {
      return;
    }

    const width = segmentWidthRef.current;
    const track = trackRef.current;
    const card = cardRef.current;
    const segment = segmentRef.current;
    if (!width || !track || !card || !segment) return;
    const gap = Number.parseFloat(window.getComputedStyle(segment).columnGap) || 20;
    const step = card.getBoundingClientRect().width + gap;
    const nextOffset = offsetRef.current - width + (direction === "left" ? -step : step);
    offsetRef.current = width + (((nextOffset % width) + width) % width);
    track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
  }

  function changeMode(nextMode: SpotlightMode) {
    if (nextMode === mode) {
      return;
    }

    setMode(nextMode);
  }

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Destinations</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              Trending Destinations
            </h2>
          </div>

          <div className="grid w-full grid-cols-2 rounded-full bg-secondary p-1 shadow-card sm:inline-flex sm:w-fit">
            {[
              { label: "Heritage Cities", value: "cities" },
              { label: "Experience Lenses", value: "experiences" },
            ].map((item) => (
              <button
                className={`min-h-11 rounded-full px-3 py-2 text-xs font-bold transition sm:min-h-0 sm:px-5 ${
                  mode === item.value
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "text-muted-foreground hover:text-primary"
                }`}
                key={item.value}
                onClick={() => changeMode(item.value as SpotlightMode)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="relative mt-9"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) focusRef.current = false;
          }}
          onFocus={(event) => {
            focusRef.current = event.target.matches(":focus-visible");
          }}
        >
          <Button
            aria-label="Scroll destinations left"
            className="absolute left-0 top-1/2 z-10 hidden size-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-card md:inline-flex"
            onClick={() => scrollSpotlights("left")}
            size="icon"
            title="Scroll left"
            type="button"
            variant="outline"
          >
            <ChevronLeft className="size-5" />
          </Button>

          <div className="carousel-mask overflow-hidden px-1 md:px-8">
            <div
              className="flex w-max py-2 will-change-transform"
              data-carousel-track="trending-destinations"
              ref={trackRef}
            >
              {[0, 1, 2].map((segment) => (
                <div
                  className="flex gap-5 pr-5"
                  key={segment}
                  ref={segment === 1 ? segmentRef : undefined}
                >
                  {spotlightItems.map((item, index) => (
                    <Link
                      className="group block w-[140px] shrink-0 text-center sm:w-[160px] lg:w-[174px]"
                      key={`${segment}-${mode}-${item.label}`}
                      {...("params" in item ? { params: item.params } : {})}
                      ref={segment === 1 && index === 0 ? cardRef : undefined}
                      to={item.to}
                    >
                      <span className="relative block h-[210px] overflow-hidden rounded-full bg-paper-deep shadow-card ring-1 ring-border transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift sm:h-[238px] lg:h-[258px]">
                        <img
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          loading="lazy"
                          src={item.image}
                        />
                        <span className="absolute inset-0 bg-gradient-to-b from-primary/58 via-primary/8 to-black/52" />
                        <span className="absolute inset-x-4 top-7 font-display text-2xl font-bold leading-tight text-primary-foreground drop-shadow sm:text-3xl">
                          {item.label}
                        </span>
                        <span className="absolute inset-x-5 bottom-5 inline-flex items-center justify-center gap-1 rounded-full bg-background/90 px-3 py-1.5 text-[0.68rem] font-bold text-primary shadow-card backdrop-blur">
                          <MapPin className="size-3" />
                          <span className="line-clamp-1">{item.meta}</span>
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Button
            aria-label="Scroll destinations right"
            className="absolute right-0 top-1/2 z-10 hidden size-11 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary text-primary-foreground shadow-card hover:bg-primary/90 md:inline-flex"
            onClick={() => scrollSpotlights("right")}
            size="icon"
            title="Scroll right"
            type="button"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild className="w-full rounded-full px-6 sm:w-auto">
            <Link to={mode === "cities" ? "/destinations" : "/experiences"}>
              Explore Now
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            aria-label={isPaused ? "Resume destination scrolling" : "Pause destination scrolling"}
            className="shrink-0 rounded-full"
            onClick={() => setIsPaused((paused) => !paused)}
            size="icon"
            type="button"
            variant="outline"
          >
            {isPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </Button>
        </div>
      </div>
    </section>
  );
}
