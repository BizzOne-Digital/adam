"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Accessibility,
  ArrowRight,
  Calendar,
  ClipboardList,
  Dumbbell,
  HeartHandshake,
  Home,
  LineChart,
  Monitor,
  Package,
  Target,
  Trophy,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { REAL_TESTIMONIALS } from "@/lib/content/reviews";
import { TestimonialsCarousel } from "@/components/ui/TestimonialsCarousel";
import { useSiteSettings } from "@/providers/SettingsProvider";
import type { Service } from "@/lib/services";
import type { CmsBits } from "@/lib/cms/types";

const FEATURE_BAR = [
  { label: "Customized Training", icon: Target },
  { label: "Equipment Provided", icon: Package },
  { label: "Inclusive Coaching", icon: Accessibility },
  { label: "Flexible Scheduling", icon: Calendar },
  { label: "In-Person & Online", icon: Monitor },
];

const AUDIENCE_SHORT = [
  { title: "Beginners", icon: Sparkles },
  { title: "Weight Loss", icon: Target },
  { title: "Strength Building", icon: Dumbbell },
  { title: "Seniors", icon: Users },
  { title: "Disabilities", icon: Accessibility },
  { title: "Athletes", icon: Trophy },
  { title: "Online Clients", icon: Monitor },
];

const LOCATION_CARDS = [
  {
    title: "At Your Home",
    text: "Mobile personal training throughout Long Island with equipment provided—private, convenient, and built for your space.",
    icon: Home,
    href: "/services/in-home-training",
    image: "/images/at-your-home.png",
    imageAlt: "In-home personal training session",
  },
  {
    title: "At Your Gym",
    text: "Meet at your local gym for form-focused coaching, confident equipment use, and progressive strength programming.",
    icon: Building2,
    href: "/services/gym-training",
    image: "/images/at-your-gym.png",
    imageAlt: "Gym-based personal training session",
  },
  {
    title: "Online From Anywhere",
    text: "Custom plans, remote check-ins, and accountability so you can train effectively from anywhere.",
    icon: Monitor,
    href: "/services/online-coaching",
    image: "/images/online-from-anywhere.png",
    imageAlt: "Online fitness coaching from anywhere",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Tell Us Your Goals",
    text: "Share your goals, schedule, and any accessibility needs so coaching starts with clarity.",
    icon: Target,
  },
  {
    step: "02",
    title: "Receive Your Plan",
    text: "Get a personalized program shaped around your body, abilities, lifestyle, and targets.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Train With Support",
    text: "Train at home, at your gym, or online with guided coaching and consistent accountability.",
    icon: Dumbbell,
  },
  {
    step: "04",
    title: "Build Lasting Results",
    text: "Build strength, health, and confidence through sustainable progress that fits real life.",
    icon: LineChart,
  },
];

const TESTIMONIALS = REAL_TESTIMONIALS.map((t) => ({
  quote: t.quote,
  name: t.name,
  detail: t.detail,
}));

export type HomeCms = {
  hero?: CmsBits | null;
  credibility?: CmsBits | null;
  aboutPreview?: CmsBits | null;
  whoWeHelp?: CmsBits | null;
  services?: CmsBits | null;
  inclusive?: CmsBits | null;
  locations?: CmsBits | null;
  process?: CmsBits | null;
  offer?: CmsBits | null;
  testimonials?: CmsBits | null;
  finalCta?: CmsBits | null;
};

const ABOUT_PHOTOS = [
  {
    src: "/images/Personal-Training.png",
    alt: "One-on-one personal coaching session",
  },
  {
    src: "/images/In-Home-Training.png",
    alt: "Supportive training for every fitness level",
  },
  {
    src: "/images/Online-Coaching.png",
    alt: "Client building strength and confidence",
  },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-crimson uppercase">
      {children}
    </p>
  );
}

