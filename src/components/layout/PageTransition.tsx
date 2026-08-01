"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionSettings } from "@/providers/ReducedMotionProvider";

export function PageTransition({ children }: { children: ReactNode }) {
  const { prefersReducedMotion } = useMotionSettings();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
