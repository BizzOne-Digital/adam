import { Suspense } from "react";
import Image from "next/image";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { getFaqs, getPage, getSection, getSettings } from "@/lib/cms";
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

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [settings, page, faqs] = await Promise.all([
    getSettings(),
    getPage("contact"),
    getFaqs(),
  ]);
  const hero = getSection(page, "hero");

  return (
    <>
      <PageHero
        title={hero?.fields.title || "Contact"}
        subtitle={
          hero?.fields.subtitle ||
          "Start your consultation and take the next step toward strength, health, and confidence."
        }
        image={hero?.images.background || "/images/your-stronger.png"}
        imageAlt="Contact A1 Fitness for a training consultation"
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
                    src={settings.logo}
                    alt={settings.name}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </span>
                <div>
                  <h2 className="font-display text-2xl text-ice">{settings.name}</h2>
                  <p className="text-sm text-muted">{settings.tagline}</p>
                </div>
              </div>
              <ul className="relative space-y-4 text-sm">
                <li>
                  <a
                    href={settings.phoneHref}
                    className="inline-flex items-center gap-3 text-ice transition hover:text-crimson"
                  >
                    <Phone className="h-4 w-4 text-crimson" />
                    {settings.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={settings.emailHref}
                    className="inline-flex max-w-full items-start gap-3 text-ice transition hover:text-crimson"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                    <span className="break-all">{settings.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={settings.socialHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-col gap-0.5 text-ice transition hover:text-crimson sm:flex-row sm:items-center sm:gap-3"
                  >
                    <span className="inline-flex items-center gap-3">
                      <AtSign className="h-4 w-4 shrink-0 text-crimson" />
                      <span className="font-semibold">
                        {settings.socialLabel || "Instagram"}
                      </span>
                    </span>
                    <span className="pl-7 text-silver sm:pl-0">{settings.social}</span>
                  </a>
                </li>
                <li className="inline-flex items-start gap-3 text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 text-crimson" />
                  {settings.serviceArea}
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-panel-gradient p-6">
              <h3 className="font-display text-xl text-ice">Business Hours</h3>
              <p className="mt-2 text-sm text-muted">{settings.businessHours}</p>
            </div>

            <div className="rounded-3xl border border-crimson/30 bg-deep-red/20 p-6">
              <h3 className="font-display text-xl text-ice">Current Offer</h3>
              <p className="mt-2 text-sm text-silver">{settings.offerTitle}</p>
              <p className="mt-2 text-xs text-muted">{settings.offerNote}</p>
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
          <h2 className="font-heading mb-6 text-[clamp(1.75rem,6.5vw,2.25rem)] text-ice sm:mb-8 sm:text-4xl">
            Quick Answers
          </h2>
          {faqs.length > 0 && <FAQAccordion items={faqs} />}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
