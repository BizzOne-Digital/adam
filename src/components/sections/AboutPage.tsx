"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  Brain,
  ClipboardList,
  Dumbbell,
  Heart,
  HeartHandshake,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Shield,
  RefreshCw,
  TrendingUp,
  Calendar,
  Package,
} from "lucide-react";
import { Reveal } from "@/components/ui/SectionHeading";
import { FinalCTA } from "@/components/ui/Cards";
import { VALUES, AUDIENCES, PROCESS_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/providers/SettingsProvider";
import type { CmsBits } from "@/lib/cms/types";

export type AboutCms = {
  hero?: CmsBits | null;
  story?: CmsBits | null;
  mission?: CmsBits | null;
  audiences?: CmsBits | null;
  inclusive?: CmsBits | null;
  values?: CmsBits | null;
  approach?: CmsBits | null;
  locations?: CmsBits | null;
  support?: CmsBits | null;
  offer?: CmsBits | null;
};
const STORY_COLLAGE = [
  "/images/about-our-story-1.png",
  "/images/about-our-story-2.png",
  "/images/about-our-story-3.png",
];

const PHILOSOPHY = [
  {
    title: "Personalized Guidance",
    text: "Every program is shaped around your body, abilities, schedule, and goals.",
    icon: Brain,
  },
  {
    title: "Supportive Coaching",
    text: "Training feels powerful and encouraging—never intimidating or one-size-fits-all.",
    icon: Heart,
  },
  {
    title: "Real-Life Progress",
    text: "Build confidence and lasting results through clear coaching and sustainable habits.",
    icon: Star,
  },
];

const SUPPORT_FEATURES = [
  { title: "Flexible Scheduling", icon: Calendar },
  { title: "Equipment Provided", icon: Package },
  { title: "Form Guidance", icon: Dumbbell },
  { title: "Inclusive Adaptations", icon: Accessibility },
  { title: "Nutrition Support", icon: HeartHandshake },
];

const LOCATION_CARDS = [
  {
    title: "At Your Home",
    text: "Private mobile sessions across Long Island with equipment provided.",
    image: "/images/about-in-your-home.png",
    href: "/services/in-home-training",
  },
  {
    title: "At Your Gym",
    text: "Train at your local gym with form-focused coaching and progressive programming.",
    image: "/images/about-at-your-local-gym.png",
    href: "/services/gym-training",
  },
  {
    title: "Online From Anywhere",
    text: "Custom plans and accountability for flexible remote coaching.",
    image: "/images/about-online-from-anywhere.png",
    href: "/services/online-coaching",
  },
];

const VALUE_ICONS = [Shield, Sparkles, RefreshCw, Trophy, Accessibility, TrendingUp];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-crimson uppercase">
      {children}
    </p>
  );
}

