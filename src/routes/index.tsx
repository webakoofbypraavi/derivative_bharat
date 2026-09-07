import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Landmark,
  MapPin,
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
      <section className="relative min-h-[64svh] overflow-hidden">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          src={images.heroHeritage}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[64svh] max-w-7xl items-center px-4 py-14 lg:px-8">
          <div className="w-full min-w-0 max-w-3xl text-primary-foreground fade-up">
            <p className="eyebrow text-gold">India, read closely</p>
            <h1 className="mt-4 max-w-full font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Derivative Bharat
            </h1>
            <p className="mt-5 max-w-[21rem] text-base leading-7 text-primary-foreground/85 sm:max-w-2xl sm:text-lg sm:leading-8">
              Heritage journeys led by historians, architects, food researchers and local keepers of
              memory across India's old quarters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="w-full max-w-[21rem] bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto sm:max-w-none"
                size="lg"
              >
                <Link to="/experiences">
                  Explore Experiences
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="w-full max-w-[21rem] border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary sm:w-auto sm:max-w-none"
                size="lg"
                variant="outline"
              >
                <Link to="/plan">Plan a Private Route</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 lg:px-8">
        <SearchPanel className="border-gold/30" />
      </div>

      <TravelPortalOffers />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 lg:px-8">
        <SectionHeader
          action={
            <Button asChild variant="outline">
              <Link to="/experiences">
                View All Tours
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
          description="Each route is built from archival research, on-street observation and relationships with the communities who keep the city working."
          eyebrow="Experience categories"
          title="Choose the lens before you choose the city"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {experienceCategories.map((category) => (
            <ExperienceCard category={category} key={category.slug} />
          ))}
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
            <h2 className="mt-3 text-4xl font-bold text-primary">
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
            <div className="w-[300px] shrink-0 snap-start sm:w-[360px]" key={tour.slug}>
              <TourCard tour={tour} />
            </div>
          ))}
        </CarouselRow>
      </section>

      <TrendingDestinationsSection />

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
  title: string;
  to: string;
};

