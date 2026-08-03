"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accessibility,
  Dumbbell,
  Heart,
  Monitor,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";
import { useSiteSettings } from "@/providers/SettingsProvider";
import type { Service } from "@/lib/services";
const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Target,
  Dumbbell,
  Heart,
  Accessibility,
  Trophy,
  Monitor,
};

export function AudienceCard({
  title,
  description,
  icon,
  index = 0,
}: {
  title: string;
  description: string;
  icon: string;
  index?: number;
}) {
  const Icon = ICONS[icon] ?? Sparkles;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="glow-card group rounded-2xl bg-panel-gradient p-6 transition duration-300 hover:-translate-y-1"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/15 text-crimson transition group-hover:bg-crimson group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-display text-xl text-ice">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </motion.article>
  );
}

export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-rich-black"
    >
      <div className="relative h-56 overflow-hidden md:h-64">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        {service.accent === "blue" && (
          <span className="absolute top-4 left-4 rounded-full bg-electric/90 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
            Online
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading text-3xl text-ice">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{service.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={service.href}
            className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-crimson uppercase transition hover:text-ice"
          >
            Explore Service
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-1 opacity-0 transition group-hover:opacity-100",
          service.accent === "blue"
            ? "bg-electric"
            : service.accent === "silver"
              ? "bg-silver"
              : "bg-crimson",
        )}
      />
    </motion.article>
  );
}

export function OfferBanner({ className }: { className?: string }) {
  const settings = useSiteSettings();
  return (
    <section className={cn("relative overflow-hidden py-16 md:py-20", className)}>
      <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      <div className="absolute inset-0 diagonal-lines opacity-40" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-ice/80 uppercase">
          Limited Offer
        </p>
        <h2 className="font-heading text-3xl text-white sm:text-4xl md:text-5xl">
          {settings.offerTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80">{settings.offerNote}</p>
        <div className="mt-8 flex justify-center">
          <MagneticButton href={settings.offerHref} variant="secondary" showArrow>
            {settings.offerCta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

export function ProcessTimeline() {
  const steps = [
    {
      step: "01",
      title: "Tell Us Your Goals",
      description:
        "Share your fitness goals, schedule preferences, and any accessibility needs so training can start with clarity.",
    },
    {
      step: "02",
      title: "Receive Your Personal Plan",
      description:
        "Get a customized program shaped around your body, abilities, lifestyle, and the results you want.",
    },
    {
      step: "03",
      title: "Train With Expert Support",
      description:
        "Train at home, at your gym, or online with guided coaching, form support, and consistent accountability.",
    },
    {
      step: "04",
      title: "Build Lasting Results",
      description:
        "Build strength, health, and confidence through sustainable progress that fits real life.",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, i) => (
        <motion.div
          key={step.step}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.55 }}
          className="relative rounded-2xl border border-white/10 bg-graphite/60 p-6"
        >
          <span className="font-heading text-5xl text-crimson/40">{step.step}</span>
          <h3 className="font-display mt-3 text-xl text-ice">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function Counter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1200);
      setCount(Math.floor(value * p));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-4xl text-ice md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-xs tracking-wider text-muted uppercase">{label}</p>
    </div>
  );
}

export function FinalCTA({
  title = "Your Stronger Life Starts Here",
  description = "Let's build a plan that works for you.",
}: {
  title?: string;
  description?: string;
}) {
  const settings = useSiteSettings();
  return (
    <section className="relative w-full bg-black" aria-labelledby="shared-final-cta-heading">
      <div className="relative min-h-[340px] w-full overflow-hidden sm:min-h-[440px] md:min-h-[520px]">
        <Image
          src="/images/your-stronger.png"
          alt="Athlete training hard — start your stronger life"
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
              id="shared-final-cta-heading"
              className="font-display text-[clamp(1.85rem,7vw,3.5rem)] leading-[1.05] font-bold tracking-tight text-silver uppercase italic"
            >
              {title}
            </h2>
            <p className="mt-4 text-sm text-white/80 sm:text-base">{description}</p>
            <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-md bg-crimson px-7 py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase shadow-[0_0_28px_rgba(229,9,20,0.4)] transition hover:bg-[#ff1a25] sm:w-auto"
              >
                Book a Consultation
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
    </section>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted uppercase">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-ice">
                {item.label}
              </Link>
            ) : (
              <span className="text-ice">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  title,
  subtitle,
  image,
  imageAlt,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  breadcrumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="relative flex min-h-[52svh] items-end overflow-hidden pt-24 pb-12 sm:min-h-[58vh] sm:pt-28 sm:pb-16 md:min-h-[68vh]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-[55%_center] sm:object-[70%_center] md:object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-obsidian/50 sm:via-obsidian/85 sm:to-obsidian/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/50" />
      <div className="bg-red-glow absolute top-20 -left-20 hidden h-72 w-72 sm:block" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-[clamp(2.25rem,10vw,4.5rem)] leading-[1.02] text-ice sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 max-w-2xl text-sm text-muted sm:mt-4 sm:text-base md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
