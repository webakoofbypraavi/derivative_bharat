import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

import {
  BlogCard,
  CarouselRow,
  CTASection,
  DestinationCard,
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
  seasonalThemes,
  stats,
  stories,
  testimonials,
  tours,
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
  const seasonalFeatureCards = seasonalThemes.slice(0, 4);
  const seasonalWideCard = seasonalThemes[4];
  const seasonalHeroImage =
    experienceCategories.find((category) => category.slug === "architecture-tours")?.image ??
    images.signatureJourney;

  return (
    <>
      <section className="relative min-h-[78svh] overflow-hidden">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          src={images.heroHeritage}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[78svh] max-w-7xl items-center px-4 py-16 lg:px-8">
          <div className="max-w-3xl text-primary-foreground fade-up">
            <p className="eyebrow text-gold">India, read closely</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Derivative Bharat
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/85">
              Heritage journeys led by historians, architects, food researchers and local keepers of
              memory across India's old quarters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-gold text-gold-foreground hover:bg-gold/90" size="lg">
                <Link to="/experiences">
                  Explore Experiences
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                size="lg"
                variant="outline"
              >
                <Link to="/plan">Plan a Private Route</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 lg:px-8">
        <SearchPanel />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
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

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <SectionHeader
            action={
              <Button asChild variant="outline">
                <Link to="/destinations">
                  All Destinations
                  <MapPin className="size-4" />
                </Link>
              </Button>
            }
            description="Each city page gathers the neighbourhoods, architectural layers, food lineages and local stories that shape our routes."
            eyebrow="Destinations"
            title="Eight cities, many layers"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.slice(0, 8).map((destination) => (
              <DestinationCard destination={destination} key={destination.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 lg:grid-cols-[0.36fr_0.64fr] lg:items-stretch lg:px-8">
          <div className="flex h-full flex-col">
            <div className="max-w-md">
              <p className="eyebrow">Seasonal edits</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-primary sm:text-4xl">
                Travel with the year
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                The calendar follows the country: monsoon forts, winter old-city breakfasts,
                festival workshops and architecture routes that need gentler weather.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div
                  className="rounded-md border bg-background px-4 py-5 text-center shadow-card"
                  key={stat.label}
                >
                  <div className="font-display text-2xl font-bold leading-none text-primary sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[0.68rem] font-semibold uppercase leading-4 text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 min-h-[360px] flex-1 overflow-hidden rounded-md shadow-panel">
              <img
                alt=""
                className="h-full min-h-[360px] w-full object-cover"
                loading="lazy"
                src={seasonalHeroImage}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {seasonalFeatureCards.map((theme) => (
              <article
                className="group flex min-h-[270px] flex-col overflow-hidden rounded-md border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift"
                key={theme.name}
              >
                <img
                  alt=""
                  className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  src={theme.image}
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-bold text-primary">{theme.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{theme.note}</p>
                </div>
              </article>
            ))}

            {seasonalWideCard ? (
              <article className="group relative min-h-[260px] overflow-hidden rounded-md border bg-primary shadow-card transition hover:-translate-y-1 hover:shadow-lift sm:col-span-2">
                <img
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                  src={seasonalWideCard.image}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/55 to-transparent" />
                <div className="relative flex min-h-[260px] max-w-md flex-col justify-end p-6 text-primary-foreground sm:p-7">
                  <p className="eyebrow text-gold">City stories</p>
                  <h3 className="mt-3 text-2xl font-bold leading-tight">{seasonalWideCard.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-primary-foreground/78">
                    {seasonalWideCard.note}
                  </p>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>

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
