"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminCard } from "@/components/admin/ui";

type PageRow = { _id: string; slug: string; name: string; sections: unknown[] };

export default function AdminPagesListPage() {
  const [pages, setPages] = useState<PageRow[]>([]);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then(setPages)
      .catch(() => setPages([]));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white uppercase">Pages</h1>
        <p className="mt-1 text-sm text-white/50">
          Edit each page section by section, including images
        </p>
      </div>
      <AdminCard title="All pages">
        <div className="divide-y divide-white/10">
          {pages.map((page) => (
            <Link
              key={page._id}
              href={`/admin/pages/${page.slug}`}
              className="flex items-center justify-between py-4 transition hover:text-crimson"
            >
              <div>
                <p className="font-semibold text-white">{page.name}</p>
                <p className="text-xs text-white/40">/{page.slug}</p>
              </div>
              <span className="text-xs text-white/40">
                {page.sections?.length || 0} sections
              </span>
            </Link>
          ))}
          {!pages.length && (
            <p className="py-6 text-sm text-white/50">
              No pages yet. Run <code className="text-crimson">npm run seed</code>.
            </p>
          )}
        </div>
      </AdminCard>
    </div>
  );
}
