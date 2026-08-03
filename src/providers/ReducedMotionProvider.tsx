"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const INTRO_STORAGE_KEY = "a1-intro-seen";

type IntroPhase = "boot" | "intro" | "ready";

interface MotionSettings {
  prefersReducedMotion: boolean;
  introComplete: boolean;
  introPhase: IntroPhase;
  mounted: boolean;
  skipIntro: () => void;
  completeIntro: () => void;
}

const MotionSettingsContext = createContext<MotionSettings | null>(null);

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  // Start in "boot" so first paint is a black gate — never flash the hero before intro
  const [introPhase, setIntroPhase] = useState<IntroPhase>("boot");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);

    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    const reduced = media.matches;
    setPrefersReducedMotion(reduced);
    setIntroPhase(seen || reduced ? "ready" : "intro");
    setMounted(true);

    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    if (introPhase === "ready") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introPhase]);

  const markIntroSeen = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // sessionStorage may be unavailable
    }
    setIntroPhase("ready");
  }, []);

  const value = useMemo<MotionSettings>(
    () => ({
      prefersReducedMotion,
      introComplete: introPhase === "ready",
      introPhase,
      mounted,
      skipIntro: markIntroSeen,
      completeIntro: markIntroSeen,
    }),
    [prefersReducedMotion, introPhase, mounted, markIntroSeen],
  );

  return (
    <MotionSettingsContext.Provider value={value}>
      {children}
    </MotionSettingsContext.Provider>
  );
}

export function useMotionSettings(): MotionSettings {
  const ctx = useContext(MotionSettingsContext);
  if (!ctx) {
    throw new Error("useMotionSettings must be used within ReducedMotionProvider");
  }
  return ctx;
}
