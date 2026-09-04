import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Languages,
  MapPin,
  MessageCircle,
  Star,
  XCircle,
} from "lucide-react";

import { CTASection, PeopleBadge, SectionHeader, TourCard } from "@/components/site/cards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, images, tours } from "@/data/site";
import { Link } from "@/lib/simple-router";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdScript,
  pageMeta,
  touristTripJsonLd,
} from "@/lib/seo";

export function getExperienceHead(slug: string) {
  const tour = tours.find((item) => item.slug === slug);

  if (!tour) {
    return {
      meta: pageMeta({
        title: "Experience Not Found",
        description: "This Derivative Bharat experience could not be found.",
        path: "/experiences",
      }),
    };
  }

  return {
    meta: pageMeta({
      title: tour.title,
      description: tour.summary,
      path: `/experiences/${tour.slug}`,
      image: tour.image,
    }),
    scripts: [
      jsonLdScript(touristTripJsonLd(tour)),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/experiences" },
          { name: tour.title, path: `/experiences/${tour.slug}` },
        ]),
      ),
      jsonLdScript(faqPageJsonLd(tour.faqs)),
    ],
  };
}

const anchorLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#itinerary", label: "Itinerary" },
  { href: "#included", label: "Included" },
  { href: "#faqs", label: "FAQs" },
];

export function ExperienceDetailPage({ slug }: { slug: string }) {
  const tour = tours.find((item) => item.slug === slug);

  if (!tour) {
    return <TourNotFound />;
  }

  const relatedTours = tours
    .filter(
      (item) =>
        item.slug !== tour.slug &&
        (item.destinationSlug === tour.destinationSlug || item.categorySlug === tour.categorySlug),
    )
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          src={tour.image}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gold text-gold-foreground">{tour.category}</Badge>
              {tour.trending ? (
                <Badge className="bg-accent text-accent-foreground">Trending</Badge>
              ) : null}
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {tour.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/80">
              {tour.summary}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PeopleBadge>
                <MapPin className="size-4 text-accent" />
                {tour.destination}
              </PeopleBadge>
              <PeopleBadge>
                <Clock className="size-4 text-accent" />
                {tour.duration}
              </PeopleBadge>
              <PeopleBadge>
                <Star className="size-4 fill-gold text-gold" />
                {tour.rating} from {tour.reviews} reviews
              </PeopleBadge>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-[72px] z-30 border-b bg-background">
        <div className="hide-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 lg:px-8">
          {anchorLinks.map((link) => (
            <a
              className="shrink-0 rounded-md px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-primary"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-12">
          <section className="scroll-mt-28" id="overview">
            <p className="eyebrow">Overview</p>
            <h2 className="mt-3 text-3xl font-bold text-primary">What this route opens up</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">{tour.overview}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <InfoList items={tour.highlights} title="Highlights" type="positive" />
              <InfoList items={tour.discover} title="You will discover" type="positive" />
            </div>
          </section>

          <section className="scroll-mt-28" id="itinerary">
            <SectionHeader
              className="mb-6"
              description="Timings can shift slightly with weather, opening hours and the pace of the group."
              eyebrow="Route plan"
              title="Itinerary"
            />
            <div className="space-y-4">
              {tour.itinerary.map((stop, index) => (
                <article
                  className="grid gap-4 rounded-md border bg-background p-5 shadow-card sm:grid-cols-[88px_1fr]"
                  key={`${stop.time}-${stop.title}`}
                >
                  <div>
                    <span className="inline-flex rounded-md bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                      {stop.time}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {index + 1}. {stop.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{stop.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="scroll-mt-28" id="included">
            <SectionHeader
              className="mb-6"
              description={tour.meetingPoint}
              eyebrow="Practical details"
              title="Included, excluded and important notes"
            />
            <div className="grid gap-5 md:grid-cols-3">
              <InfoList items={tour.included} title="Included" type="positive" />
              <InfoList items={tour.excluded} title="Excluded" type="negative" />
              <InfoList items={tour.important} title="Important" type="neutral" />
            </div>
          </section>

          <section className="scroll-mt-28" id="faqs">
            <SectionHeader className="mb-5" eyebrow="Questions" title="FAQs" />
            <Accordion
              className="rounded-md border bg-background px-5 shadow-card"
              collapsible
              type="single"
            >
              {tour.faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-6 text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-md border bg-background p-5 shadow-panel">
            <p className="text-sm font-semibold text-muted-foreground">From</p>
            <div className="mt-1 font-display text-4xl font-bold text-primary">
              {formatPrice(tour.price)}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              per person, inclusive of guide fees
            </p>

            <form action="/plan" className="mt-6 space-y-4" method="get">
              <input name="tour" type="hidden" value={tour.slug} />
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
                  Preferred date
                </span>
                <span className="flex h-11 items-center gap-2 rounded-md border bg-paper px-3">
                  <CalendarDays className="size-4 text-muted-foreground" />
                  <input
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    name="date"
                    type="date"
                  />
                </span>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
                  Travellers
                </span>
                <select
                  className="h-11 w-full rounded-md border bg-paper px-3 text-sm outline-none"
                  name="travellers"
                  defaultValue="2"
                >
                  <option value="1">1 traveller</option>
                  <option value="2">2 travellers</option>
                  <option value="4">3-4 travellers</option>
                  <option value="8">5-8 travellers</option>
                  <option value="private">Private group</option>
                </select>
              </label>
              <Button className="w-full" type="submit">
                Check Availability
                <ArrowRight className="size-4" />
              </Button>
            </form>

            <Button asChild className="mt-3 w-full" variant="outline">
              <a href="/contact">
                <MessageCircle className="size-4" />
                Ask a Question
              </a>
            </Button>

            <div className="mt-6 space-y-3 border-t pt-5 text-sm text-muted-foreground">
              <p className="inline-flex items-start gap-2">
                <Languages className="mt-0.5 size-4 text-accent" />
                {tour.language.join(", ")}
              </p>
              <p className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 text-accent" />
                {tour.meetingPoint}
              </p>
            </div>
          </div>
        </aside>
      </section>

      {relatedTours.length ? (
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
            <SectionHeader
              description={`More ways to explore ${tour.destination} or continue through ${tour.category.toLowerCase()}.`}
              title="Related journeys"
            />
            <div className="grid gap-5 md:grid-cols-3">
              {relatedTours.map((related) => (
                <TourCard key={related.slug} tour={related} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        description="Private dates, slower pacing, specialist access and multi-city extensions can be shaped around this route."
        image={images.galleryGroup}
        primaryLabel="Request a Private Departure"
        title="Want this journey tailored for your group?"
      />
    </>
  );
}

function InfoList({
  items,
  title,
  type,
}: {
  items: string[];
  title: string;
  type: "positive" | "negative" | "neutral";
}) {
  const Icon = type === "negative" ? XCircle : CheckCircle2;

  return (
    <div className="rounded-md border bg-background p-5 shadow-card">
      <h3 className="text-xl font-bold text-primary">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={item}>
            <Icon
              className={
                type === "negative"
                  ? "mt-1 size-4 shrink-0 text-muted-foreground"
                  : "mt-1 size-4 shrink-0 text-accent"
              }
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TourNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center lg:px-8">
      <p className="eyebrow">Experience not found</p>
      <h1 className="mt-3 text-4xl font-bold text-primary">This journey has moved</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        Browse the current experience list or share the route you had in mind and we will help match
        it.
      </p>
      <Button asChild className="mt-7">
        <Link to="/experiences">
          Browse Experiences
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </section>
  );
}
