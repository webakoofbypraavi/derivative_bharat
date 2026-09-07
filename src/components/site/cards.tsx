import { ArrowRight, CalendarDays, Clock, IndianRupee, MapPin, Search, Star } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/simple-router";
import { cn } from "@/lib/utils";
import {
  destinations,
  experienceCategories,
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
        "mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "mx-auto max-w-3xl text-center md:block",
        className,
      )}
    >
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold text-primary sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className={align === "center" ? "mt-5" : "shrink-0"}>{action}</div> : null}
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
        "grid gap-3 rounded-lg border border-border/80 bg-background p-3 shadow-panel md:grid-cols-[1fr_1fr_1fr_auto] md:p-4",
        compact && "shadow-card md:grid-cols-[1fr_1fr_auto]",
        className,
      )}
      method="get"
    >
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
          Destination
        </span>
        <select
          aria-label="Destination"
          className="h-12 w-full rounded-md border bg-paper px-3 text-sm font-semibold text-foreground outline-none transition focus:ring-1 focus:ring-ring"
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

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
          Experience
        </span>
        <select
          aria-label="Experience"
          className="h-12 w-full rounded-md border bg-paper px-3 text-sm font-semibold text-foreground outline-none transition focus:ring-1 focus:ring-ring"
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
        <label className="block">
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

      <Button className="h-12 self-end px-6 text-base font-bold" type="submit">
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
}

export function ExperienceCard({ category }: { category: ExperienceCategory }) {
  return (
    <a
      className="group block overflow-hidden rounded-md border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift"
      href={`/experiences?category=${encodeURIComponent(category.slug)}`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={category.image}
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-primary">{category.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Explore tours
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      className="group block overflow-hidden rounded-md border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift"
      params={{ city: destination.slug }}
      to="/destinations/$city"
    >
      <div className="aspect-[5/4] overflow-hidden">
        <img
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={destination.image}
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold text-primary">{destination.city}</h3>
            <p className="text-sm font-medium text-terracotta">{destination.state}</p>
          </div>
          <ArrowRight className="mt-2 size-4 text-accent transition group-hover:translate-x-1" />
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{destination.tagline}</p>
      </div>
    </Link>
  );
}

export function TourCard({
  className,
  showDestination = true,
  tour,
}: {
  className?: string;
  showDestination?: boolean;
  tour: Tour;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-md border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <Link
        className="relative block aspect-[4/3] overflow-hidden"
        params={{ slug: tour.slug }}
        to="/experiences/$slug"
      >
        <img
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={tour.image}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {tour.trending ? (
            <Badge className="bg-accent text-accent-foreground">Trending</Badge>
          ) : null}
          {tour.popular ? <Badge className="bg-gold text-gold-foreground">Popular</Badge> : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
          {showDestination ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {tour.destination}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {tour.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5 fill-gold text-gold" />
            {tour.rating} ({tour.reviews})
          </span>
        </div>

        <h3 className="mt-3 text-xl font-bold leading-tight text-primary">
          <Link params={{ slug: tour.slug }} to="/experiences/$slug">
            {tour.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{tour.summary}</p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t pt-4">
          <span className="inline-flex items-center gap-1 font-semibold text-foreground">
            <IndianRupee className="size-4 text-accent" />
            {tour.price.toLocaleString("en-IN")}
          </span>
          <Button asChild size="sm" variant="outline">
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
            <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/plan">
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
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
    <span className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-semibold shadow-card">
      {children}
    </span>
  );
}
