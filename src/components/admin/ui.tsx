"use client";

import { useState, type ReactNode } from "react";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold tracking-wide text-white/60 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-ice outline-none transition focus:border-crimson";

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} min-h-[100px] ${props.className || ""}`} />;
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className || ""}`} />;
}

export function SaveButton({
  saving,
  children = "Save changes",
}: {
  saving?: boolean;
  children?: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={saving}
      className="rounded-lg bg-crimson px-5 py-2.5 text-sm font-bold tracking-wide text-white uppercase disabled:opacity-60"
    >
      {saving ? "Saving..." : children}
    </button>
  );
}

export function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function onFile(file: File | null) {
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Field label={label}>
      <div className="space-y-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="h-36 w-full rounded-lg border border-white/10 object-cover"
          />
        ) : (
          <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-white/15 text-sm text-white/40">
            No image
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <TextInput
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/... or /uploads/..."
          />
          <label className="cursor-pointer rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/80 hover:border-crimson">
            {uploading ? "Uploading..." : "Upload"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => onFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      </div>
    </Field>
  );
}

export function AdminCard({
  title,
  children,
  actions,
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#111214] p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg text-white uppercase">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}

export function StatusMessage({
  type,
  children,
}: {
  type: "ok" | "error";
  children: ReactNode;
}) {
  return (
    <p
      className={
        type === "ok" ? "text-sm text-emerald-400" : "text-sm text-crimson"
      }
    >
      {children}
    </p>
  );
}
