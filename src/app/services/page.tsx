import Image from "next/image";
import { createMetadata } from "@/lib/seo";
import { getPage, getSection, getServices } from "@/lib/cms";
import { PageHero, FinalCTA } from "@/components/ui/Cards";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/SectionHeading";
import { SITE, whatsappLink } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Explore personal training, in-home training, gym coaching, online coaching, and nutrition coaching with A1 Fitness & Nutrition across Long Island.",
  path: "/services",
});

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, page] = await Promise.all([getServices(), getPage("services")]);
  const hero = getSection(page, "hero");

  const comparison = services.map((s) => ({
    format: s.title,
    best: s.summary,
  }));

  return (
    <>
      <PageHero
        title={hero?.fields.title || "Services"}
        subtitle={
          hero?.fields.subtitle ||
          "Choose the coaching format that fits your lifestyle—home, gym, or online."
        }
        image={hero?.images.background || "/images/Personal-Training.png"}
        imageAlt="Overview of personal training services"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      <section className="py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:space-y-24 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className={`grid items-center gap-8 sm:gap-10 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal direction={index % 2 === 0 ? "left" : "right"}>
                <div className="relative h-56 overflow-hidden rounded-2xl sm:h-72 sm:rounded-3xl md:h-[26rem]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
                </div>
              </Reveal>
              <Reveal direction={index % 2 === 0 ? "right" : "left"}>
                <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-crimson uppercase">
                  Service 0{index + 1}
                </p>
                <h2 className="font-heading text-[clamp(1.85rem,7vw,3rem)] text-ice sm:text-5xl">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm text-muted sm:text-base">{service.overview}</p>
                <div className="mt-6">
                  <p className="mb-2 text-xs tracking-[0.2em] text-silver uppercase">
                    Key Benefits
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {service.benefits.slice(0, 4).map((b) => (
                      <li key={b} className="text-sm text-muted">
                        • {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-4 text-sm font-semibold text-silver">
                  Call or WhatsApp for personalized program options.
                </p>
                <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                  <MagneticButton href={service.href} showArrow>
                    Explore Service
                  </MagneticButton>
                  <MagneticButton href={SITE.phoneHref} external>
                    Call Now
                  </MagneticButton>
                  <MagneticButton
                    href={whatsappLink(
                      `Hi Adam, I'm interested in ${service.title} with A1 Fitness.`,
                    )}
                    variant="ghost"
                    external
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-rich-black py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl sm:mb-10">
            <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-crimson uppercase">
              Compare Formats
            </p>
            <h2 className="font-heading text-[clamp(1.85rem,7vw,3rem)] text-ice sm:text-5xl">
              Which Training Path Fits You?
            </h2>
          </div>
          <div className="space-y-3 md:hidden">
            {comparison.map((row) => (
              <div
                key={row.format}
                className="rounded-xl border border-white/10 bg-graphite/50 p-4"
              >
                <p className="font-display text-base font-bold text-ice uppercase">
                  {row.format}
                </p>
                <p className="mt-2 text-sm text-muted">{row.best}</p>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-graphite/80 text-xs tracking-wider text-silver uppercase">
                <tr>
                  <th className="px-4 py-4">Format</th>
                  <th className="px-4 py-4">Best For</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.format} className="border-t border-white/10">
                    <td className="px-4 py-4 font-semibold text-ice">{row.format}</td>
                    <td className="px-4 py-4 text-muted">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">
            Not sure yet?{" "}
            <a href={SITE.phoneHref} className="text-crimson hover:underline">
              Call {SITE.phone}
            </a>{" "}
            or{" "}
            <a
              href={whatsappLink("Hi Adam, I'd like help choosing a training plan.")}
              className="text-crimson hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
            .
          </p>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
