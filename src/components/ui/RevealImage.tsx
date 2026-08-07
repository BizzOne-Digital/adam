"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useMotionSettings } from "@/providers/ReducedMotionProvider";
import { publicImageSrc } from "@/lib/media";

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  parallax?: boolean;
  sizes?: string;
}

export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  priority,
  parallax,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const { prefersReducedMotion } = useMotionSettings();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallax && !prefersReducedMotion ? ["-6%", "6%"] : ["0%", "0%"]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-xl bg-graphite", className)}
    >
      <motion.div
        className="absolute inset-0 z-10 bg-crimson"
        initial={prefersReducedMotion ? { scaleX: 0 } : { scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "right center" }}
      />
      <motion.div style={{ y }} className="relative h-full w-full">
        <Image
          src={publicImageSrc(src)}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "object-cover transition-transform duration-700 hover:scale-105",
            imgClassName,
          )}
        />
      </motion.div>
    </div>
  );
}

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useMotionSettings();

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current || prefersReducedMotion) return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -8;
    const ry = (px - 0.5) * 10;
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("transition-transform duration-300 will-change-transform", className)}
    >
      {children}
    </div>
  );
}
