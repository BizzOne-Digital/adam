"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotionSettings } from "@/providers/ReducedMotionProvider";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"a">, "href"> {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
  fullWidth?: boolean;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-crimson text-white shadow-[0_0_30px_rgba(229,9,20,0.35)] hover:bg-[#ff1a25]",
  secondary:
    "bg-ice text-obsidian hover:bg-white",
  ghost:
    "bg-white/5 text-ice border border-white/15 hover:border-crimson/60 hover:bg-crimson/10",
  outline:
    "border border-crimson/70 text-ice hover:bg-crimson/15",
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className,
  fullWidth,
  external,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { prefersReducedMotion } = useMotionSettings();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current || prefersReducedMotion || !isDesktop) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.35);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-md px-6 py-3.5 text-sm font-bold tracking-wide uppercase transition-colors sm:w-auto",
    variants[variant],
    fullWidth && "w-full sm:w-full",
    className,
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </>
  );

  if (external) {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={classes}
        style={{ x: springX, y: springY }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className={cn("block w-full sm:inline-flex sm:w-auto", fullWidth && "w-full sm:w-full")}
    >
      <Link
        ref={ref as never}
        href={href}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {content}
      </Link>
    </motion.div>
  );
}
