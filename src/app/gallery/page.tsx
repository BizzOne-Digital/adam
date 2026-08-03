import { createMetadata } from "@/lib/seo";
import { getGalleryData, getPage, getSection } from "@/lib/cms";
import { PageHero, FinalCTA } from "@/components/ui/Cards";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata = createMetadata({
  title: "Gallery",
  description:
    "Explore the A1 Fitness & Nutrition gallery featuring personal training, in-home sessions, gym coaching, online training, nutrition lifestyle, and inclusive fitness.",
  path: "/gallery",
});

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const page = await getPage("gallery");
  const hero = getSection(page, "hero");
  const gallery = await getGalleryData();

  return (
    <>
      <PageHero
        title={hero?.fields.title || "Gallery"}
        subtitle={
          hero?.fields.subtitle ||
          "A cinematic look at training environments, coaching moments, and inclusive fitness across Long Island."
        }
        image={hero?.images.background || "/images/gallery-personal-1.png"}
        imageAlt="Cinematic fitness gallery hero"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />

      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryGrid
            initialCategories={gallery.categories}
            initialItems={gallery.items}
          />
        </div>
      </section>

      <section className="border-y border-white/10 bg-rich-black py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-[clamp(1.85rem,7vw,3rem)] text-ice sm:text-5xl">
            Ready to Create Your Own Success Story?
          </h2>
          <p className="mt-4 text-sm text-muted sm:text-base">
            Start your personalized training journey with A1 Fitness & Nutrition.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton
              href="/contact"
              showArrow
              className="w-full max-w-xs sm:w-auto sm:max-w-none"
            >
              Book a Consultation
            </MagneticButton>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