export function HomeHero({ cms }: { cms?: CmsBits | null }) {
  const f = cms?.fields;
  const bg = cms?.images.background || "/images/hero-inclusive-training.png";

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pt-24 pb-10 sm:items-center sm:pt-28 sm:pb-16 md:pt-32">
      <Image
        src={bg}
        alt="Inclusive personal training session with a coach guiding a client during a cable row workout"
        fill
        priority
        className="object-cover object-[78%_center] sm:object-[85%_center] lg:object-[90%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40 sm:via-black/85 sm:to-black/20 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/50 sm:via-transparent" />
      <div className="absolute inset-y-0 left-0 w-full max-w-3xl bg-gradient-to-r from-black/95 via-black/50 to-transparent sm:from-black/90 sm:via-black/40" />
      <div className="pointer-events-none absolute top-1/3 left-[18%] hidden h-64 w-64 -translate-y-1/2 rounded-full bg-crimson/20 blur-[100px] sm:block" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-4 flex items-center gap-3 sm:mb-6"
          >
            <span className="h-px w-6 shrink-0 bg-crimson shadow-[0_0_12px_rgba(229,9,20,0.8)] sm:w-10" />
            <p className="text-[10px] font-semibold tracking-[0.18em] text-white uppercase sm:text-xs sm:tracking-[0.28em]">
              {f?.eyebrow || "Personal Training Across Long Island"}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.15rem,9vw,5.75rem)] leading-[0.95] font-bold tracking-tight uppercase italic"
          >
            <span className="block text-white">
              {f?.titleLine1 || "Build Strength."}
            </span>
            <span className="mt-1 block text-crimson drop-shadow-[0_0_30px_rgba(229,9,20,0.45)]">
              {f?.titleLine2 || "Own Your Confidence."}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base md:text-lg"
          >
            {f?.subtitle ||
              "Customized coaching at the gym, in your home, or online—built around your goals, abilities, and lifestyle."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center"
          >
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-md bg-crimson px-7 py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase shadow-[0_0_28px_rgba(229,9,20,0.4)] transition hover:bg-[#ff1a25] sm:w-auto sm:text-[13px]"
            >
              {f?.ctaPrimary || "Start Your Journey"}
            </Link>
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center rounded-md border border-white/40 bg-black/40 px-7 py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase transition hover:border-white hover:bg-white/5 sm:w-auto sm:text-[13px]"
            >
              {f?.ctaSecondary || "Explore Services"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.65 }}
            className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-crimson/50 bg-crimson/10 text-crimson">
                <Dumbbell className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-white uppercase">
                {f?.badge1 || "All Fitness Levels"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-crimson/50 bg-crimson/10 text-crimson">
                <Accessibility className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-white uppercase">
                {f?.badge2 || "Inclusive Coaching"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function CredibilityStrip({ cms }: { cms?: CmsBits | null }) {
  const f = cms?.fields;
  const items = [
    { label: f?.item1 || FEATURE_BAR[0].label, icon: FEATURE_BAR[0].icon },
    { label: f?.item2 || FEATURE_BAR[1].label, icon: FEATURE_BAR[1].icon },
    { label: f?.item3 || FEATURE_BAR[2].label, icon: FEATURE_BAR[2].icon },
    { label: f?.item4 || FEATURE_BAR[3].label, icon: FEATURE_BAR[3].icon },
    { label: f?.item5 || FEATURE_BAR[4].label, icon: FEATURE_BAR[4].icon },
  ];

  return (
    <section
      className="border-y border-white/10 bg-[#111214] py-8 md:py-10"
      aria-label="Credibility highlights"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-5 px-4 sm:gap-6 sm:px-6 md:grid-cols-5 lg:px-10">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal
              key={item.label + i}
              delay={i * 0.05}
              className={cn(
                "flex flex-col items-center text-center",
                i === items.length - 1 && "col-span-2 md:col-span-1",
              )}
            >
              <Icon className="mb-2.5 h-6 w-6 text-crimson sm:mb-3 sm:h-7 sm:w-7" strokeWidth={1.5} aria-hidden="true" />
              <p className="max-w-[10.5rem] text-[11px] font-bold tracking-[0.12em] text-white uppercase sm:max-w-none sm:tracking-[0.18em]">
                {item.label}
              </p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function AboutPreview({ cms }: { cms?: CmsBits | null }) {
  const f = cms?.fields;
  const photos = [
    {
      src: cms?.images.photo1 || ABOUT_PHOTOS[0].src,
      alt: ABOUT_PHOTOS[0].alt,
    },
    {
      src: cms?.images.photo2 || ABOUT_PHOTOS[1].src,
      alt: ABOUT_PHOTOS[1].alt,
    },
    {
      src: cms?.images.photo3 || ABOUT_PHOTOS[2].src,
      alt: ABOUT_PHOTOS[2].alt,
    },
  ];

  return (
    <section className="bg-black py-14 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <Reveal direction="left">
          <SectionEyebrow>{f?.eyebrow || "About A1"}</SectionEyebrow>
          <h2 className="font-display text-[clamp(2rem,8vw,3.75rem)] font-bold tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
            {f?.title || "Fitness Built Around You"}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
            {f?.body ||
              "At A1 Fitness & Nutrition, the mission is simple: to help you become the strongest, healthiest and most confident version of yourself. Every program is created around your body, abilities, lifestyle and goals."}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-white/40 px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-crimson uppercase transition hover:border-crimson hover:bg-crimson/10 sm:w-auto"
          >
            {f?.cta || "Meet Your Coach"}
          </Link>
        </Reveal>

        <Reveal direction="right">
          <div className="grid grid-cols-3 items-start gap-2 sm:gap-3 md:gap-4">
            {photos.map((photo, i) => (
              <div
                key={photo.alt}
                className={cn(
                  "relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10",
                  i === 1 && "md:translate-y-8",
                  i === 2 && "md:translate-y-4",
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-[center_20%] transition duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 280px"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhoWeHelp({ cms }: { cms?: CmsBits | null }) {
  const f = cms?.fields;
  return (
    <section className="bg-[#0b0b0d] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-8 text-center sm:mb-12">
          <SectionEyebrow>{f?.eyebrow || "Why Choose Us?"}</SectionEyebrow>
          <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
            {f?.title || "Training for Every Body"}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-4">
          {AUDIENCE_SHORT.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                delay={i * 0.04}
                className={cn(
                  "h-full",
                  i === AUDIENCE_SHORT.length - 1 && "col-span-2 sm:col-span-1",
                )}
              >
                <div className="group flex h-full min-h-[112px] flex-col items-center justify-center rounded-xl border border-crimson/40 bg-black/40 px-3 py-5 text-center transition hover:border-crimson hover:bg-crimson/10 sm:min-h-[140px] sm:py-6">
                  <Icon
                    className="mb-2.5 h-7 w-7 text-crimson transition group-hover:scale-110 sm:mb-3 sm:h-8 sm:w-8"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="text-[11px] font-bold tracking-[0.08em] text-white uppercase sm:tracking-[0.14em]">
                    {item.title}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ServicesShowcase({
  cms,
  services = [],
}: {
  cms?: CmsBits | null;
  services?: Service[];
}) {
  const f = cms?.fields;
  const list = services.length ? services : [];

  return (
    <section className="bg-black py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-8 text-center sm:mb-12">
          <SectionEyebrow>{f?.eyebrow || "Our Services"}</SectionEyebrow>
          <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
            {f?.title || "Choose How You Train"}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
          {list.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06}>
              <Link
                href={service.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111214] transition hover:border-crimson/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[3/4]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover object-[center_25%] transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-lg font-bold text-white uppercase">
                    {service.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-white/55">
                    {service.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center justify-end text-crimson">
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InclusiveFeature({ cms }: { cms?: CmsBits | null }) {
  const f = cms?.fields;
  const points = [
    { title: f?.point1 || "Accessible Environments", icon: Accessibility },
    { title: f?.point2 || "Adaptive Approach", icon: HeartHandshake },
    { title: f?.point3 || "Empowering Coaching", icon: Trophy },
  ];
  const img = cms?.images.image || "/images/Every-Body-Deserves.png";

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="grid lg:min-h-[560px] lg:grid-cols-[42%_58%]">
        <div className="relative z-20 flex flex-col justify-center bg-black px-4 py-14 sm:px-10 sm:py-16 lg:px-14 xl:px-16">
          <Reveal direction="left">
            <h2 className="font-display text-[clamp(1.75rem,7vw,3.4rem)] leading-[1.05] font-bold tracking-tight text-silver uppercase italic">
              {f?.title || "Every Body Deserves to Feel Strong"}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-[15px]">
              {f?.body ||
                "We're proud to coach people of all ages, abilities, and backgrounds. Our inclusive approach ensures that everyone has the support and respect they deserve."}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-3 sm:gap-4">
              {points.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2.5">
                    <Icon
                      className="h-8 w-8 shrink-0 text-crimson sm:h-9 sm:w-9"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <p className="text-xs font-bold tracking-[0.12em] text-white uppercase sm:max-w-[7.5rem] sm:text-[10px]">
                      {point.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
          <div className="absolute inset-0 overflow-hidden lg:[clip-path:polygon(7%_0,100%_0,100%_100%,0_100%)]">
            <Image
              src={img}
              alt="Diverse inclusive fitness community of all ages and abilities training together"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[3px] bg-crimson shadow-[0_0_18px_rgba(229,9,20,0.75)] lg:block"
            style={{
              transform: "skewX(-12deg)",
              transformOrigin: "top",
              left: "4.5%",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

export function TrainingOptions({ cms }: { cms?: CmsBits | null }) {
  const f = cms?.fields;
  return (
    <section className="bg-black py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-8 text-center sm:mb-12">
          <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-crimson uppercase sm:text-5xl">
            {f?.title || "Train Where You Are"}
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {LOCATION_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={i * 0.08}>
                <Link
                  href={card.href}
                  className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111214] p-6 transition duration-500 hover:border-crimson/60 hover:shadow-[0_0_40px_rgba(229,9,20,0.2)] sm:min-h-[280px] sm:p-7"
                >
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center opacity-40 scale-105 transition-all duration-700 ease-out md:opacity-0 md:scale-110 md:group-hover:opacity-100 md:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black/70 transition-opacity duration-700 md:bg-black/80 md:opacity-0 md:group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 opacity-80 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-crimson/10 opacity-40 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col">
                    <Icon
                      className="mb-5 h-9 w-9 text-crimson transition duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(229,9,20,0.8)]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-xl font-bold text-white uppercase transition duration-500">
                      {card.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55 transition duration-500 group-hover:text-white/85">
                      {card.text}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-crimson uppercase">
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 transition duration-500 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ cms }: { cms?: CmsBits | null }) {
  const f = cms?.fields;
  return (
    <section className="bg-[#0b0b0d] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-10 text-center sm:mb-14">
          <SectionEyebrow>{f?.eyebrow || "Our Process"}</SectionEyebrow>
          <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
            {f?.title || "Your Journey, Built for You"}
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="pointer-events-none absolute top-10 right-[12%] left-[12%] hidden h-px border-t border-dashed border-crimson/40 md:block" />
          {PROCESS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.step} delay={i * 0.1} className="relative text-center">
                <div className="relative z-10 mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-crimson/50 bg-black">
                  <Icon className="h-8 w-8 text-crimson" strokeWidth={1.5} aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-crimson text-[10px] font-bold text-white">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-white uppercase">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeOfferBanner({ cms }: { cms?: CmsBits | null }) {
  const settings = useSiteSettings();
  const f = cms?.fields;
  const bg = cms?.images.background || "/images/claim-offer.png";
  const href = settings.offerHref || "/contact?offer=nutrition";

  return (
    <section className="relative w-full bg-black" aria-labelledby="offer-heading">
      <Reveal>
        <div className="relative w-full min-h-[280px] overflow-hidden sm:min-h-[340px] md:min-h-[420px] lg:min-h-[480px]">
          <Image
            src={bg}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 flex min-h-[260px] flex-col items-center justify-center px-4 py-14 text-center sm:min-h-[340px] sm:py-16 md:min-h-[420px] lg:min-h-[480px]">
            <p className="mb-3 text-[10px] font-bold tracking-[0.28em] text-crimson uppercase sm:text-[11px] sm:tracking-[0.35em]">
              {f?.eyebrow || "Limited Time Offer"}
            </p>
            <h2
              id="offer-heading"
              className="font-display max-w-5xl text-[clamp(1.45rem,6.5vw,3.75rem)] leading-[1.08] font-bold text-silver uppercase italic"
            >
              {f?.title || settings.offerTitle || "Get 50% Off Your Nutrition Program"}
            </h2>
            <p className="font-display mt-2 max-w-4xl text-[clamp(1rem,4.2vw,2.15rem)] font-bold text-crimson uppercase italic">
              {f?.subtitle || settings.offerNote || "When You Purchase Training Sessions"}
            </p>
            <Link
              href={href}
              className="mt-7 inline-flex w-full max-w-xs items-center justify-center rounded-md bg-crimson px-8 py-3.5 text-xs font-bold tracking-[0.16em] text-white uppercase shadow-[0_0_28px_rgba(229,9,20,0.45)] transition hover:bg-[#ff1a25] sm:mt-8 sm:w-auto sm:max-w-none"
            >
              {f?.cta || settings.offerCta || "Claim Your Offer"}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function HomeTestimonials({
  items = TESTIMONIALS,
  cms,
}: {
  items?: { quote: string; name: string; detail: string }[];
  cms?: CmsBits | null;
}) {
  const f = cms?.fields;
  return (
    <section className="bg-black py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-8 text-center sm:mb-10">
          <SectionEyebrow>{f?.eyebrow || "Client Feedback"}</SectionEyebrow>
          <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
            {f?.title || "Real Support. Real Confidence."}
          </h2>
        </Reveal>

        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}

export function HomeFinalCTA({ cms }: { cms?: CmsBits | null }) {
  const settings = useSiteSettings();
  const f = cms?.fields;
  const bg = cms?.images.background || "/images/your-stronger.png";
  const title = f?.title || "Your Stronger Life Starts Here";
  const titleParts = title.split(/\s+/);
  const mid = Math.ceil(titleParts.length / 2);

  return (
    <section className="relative w-full bg-black" aria-labelledby="final-cta-heading">
      <Reveal>
        <div className="relative min-h-[340px] w-full overflow-hidden sm:min-h-[440px] md:min-h-[520px]">
          <Image
            src={bg}
            alt="Athlete training hard — your stronger life starts here"
            fill
            className="object-cover object-[55%_center] sm:object-[70%_center] md:object-right"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/35 sm:via-black/85 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 sm:hidden" />
          <div className="absolute inset-y-0 left-0 hidden w-[60%] bg-gradient-to-r from-black via-black/60 to-transparent sm:block md:w-[50%]" />

          <div className="relative z-10 flex min-h-[340px] items-end px-4 py-12 sm:min-h-[440px] sm:items-center sm:px-10 sm:py-16 md:min-h-[520px] md:px-14 lg:px-20">
            <div className="w-full max-w-xl">
              <h2
                id="final-cta-heading"
                className="font-display text-[clamp(1.85rem,7vw,3.75rem)] leading-[1.02] font-bold tracking-tight text-silver uppercase italic"
              >
                {titleParts.slice(0, mid).join(" ")}
                <br />
                {titleParts.slice(mid).join(" ")}
              </h2>
              <p className="mt-4 text-sm text-white/80 sm:text-base">
                {f?.subtitle || "Let's build a plan that works for you."}
              </p>
              <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-md bg-crimson px-7 py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase shadow-[0_0_28px_rgba(229,9,20,0.4)] transition hover:bg-[#ff1a25] sm:w-auto"
                >
                  {f?.ctaPrimary || "Book a Consultation"}
                </Link>
                <a
                  href={settings.phoneHref}
                  className="inline-flex w-full items-center justify-center rounded-md border border-white/70 bg-transparent px-7 py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase transition hover:border-white hover:bg-white/5 sm:w-auto"
                >
                  Call {settings.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function HomePageContent({
  testimonials,
  services,
  cms,
}: {
  testimonials?: { quote: string; name: string; detail: string }[];
  services?: Service[];
  cms?: HomeCms;
}) {
  return (
    <>
      <HomeHero cms={cms?.hero} />
      <CredibilityStrip cms={cms?.credibility} />
      <AboutPreview cms={cms?.aboutPreview} />
      <WhoWeHelp cms={cms?.whoWeHelp} />
      <ServicesShowcase cms={cms?.services} services={services} />
      <InclusiveFeature cms={cms?.inclusive} />
      <TrainingOptions cms={cms?.locations} />
      <HowItWorks cms={cms?.process} />
      <HomeOfferBanner cms={cms?.offer} />
      <HomeTestimonials items={testimonials} cms={cms?.testimonials} />
      <HomeFinalCTA cms={cms?.finalCta} />
    </>
  );
}
