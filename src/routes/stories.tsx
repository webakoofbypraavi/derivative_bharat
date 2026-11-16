import { ArrowRight, Bookmark, Clock } from "lucide-react";

import { BlogCard, CTASection, SectionHeader } from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import { gallery, images, stories } from "@/data/site";
import { Link } from "@/lib/simple-router";
import { breadcrumbJsonLd, jsonLdScript, pageMeta } from "@/lib/seo";

export function getStoriesHead() {
  return {
    meta: pageMeta({
      title: "Stories",
      description:
        "Field notes from Derivative Bharat on Indian architecture, food history, craft communities and heritage travel.",
      path: "/stories",
      image: images.storyArchitecture,
    }),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Stories", path: "/stories" },
        ]),
      ),
    ],
  };
}

export function StoriesPage() {
  const leadStory = stories[0];
  const remainingStories = stories.slice(1);

  if (!leadStory) {
    return null;
  }

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <p className="eyebrow text-gold">Stories</p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            Field notes from streets, kitchens and workshops.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/78">
            Short essays from the research behind our journeys: facade reading, food memory, craft
            neighbourhoods and the people who hold place knowledge.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <SectionHeader eyebrow="Featured note" title="Read before you walk" />
        <a
          className="group grid overflow-hidden rounded-md border bg-background shadow-panel transition hover:-translate-y-1 hover:shadow-lift lg:grid-cols-[1.1fr_0.9fr]"
          href={`#${leadStory.slug}`}
        >
          <img
            alt=""
            className="h-full min-h-[320px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            src={leadStory.image}
          />
          <div className="flex flex-col justify-center p-6 lg:p-10">
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase text-muted-foreground">
              <span className="inline-flex items-center gap-1 text-accent">
                <Bookmark className="size-3.5" />
                {leadStory.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {leadStory.readTime}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">{leadStory.title}</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">{leadStory.excerpt}</p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              Continue reading
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </span>
          </div>
        </a>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <SectionHeader
            description="These notes sit close to the routes themselves: practical enough for travellers, careful enough for people who like their context with edges intact."
            eyebrow="Archive"
            title="Latest stories"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {stories.map((story) => (
              <BlogCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <SectionHeader
          description="A visual index of the places and encounters that shape the journeys."
          eyebrow="Gallery"
          title="Seen on the route"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <img
              alt={item.alt}
              className="aspect-[4/3] w-full rounded-md object-cover shadow-card"
              key={item.alt}
              loading="lazy"
              src={item.src}
            />
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <SectionHeader
            action={
              <Button asChild className="w-full sm:w-auto" variant="outline">
                <Link to="/experiences">
                  Turn Notes Into a Route
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            }
            description="Architecture, food and community histories are not separate subjects on the ground. A good walk lets them interrupt each other."
            eyebrow="Reading list"
            title="Themes we keep returning to"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[leadStory, ...remainingStories].map((story) => (
              <article className="rounded-md border bg-paper p-6 shadow-card" key={story.slug}>
                <p className="eyebrow">{story.category}</p>
                <h3 className="mt-3 text-2xl font-bold text-primary">{story.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{story.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        description="Tell us the story you are chasing and we will suggest a city, a route and the kind of specialist who can open it up."
        image={images.storyPeople}
        title="Bring your curiosity to the street"
      />
    </>
  );
}
