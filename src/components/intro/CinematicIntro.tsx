"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { SITE } from "@/lib/constants";

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [phase, setPhase] = useState(0);
  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: `${(i * 17) % 100}%`,
        top: `${(i * 29) % 100}%`,
        size: 1 + (i % 3),
        delay: (i % 8) * 0.15,
      })),
    [],
  );

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }

    const timers = [
      window.setTimeout(() => setPhase(1), 200),
      window.setTimeout(() => setPhase(2), 700),
      window.setTimeout(() => setPhase(3), 1200),
      window.setTimeout(() => setPhase(4), 1700),
      window.setTimeout(() => setPhase(5), 2300),
      window.setTimeout(() => setPhase(6), 2900),
      window.setTimeout(() => setPhase(7), 3400),
      window.setTimeout(() => onComplete(), 3900),
    ];

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / 3600) * 100);
      setProgress(pct);
      if (pct < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frame);
    };
  }, [onComplete, reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      role="dialog"
      aria-label="A1 Fitness cinematic introduction"
      aria-modal="true"
    >
      {/* Red light sweep */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-crimson/40 to-transparent blur-2xl"
        initial={{ x: "-30vw", opacity: 0 }}
        animate={{
          x: phase >= 1 ? ["-30vw", "120vw"] : "-30vw",
          opacity: phase >= 1 ? [0, 1, 0] : 0,
        }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* Particles */}
      {phase >= 2 &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none absolute rounded-full bg-silver/70"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0, 0.8, 0.25], y: [8, -12, -4] }}
            transition={{
              duration: 2.2,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}

      {/* Heartbeat / energy pulse line */}
      {phase >= 3 && (
        <motion.div
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 1, 0.4, 1] }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, #E50914, #C7CBD1, #E50914, transparent)",
            transformOrigin: "left center",
          }}
        />
      )}

      {/* Logo reveal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.85, filter: "brightness(0.2)" }}
          animate={
            phase >= 4
              ? {
                  opacity: 1,
                  scale: [0.85, 1.04, 1],
                  filter: ["brightness(0.2)", "brightness(1.35)", "brightness(1)"],
                  x: phase >= 5 ? [0, -3, 3, -2, 2, 0] : 0,
                  y: phase >= 5 ? [0, 2, -2, 1, 0] : 0,
                }
              : {}
          }
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative h-36 w-36 sm:h-48 sm:w-48 md:h-56 md:w-56">
            <Image
              src={SITE.logo}
              alt={SITE.name}
              fill
              priority
              className="object-contain drop-shadow-[0_0_40px_rgba(229,9,20,0.45)]"
              sizes="224px"
            />
          </div>
          {phase >= 4 && (
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              initial={{ x: "-120%", opacity: 0 }}
              animate={{ x: "120%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          )}
        </motion.div>

        {phase >= 5 && (
          <motion.p
            className="font-display mt-8 text-center text-sm tracking-[0.2em] text-ice uppercase sm:text-base sm:tracking-[0.35em] md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Strength. Health. Confidence.
          </motion.p>
        )}

        {phase >= 6 && (
          <div className="mt-10 w-full max-w-xs">
            <div className="mb-2 flex justify-between text-xs tracking-widest text-muted uppercase">
              <span>Loading Experience</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-graphite">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-deep-red via-crimson to-electric"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Split panels exit */}
      {phase >= 7 && (
        <>
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-obsidian"
            initial={{ x: 0 }}
            animate={{ x: "-105%", rotate: -4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-rich-black"
            initial={{ x: 0 }}
            animate={{ x: "105%", rotate: 4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%)" }}
          />
        </>
      )}

      <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between sm:right-8 sm:bottom-8 sm:left-8">
        <button
          type="button"
          onClick={() => setSoundOn((v) => !v)}
          className="glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-silver transition hover:text-ice"
          aria-pressed={soundOn}
          aria-label={soundOn ? "Sound visual on" : "Sound visual off"}
        >
          {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          <span className="hidden sm:inline">Sound {soundOn ? "On" : "Off"}</span>
        </button>
        <button
          type="button"
          onClick={onComplete}
          className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wider text-ice uppercase transition hover:border-crimson hover:bg-crimson/20"
        >
          Skip Intro
        </button>
      </div>
    </motion.div>
  );
}
