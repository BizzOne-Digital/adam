import { Suspense } from "react";
import Image from "next/image";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { SITE, BUSINESS_HOURS, OFFER } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { PageHero, FinalCTA } from "@/components/ui/Cards";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact A1 Fitness & Nutrition for personal training consultations across Long Island. Call (516) 310-3338 or request coaching online.",
  path: "/contact",
  keywords: ["contact personal trainer Long Island", "book personal training"],
});

const CONTACT_FAQS = [
  {
    question: "How do I get started?",
    answer:
      "Submit the consultation form or call (516) 310-3338. Share your goals, preferred training format, and any accessibility needs.",
  },
  {
    question: "Do you serve all of Long Island?",
    answer:
      "Yes. A1 Fitness & Nutrition provides training services throughout Long Island, plus online coaching from anywhere.",
  },
  {
    question: "Can sessions be adapted for disabilities?",
    answer:
      "Absolutely. Training is adapted with patience, respect, and care. Use the accessibility field on the form to share helpful accommodations.",
  },
  {
    question: "Is pricing listed online?",
    answer:
      "Contact for personalized program options. Eligibility for the nutrition offer can also be discussed during consultation.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Start your consultation and take the next step toward strength, health, and confidence."
        image={IMAGES.contactHero}
        imageAlt={IMAGES.contactHeroAlt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="space-y-5 sm:space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-graphite/70 p-5 sm:rounded-3xl sm:p-6">
              <div className="bg-red-glow absolute -top-10 -right-10 h-40 w-40" />
              <div className="relative mb-6 flex items-center gap-4">
                <span className="relative h-20 w-20 shrink-0">
                  <Image
                    src={SITE.logo}
                    alt={SITE.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </span>
                <div>
                  <h2 className="font-display text-2xl text-ice">{SITE.name}</h2>
                  <p className="text-sm text-muted">{SITE.tagline}</p>
                </div>
              </div>
              <ul className="relative space-y-4 text-sm">
                <li>
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex items-center gap-3 text-ice transition hover:text-crimson"
                  >
                    <Phone className="h-4 w-4 text-crimson" />
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.emailHref}
                    className="inline-flex max-w-full items-start gap-3 text-ice transition hover:text-crimson"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                    <span className="break-all">{SITE.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.socialHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-ice transition hover:text-crimson"
                  >
                    <AtSign className="h-4 w-4 text-crimson" />
                    {SITE.social}
                  </a>
                </li>
                <li className="inline-flex items-start gap-3 text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 text-crimson" />
                  {SITE.serviceArea}
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-panel-gradient p-6">
              <h3 className="font-display text-xl text-ice">Business Hours</h3>
              <p className="mt-2 text-sm text-muted">{BUSINESS_HOURS}</p>
            </div>

            <div className="rounded-3xl border border-crimson/30 bg-deep-red/20 p-6">
              <h3 className="font-display text-xl text-ice">Current Offer</h3>
              <p className="mt-2 text-sm text-silver">{OFFER.title}</p>
              <p className="mt-2 text-xs text-muted">{OFFER.note}</p>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="rounded-3xl border border-white/10 bg-graphite/60 p-8 text-muted">
                Loading form...
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <section className="bg-rich-black py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading mb-6 text-[clamp(1.75rem,6.5vw,2.25rem)] text-ice sm:mb-8 sm:text-4xl">Quick Answers</h2>
          <FAQAccordion items={CONTACT_FAQS} />
        </div>
      </section>

      <FinalCTA title="Let's Build Your Stronger Life" />
    </>
  );
}
