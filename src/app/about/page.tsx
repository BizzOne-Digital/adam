import { createMetadata } from "@/lib/seo";
import { AboutPageContent } from "@/components/sections/AboutPage";
import { getPage, sectionBits } from "@/lib/cms";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Meet Your A1 Fitness Coach. Customized personal training across Long Island for beginners, seniors, athletes, weight-loss clients, individuals with disabilities, and online coaching clients.",
  path: "/about",
  keywords: ["about A1 Fitness", "personal trainer Long Island coach"],
});

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const page = await getPage("about");

  return (
    <AboutPageContent
      cms={{
        hero: sectionBits(page, "hero"),
        story: sectionBits(page, "story"),
        mission: sectionBits(page, "mission"),
        audiences: sectionBits(page, "audiences"),
        inclusive: sectionBits(page, "inclusive"),
        values: sectionBits(page, "values"),
        approach: sectionBits(page, "approach"),
        locations: sectionBits(page, "locations"),
        support: sectionBits(page, "support"),
        offer: sectionBits(page, "offer"),
      }}
    />
  );
}
