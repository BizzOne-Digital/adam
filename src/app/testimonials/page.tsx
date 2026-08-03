import { createMetadata } from "@/lib/seo";
import { getPage, getSection, getTestimonials } from "@/lib/cms";
import { PageHero, FinalCTA } from "@/components/ui/Cards";
import { TestimonialsSliderSection } from "@/components/sections/TestimonialsPage";

export const metadata = createMetadata({
  title: "Testimonials",
  description:
    "Read client testimonials for A1 Fitness & Nutrition personal training across Long Island.",
  path: "/testimonials",
});

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const page = await getPage("testimonials");
  const hero = getSection(page, "hero");
  const items = await getTestimonials();

  return (
    <>
      <PageHero
        title={hero?.fields.title || "Testimonials"}
        subtitle={
          hero?.fields.subtitle ||
          "Real support. Real confidence. Hear from clients across Long Island."
        }
        image={hero?.images.background || "/images/your-stronger.png"}
        imageAlt="Client success and confidence through personal training"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Testimonials" },
        ]}
      />
      <TestimonialsSliderSection items={items} />
      <FinalCTA />
    </>
  );
}
