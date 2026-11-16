import {
  ArrowRight,
  CalendarDays,
  Clock,
  Compass,
  IndianRupee,
  Landmark,
  MapPin,
  Route,
  Search,
  Sparkles,
  Star,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/simple-router";
import { cn } from "@/lib/utils";
import {
  destinations,
  experienceCategories,
  tours,
  type Destination,
  type ExperienceCategory,
  type Tour,
} from "@/data/site";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
};

const experienceCardMeta: Record<string, { icon: LucideIcon; label: string }> = {
  "heritage-walks": {
    icon: Compass,
    label: "Street routes",
  },
  "food-walks": {
    icon: UtensilsCrossed,
    label: "Food memory",
  },
  "architecture-tours": {
    icon: Landmark,
    label: "Built form",
  },
  "cultural-experiences": {
    icon: Sparkles,
    label: "Living craft",
  },
  "curated-journeys": {
    icon: Route,
    label: "Multi-day",
  },
};

export function SectionHeader({
  action,
  align = "left",
  className,
  description,
  eyebrow,
  title,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex min-w-0 flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "mx-auto max-w-3xl text-center md:block",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-3 max-w-3xl break-words font-display text-3xl font-bold text-primary sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? (
        <div className={cn("w-full sm:w-auto", align === "center" ? "mt-5" : "shrink-0")}>
          {action}
        </div>
      ) : null}
    </div>
  );
}

export function SearchPanel({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <form
      action="/experiences"
      className={cn(
        "grid w-full min-w-0 gap-3 rounded-lg border border-border/80 bg-background p-3 shadow-panel md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:p-4",
        compact && "shadow-card md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]",
        className,
      )}
      method="get"
    >
      <label className="block min-w-0">
        <span className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
          Destination
        </span>
        <select
          aria-label="Destination"
          className="h-12 w-full rounded-md border bg-paper px-3 text-base font-semibold text-foreground outline-none transition focus:ring-1 focus:ring-ring md:text-sm"
          defaultValue=""
          name="destination"
        >
          <option value="">Any destination</option>
          {destinations.map((destination) => (
            <option key={destination.slug} value={destination.slug}>
              {destination.city}
            </option>
          ))}
        </select>
      </label>

      <label className="block min-w-0">
        <span className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
          Experience
        </span>
        <select
          aria-label="Experience"
          className="h-12 w-full rounded-md border bg-paper px-3 text-base font-semibold text-foreground outline-none transition focus:ring-1 focus:ring-ring md:text-sm"
          defaultValue=""
          name="category"
        >
          <option value="">All experiences</option>
          {experienceCategories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.title}
            </option>
          ))}
        </select>
      </label>

      {!compact ? (
        <label className="block min-w-0">
          <span className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
            Departure
          </span>
          <span className="flex h-12 items-center gap-2 rounded-md border bg-paper px-3">
            <CalendarDays className="size-4 text-muted-foreground" />
            <input
              aria-label="Departure month"
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground"
              name="month"
              placeholder="Any month"
              type="text"
            />
          </span>
        </label>
      ) : null}

      <Button className="h-12 w-full self-end px-6 text-base font-bold md:w-auto" type="submit">
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
}

