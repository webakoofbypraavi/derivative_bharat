import { ArrowRight, ChevronDown, Mail, MapPin, Menu, Phone, Search, Send } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import brandLogo from "@/assets/derivative-bharat-logo-upscaled.webp";
import { contact, destinations, experienceCategories, tours } from "@/data/site";
import { Link } from "@/lib/simple-router";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Experiences", to: "/experiences" },
  { label: "Destinations", to: "/destinations" },
  { label: "About", to: "/about" },
  { label: "Stories", to: "/stories" },
  { label: "Contact", to: "/contact" },
];

function categoryUrl(slug: string) {
  return `/experiences?category=${encodeURIComponent(slug)}`;
}

function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full sm:size-12",
        className,
      )}
    >
      <img alt="" className="h-full w-full scale-125 rounded-full object-cover" src={brandLogo} />
    </span>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-foreground">
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
          <a className="inline-flex items-center gap-1.5 hover:text-gold" href={contact.phoneHref}>
            <Phone className="size-3.5" />
            {contact.phone}
          </a>
          <a
            className="inline-flex items-center gap-1.5 hover:text-gold"
            href={`mailto:${contact.email}`}
          >
            <Mail className="size-3.5" />
            {contact.email}
          </a>
        </div>
        <div className="hidden items-center gap-1.5 text-primary-foreground/80 sm:inline-flex">
          <MapPin className="size-3.5" />
          Small-group heritage journeys across India
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const featuredTours = tours.filter((tour) => tour.trending).slice(0, 3);

  return (
    <header className="sticky top-0 z-40 border-b bg-paper/95 backdrop-blur">
      <nav className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-18 lg:px-8">
        <Link
          className="group inline-flex min-w-0 max-w-[calc(100%-4rem)] items-center gap-2 pr-2 sm:gap-3 sm:pr-0"
          to="/"
        >
          <BrandMark />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg font-bold text-primary sm:text-xl">
              Derivative Bharat
            </span>
            <span className="block text-[0.68rem] font-semibold uppercase text-muted-foreground">
              Heritage Journeys
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <MegaMenu label="Experiences" to="/experiences">
            <div className="grid w-[720px] grid-cols-[1.2fr_0.8fr] gap-5 p-5">
              <div>
                <p className="eyebrow">Ways to explore</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {experienceCategories.map((category) => (
                    <a
                      className="rounded-md border bg-card p-3 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                      href={categoryUrl(category.slug)}
                      key={category.slug}
                    >
                      <span className="font-semibold text-primary">{category.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                        {category.short}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="rounded-md bg-paper-deep p-4">
                <p className="eyebrow">Trending now</p>
                <div className="mt-4 space-y-3">
                  {featuredTours.map((tour) => (
                    <Link
                      className="group/link block border-b pb-3 last:border-0 last:pb-0"
                      key={tour.slug}
                      params={{ slug: tour.slug }}
                      to="/experiences/$slug"
                    >
                      <span className="block text-sm font-semibold group-hover/link:text-primary">
                        {tour.title}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {tour.destination} / {tour.duration}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </MegaMenu>

          <MegaMenu label="Destinations" to="/destinations">
            <div className="grid w-[680px] grid-cols-4 gap-3 p-5">
              {destinations.map((destination) => (
                <Link
                  className="group/city overflow-hidden rounded-md border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                  key={destination.slug}
                  params={{ city: destination.slug }}
                  to="/destinations/$city"
                >
                  <img
                    alt=""
                    className="h-20 w-full object-cover"
                    loading="lazy"
                    src={destination.image}
                  />
                  <span className="block p-3">
                    <span className="block text-sm font-semibold text-primary">
                      {destination.city}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {destination.tagline}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </MegaMenu>

          {navLinks.slice(2).map((link) => (
            <Link
              activeProps={{ className: "text-primary" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-primary"
              key={link.to}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild size="sm" variant="ghost">
            <Link to="/experiences">
              <Search className="size-4" />
              Browse
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/plan">
              Plan a Journey
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <MobileNav />
      </nav>
    </header>
  );
}

function MegaMenu({
  children,
  label,
  to,
}: {
  children: ReactNode;
  label: string;
  to: "/experiences" | "/destinations";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition hover:bg-secondary hover:text-primary aria-expanded:bg-secondary aria-expanded:text-primary"
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        {label}
        <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute left-0 top-full z-50 pt-3 transition duration-150 ${
          isOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
        id={menuId}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setIsOpen(false);
        }}
      >
        <div className="rounded-md border bg-background shadow-panel">
          {children}
          <Link
            className="flex items-center justify-end gap-2 border-t px-5 py-3 text-sm font-semibold text-primary hover:bg-secondary"
            to={to}
          >
            View all {label}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileNav() {
  return (
    <div className="absolute right-4 top-1/2 flex -translate-y-1/2 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            aria-label="Open navigation"
            className="border bg-background/95 text-foreground shadow-card"
            size="icon"
            variant="ghost"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[88vw] overflow-y-auto bg-paper p-5 sm:p-6" side="right">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3 text-left">
              <BrandMark className="size-12" />
              <span className="min-w-0">
                <span className="block font-display text-2xl text-primary">Derivative Bharat</span>
                <span className="block text-xs font-semibold uppercase text-muted-foreground">
                  Heritage Journeys
                </span>
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="mt-8 space-y-7">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.to}>
                  <Link
                    className="flex items-center justify-between rounded-md px-3 py-3 text-base font-semibold hover:bg-secondary"
                    to={link.to}
                  >
                    {link.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </SheetClose>
              ))}
            </div>

            <div>
              <p className="eyebrow px-3">Experience types</p>
              <div className="mt-3 space-y-1">
                {experienceCategories.map((category) => (
                  <SheetClose asChild key={category.slug}>
                    <a
                      className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
                      href={categoryUrl(category.slug)}
                    >
                      {category.title}
                    </a>
                  </SheetClose>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow px-3">Cities</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {destinations.map((destination) => (
                  <SheetClose asChild key={destination.slug}>
                    <Link
                      className="rounded-md border bg-card p-3 text-sm font-semibold shadow-card"
                      params={{ city: destination.slug }}
                      to="/destinations/$city"
                    >
                      {destination.city}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>

            <Button asChild className="w-full">
              <Link to="/plan">
                <Send className="size-4" />
                Plan a Journey
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr] lg:px-8">
        <div>
          <Link className="inline-flex min-w-0 items-center gap-3" to="/">
            <BrandMark className="size-12 border-primary-foreground/20 shadow-none" />
            <span className="min-w-0">
              <span className="block truncate font-display text-2xl font-bold">
                Derivative Bharat
              </span>
              <span className="block text-xs font-semibold uppercase text-primary-foreground/70">
                Heritage Journeys
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-primary-foreground/75">
            Historian-led heritage walks, food trails, architecture tours and curated journeys built
            around people, place and memory.
          </p>
        </div>

        <FooterColumn title="Explore">
          <FooterLink to="/experiences">Experiences</FooterLink>
          <FooterLink to="/destinations">Destinations</FooterLink>
          <FooterLink to="/stories">Stories</FooterLink>
          <FooterLink to="/about">About</FooterLink>
        </FooterColumn>

        <FooterColumn title="Popular Cities">
          {destinations.slice(0, 5).map((destination) => (
            <Link
              className="text-sm text-primary-foreground/75 hover:text-gold"
              key={destination.slug}
              params={{ city: destination.slug }}
              to="/destinations/$city"
            >
              {destination.city}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact">
          <a
            className="text-sm text-primary-foreground/75 hover:text-gold"
            href={contact.phoneHref}
          >
            {contact.phone}
          </a>
          <a
            className="break-words text-sm text-primary-foreground/75 hover:text-gold"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
          <span className="text-sm leading-6 text-primary-foreground/75">{contact.address}</span>
          <Button
            asChild
            className="mt-2 w-full bg-gold text-gold-foreground hover:bg-gold/90 sm:w-fit"
            size="sm"
          >
            <a href={contact.whatsapp}>
              WhatsApp
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </FooterColumn>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-primary-foreground/65 lg:px-8">
          <span>© 2026 Derivative Bharat. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase text-gold">{title}</h2>
      <div className="mt-4 flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Link className="text-sm text-primary-foreground/75 hover:text-gold" to={to}>
      {children}
    </Link>
  );
}
