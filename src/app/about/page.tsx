import { createMetadata } from "@/lib/seo";
import { AboutPageContent } from "@/components/sections/AboutPage";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Meet Your A1 Fitness Coach. Customized personal training across Long Island for beginners, seniors, athletes, weight-loss clients, individuals with disabilities, and online coaching clients.",
  path: "/about",
  keywords: ["about A1 Fitness", "personal trainer Long Island coach"],
});

export default function AboutPage() {
  return <AboutPageContent />;
}
