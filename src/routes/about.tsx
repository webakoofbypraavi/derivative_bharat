import { ArrowRight, BookOpen, Handshake, Map, UsersRound } from "lucide-react";

import { CTASection, SectionHeader, StatPill } from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import { images, stats } from "@/data/site";
import { Link } from "@/lib/simple-router";
import { breadcrumbJsonLd, jsonLdScript, organizationJsonLd, pageMeta } from "@/lib/seo";

export function getAboutHead() {
  return {
    meta: pageMeta({
      title: "About",
      description:
        "Derivative Bharat designs historian-led heritage journeys through research, careful pacing and relationships with local communities.",
      path: "/about",
      image: images.philosophy,
    }),
    scripts: [
      jsonLdScript(organizationJsonLd()),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ),
    ],
  };
}

export function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          src={images.philosophy}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <p className="eyebrow text-gold">About Derivative Bharat</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-5xl">
            Travel that treats places as living archives.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/80">
            We design guided journeys for travellers who want the city beneath the itinerary:
            buildings as documents, kitchens as migration records and communities as authors of
            their own story.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <div className="overflow-hidden rounded-md shadow-panel">
          <img
            alt=""
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
            src={images.philosophy}
          />
        </div>
        <div>
          <p className="eyebrow">Our philosophy</p>
          <h2 className="mt-3 text-4xl font-bold text-primary">
            Context first, access carefully, pace humanly.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Derivative Bharat began as a field-notes practice: walking streets with historians,
            photographing overlooked details, tracing recipes through families and asking why
            certain stories made it into guidebooks while others stayed in lanes and homes.
          </p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            The journeys grew from that habit. We still build routes the same way: research, walk,
            listen, test the pace, then return with travellers only when the route can hold a real
            conversation.
          </p>
          <Button asChild className="mt-7">
            <Link to="/experiences">
              See the Journeys
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <SectionHeader
            align="center"
            description="The same four commitments shape a two-hour old-city walk and a multi-day curated route."
            eyebrow="Method"
            title="How a Derivative Bharat route is built"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BookOpen,
                title: "Research deeply",
                text: "Archives, maps, oral histories and field notes shape the route before a guide leads it.",
              },
              {
                icon: Map,
                title: "Walk the city",
                text: "Routes are tested for pace, shade, sound, safety and the natural rhythm of conversation.",
              },
              {
                icon: Handshake,
                title: "Work with locals",
                text: "Craft visits, food stops and private access are arranged through ongoing relationships.",
              },
              {
                icon: UsersRound,
                title: "Keep groups small",
                text: "Small groups protect the street, the host and the quality of questions travellers can ask.",
              },
            ].map((item) => (
              <article className="rounded-md border bg-background p-6 shadow-card" key={item.title}>
                <item.icon className="size-7 text-accent" />
                <h3 className="mt-5 text-xl font-bold text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatPill key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeader
          description="Guides come from history, architecture, food research, conservation and local practice. The best ones are translators between academic context and street-level memory."
          eyebrow="People"
          title="Led by specialists, shaped with communities"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            "Architect-historians who can explain stone, climate and patronage without flattening the politics.",
            "Food researchers who treat tasting stops as records of migration, trade and neighbourhood labour.",
            "Local hosts, workshop families and community keepers who choose what access makes sense.",
          ].map((text) => (
            <article className="rounded-md border bg-background p-6 shadow-card" key={text}>
              <p className="text-base leading-8 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        description="Bring us a city, period, family archive, food memory or architectural obsession. We will tell you what is possible and who should lead it."
        image={images.signatureJourney}
        title="What would you like to understand more deeply?"
      />
    </>
  );
}
