import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";

import { CTASection, SectionHeader } from "@/components/site/cards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact, images } from "@/data/site";
import { breadcrumbJsonLd, jsonLdScript, organizationJsonLd, pageMeta } from "@/lib/seo";

export function getContactHead() {
  return {
    meta: pageMeta({
      title: "Contact",
      description:
        "Contact Derivative Bharat for heritage walks, private cultural journeys and custom India travel planning.",
      path: "/contact",
      image: images.galleryGroup,
    }),
    scripts: [
      jsonLdScript(organizationJsonLd()),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ),
    ],
  };
}

export function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <p className="eyebrow text-gold">Contact</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-5xl">
            Start with the city, date or story on your mind.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/78">
            We usually reply within one working day with route suggestions, availability and the
            right next question.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="space-y-5">
          <ContactCard
            href={contact.phoneHref}
            icon={<Phone className="size-5" />}
            label="Phone"
            value={contact.phone}
          />
          <ContactCard
            href={`mailto:${contact.email}`}
            icon={<Mail className="size-5" />}
            label="Email"
            value={contact.email}
          />
          <ContactCard
            href={contact.whatsapp}
            icon={<MessageCircle className="size-5" />}
            label="WhatsApp"
            value="Message the planning desk"
          />
          <div className="rounded-md border bg-background p-6 shadow-card">
            <MapPin className="size-6 text-accent" />
            <h2 className="mt-4 text-xl font-bold text-primary">Office</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{contact.address}</p>
          </div>
        </div>

        <div className="rounded-md border bg-background p-6 shadow-panel">
          <SectionHeader
            className="mb-6"
            description="Share enough for us to understand the shape of the journey. Dates can be approximate."
            title="Send an enquiry"
          />

          {sent ? (
            <div className="rounded-md border border-accent/30 bg-secondary p-5">
              <CheckCircle2 className="size-7 text-accent" />
              <h2 className="mt-4 text-2xl font-bold text-primary">Enquiry noted</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Thanks. For fastest confirmation, send the same brief on WhatsApp and our planning
                desk will pick it up.
              </p>
              <Button asChild className="mt-5">
                <a href={contact.whatsapp}>
                  Continue on WhatsApp
                  <Send className="size-4" />
                </a>
              </Button>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Name" placeholder="Your name" />
                <Field id="email" label="Email" placeholder="you@example.com" type="email" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="city" label="City or route" placeholder="Mumbai, Delhi, Goa..." />
                <Field id="date" label="Travel date" type="date" />
              </div>
              <div>
                <Label htmlFor="message">Brief</Label>
                <Textarea
                  className="mt-2 min-h-36 bg-paper"
                  id="message"
                  placeholder="Travellers, dates, interests and pace"
                  required
                />
              </div>
              <Button className="w-full sm:w-fit" type="submit">
                Send Enquiry
                <Send className="size-4" />
              </Button>
            </form>
          )}
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-4xl px-4 py-14 lg:px-8">
          <SectionHeader
            align="center"
            description="The practical questions that usually come up before a booking."
            eyebrow="Planning notes"
            title="Before you write"
          />
          <Accordion
            className="rounded-md border bg-background px-5 shadow-card"
            collapsible
            type="single"
          >
            {[
              {
                q: "Can you arrange private departures?",
                a: "Yes. Most walks and many full-day routes can run privately with adjusted timing and pacing.",
              },
              {
                q: "How far in advance should we enquire?",
                a: "For city walks, a week is often enough. For multi-day curated journeys, two to six weeks gives us better access and guide options.",
              },
              {
                q: "Do you work with families and school groups?",
                a: "Yes. We adapt routes for age, attention span, mobility and subject focus.",
              },
            ].map((faq, index) => (
              <AccordionItem key={faq.q} value={`contact-faq-${index}`}>
                <AccordionTrigger className="text-base">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTASection
        description="For private routes, complex dates or media and institutional enquiries, send the first note and we will route it to the right person."
        image={images.galleryMarket}
        title="Prefer to plan in detail?"
      />
    </>
  );
}

function ContactCard({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      className="flex items-center gap-4 rounded-md border bg-background p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
      href={href}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-accent">
        {icon}
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase text-muted-foreground">{label}</span>
        <span className="mt-1 block font-semibold text-primary">{value}</span>
      </span>
    </a>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input className="mt-2 bg-paper" id={id} placeholder={placeholder} required type={type} />
    </div>
  );
}
