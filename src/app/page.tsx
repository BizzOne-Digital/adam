import { HomePageContent } from "@/components/sections/HomePage";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import {
  getPage,
  getServices,
  getTestimonials,
  sectionBits,
} from "@/lib/cms";

export const metadata = createMetadata({
  title: SITE.name,
  description:
    "Personal training across Long Island. Build strength, lose weight, improve health, and gain confidence at the gym, in your home, or online with A1 Fitness & Nutrition.",
  path: "/",
  keywords: [
    "A1 Fitness Nutrition Long Island",
    "personal trainer near me Long Island",
  ],
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [page, testimonials, services] = await Promise.all([
    getPage("home"),
    getTestimonials(),
    getServices(),
  ]);

  return (
    <HomePageContent
      cms={{
        hero: sectionBits(page, "hero"),
        credibility: sectionBits(page, "credibility"),
        aboutPreview: sectionBits(page, "aboutPreview"),
        whoWeHelp: sectionBits(page, "whoWeHelp"),
        services: sectionBits(page, "services"),
        inclusive: sectionBits(page, "inclusive"),
        locations: sectionBits(page, "locations"),
        process: sectionBits(page, "process"),
        offer: sectionBits(page, "offer"),
        testimonials: sectionBits(page, "testimonials"),
        finalCta: sectionBits(page, "finalCta"),
      }}
      services={services}
      testimonials={testimonials}
    />
  );
}
