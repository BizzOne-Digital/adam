import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import { ServiceDetailContent } from "@/components/sections/ServiceDetailContent";

export const metadata = createMetadata({
  title: "Gym Training",
  description:
    "Personalized gym training at your local Long Island gym. Form guidance, strength programming, and confident equipment use with A1 Fitness & Nutrition.",
  path: "/services/gym-training",
  keywords: ["gym personal trainer Long Island", "strength training coach"],
});

export default function GymTrainingPage() {
  const service = getService("gym-training");
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
