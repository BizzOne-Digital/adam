import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import { ServiceDetailContent } from "@/components/sections/ServiceDetailContent";

export const metadata = createMetadata({
  title: "In-Home Training",
  description:
    "Mobile in-home personal training throughout Long Island with equipment provided. Convenient, private coaching from A1 Fitness & Nutrition.",
  path: "/services/in-home-training",
  keywords: ["in-home personal trainer Long Island", "mobile personal training"],
});

export default function InHomeTrainingPage() {
  const service = getService("in-home-training");
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
