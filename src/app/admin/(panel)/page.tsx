"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminCard } from "@/components/admin/ui";

type Stats = {
  pages: number;
  services: number;
  gallery: number;
  testimonials: number;
  faqs: number;
  settings: {
    name?: string;
    phone?: string;
    email?: string;
    social?: string;
  } | null;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  const cards = [
    { label: "Pages", value: stats?.pages ?? "—", href: "/admin/pages" },
    { label: "Services", value: stats?.services ?? "—", href: "/admin/services" },
    { label: "Gallery images", value: stats?.gallery ?? "—", href: "/admin/gallery" },
    {
      label: "Testimonials",
      value: stats?.testimonials ?? "—",
      href: "/admin/testimonials",
    },
    { label: "FAQs", value: stats?.faqs ?? "—", href: "/admin/faqs" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white uppercase">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">
          Overview of your A1 Fitness website content
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-white/10 bg-[#111214] p-5 transition hover:border-crimson/40"
          >
            <p className="text-xs tracking-wide text-white/50 uppercase">{card.label}</p>
            <p className="mt-2 font-display text-3xl text-white">{card.value}</p>
          </Link>
        ))}
      </div>

      <AdminCard title="Site settings snapshot">
        {stats?.settings ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-white/50">Name</dt>
              <dd className="text-white">{stats.settings.name}</dd>
            </div>
            <div>
              <dt className="text-white/50">Phone</dt>
              <dd className="text-white">{stats.settings.phone}</dd>
            </div>
            <div>
              <dt className="text-white/50">Email</dt>
              <dd className="break-all text-white">{stats.settings.email}</dd>
            </div>
            <div>
              <dt className="text-white/50">Instagram</dt>
              <dd className="text-white">{stats.settings.social}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-white/50">
            No settings found. Run <code className="text-crimson">npm run seed</code> after
            starting MongoDB.
          </p>
        )}
      </AdminCard>
    </div>
  );
}
