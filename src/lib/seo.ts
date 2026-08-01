import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

interface CreateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const url = new URL(path, SITE.url).toString();
  const fullTitle =
    title === SITE.name ? SITE.name : `${title} | ${SITE.name}`;

  const defaultKeywords = [
    "personal trainer Long Island",
    "mobile personal training Long Island",
    "in-home personal trainer Long Island",
    "inclusive personal training",
    "disability-inclusive fitness coaching",
    "online fitness coaching",
    "nutrition coaching Long Island",
    "personal training for seniors Long Island",
    SITE.name,
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
    },
    icons: {
      icon: [
        { url: "/images/a1-fitness-logo.png", type: "image/png" },
      ],
      apple: [{ url: "/images/a1-fitness-logo.png", type: "image/png" }],
      shortcut: "/images/a1-fitness-logo.png",
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: SITE.logo,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SITE.logo],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    image: new URL(SITE.logo, SITE.url).toString(),
    telephone: SITE.phone,
    email: SITE.email,
    description:
      "Personalized personal training, in-home coaching, gym sessions, online coaching, and nutrition guidance across Long Island for all fitness levels and abilities.",
    areaServed: {
      "@type": "Place",
      name: "Long Island, New York",
    },
    sameAs: [SITE.socialHref],
    serviceType: [
      "Personal Training",
      "In-Home Training",
      "Gym Training",
      "Online Coaching",
      "Nutrition Coaching",
    ],
  };
}