function TravelPortalOffers() {
  const varanasiDawn = tours.find((tour) => tour.slug === "varanasi-ghats-at-dawn") ?? tours[0];
  const sahyadriRoute =
    tours.find((tour) => tour.slug === "sahyadri-monsoon-heritage-route") ?? tours[0];
  const oldDelhiFood =
    tours.find((tour) => tour.slug === "shahjahanabad-old-city-food-trail") ?? tours[0];
  const mumbaiWalk =
    tours.find((tour) => tour.slug === "fort-and-kala-ghoda-heritage-walk") ?? tours[0];
  const jaipurCraft = tours.find((tour) => tour.slug === "jaipur-craft-quarters-walk") ?? tours[0];
  const hyderabad = destinations.find((destination) => destination.slug === "hyderabad");
  const goa = destinations.find((destination) => destination.slug === "goa");

  const offers: PortalOffer[] = [
    {
      description: `Sunrise boat, ghats and weaving lanes from INR ${varanasiDawn.price.toLocaleString(
        "en-IN",
      )}.`,
      eyebrow: "Dawn rituals",
      icon: Sparkles,
      image: varanasiDawn.image,
      title: "Your spiritual journey starts here",
      to: `/experiences/${varanasiDawn.slug}`,
    },
    {
      description: `Three days through ghat forts, caves and village kitchens from INR ${sahyadriRoute.price.toLocaleString(
        "en-IN",
      )}.`,
      eyebrow: "Signature route",
      icon: Route,
      image: sahyadriRoute.image,
      title: "Monsoon heritage across the Sahyadris",
      to: `/experiences/${sahyadriRoute.slug}`,
    },
    {
      description: "Private historians, city researchers and specialist access for careful groups.",
      eyebrow: "Escorted by specialists",
      icon: Users,
      image: images.galleryGroup,
      title: "Escorted tours by local partners",
      to: "/plan",
    },
    {
      description: "Choose your city, pace, language and route lens in one simple request.",
      eyebrow: "Custom plan",
      icon: CalendarCheck,
      image: images.galleryMarket,
      title: "Build your own itinerary",
      to: "/plan",
    },
    {
      description: `Eight tastings across the walled city from INR ${oldDelhiFood.price.toLocaleString(
        "en-IN",
      )}.`,
      eyebrow: "Food trails",
      icon: Sparkles,
      image: oldDelhiFood.image,
      title: "Old Delhi kitchens and bazaars",
      to: `/experiences/${oldDelhiFood.slug}`,
    },
    {
      description: `Gothic, Deco and port-city stories from INR ${mumbaiWalk.price.toLocaleString(
        "en-IN",
      )}.`,
      eyebrow: "Architecture days",
      icon: Landmark,
      image: mumbaiWalk.image,
      title: "Mumbai built in stone and trade",
      to: `/experiences/${mumbaiWalk.slug}`,
    },
    {
      description: `Guild streets, block printing and studio visits from INR ${jaipurCraft.price.toLocaleString(
        "en-IN",
      )}.`,
      eyebrow: "Craft access",
      icon: Sparkles,
      image: jaipurCraft.image,
      title: "Jaipur craft quarters walk",
      to: `/experiences/${jaipurCraft.slug}`,
    },
    {
      description: "From Deccan lanes to Goan village houses, choose the old-city pace you want.",
      eyebrow: "City pairings",
      icon: Route,
      image: hyderabad?.image ?? goa?.image ?? images.galleryMarket,
      title: "Weekend heritage escapes",
      to: "/destinations",
    },
  ];

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-7 lg:px-0">
        <div>
          <p className="eyebrow">Heritage journeys</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Book ready walks, escorted city routes, or a private itinerary built around your dates.
          </p>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => (
            <PortalOfferCard key={offer.title} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortalOfferCard({ offer }: { offer: PortalOffer }) {
  const Icon = offer.icon;

  return (
    <Link
      className="group flex h-full flex-col overflow-hidden rounded-md border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift"
      to={offer.to}
    >
      <span className="aspect-[4/3] overflow-hidden bg-paper-deep">
        <img
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={offer.image}
        />
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent">
          <Icon className="size-4" />
          {offer.eyebrow}
        </span>
        <span className="mt-3 block text-xl font-bold leading-tight text-primary">
          {offer.title}
        </span>
        <span className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
          {offer.description}
        </span>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent">
          {offer.cta ?? "View More"}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
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
    label: "North India",
    slugs: ["varanasi", "delhi", "jaipur", "kolkata", "hyderabad", "mumbai", "goa"],
  },
  {
    key: "south",
    label: "South India",
    slugs: ["hyderabad", "goa", "mumbai", "pune", "kolkata", "delhi", "jaipur"],
  },
  {
    key: "east",
    label: "East India",
    slugs: ["kolkata", "varanasi", "delhi", "jaipur", "hyderabad", "mumbai", "goa"],
  },
  {
    key: "west",
    label: "West India",
    slugs: ["mumbai", "goa", "pune", "jaipur", "delhi", "hyderabad", "varanasi"],
  },
  {
    key: "central",
    label: "Central India",
    slugs: ["pune", "hyderabad", "varanasi", "mumbai", "delhi", "jaipur", "kolkata"],
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
        <h2 className="max-w-5xl text-4xl font-extrabold leading-tight text-slate-700 sm:text-5xl lg:text-6xl">
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
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1.5fr]">
            <RegionalDestinationCard destination={featuredDestination} featured />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      className={`group relative block min-h-[230px] overflow-hidden rounded-md bg-primary shadow-card transition hover:-translate-y-1 hover:shadow-lift ${
        featured ? "min-h-[360px] lg:min-h-[500px]" : ""
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

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const maxScroll = track.scrollWidth - track.clientWidth;
      const nextScroll = track.scrollLeft + 190;

      track.scrollTo({
        behavior: "smooth",
        left: nextScroll >= maxScroll - 16 ? 0 : nextScroll,
      });
    }, 2400);

    return () => window.clearInterval(timer);
  }, [isPaused, mode]);

  function scrollSpotlights(direction: "left" | "right") {
    trackRef.current?.scrollBy({
      behavior: "smooth",
      left: direction === "left" ? -420 : 420,
    });
  }

  function changeMode(nextMode: SpotlightMode) {
    setMode(nextMode);
    requestAnimationFrame(() => trackRef.current?.scrollTo({ behavior: "smooth", left: 0 }));
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

          <div className="inline-flex w-fit rounded-full bg-secondary p-1 shadow-card">
            {[
              { label: "Heritage Cities", value: "cities" },
              { label: "Experience Lenses", value: "experiences" },
            ].map((item) => (
              <button
                className={`rounded-full px-5 py-2 text-xs font-bold transition ${
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
          onBlur={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
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

          <div className="hide-scrollbar overflow-x-auto scroll-smooth px-1 md:px-8" ref={trackRef}>
            <div className="flex min-w-max gap-5 py-2">
              {spotlightItems.map((item) => (
                <Link
                  className="group block w-[140px] shrink-0 text-center sm:w-[160px] lg:w-[174px]"
                  key={`${mode}-${item.label}`}
                  {...("params" in item ? { params: item.params } : {})}
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

        <div className="mt-8 flex justify-center">
          <Button asChild className="rounded-full px-6">
            <Link to={mode === "cities" ? "/destinations" : "/experiences"}>
              Explore Now
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
