import { HomePageContent } from "@/components/sections/HomePage";
import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

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

export default function HomePage() {
  return <HomePageContent />;
}
