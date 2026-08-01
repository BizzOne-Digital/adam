"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-[70] transition-all duration-300",
          scrolled || mobileOpen
            ? "border-b border-white/10 bg-black/80 py-2 backdrop-blur-xl"
            : "bg-transparent py-3",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top)] sm:gap-4 sm:px-6 lg:px-10">
          <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label={SITE.name}>
            <span className="relative h-[44px] w-[44px] sm:h-[62px] sm:w-[62px]">
              <Image
                src={SITE.logo}
                alt={SITE.name}
                fill
                priority
                className="object-contain"
                sizes="62px"
              />
            </span>
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    className={cn(
                      "relative inline-flex items-center gap-1 px-4 py-2 text-[13px] font-semibold tracking-[0.14em] uppercase transition",
                      isActive("/services")
                        ? "text-crimson"
                        : "text-white/90 hover:text-white",
                    )}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition", servicesOpen && "rotate-180")}
                    />
                    {isActive("/services") && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-[2px] bg-crimson"
                      />
                    )}
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 overflow-hidden rounded-xl border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-xl"
                      >
                        <Link
                          href="/services"
                          className="block rounded-lg px-3 py-2 text-sm font-semibold text-crimson hover:bg-white/5"
                        >
                          All Services
                        </Link>
                        {SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={service.href}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white",
                              pathname === service.href && "bg-white/5 text-white",
                            )}
                          >
                            {service.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-[13px] font-semibold tracking-[0.14em] uppercase transition",
                    isActive(link.href)
                      ? "text-crimson"
                      : "text-white/90 hover:text-white",
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-4 -bottom-0.5 h-[2px] bg-crimson"
                    />
                  )}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/contact"
              className="rounded-md bg-crimson px-5 py-2.5 text-[12px] font-bold tracking-[0.12em] text-white uppercase shadow-[0_0_24px_rgba(229,9,20,0.35)] transition hover:bg-[#ff1a25]"
            >
              Start Your Journey
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SITE.phoneHref}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
              aria-label={`Call ${SITE.phone}`}
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/95" />
            <div className="bg-red-glow absolute top-0 right-0 h-80 w-80" />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="relative flex h-full flex-col overflow-y-auto px-5 pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6"
              aria-label="Mobile"
            >
              <div className="mb-6 flex items-center gap-3 sm:mb-8">
                <span className="relative h-12 w-12 sm:h-14 sm:w-14">
                  <Image src={SITE.logo} alt="" fill className="object-contain" sizes="56px" />
                </span>
                <div>
                  <p className="font-display text-base text-white uppercase sm:text-lg">A1 Fitness</p>
                  <p className="text-xs text-white/50">& Nutrition</p>
                </div>
              </div>

              <div className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    {link.hasDropdown ? (
                      <div>
                        <Link
                          href="/services"
                          className="font-heading block py-2 text-[clamp(1.75rem,8vw,2.5rem)] text-white"
                        >
                          Services
                        </Link>
                        <div className="mb-3 ml-1 space-y-0.5 border-l border-crimson/40 pl-4">
                          {SERVICES.map((service) => (
                            <Link
                              key={service.slug}
                              href={service.href}
                              className="block py-2 text-sm text-white/60 hover:text-white"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          "font-heading block py-2 text-[clamp(1.75rem,8vw,2.5rem)]",
                          isActive(link.href) ? "text-crimson" : "text-white",
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-3 border-t border-white/10 pt-6 sm:space-y-4 sm:pt-8">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-md bg-crimson px-6 py-4 text-sm font-bold tracking-wide text-white uppercase"
                >
                  Start Your Journey
                </Link>
                <a href={SITE.phoneHref} className="block py-1 text-sm text-white/70">
                  {SITE.phone}
                </a>
                <a href={SITE.emailHref} className="break-all py-1 text-sm text-white/70">
                  {SITE.email}
                </a>
                <a
                  href={SITE.socialHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-1 text-sm text-crimson"
                >
                  {SITE.social}
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
