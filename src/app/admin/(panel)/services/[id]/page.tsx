"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AdminCard,
  Field,
  TextArea,
  TextInput,
  ImageUploadField,
  SaveButton,
  StatusMessage,
} from "@/components/admin/ui";

type ServiceForm = {
  title: string;
  slug: string;
  summary: string;
  overview: string;
  image: string;
  imageAlt: string;
  heroImage: string;
  detailImage: string;
  benefits: string[];
  suitableFor: string[];
  expect: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  related: string[];
  accent: string;
  showOffer: boolean;
  published: boolean;
};

export default function AdminServiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<"listing" | "detail">("listing");
  const [form, setForm] = useState<ServiceForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`/api/admin/services/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) return;
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          summary: data.summary || "",
          overview: data.overview || "",
          image: data.image || "",
          imageAlt: data.imageAlt || "",
          heroImage: data.heroImage || data.image || "",
          detailImage: data.detailImage || data.image || "",
          benefits: data.benefits || [],
          suitableFor: data.suitableFor || [],
          expect: data.expect || [],
          process: data.process || [],
          faqs: data.faqs || [],
          related: data.related || [],
          accent: data.accent || "red",
          showOffer: Boolean(data.showOffer),
          published: data.published !== false,
        });
      });
  }, [id]);

  function set<K extends keyof ServiceForm>(key: K, value: ServiceForm[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("fail");
      setMsg("Saved");
    } catch {
      setMsg("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!form) return <p className="text-white/50">Loading…</p>;

  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link href="/admin/services" className="text-xs text-crimson">
            ← Services
          </Link>
          <h1 className="mt-2 font-display text-3xl text-white uppercase">
            {form.title || "Service"}
          </h1>
        </div>
        <SaveButton saving={saving} />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab("listing")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold uppercase ${
            tab === "listing" ? "bg-crimson text-white" : "border border-white/15"
          }`}
        >
          Listing
        </button>
        <button
          type="button"
          onClick={() => setTab("detail")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold uppercase ${
            tab === "detail" ? "bg-crimson text-white" : "border border-white/15"
          }`}
        >
          Detail page
        </button>
      </div>

      {msg && (
        <StatusMessage type={msg === "Saved" ? "ok" : "error"}>{msg}</StatusMessage>
      )}

      {tab === "listing" && (
        <AdminCard title="Services listing content">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <TextInput
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </Field>
            <Field label="Slug">
              <TextInput
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="Summary (card text)">
                <TextArea
                  value={form.summary}
                  onChange={(e) => set("summary", e.target.value)}
                />
              </Field>
            </div>
            <ImageUploadField
              label="Main service image (listing card)"
              value={form.image}
              onChange={(url) => set("image", url)}
            />
            <Field label="Image alt">
              <TextInput
                value={form.imageAlt}
                onChange={(e) => set("imageAlt", e.target.value)}
              />
            </Field>
            <Field label="Accent">
              <select
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm"
                value={form.accent}
                onChange={(e) => set("accent", e.target.value)}
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="silver">Silver</option>
              </select>
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => set("published", e.target.checked)}
              />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.showOffer}
                onChange={(e) => set("showOffer", e.target.checked)}
              />
              Show offer banner
            </label>
          </div>
        </AdminCard>
      )}

      {tab === "detail" && (
        <>
          <AdminCard title="Detail page content">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field label="Overview">
                  <TextArea
                    value={form.overview}
                    onChange={(e) => set("overview", e.target.value)}
                  />
                </Field>
              </div>
              <ImageUploadField
                label="Hero background"
                value={form.heroImage}
                onChange={(url) => set("heroImage", url)}
              />
              <ImageUploadField
                label="Detail section image"
                value={form.detailImage}
                onChange={(url) => set("detailImage", url)}
              />
              <Field label="Benefits (one per line)">
                <TextArea
                  value={form.benefits.join("\n")}
                  onChange={(e) =>
                    set(
                      "benefits",
                      e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                    )
                  }
                />
              </Field>
              <Field label="Suitable for (one per line)">
                <TextArea
                  value={form.suitableFor.join("\n")}
                  onChange={(e) =>
                    set(
                      "suitableFor",
                      e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                    )
                  }
                />
              </Field>
              <Field label="What to expect (one per line)">
                <TextArea
                  value={form.expect.join("\n")}
                  onChange={(e) =>
                    set(
                      "expect",
                      e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                    )
                  }
                />
              </Field>
              <Field label="Related slugs (comma separated)">
                <TextInput
                  value={form.related.join(", ")}
                  onChange={(e) =>
                    set(
                      "related",
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </Field>
            </div>
          </AdminCard>

          <AdminCard
            title="Process steps"
            actions={
              <button
                type="button"
                className="text-xs text-crimson uppercase"
                onClick={() =>
                  set("process", [...form.process, { title: "", description: "" }])
                }
              >
                + Add step
              </button>
            }
          >
            <div className="space-y-4">
              {form.process.map((step, i) => (
                <div key={i} className="grid gap-3 rounded-xl border border-white/10 p-4 md:grid-cols-2">
                  <Field label="Title">
                    <TextInput
                      value={step.title}
                      onChange={(e) => {
                        const next = [...form.process];
                        next[i] = { ...next[i], title: e.target.value };
                        set("process", next);
                      }}
                    />
                  </Field>
                  <Field label="Description">
                    <TextArea
                      value={step.description}
                      onChange={(e) => {
                        const next = [...form.process];
                        next[i] = { ...next[i], description: e.target.value };
                        set("process", next);
                      }}
                    />
                  </Field>
                </div>
              ))}
            </div>
          </AdminCard>

          <AdminCard
            title="Service FAQs"
            actions={
              <button
                type="button"
                className="text-xs text-crimson uppercase"
                onClick={() =>
                  set("faqs", [...form.faqs, { question: "", answer: "" }])
                }
              >
                + Add FAQ
              </button>
            }
          >
            <div className="space-y-4">
              {form.faqs.map((faq, i) => (
                <div key={i} className="space-y-3 rounded-xl border border-white/10 p-4">
                  <Field label="Question">
                    <TextInput
                      value={faq.question}
                      onChange={(e) => {
                        const next = [...form.faqs];
                        next[i] = { ...next[i], question: e.target.value };
                        set("faqs", next);
                      }}
                    />
                  </Field>
                  <Field label="Answer">
                    <TextArea
                      value={faq.answer}
                      onChange={(e) => {
                        const next = [...form.faqs];
                        next[i] = { ...next[i], answer: e.target.value };
                        set("faqs", next);
                      }}
                    />
                  </Field>
                </div>
              ))}
            </div>
          </AdminCard>
        </>
      )}
    </form>
  );
}
