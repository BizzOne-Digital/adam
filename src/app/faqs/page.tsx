import { createMetadata } from "@/lib/seo";
import { getFaqs, getPage, getSection } from "@/lib/cms";
import { PageHero, FinalCTA } from "@/components/ui/Cards";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export const metadata = createMetadata({
  title: "FAQs",
  description:
    "Frequently asked questions about A1 Fitness & Nutrition personal training and coaching.",
  path: "/faqs",
});

export const dynamic = "force-dynamic";

export default async function FaqsPage() {
  const page = await getPage("faqs");
  const hero = getSection(page, "hero");
  const faqs = await getFaqs();

  return (
    <>
      <PageHero
        title={hero?.fields.title || "FAQs"}
        subtitle={
          hero?.fields.subtitle ||
          "Quick answers about training, nutrition, and getting started with A1."
        }
        image={hero?.images.background || "/images/Online-Coaching.png"}
        imageAlt="Frequently asked questions about personal training"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQs" },
        ]}
      />
      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading mb-8 text-[clamp(1.75rem,6.5vw,2.25rem)] text-ice">
            Common Questions
          </h2>
          {faqs.length ? (
            <FAQAccordion items={faqs} />
          ) : (
            <p className="text-muted">FAQs coming soon.</p>
          )}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
