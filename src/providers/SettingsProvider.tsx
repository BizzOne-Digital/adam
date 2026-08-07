"use client";

import { createContext, useContext, type ReactNode } from "react";
import { SITE } from "@/lib/constants";

export type SiteSettings = {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
  social: string;
  socialHref: string;
  socialLabel: string;
  logo: string;
  url: string;
  serviceArea: string;
  businessHours: string;
  offerTitle: string;
  offerNote: string;
  offerCta: string;
  offerHref: string;
};

const defaultSettings: SiteSettings = {
  name: SITE.name,
  shortName: SITE.shortName,
  tagline: SITE.tagline,
  phone: SITE.phone,
  phoneHref: SITE.phoneHref,
  whatsappHref: SITE.whatsappHref,
  email: SITE.email,
  emailHref: SITE.emailHref,
  social: SITE.social,
  socialHref: SITE.socialHref,
  socialLabel: "Instagram",
  logo: SITE.logo,
  url: SITE.url,
  serviceArea: SITE.serviceArea,
  businessHours: "",
  offerTitle: "",
  offerNote: "",
  offerCta: "Claim Your Offer",
  offerHref: "/contact?offer=nutrition",
};

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export function SettingsProvider({
  settings,
  children,
}: {
  settings?: Partial<SiteSettings> | null;
  children: ReactNode;
}) {
  const value = { ...defaultSettings, ...(settings || {}) };
  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const settings = useContext(SettingsContext);
  const digits = settings.phoneHref.replace(/\D/g, "") || "15163103338";
  const whatsappHref =
    settings.whatsappHref || `https://wa.me/${digits}`;
  return { ...settings, whatsappHref };
}
