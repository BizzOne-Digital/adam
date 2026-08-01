"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { BackToTop } from "@/components/ui/BackToTop";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import {
  ReducedMotionProvider,
  useMotionSettings,
} from "@/providers/ReducedMotionProvider";

function RouteOverlay() {
  const pathname = usePathname();
  const { prefersReducedMotion } = useMotionSettings();
  const [displayPath, setDisplayPath] = useState(pathname);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayPath(pathname);
      return;
    }
    if (pathname === displayPath) return;

    setVisible(true);
    const mid = window.setTimeout(() => setDisplayPath(pathname), 220);
    const end = window.setTimeout(() => setVisible(false), 520);
    return () => {
      window.clearTimeout(mid);
      window.clearTimeout(end);
    };
  }, [pathname, displayPath, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={`route-overlay-${pathname}`}
          className="pointer-events-none fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-obsidian"
            initial={{ x: "-105%" }}
            animate={{ x: ["-105%", "0%", "-105%"] }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)" }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-rich-black"
            initial={{ x: "105%" }}
            animate={{ x: ["105%", "0%", "105%"] }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
          />
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-crimson to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { introComplete, completeIntro, prefersReducedMotion, mounted } =
    useMotionSettings();

  const showIntro = mounted && !introComplete && !prefersReducedMotion;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[120] focus:rounded-lg focus:bg-crimson focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <AnimatePresence mode="wait">
        {showIntro && (
          <CinematicIntro key="cinematic-intro" onComplete={completeIntro} />
        )}
      </AnimatePresence>

      <ScrollProgress />
      <Navbar />
      <RouteOverlay />
      <main id="main-content" className="flex-1">
        <PageTransition key={pathname}>{children}</PageTransition>
      </main>
      <Footer />
      <BackToTop />
      <CustomCursor />
    </>
  );
}

export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <ReducedMotionProvider>
      <SiteShell>{children}</SiteShell>
    </ReducedMotionProvider>
  );
}
