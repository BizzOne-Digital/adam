import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import { ServiceDetailContent } from "@/components/sections/ServiceDetailContent";

export const metadata = createMetadata({
  title: "Nutrition Coaching",
  description:
    "Practical nutrition coaching to support training goals and sustainable habits. Get 50% off your nutrition program when you purchase training sessions.",
  path: "/services/nutrition-coaching",
  keywords: ["nutrition coaching Long Island", "fitness nutrition coach"],
});

export default function NutritionCoachingPage() {
  const service = getService("nutrition-coaching");
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
