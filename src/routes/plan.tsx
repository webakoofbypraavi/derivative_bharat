import { ArrowRight, CalendarDays, CheckCircle2, MapPin, Send, Sparkles } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import customJourney from "@/assets/custom-journey-upscaled.webp";
import { SectionHeader } from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact, destinations, experienceCategories, images, tours } from "@/data/site";
import { Link } from "@/lib/simple-router";
import { breadcrumbJsonLd, jsonLdScript, pageMeta } from "@/lib/seo";

type PlanSearch = {
  date?: string;
  tour?: string;
  travellers?: string;
};

export function getPlanHead() {
  return {
    meta: pageMeta({
      title: "Plan a Journey",
      description:
        "Plan a private heritage walk, custom cultural route or multi-day curated journey with Derivative Bharat.",
      path: "/plan",
      image: customJourney,
    }),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Plan", path: "/plan" },
        ]),
      ),
    ],
  };
}

function cleanSearchValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function PlanPage({ searchParams }: { searchParams: URLSearchParams }) {
  const search = parsePlanSearch(searchParams);
  const [selectedTour, setSelectedTour] = useState(search.tour ?? "");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const selectedTourDetails = useMemo(
    () => tours.find((tour) => tour.slug === selectedTour),
    [selectedTour, tours],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = (name: string) => String(formData.get(name) ?? "").trim();
    const interestText = selectedInterests.length ? selectedInterests.join(", ") : "Open to ideas";
    const tourText = selectedTourDetails?.title || value("tour") || "Custom route";
    const destination = value("destination") || selectedTourDetails?.destination || "";
    const message = [
      "Hello Derivative Bharat, I would like help planning a journey.",
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Preferred city: ${destination || "Flexible"}`,
      `Tour: ${tourText || "Custom route"}`,
      `Date: ${value("date") || "Flexible"}`,
      `Travellers: ${value("travellers") || "Not sure yet"}`,
      `Interests: ${interestText}`,
      `Brief: ${value("brief") || "I will share more details shortly."}`,
    ].join("\n");

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          preferred_city: destination || null,
          tour: selectedTour || null,
          tour_title: tourText,
          tour_destination: selectedTourDetails?.destination || destination || null,
          date: value("date") || null,
          travellers: value("travellers") || null,
          interests: interestText,
          brief: value("brief") || null,
          message,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We could not send your enquiry.");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src={customJourney}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <p className="eyebrow text-gold">Plan</p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            Shape a heritage journey around your people, pace and curiosity.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/82">
            Request a private departure, adapt an existing route or ask us to connect cities into a
            multi-day cultural journey.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="rounded-md border bg-background p-4 shadow-panel sm:p-6">
          <SectionHeader
            className="mb-6"
            description="Your booking enquiry is saved securely and routed to the spreadsheet tab for its destination."
            title="Journey brief"
          />

          {submitted ? (
            <div className="rounded-md border border-accent/30 bg-secondary p-5" role="status">
              <CheckCircle2 className="size-7 text-accent" />
              <h2 className="mt-4 text-2xl font-bold text-primary">Enquiry received</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Thanks. Your tour enquiry has been sent to our planning desk. We will be in touch
                shortly.
              </p>
            </div>
          ) : (
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Name" name="name" placeholder="Your name" />
                <Field
                  id="email"
                  label="Email"
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="destination">Preferred city</Label>
                  <select
                    className="mt-2 h-11 w-full rounded-md border bg-paper px-3 text-base outline-none focus:ring-1 focus:ring-ring sm:h-10 sm:text-sm"
                    id="destination"
                    name="destination"
                    defaultValue=""
                  >
                    <option value="">Flexible</option>
                    {destinations.map((destination) => (
                      <option key={destination.slug} value={destination.city}>
                        {destination.city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="tour">Existing route</Label>
                  <select
                    className="mt-2 h-11 w-full rounded-md border bg-paper px-3 text-base outline-none focus:ring-1 focus:ring-ring sm:h-10 sm:text-sm"
                    id="tour"
                    name="tour"
                    onChange={(event) => setSelectedTour(event.target.value)}
                    value={selectedTour}
                  >
                    <option value="">Custom route</option>
                    {tours.map((tour) => (
                      <option key={tour.slug} value={tour.slug}>
                        {tour.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  defaultValue={search.date}
                  id="date"
                  label="Preferred date"
                  name="date"
                  type="date"
                />
                <div>
                  <Label htmlFor="travellers">Travellers</Label>
                  <select
                    className="mt-2 h-11 w-full rounded-md border bg-paper px-3 text-base outline-none focus:ring-1 focus:ring-ring sm:h-10 sm:text-sm"
                    defaultValue={search.travellers ?? "2"}
                    id="travellers"
                    name="travellers"
                  >
                    <option value="1">1 traveller</option>
                    <option value="2">2 travellers</option>
                    <option value="4">3-4 travellers</option>
                    <option value="8">5-8 travellers</option>
                    <option value="private">Private group</option>
                  </select>
                </div>
              </div>

              <fieldset>
                <legend className="text-sm font-semibold text-primary">Interests</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {experienceCategories.map((category) => (
                    <label
                      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border bg-paper px-3 py-2 text-sm font-semibold hover:bg-secondary"
                      key={category.slug}
                    >
                      <input
                        checked={selectedInterests.includes(category.title)}
                        className="size-4 accent-primary"
                        onChange={() =>
                          setSelectedInterests(toggleValue(selectedInterests, category.title))
                        }
                        type="checkbox"
                      />
                      <span className="min-w-0">{category.title}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <Label htmlFor="brief">Brief</Label>
                <Textarea
                  className="mt-2 min-h-36 bg-paper"
                  id="brief"
                  name="brief"
                  placeholder="Occasion, route ideas, mobility needs, food preferences or cities to connect"
                />
              </div>

              {submitError ? (
                <p className="text-sm font-semibold text-destructive" role="alert">
                  {submitError}
                </p>
              ) : null}

              <Button className="w-full sm:w-fit" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Sending…" : "Send booking enquiry"}
                <Send className="size-4" />
              </Button>
            </form>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-md border bg-background p-6 shadow-card">
            <Sparkles className="size-7 text-accent" />
            <h2 className="mt-4 text-2xl font-bold text-primary">What we shape</h2>
            <ul className="mt-4 space-y-3">
              {[
                "Private heritage walks",
                "Family and school routes",
                "Architecture-led city days",
                "Food and market trails",
                "Multi-day curated journeys",
              ].map((item) => (
                <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={item}>
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {selectedTourDetails ? (
            <div className="overflow-hidden rounded-md border bg-background shadow-card">
              <img alt="" className="h-44 w-full object-cover" src={selectedTourDetails.image} />
              <div className="p-5">
                <p className="eyebrow">{selectedTourDetails.destination}</p>
                <h2 className="mt-3 text-2xl font-bold text-primary">
                  {selectedTourDetails.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {selectedTourDetails.summary}
                </p>
                <Button asChild className="mt-5 w-full" variant="outline">
                  <Link params={{ slug: selectedTourDetails.slug }} to="/experiences/$slug">
                    View Details
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-md border bg-background p-6 shadow-card">
              <CalendarDays className="size-7 text-accent" />
              <h2 className="mt-4 text-2xl font-bold text-primary">Planning rhythm</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                City walks can often be confirmed quickly. Longer journeys need more lead time for
                access, transport and the right specialist.
              </p>
            </div>
          )}

          <div className="rounded-md border bg-primary p-6 text-primary-foreground shadow-card">
            <MapPin className="size-7 text-gold" />
            <h2 className="mt-4 text-2xl font-bold">Prefer email?</h2>
            <p className="mt-3 text-sm leading-6 text-primary-foreground/75">{contact.email}</p>
          </div>
        </aside>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <SectionHeader
            align="center"
            description="Tell us what matters first. We will handle the route mechanics after the first conversation."
            eyebrow="Useful prompts"
            title="Good briefs are specific, not polished"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              "A city you are visiting with only half a day free.",
              "A family archive, neighbourhood or food memory you want to trace.",
              "A regional route that connects architecture, craft and kitchens.",
            ].map((prompt) => (
              <article className="rounded-md border bg-background p-6 shadow-card" key={prompt}>
                <p className="text-base leading-8 text-muted-foreground">{prompt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          alt=""
          className="h-[360px] w-full object-cover"
          loading="lazy"
          src={images.galleryGroup}
        />
      </section>
    </>
  );
}

function parsePlanSearch(searchParams: URLSearchParams): PlanSearch {
  const result: PlanSearch = {};
  const tour = cleanSearchValue(searchParams.get("tour"));
  const date = cleanSearchValue(searchParams.get("date"));
  const travellers = cleanSearchValue(searchParams.get("travellers"));

  if (tour) {
    result.tour = tour;
  }
  if (date) {
    result.date = date;
  }
  if (travellers) {
    result.travellers = travellers;
  }

  return result;
}

function Field({
  defaultValue,
  id,
  label,
  name,
  placeholder,
  type = "text",
}: {
  defaultValue?: string;
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        className="mt-2 bg-paper"
        defaultValue={defaultValue}
        id={id}
        name={name}
        placeholder={placeholder}
        required={name === "name" || name === "email"}
        type={type}
      />
    </div>
  );
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}
