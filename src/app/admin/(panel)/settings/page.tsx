"use client";

import { useEffect, useState } from "react";
import {
  AdminCard,
  Field,
  TextArea,
  TextInput,
  ImageUploadField,
  SaveButton,
  StatusMessage,
} from "@/components/admin/ui";

type Settings = Record<string, string>;

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Settings>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (!data || data.error) return;
        const { _id, __v, createdAt, updatedAt, ...rest } = data;
        setForm(rest);
      });
  }, []);

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("fail");
      setMsg("Saved — footer & contact will use these values");
    } catch {
      setMsg("Save failed");
    } finally {
      setSaving(false);
    }
  }

  const fields: { key: string; label: string; area?: boolean }[] = [
    { key: "name", label: "Site name" },
    { key: "shortName", label: "Short name" },
    { key: "tagline", label: "Tagline" },
    { key: "phone", label: "Phone" },
    { key: "phoneHref", label: "Phone link (tel:)" },
    { key: "email", label: "Email" },
    { key: "emailHref", label: "Email link (mailto:)" },
    { key: "social", label: "Instagram handle" },
    { key: "socialHref", label: "Instagram URL" },
    { key: "socialLabel", label: "Social label" },
    { key: "serviceArea", label: "Service area" },
    { key: "businessHours", label: "Business hours", area: true },
    { key: "url", label: "Website URL" },
    { key: "offerTitle", label: "Offer title", area: true },
    { key: "offerNote", label: "Offer note", area: true },
    { key: "offerCta", label: "Offer CTA text" },
    { key: "offerHref", label: "Offer CTA link" },
  ];

  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-white uppercase">Settings</h1>
          <p className="mt-1 text-sm text-white/50">
            Contact info and site-wide details
          </p>
        </div>
        <SaveButton saving={saving} />
      </div>
      {msg && (
        <StatusMessage type={msg.startsWith("Saved") ? "ok" : "error"}>
          {msg}
        </StatusMessage>
      )}
      <AdminCard title="Contact & brand">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((f) => (
            <Field key={f.key} label={f.label}>
              {f.area ? (
                <TextArea
                  value={form[f.key] || ""}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              ) : (
                <TextInput
                  value={form[f.key] || ""}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              )}
            </Field>
          ))}
          <ImageUploadField
            label="Logo"
            value={form.logo || ""}
            onChange={(url) => set("logo", url)}
          />
        </div>
      </AdminCard>
    </form>
  );
}
