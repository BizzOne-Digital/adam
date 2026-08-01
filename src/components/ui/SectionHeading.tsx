"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMotionSettings } from "@/providers/ReducedMotionProvider";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light,
}: SectionHeadingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { prefersReducedMotion } = useMotionSettings();

  return (
    <div
      ref={ref}
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-3 text-xs font-semibold tracking-[0.28em] text-crimson uppercase"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.05 }}
        className={cn(
          "font-heading text-[clamp(1.85rem,7vw,3.75rem)] leading-[1.05] sm:text-5xl md:text-6xl",
          light ? "text-ice" : "text-ice",
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {description}
        </motion.p>
      )}
      <motion.div
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.18 }}
        className={cn(
          "metallic-line mt-6 origin-left",
          align === "center" && "mx-auto origin-center",
        )}
        style={{ width: align === "center" ? "8rem" : "6rem" }}
      />
    </div>
  );
}

export function AnimatedText({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const { prefersReducedMotion } = useMotionSettings();
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={cn("flex flex-wrap gap-x-2 gap-y-1", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={prefersReducedMotion ? false : { y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const { prefersReducedMotion } = useMotionSettings();

  const initial =
    direction === "left"
      ? { opacity: 0, x: -48 }
      : direction === "right"
        ? { opacity: 0, x: 48 }
        : direction === "scale"
          ? { opacity: 0, scale: 0.94 }
          : { opacity: 0, y: 40 };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
