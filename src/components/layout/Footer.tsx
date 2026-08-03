"use client";

import Image from "next/image";
import Link from "next/link";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { useSiteSettings } from "@/providers/SettingsProvider";
import { useEffect, useState } from "react";
import type { Service } from "@/lib/services";

export function Footer() {
  const settings = useSiteSettings();
  const [services, setServices] = useState<Service[]>(SERVICES);

  useEffect(() => {
    fetch("/api/content/services")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) setServices(data);
      })
      .catch(() => undefined);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-rich-black">
      <div className="bg-red-glow pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative h-16 w-16">
                <Image
                  src={settings.logo}
                  alt={settings.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Premium personal training and nutrition coaching across Long Island—built
              around your goals, abilities, and lifestyle.
            </p>
            <p className="mt-4 inline-flex items-start gap-2 text-sm text-silver">
              <MapPin className="mt-0.5 h-4 w-4 text-crimson" />
              {settings.serviceArea}
            </p>
          </div>

          <div>
            <h3 className="font-display mb-4 text-sm tracking-[0.2em] text-ice uppercase">
              Navigate
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-ice"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-sm tracking-[0.2em] text-ice uppercase">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted transition hover:text-ice"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-sm tracking-[0.2em] text-ice uppercase">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={settings.phoneHref}
                  className="inline-flex items-center gap-2 text-muted transition hover:text-ice"
                >
                  <Phone className="h-4 w-4 text-crimson" />
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={settings.emailHref}
                  className="inline-flex max-w-full items-start gap-2 text-muted transition hover:text-ice"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                  <span className="break-all">{settings.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={settings.socialHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition hover:text-ice"
                >
                  <AtSign className="h-4 w-4 text-crimson" />
                  <span>
                    {settings.socialLabel || "Instagram"}{" "}
                    <span className="text-silver">{settings.social}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="metallic-line my-8" />

        <div className="flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-ice">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-ice">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
