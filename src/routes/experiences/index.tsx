import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import { SearchPanel, SectionHeader, TourCard } from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  destinations,
  durationBands,
  experienceCategories,
  languages,
  tours,
  type Tour,
} from "@/data/site";
import { breadcrumbJsonLd, jsonLdScript, pageMeta } from "@/lib/seo";

type ExperiencesSearch = {
  category?: string;
  destination?: string;
  q?: string;
};

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Highest rated" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "duration", label: "Shortest first" },
] as const;

type SortKey = (typeof sortOptions)[number]["value"];

export function getExperiencesHead() {
  return {
    meta: pageMeta({
      title: "Experiences",
      description:
        "Browse heritage walks, food trails, architecture tours, cultural experiences and curated journeys across India.",
      path: "/experiences",
    }),
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/experiences" },
        ]),
      ),
    ],
  };
}

function cleanSearchValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function ExperiencesPage({ searchParams }: { searchParams: URLSearchParams }) {
  const search = parseExperiencesSearch(searchParams);
  const [query, setQuery] = useState(search.q ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    search.category ? [search.category] : [],
  );
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    search.destination ? [search.destination] : [],
  );
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");

  const filteredTours = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return sortTours(
      tours.filter((tour) => {
        const matchesQuery =
          !normalizedQuery ||
          [tour.title, tour.summary, tour.destination, tour.category]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.includes(tour.categorySlug);
        const matchesDestination =
          selectedDestinations.length === 0 || selectedDestinations.includes(tour.destinationSlug);
        const matchesDuration =
          selectedDurations.length === 0 || selectedDurations.includes(tour.durationBand);
        const matchesLanguage =
          selectedLanguages.length === 0 ||
          tour.language.some((language) => selectedLanguages.includes(language));

        return (
          matchesQuery &&
          matchesCategory &&
          matchesDestination &&
          matchesDuration &&
          matchesLanguage
        );
      }),
      sort,
    );
  }, [query, selectedCategories, selectedDestinations, selectedDurations, selectedLanguages, sort, tours]);

  const activeFilterCount =
    selectedCategories.length +
    selectedDestinations.length +
    selectedDurations.length +
    selectedLanguages.length +
    (query.trim() ? 1 : 0);

  function clearFilters() {
    setQuery("");
    setSelectedCategories([]);
    setSelectedDestinations([]);
    setSelectedDurations([]);
    setSelectedLanguages([]);
    setSort("featured");
  }

  const filters = (
    <FilterPanel
      clearFilters={clearFilters}
      query={query}
      selectedCategories={selectedCategories}
      selectedDestinations={selectedDestinations}
      selectedDurations={selectedDurations}
      selectedLanguages={selectedLanguages}
      setQuery={setQuery}
      setSelectedCategories={setSelectedCategories}
      setSelectedDestinations={setSelectedDestinations}
      setSelectedDurations={setSelectedDurations}
      setSelectedLanguages={setSelectedLanguages}
    />
  );

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <p className="eyebrow text-gold">Experiences</p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold leading-tight sm:text-5xl">
            Heritage walks, food histories and architecture routes with serious context.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-primary-foreground/75">
            Filter by city, subject, duration and guide language. Every experience is small-group by
            design and built around route notes rather than generic scripts.
          </p>
          <SearchPanel className="mt-8 max-w-5xl" compact />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SectionHeader
            className="mb-0"
            description={`${filteredTours.length} of ${tours.length} journeys match your current view.`}
            title="Browse all journeys"
          />
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full sm:w-auto lg:hidden" variant="outline">
                  <SlidersHorizontal className="size-4" />
                  Filters
                  {activeFilterCount ? `(${activeFilterCount})` : ""}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[90vw] overflow-y-auto bg-paper" side="left">
                <SheetHeader>
                  <SheetTitle>Filter journeys</SheetTitle>
                </SheetHeader>
                <div className="mt-6">{filters}</div>
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
              <SelectTrigger className="h-11 w-full bg-background sm:h-10 sm:w-[190px]">
                <SelectValue aria-label="Sort journeys" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-md border bg-background p-5 shadow-card">
              {filters}
            </div>
          </aside>

          <div>
            {activeFilterCount ? (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">Active filters</span>
                <button
                  className="inline-flex items-center gap-1 rounded-md border bg-background px-3 py-1.5 text-xs font-semibold text-primary"
                  onClick={clearFilters}
                  type="button"
                >
                  Clear all
                  <X className="size-3.5" />
                </button>
              </div>
            ) : null}

            {filteredTours.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.slug} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="rounded-md border bg-background p-6 text-center shadow-card sm:p-10">
                <h2 className="text-2xl font-bold text-primary">No journeys found</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  Adjust a filter or send us the brief and we will recommend the closest route.
                </p>
                <Button className="mt-6" onClick={clearFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function parseExperiencesSearch(searchParams: URLSearchParams): ExperiencesSearch {
  const result: ExperiencesSearch = {};
  const category = cleanSearchValue(searchParams.get("category"));
  const destination = cleanSearchValue(searchParams.get("destination"));
  const q = cleanSearchValue(searchParams.get("q"));

  if (category) {
    result.category = category;
  }
  if (destination) {
    result.destination = destination;
  }
  if (q) {
    result.q = q;
  }

  return result;
}

function sortTours(items: Tour[], sort: SortKey) {
  return [...items].sort((a, b) => {
    if (sort === "rating") {
      return b.rating - a.rating || b.reviews - a.reviews;
    }
    if (sort === "price-low") {
      return a.price - b.price;
    }
    if (sort === "price-high") {
      return b.price - a.price;
    }
    if (sort === "duration") {
      return durationBands.indexOf(a.durationBand) - durationBands.indexOf(b.durationBand);
    }

    return (
      Number(Boolean(b.trending)) - Number(Boolean(a.trending)) ||
      Number(Boolean(b.popular)) - Number(Boolean(a.popular)) ||
      b.reviews - a.reviews
    );
  });
}

function FilterPanel({
  clearFilters,
  query,
  selectedCategories,
  selectedDestinations,
  selectedDurations,
  selectedLanguages,
  setQuery,
  setSelectedCategories,
  setSelectedDestinations,
  setSelectedDurations,
  setSelectedLanguages,
}: {
  clearFilters: () => void;
  query: string;
  selectedCategories: string[];
  selectedDestinations: string[];
  selectedDurations: string[];
  selectedLanguages: string[];
  setQuery: (value: string) => void;
  setSelectedCategories: (value: string[]) => void;
  setSelectedDestinations: (value: string[]) => void;
  setSelectedDurations: (value: string[]) => void;
  setSelectedLanguages: (value: string[]) => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <label className="text-sm font-semibold text-primary" htmlFor="tour-search">
          Search
        </label>
        <Input
          className="mt-2 bg-paper"
          id="tour-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="City, theme or route"
          value={query}
        />
      </div>

      <FilterGroup title="Experience">
        {experienceCategories.map((category) => (
          <FilterCheckbox
            checked={selectedCategories.includes(category.slug)}
            key={category.slug}
            label={category.title}
            onChange={() => setSelectedCategories(toggleValue(selectedCategories, category.slug))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Destination">
        {destinations.map((destination) => (
          <FilterCheckbox
            checked={selectedDestinations.includes(destination.slug)}
            key={destination.slug}
            label={destination.city}
            onChange={() =>
              setSelectedDestinations(toggleValue(selectedDestinations, destination.slug))
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Duration">
        {durationBands.map((duration) => (
          <FilterCheckbox
            checked={selectedDurations.includes(duration)}
            key={duration}
            label={duration}
            onChange={() => setSelectedDurations(toggleValue(selectedDurations, duration))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Guide language">
        {languages.map((language) => (
          <FilterCheckbox
            checked={selectedLanguages.includes(language)}
            key={language}
            label={language}
            onChange={() => setSelectedLanguages(toggleValue(selectedLanguages, language))}
          />
        ))}
      </FilterGroup>

      <Button className="w-full" onClick={clearFilters} type="button" variant="outline">
        Clear Filters
      </Button>
    </div>
  );
}

function FilterGroup({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-primary">{title}</legend>
      <div className="mt-3 space-y-2">{children}</div>
    </fieldset>
  );
}

function FilterCheckbox({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
      <input
        checked={checked}
        className="size-4 rounded border-input accent-primary"
        onChange={onChange}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  );
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}