export function ExperienceCard({
  category,
  index = 0,
}: {
  category: ExperienceCategory;
  index?: number;
}) {
  const relatedTours = tours.filter((tour) => tour.categorySlug === category.slug);
  const visibleRouteCount = Math.max(relatedTours.length, 1);
  const pricedTours = relatedTours.filter((tour) => tour.price > 0);
  const startingPrice = pricedTours.reduce(
    (lowest, tour) => Math.min(lowest, tour.price),
    Number.POSITIVE_INFINITY,
  );
  const priceLabel = Number.isFinite(startingPrice)
    ? `From INR ${startingPrice.toLocaleString("en-IN")}`
    : "Private brief";
  const meta = experienceCardMeta[category.slug] ?? {
    icon: Compass,
    label: "Guided lens",
  };
  const Icon = meta.icon;

  return (
    <a
      className="experience-lens-card group relative flex h-full min-h-[27.5rem] min-w-0 flex-col overflow-hidden rounded-md border border-border/80 bg-card shadow-card outline-none transition duration-300 hover:-translate-y-1.5 hover:border-gold/70 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring"
      href={`/experiences?category=${encodeURIComponent(category.slug)}`}
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <span className="relative block aspect-[1.08/1] overflow-hidden bg-primary">
        <img
          alt={`${category.title} heritage experience`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          src={category.image}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-primary/88 via-primary/24 to-transparent" />
        <span className="journey-card-shine pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full bg-background/94 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-primary shadow-card backdrop-blur">
          <Icon className="size-4 shrink-0 text-accent" />
          <span className="truncate">{meta.label}</span>
        </span>
        <span className="absolute inset-x-4 bottom-4">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 break-words font-display text-2xl font-bold leading-tight text-primary-foreground drop-shadow-sm">
            {category.title}
          </h3>
        </span>
      </span>

      <span className="flex flex-1 flex-col p-5">
        <span className="text-sm leading-6 text-muted-foreground">{category.description}</span>

        <span className="mt-5 grid grid-cols-2 gap-2">
          <span className="rounded-md border bg-paper px-3 py-2">
            <span className="block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Routes
            </span>
            <span className="mt-1 block text-sm font-bold text-primary">
              {visibleRouteCount} live
            </span>
          </span>
          <span className="rounded-md border bg-paper px-3 py-2">
            <span className="block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Starts
            </span>
            <span className="mt-1 block truncate text-sm font-bold text-primary">{priceLabel}</span>
          </span>
        </span>

        <span className="mt-auto flex items-center justify-between gap-3 border-t pt-4">
          <span className="text-sm font-bold text-primary">Explore tours</span>
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:bg-accent group-hover:text-accent-foreground">
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        </span>
      </span>
    </a>
  );
}

export function DestinationCard({
  destination,
  index = 0,
}: {
  destination: Destination;
  index?: number;
}) {
  const routeCount = tours.filter((tour) => tour.destinationSlug === destination.slug).length;
  const visibleRouteCount = Math.max(routeCount, 1);
  const neighbourhoods = destination.neighbourhoods.slice(0, 2);
  const routeLabel = visibleRouteCount === 1 ? "curated route" : "curated routes";

  return (
    <Link
      className="destination-card group relative flex min-h-[27rem] min-w-0 flex-col overflow-hidden rounded-md border border-border/80 bg-card shadow-card outline-none transition duration-300 hover:-translate-y-1.5 hover:border-gold/70 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring"
      params={{ city: destination.slug }}
      style={{ animationDelay: `${index * 75}ms` }}
      to="/destinations/$city"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-primary">
        <img
          alt={`${destination.city} heritage destination`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          src={destination.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/88 via-primary/22 to-transparent" />
        <div className="journey-card-shine pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full bg-background/92 px-3 py-1.5 text-xs font-bold text-primary shadow-card backdrop-blur">
          <MapPin className="size-3.5 shrink-0 text-accent" />
          <span className="truncate">{destination.state}</span>
        </div>
        <div className="absolute inset-x-4 bottom-4">
          <h3 className="break-words font-display text-3xl font-bold leading-none text-primary-foreground drop-shadow-sm">
            {destination.city}
          </h3>
          <div className="mt-3 inline-flex rounded-full border border-primary-foreground/25 bg-primary-foreground/14 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground backdrop-blur">
            {visibleRouteCount} {routeLabel}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-6 text-muted-foreground">{destination.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {neighbourhoods.map((neighbourhood) => (
            <span
              className="rounded-full border border-border/80 bg-paper px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-primary"
              key={neighbourhood}
            >
              {neighbourhood}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t pt-4">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              <CalendarDays className="size-3.5 shrink-0 text-accent" />
              Duration
            </div>
            <p className="mt-1 truncate text-sm font-bold text-foreground">
              {destination.bestTime.split(";")[0].split(",")[0]}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-3 py-2 text-sm font-bold text-primary-foreground transition group-hover:bg-accent group-hover:text-accent-foreground">
            Explore
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function TourCard({
  className,
  tour,
}: {
  className?: string;
  tour: Tour;
}) {
  return (
    <article
      className={cn(
        "group flex h-full min-w-0 flex-col overflow-hidden rounded-md border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <Link
        className="relative block aspect-[4/3] overflow-hidden"
        params={{ slug: tour.slug }}
        to="/experiences/$slug"
      >
        <img
          alt={`${tour.title} heritage journey`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={tour.image}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/58 via-black/12 to-black/72" />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <p className="max-w-[75%] text-sm font-semibold leading-5 text-white drop-shadow-md">
            {tour.summary}
          </p>
          <div className="flex shrink-0 flex-wrap justify-end gap-2">
            {tour.trending ? (
              <Badge className="bg-accent text-accent-foreground shadow-card">Trending</Badge>
            ) : null}
            {tour.popular ? (
              <Badge className="bg-gold text-gold-foreground shadow-card">Popular</Badge>
            ) : null}
          </div>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-primary shadow-card">
            <MapPin className="size-3.5 shrink-0 text-accent" />
            <span className="truncate">{tour.destination}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-primary shadow-card">
            <Clock className="size-3.5 shrink-0 text-accent" />
            {tour.duration}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {tour.reviews ? (
          <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
            <Star className="size-3.5 fill-gold text-gold" />
            {tour.rating} ({tour.reviews})
          </div>
        ) : null}

        <h3 className="mt-3 text-xl font-bold leading-tight text-primary">
          <Link params={{ slug: tour.slug }} to="/experiences/$slug">
            {tour.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{tour.overview}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <span className="inline-flex min-w-0 items-center gap-1 font-semibold text-foreground">
            <IndianRupee className="size-4 text-accent" />
            {tour.price ? tour.price.toLocaleString("en-IN") : "Price on request"}
          </span>
          <Button asChild className="w-full sm:w-auto" size="sm" variant="outline">
            <Link params={{ slug: tour.slug }} to="/experiences/$slug">
              Details
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function TestimonialCard({
  testimonial,
}: {
  testimonial: { name: string; location: string; rating: number; quote: string };
}) {
  return (
    <article className="h-full rounded-md border bg-card p-6 shadow-card">
      <div className="flex gap-1 text-gold" aria-label={`${testimonial.rating} star rating`}>
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star className="size-4 fill-current" key={index} />
        ))}
      </div>
      <p className="mt-4 text-base leading-7 text-foreground">"{testimonial.quote}"</p>
      <div className="mt-5 border-t pt-4">
        <h3 className="font-semibold text-primary">{testimonial.name}</h3>
        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
      </div>
    </article>
  );
}

export function BlogCard({
  story,
}: {
  story: {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    image: string;
    readTime: string;
  };
}) {
  return (
    <a
      className="group block h-full overflow-hidden rounded-md border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift"
      href={`/stories#${story.slug}`}
      id={story.slug}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={story.image}
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
          <span className="text-accent">{story.category}</span>
          <span>{story.readTime}</span>
        </div>
        <h3 className="mt-3 text-xl font-bold text-primary">{story.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{story.excerpt}</p>
      </div>
    </a>
  );
}

export function CTASection({
  description,
  image,
  primaryLabel = "Plan a Journey",
  title,
}: {
  description: string;
  image?: string;
  primaryLabel?: string;
  title: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_360px] lg:items-center lg:px-8">
        <div>
          <p className="eyebrow text-gold">Begin with a conversation</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-primary-foreground/75">
            {description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              asChild
              className="w-full bg-gold text-gold-foreground hover:bg-gold/90 sm:w-auto"
            >
              <Link to="/plan">
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary sm:w-auto"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        {image ? (
          <img
            alt=""
            className="hidden aspect-[4/3] w-full rounded-md object-cover shadow-panel lg:block"
            loading="lazy"
            src={image}
          />
        ) : null}
      </div>
    </section>
  );
}

export function CarouselRow({
  children,
  className,
  moving = false,
}: {
  children: ReactNode;
  className?: string;
  moving?: boolean;
}) {
  if (moving) {
    return (
      <div className={cn("db-carousel carousel-mask overflow-hidden", className)}>
        <div className="db-carousel-track pb-4">
          <div className="db-carousel-segment">{children}</div>
          <div aria-hidden="true" className="db-carousel-segment" inert>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("hide-scrollbar flex snap-x gap-5 overflow-x-auto pb-4", className)}>
      {children}
    </div>
  );
}

export function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-background p-5 text-center shadow-card">
      <div className="font-display text-3xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase text-muted-foreground">{label}</div>
    </div>
  );
}

export function PeopleBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-semibold shadow-card">
      {children}
    </span>
  );
}
