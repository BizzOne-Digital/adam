"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/SectionHeading";
import { RevealImage } from "@/components/ui/RevealImage";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Breadcrumbs, FinalCTA, OfferBanner } from "@/components/ui/Cards";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Service } from "@/lib/services";

export function ServiceDetailContent({
  service,
  relatedServices = [],
}: {
  service: Service;
  relatedServices?: Service[];
}) {
  const related = relatedServices;
  const heroSrc = service.heroImage || service.image;
  const detailSrc = service.detailImage || service.image;

  return (
    <>
      <section className="relative flex min-h-[56svh] items-end overflow-hidden pt-24 pb-12 sm:min-h-[62vh] sm:pt-28 sm:pb-16 md:min-h-[72vh]">
        <Image
          src={heroSrc}
          alt={service.imageAlt}
          fill
          priority
          className="object-cover object-[50%_center] sm:object-[65%_center] md:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-obsidian/45 sm:via-obsidian/85 sm:to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/40" />
        {service.accent === "blue" && (
          <div className="absolute top-24 right-10 hidden h-56 w-56 rounded-full bg-electric/20 blur-3xl sm:block" />
        )}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <h1 className="font-heading text-[clamp(2.1rem,9vw,4.5rem)] leading-[1.02] text-ice sm:text-6xl md:text-7xl">
            {service.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted sm:mt-4 sm:text-base md:text-lg">
            {service.summary}
          </p>
          <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
            <MagneticButton href={`/contact?service=${service.slug}`} showArrow>
              Get Started
            </MagneticButton>
            <MagneticButton href="/services" variant="ghost">
              All Services
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-crimson uppercase">
              Overview
            </p>
            <h2 className="font-heading text-[clamp(1.85rem,7vw,3rem)] text-ice sm:text-5xl">
              Coaching Designed Around You
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {service.overview}
            </p>
            <p className="mt-4 text-sm font-semibold text-silver">
              Contact for personalized program options.
            </p>
          </Reveal>
          <Reveal direction="right">
            <RevealImage
              src={detailSrc}
              alt={service.imageAlt}
              className="h-80 md:h-[28rem]"
              parallax
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-rich-black py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading mb-6 text-[clamp(1.85rem,7vw,2.5rem)] text-ice sm:mb-8 sm:text-4xl">Benefits</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit, i) => (
              <Reveal key={benefit} delay={i * 0.05} className="glow-card rounded-2xl bg-graphite/70 p-5">
                <p className="font-display text-lg text-ice">{benefit}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-heading mb-6 text-[clamp(1.85rem,7vw,2.5rem)] text-ice sm:text-4xl">Who It Is For</h2>
            <ul className="space-y-3">
              {service.suitableFor.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/10 bg-graphite/40 px-4 py-3 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading mb-6 text-[clamp(1.85rem,7vw,2.5rem)] text-ice sm:text-4xl">What to Expect</h2>
            <ul className="space-y-3">
              {service.expect.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/10 bg-graphite/40 px-4 py-3 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-rich-black py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading mb-6 text-[clamp(1.75rem,6.5vw,2.25rem)] text-ice sm:mb-8 sm:text-4xl">How the Process Works</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {service.process.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-obsidian/50 p-5"
              >
                <span className="font-heading text-[clamp(2rem,8vw,2.5rem)] text-crimson/50 sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-xl text-ice">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.showOffer && <OfferBanner />}

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading mb-6 text-[clamp(1.75rem,6.5vw,2.25rem)] text-ice sm:mb-8 sm:text-4xl">Frequently Asked Questions</h2>
          <FAQAccordion items={service.faqs} />
        </div>
      </section>

      <section className="bg-rich-black py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading mb-6 text-[clamp(1.75rem,6.5vw,2.25rem)] text-ice sm:mb-8 sm:text-4xl">Related Services</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-graphite/50"
              >
                <div className="relative h-44">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-ice">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title={`Ready for ${service.title}?`}
        description="Contact A1 Fitness & Nutrition to discuss personalized program options across Long Island."
      />
    </>
  );
}
