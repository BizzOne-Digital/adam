"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
} from "@/lib/images";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === filter),
    [filter],
  );

  const close = useCallback(() => setActive(null), []);

  const next = useCallback(() => {
    setActive((i) => (i === null ? 0 : (i + 1) % items.length));
  }, [items.length]);

  const prev = useCallback(() => {
    setActive((i) =>
      i === null ? 0 : (i - 1 + items.length) % items.length,
    );
  }, [items.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  let touchX = 0;

  return (
    <div>
      <div
        className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Gallery categories"
      >
        {GALLERY_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={filter === category}
            onClick={() => setFilter(category)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-semibold tracking-wide uppercase transition sm:px-4 sm:text-xs",
              filter === category
                ? "border-crimson bg-crimson text-white"
                : "border-white/15 text-muted hover:border-white/40 hover:text-ice",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl break-inside-avoid"
              onClick={() => setActive(index)}
              aria-label={`Open ${item.caption}`}
            >
              <span className="relative block aspect-[4/5] w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </span>
              <span className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
              <span className="absolute right-4 bottom-4 left-4 text-left">
                <span className="block text-[10px] tracking-[0.2em] text-crimson uppercase">
                  {item.category}
                </span>
                <span className="font-display mt-1 block text-lg text-ice">
                  {item.caption}
                </span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {active !== null && items[active] && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
            onClick={close}
            onTouchStart={(e) => {
              touchX = e.changedTouches[0]?.clientX ?? 0;
            }}
            onTouchEnd={(e) => {
              const x = e.changedTouches[0]?.clientX ?? 0;
              const delta = x - touchX;
              if (delta > 50) prev();
              if (delta < -50) next();
            }}
          >
            <button
              type="button"
              className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-10 rounded-full border border-white/20 p-2.5 text-ice"
              onClick={close}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute bottom-20 left-4 z-10 rounded-full border border-white/20 bg-black/50 p-2.5 text-ice sm:top-1/2 sm:bottom-auto sm:left-3 sm:-translate-y-1/2 sm:bg-transparent md:left-6"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="absolute bottom-20 right-4 z-10 rounded-full border border-white/20 bg-black/50 p-2.5 text-ice sm:top-1/2 sm:right-3 sm:bottom-auto sm:-translate-y-1/2 sm:bg-transparent md:right-6"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.div
              key={items[active].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative h-[min(58svh,100%)] w-full max-w-5xl pb-16 sm:h-[70vh] sm:pb-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[active].src}
                alt={items[active].alt}
                fill
                className="rounded-xl object-contain"
                sizes="100vw"
              />
              <p className="absolute right-0 bottom-0 left-0 rounded-b-xl bg-black/70 px-3 py-2.5 text-center text-xs text-ice sm:px-4 sm:py-3 sm:text-sm">
                {items[active].caption} · {items[active].category as GalleryCategory}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
