"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    label: "Client testimonial content coming soon.",
    detail:
      "This space is ready for authentic client stories. Share how training with A1 Fitness & Nutrition helped you build strength, health, and confidence.",
    role: "Long Island Client",
  },
  {
    id: 2,
    label: "Client testimonial content coming soon.",
    detail:
      "Placeholder for inclusive coaching feedback—designed to be replaced with real experiences from beginners, seniors, athletes, and adaptive trainees.",
    role: "Training Client",
  },
  {
    id: 3,
    label: "Client testimonial content coming soon.",
    detail:
      "A professional placeholder for online coaching and nutrition support stories. Real names and results will be added with permission.",
    role: "Online Coaching Client",
  },
];

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-graphite/70 p-8 md:p-12">
      <Quote className="absolute top-6 right-6 h-16 w-16 text-crimson/20" aria-hidden="true" />
      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-display text-2xl text-ice md:text-3xl">{current.label}</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
              {current.detail}
            </p>
            <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-crimson uppercase">
              {current.role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-crimson" : "bg-white/20"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() =>
              setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ice hover:border-crimson"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ice hover:border-crimson"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