export function AboutPageContent({ cms }: { cms?: AboutCms }) {
  const settings = useSiteSettings();
  const hero = cms?.hero;
  const story = cms?.story;
  const audiences = cms?.audiences;
  const inclusive = cms?.inclusive;
  const valuesSec = cms?.values;
  const approach = cms?.approach;
  const locations = cms?.locations;
  const support = cms?.support;
  const offer = cms?.offer;

  const storyImages = [
    story?.images.image1 || STORY_COLLAGE[0],
    story?.images.image2 || STORY_COLLAGE[1],
    story?.images.image3 || STORY_COLLAGE[2],
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden pt-24 pb-12 sm:min-h-[88vh] sm:items-center sm:pt-28 sm:pb-16">
        <Image
          src={hero?.images.background || "/images/about-hero.png"}
          alt="Your A1 Fitness Coach ready to help you become your strongest self"
          fill
          priority
          className="object-cover object-[88%_center] sm:object-[75%_center] md:object-[82%_center] lg:object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent sm:from-black sm:via-black/88 sm:to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 sm:from-black sm:via-transparent sm:to-black/40" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.16em] text-white/55 uppercase sm:text-[11px] sm:tracking-[0.2em]">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white">About</li>
              </ol>
            </nav>

            <Reveal>
              <Eyebrow>{hero?.fields.eyebrow || "The Story Behind A1"}</Eyebrow>
              <h1 className="font-display text-[clamp(2rem,8vw,4.6rem)] leading-[1.02] font-bold tracking-tight text-white uppercase">
                {hero?.fields.title || "Built to Help You Become Your Strongest Self"}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                {hero?.fields.subtitle ||
                  "At A1 Fitness & Nutrition, the mission is simple: help you become the strongest, healthiest version of yourself through customized coaching for every fitness level and ability."}
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-crimson px-7 py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase shadow-[0_0_28px_rgba(229,9,20,0.4)] transition hover:bg-[#ff1a25] sm:w-auto"
              >
                {hero?.fields.cta || "Start Your Journey"}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-black py-14 sm:py-14 sm:py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <Reveal direction="left">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="relative col-span-1 row-span-2 min-h-[220px] overflow-hidden rounded-xl sm:min-h-[280px] md:min-h-[420px]">
                <Image
                  src={storyImages[0]}
                  alt="Trainer supporting a client through personalized coaching"
                  fill
                  className="object-cover object-center"
                  sizes="40vw"
                />
              </div>
              {storyImages.slice(1).map((src, i) => (
                <div key={src} className="relative min-h-[130px] overflow-hidden rounded-xl md:min-h-[200px]">
                  <Image
                    src={src}
                    alt={i === 0 ? "Strength coaching session" : "Flexible training support"}
                    fill
                    className="object-cover object-center"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right">
            <Eyebrow>{story?.fields.eyebrow || "Our Story"}</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
              {story?.fields.title || "Adam Erlich"}
            </h2>
            <p className="mt-4 text-sm font-semibold tracking-wide text-crimson uppercase sm:text-[15px]">
              {story?.fields.intro || "Been in fitness industry for over 30 years"}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-white/70 md:text-base">
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" aria-hidden="true" />
                <span>
                  {story?.fields.point1 ||
                    "Former competitive bodybuilder & powerlifter"}
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" aria-hidden="true" />
                <span>
                  {story?.fields.point2 ||
                    "Father of a child on the autism spectrum"}
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" aria-hidden="true" />
                <span>
                  {story?.fields.point3 || "ISSA Certified Personal Trainer"}
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" aria-hidden="true" />
                <span>
                  {story?.fields.point4 || "ISSA Certified Nutrition Coach"}
                </span>
              </li>
            </ul>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="mb-4 text-[11px] font-bold tracking-[0.22em] text-white/50 uppercase">
                {story?.fields.sayingsLabel || "Some of my favorite sayings"}
              </p>
              <blockquote className="space-y-4">
                {(
                  [
                    story?.fields.saying1 ||
                      "The only bad workout is the one that didn't happen",
                    story?.fields.saying2 ||
                      "The heavier weight in the gym is the front door",
                    story?.fields.saying3 ||
                      "Celebrate progress not perfection",
                  ] as string[]
                ).map((quote) => (
                  <p
                    key={quote}
                    className="border-l-2 border-crimson/70 pl-4 text-sm leading-relaxed text-white/80 italic md:text-[15px]"
                  >
                    “{quote}”
                  </p>
                ))}
              </blockquote>
              <p className="mt-5 text-sm font-semibold tracking-wide text-crimson uppercase">
                {story?.fields.sayingsNote || "I live by these sayings"}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* More Than A Workout */}
      <section className="relative overflow-hidden py-14 sm:py-20 md:py-28">
        <Image
          src="/images/about-our-mission.png"
          alt=""
          fill
          className="object-cover object-center opacity-35"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <Eyebrow>Training Philosophy</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
              More Than a Workout
            </h2>
            <p className="mt-4 text-sm text-white/65 md:text-base">
              Training should feel powerful and supportive. Every session builds confidence
              through clear coaching, respectful communication, and progress that fits real
              life.
            </p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {PHILOSOPHY.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.08} className="text-center">
                  <Icon className="mx-auto mb-4 h-10 w-10 text-crimson" strokeWidth={1.5} />
                  <h3 className="font-display text-lg font-bold text-crimson uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{item.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who we help */}
      <section className="bg-[#0b0b0d] py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal className="mb-12 text-center">
            <Eyebrow>{audiences?.fields.eyebrow || "Who We Help"}</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
              {audiences?.fields.title || "Coaching for Every Fitness Journey"}
            </h2>
          </Reveal>
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.slice(0, 6).map((audience, i) => {
              const icons = [Sparkles, Target, Dumbbell, Users, Accessibility, Trophy];
              const Icon = icons[i] ?? Sparkles;
              return (
                <Reveal key={audience.title} delay={i * 0.05} className="h-full">
                  <div className="flex h-full min-h-[180px] flex-col rounded-xl bg-black/50 p-6 shadow-[inset_0_0_0_1px_rgba(229,9,20,0.25)] transition hover:shadow-[inset_0_0_0_1px_rgba(229,9,20,0.55)]">
                    <Icon className="mb-4 h-8 w-8 shrink-0 text-crimson" strokeWidth={1.5} />
                    <h3 className="font-display text-lg font-bold text-white uppercase">
                      {audience.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                      {audience.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inclusive banner */}
      <section className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] md:min-h-[520px]">
        <Image
          src={inclusive?.images.background || "/images/about-every-ability.png"}
          alt="Inclusive fitness community welcoming every ability and goal"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/45 sm:via-black/75 sm:to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 sm:hidden" />
        <div className="relative z-10 flex min-h-[320px] items-end px-4 py-12 sm:min-h-[420px] sm:items-center sm:px-10 sm:py-16 md:min-h-[520px] lg:px-20">
          <Reveal>
            <h2 className="font-display max-w-xl text-[clamp(1.75rem,7vw,4rem)] leading-[1.05] font-bold text-white uppercase italic">
              {inclusive?.fields.title || "Every Ability. Every Goal. Every Person."}
            </h2>
            <p className="mt-5 max-w-lg text-sm text-white/70 md:text-base">
              {inclusive?.fields.body ||
                "A1 Fitness & Nutrition proudly welcomes individuals of different ages, experience levels and abilities. Training adapts with patience, respect and care."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-black py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal className="mb-12 text-center">
            <Eyebrow>{valuesSec?.fields.eyebrow || "Our Values"}</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
              {valuesSec?.fields.title || "What A1 Stands For"}
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => {
              const Icon = VALUE_ICONS[i] ?? Shield;
              return (
                <Reveal key={value.title} delay={i * 0.05}>
                  <div className="rounded-xl bg-[#111214] p-6">
                    <Icon className="mb-4 h-8 w-8 text-crimson" strokeWidth={1.5} />
                    <h3 className="font-display text-lg font-bold text-crimson uppercase">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategy / Process */}
      <section className="bg-[#0b0b0d] py-14 sm:py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <Reveal direction="left">
            <Eyebrow>{approach?.fields.eyebrow || "The A1 Approach"}</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
              {approach?.fields.title || "A Clear Path to Lasting Results"}
            </h2>
            <div className="mt-10 space-y-6">
              {PROCESS_STEPS.map((step, i) => {
                const icons = [Target, ClipboardList, Dumbbell, TrendingUp];
                const Icon = icons[i] ?? Target;
                return (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-crimson/40 text-crimson">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.2em] text-crimson uppercase">
                        {step.step}
                      </p>
                      <h3 className="font-display mt-1 text-lg font-bold text-white uppercase">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/55">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[5/6]">
              <Image
                src={approach?.images.image || "/images/about-our-approach.png"}
                alt="Personalized coaching strategy with Your A1 Fitness Coach"
                fill
                className="object-cover object-center"
                sizes="50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Training locations */}
      <section className="bg-black py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal className="mb-12 text-center">
            <Eyebrow>{locations?.fields.eyebrow || "Flexibility"}</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
              {locations?.fields.title || "Train Where It Works for You"}
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {LOCATION_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <Link href={card.href} className="group block overflow-hidden rounded-xl">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-center transition duration-700 group-hover:scale-105"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display text-2xl font-bold text-white uppercase">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/70">{card.text}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Support + nutrition */}
      <section className="bg-[#0b0b0d] py-14 sm:py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <Reveal direction="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={support?.images.image || "/images/about-sec-after-where-you-can.png"}
                alt="Nutrition support that moves with your training goals"
                fill
                className="object-cover object-center"
                sizes="50vw"
              />
            </div>
          </Reveal>
          <Reveal direction="right">
            <Eyebrow>{support?.fields.eyebrow || "Ongoing Support"}</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,7vw,3rem)] font-bold text-white uppercase sm:text-5xl">
              {support?.fields.title || "Support That Moves With You"}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {SUPPORT_FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className={cn(
                      "rounded-xl bg-black/50 p-3 shadow-[inset_0_0_0_1px_rgba(229,9,20,0.2)] sm:p-4",
                      i === SUPPORT_FEATURES.length - 1 && "col-span-2 sm:col-span-1",
                    )}
                  >
                    <Icon className="mb-3 h-6 w-6 text-crimson" strokeWidth={1.5} />
                    <p className="text-[10px] font-bold tracking-[0.1em] text-white uppercase sm:text-[11px] sm:tracking-[0.12em]">
                      {feature.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Offer banner full width */}
      <section className="relative w-full bg-black">
        <div className="relative min-h-[300px] w-full overflow-hidden sm:min-h-[380px] md:min-h-[440px]">
          <Image
            src={offer?.images.background || "/images/claim-offer.png"}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 flex min-h-[260px] flex-col items-center justify-center px-4 py-14 text-center sm:min-h-[380px] sm:py-16 md:min-h-[440px]">
            <p className="mb-3 text-[10px] font-bold tracking-[0.24em] text-crimson uppercase sm:text-[11px] sm:tracking-[0.3em]">
              {offer?.fields.eyebrow || "Limited Offer"}
            </p>
            <h2 className="font-display max-w-4xl text-[clamp(1.5rem,6.5vw,3.4rem)] leading-[1.08] font-bold text-white uppercase italic">
              {offer?.fields.title || settings.offerTitle || "Train Stronger. Eat Smarter."}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70">
              {offer?.fields.body ||
                settings.offerNote ||
                "Get 50% off your nutrition program when you purchase training sessions."}
            </p>
            <Link
              href={settings.offerHref || "/contact?offer=nutrition"}
              className="mt-7 inline-flex w-full max-w-xs items-center justify-center rounded-md bg-crimson px-8 py-3.5 text-xs font-bold tracking-[0.16em] text-white uppercase shadow-[0_0_28px_rgba(229,9,20,0.45)] transition hover:bg-[#ff1a25] sm:mt-8 sm:w-auto sm:max-w-none"
            >
              {offer?.fields.cta || settings.offerCta || "Claim Your Offer"}
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA
        title="Let's Build Your Stronger Future"
        description="Book a consultation with Your A1 Fitness Coach and start a personalized plan across Long Island."
      />
    </>
  );
}
