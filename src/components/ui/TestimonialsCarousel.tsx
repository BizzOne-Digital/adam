"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export type TestimonialItem = {
  quote: string;
  name: string;
  detail: string;
  id?: string;
};

const PER_PAGE = 2;
const AUTO_MS = 5500;

export function TestimonialsCarousel({
  items,
  className,
}: {
  items: TestimonialItem[];
  className?: string;
}) {
  const list = items.length ? items : [];
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (pages <= 1) return;
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % pages);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [pages]);

  if (!list.length) {
    return (
      <p className="py-10 text-center text-sm text-muted">Testimonials coming soon.</p>
    );
  }

  const start = page * PER_PAGE;
  const visible = list.slice(start, start + PER_PAGE);

  function prev() {
    setPage((p) => (p - 1 + pages) % pages);
  }
  function next() {
    setPage((p) => (p + 1) % pages);
  }

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.35 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {visible.map((item) => (
            <article
              key={item.id || item.name}
              className="flex h-full flex-col rounded-xl border border-white/10 bg-[#111214] p-4 sm:p-5"
            >
              <Quote className="mb-3 h-6 w-6 text-crimson" aria-hidden="true" />
              <p className="line-clamp-5 flex-1 text-[13px] leading-relaxed text-white/70 sm:text-sm">
                “{item.quote}”
              </p>
              <div className="mt-4 border-t border-white/10 pt-3">
                <p className="text-sm font-bold text-white">{item.name}</p>
                <p className="mt-0.5 text-[10px] tracking-wider text-crimson uppercase">
                  {item.detail}
                </p>
              </div>
            </article>
          ))}
          {visible.length === 1 && <div className="hidden sm:block" aria-hidden="true" />}
        </motion.div>
      </AnimatePresence>

      {pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="rounded-full border border-white/15 p-2 text-white transition hover:border-crimson"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setPage(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === page ? "w-5 bg-crimson" : "w-1.5 bg-white/25 hover:bg-white/50",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="rounded-full border border-white/15 p-2 text-white transition hover:border-crimson"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
