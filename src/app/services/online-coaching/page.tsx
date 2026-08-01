import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import { ServiceDetailContent } from "@/components/sections/ServiceDetailContent";

export const metadata = createMetadata({
  title: "Online Coaching",
  description:
    "Online fitness coaching with customized workout plans, remote check-ins, and accountability from A1 Fitness & Nutrition—train from anywhere.",
  path: "/services/online-coaching",
  keywords: ["online fitness coaching", "remote personal trainer"],
});

export default function OnlineCoachingPage() {
  const service = getService("online-coaching");
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
