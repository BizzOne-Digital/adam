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

interface MotionSettings {
  prefersReducedMotion: boolean;
  introComplete: boolean;
  mounted: boolean;
  skipIntro: () => void;
  completeIntro: () => void;
}

const MotionSettingsContext = createContext<MotionSettings | null>(null);

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  // Keep SSR + first client paint identical to avoid hydration mismatches
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [introComplete, setIntroComplete] = useState(true);

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

    setIntroComplete(seen || media.matches);
    setMounted(true);

    return () => media.removeEventListener("change", updateMotion);
  }, []);

  const markIntroSeen = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // sessionStorage may be unavailable
    }
    setIntroComplete(true);
  }, []);

  const value = useMemo<MotionSettings>(
    () => ({
      prefersReducedMotion,
      introComplete,
      mounted,
      skipIntro: markIntroSeen,
      completeIntro: markIntroSeen,
    }),
    [prefersReducedMotion, introComplete, mounted, markIntroSeen],
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
