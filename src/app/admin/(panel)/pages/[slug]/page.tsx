"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  AdminCard,
  Field,
  TextArea,
  TextInput,
  ImageUploadField,
  SaveButton,
  StatusMessage,
} from "@/components/admin/ui";

type Section = {
  key: string;
  title: string;
  fields: Record<string, string>;
  images: Record<string, string>;
};

type PageDoc = {
  slug: string;
  name: string;
  sections: Section[];
};

function normalizeMaps(section: Section): Section {
  const fields =
    section.fields && typeof section.fields === "object"
      ? Object.fromEntries(
          Object.entries(section.fields as Record<string, string>),
        )
      : {};
  const images =
    section.images && typeof section.images === "object"
      ? Object.fromEntries(
          Object.entries(section.images as Record<string, string>),
        )
      : {};
  return { ...section, fields, images };
}

export default function AdminPageEditor() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [page, setPage] = useState<PageDoc | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`/api/admin/pages/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) return;
        setPage({
          ...data,
          sections: (data.sections || []).map(normalizeMaps),
        });
      });
  }, [slug]);

  function updateField(si: number, key: string, value: string) {
    setPage((prev) => {
      if (!prev) return prev;
      const sections = [...prev.sections];
      sections[si] = {
        ...sections[si],
        fields: { ...sections[si].fields, [key]: value },
      };
      return { ...prev, sections };
    });
  }

  function updateImage(si: number, key: string, value: string) {
    setPage((prev) => {
      if (!prev) return prev;
      const sections = [...prev.sections];
      sections[si] = {
        ...sections[si],
        images: { ...sections[si].images, [key]: value },
      };
      return { ...prev, sections };
    });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!page) return;
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      if (!res.ok) throw new Error("fail");
      setMsg("Saved");
    } catch {
      setMsg("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!page) {
    return <p className="text-white/50">Loading page…</p>;
  }

  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link href="/admin/pages" className="text-xs text-crimson">
            ← Pages
          </Link>
          <h1 className="mt-2 font-display text-3xl text-white uppercase">
            {page.name}
          </h1>
        </div>
        <SaveButton saving={saving} />
      </div>
      {msg && (
        <StatusMessage type={msg === "Saved" ? "ok" : "error"}>{msg}</StatusMessage>
      )}

      {page.sections.map((section, si) => (
        <AdminCard key={section.key} title={section.title}>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(section.fields || {}).map(([key, value]) => (
              <Field key={key} label={key}>
                {String(value).length > 80 ? (
                  <TextArea
                    value={value}
                    onChange={(e) => updateField(si, key, e.target.value)}
                  />
                ) : (
                  <TextInput
                    value={value}
                    onChange={(e) => updateField(si, key, e.target.value)}
                  />
                )}
              </Field>
            ))}
            {Object.entries(section.images || {}).map(([key, value]) => (
              <ImageUploadField
                key={key}
                label={`Image: ${key}`}
                value={value}
                onChange={(url) => updateImage(si, key, url)}
              />
            ))}
          </div>
        </AdminCard>
      ))}
    </form>
  );
}
