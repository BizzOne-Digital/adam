import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import { ServiceDetailContent } from "@/components/sections/ServiceDetailContent";

export const metadata = createMetadata({
  title: "Personal Training",
  description:
    "One-on-one personal training across Long Island designed around your goals, abilities, and lifestyle with A1 Fitness & Nutrition.",
  path: "/services/personal-training",
  keywords: ["personal training Long Island", "one on one personal trainer"],
});

export default function PersonalTrainingPage() {
  const service = getService("personal-training");
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
