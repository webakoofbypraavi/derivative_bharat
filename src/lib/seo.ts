import { contact, type Destination, type Tour } from "@/data/site";

const baseUrl = "https://derivativebharat.in";

export const siteIdentity = {
  name: "Derivative Bharat",
  url: baseUrl,
  description:
    "Historian-led heritage walks, food trails, architecture tours and curated cultural journeys across India.",
};

type MetaOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMeta({ title, description, path = "/", image }: MetaOptions) {
  const resolvedTitle = title === siteIdentity.name ? title : `${title} | ${siteIdentity.name}`;
  const url = absoluteUrl(path);
  const resolvedImage = image ? absoluteUrl(image) : undefined;

  return [
    { title: resolvedTitle },
    { name: "description", content: description },
    { property: "og:title", content: resolvedTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: resolvedTitle },
    { name: "twitter:description", content: description },
    ...(resolvedImage
      ? [
          { property: "og:image", content: resolvedImage },
          { name: "twitter:image", content: resolvedImage },
        ]
      : []),
  ];
}

export function jsonLdScript(data: unknown) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteIdentity.name,
    url: siteIdentity.url,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressCountry: "IN",
    },
    sameAs: [contact.whatsapp],
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function touristTripJsonLd(tour: Tour) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    image: absoluteUrl(tour.image),
    url: absoluteUrl(`/experiences/${tour.slug}`),
    touristType: tour.category,
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.itinerary.map((stop, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: stop.title,
        description: stop.detail,
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/experiences/${tour.slug}`),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviews,
      bestRating: 5,
    },
    provider: organizationJsonLd(),
  };
}

export function faqPageJsonLd(faqs: Tour["faqs"]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function touristDestinationJsonLd(destination: Destination) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${destination.city}, ${destination.state}`,
    description: destination.intro,
    image: absoluteUrl(destination.image),
    url: absoluteUrl(`/destinations/${destination.slug}`),
  };
}
