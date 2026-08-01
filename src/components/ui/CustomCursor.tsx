"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMotionSettings } from "@/providers/ReducedMotionProvider";

export function CustomCursor() {
  const { prefersReducedMotion } = useMotionSettings();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px) and (pointer: fine)");
    const update = () => setEnabled(mq.matches && !prefersReducedMotion);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      className="custom-cursor-glow"
      animate={{ left: pos.x, top: pos.y }}
      transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.3 }}
      aria-hidden="true"
    />
  );
}
