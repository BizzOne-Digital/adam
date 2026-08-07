"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { publicImageSrc } from "@/lib/media";

export type UploadFolder = "products" | "gallery" | "pages" | "misc";

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

function Toast({
  type,
  message,
  onDone,
}: {
  type: "ok" | "error";
  message: string;
  onDone: () => void;
}) {
  useEffect(() => {
    const id = window.setTimeout(onDone, 3200);
    return () => window.clearTimeout(id);
  }, [onDone, message]);

  return (
    <p
      role="status"
      className={
        type === "ok"
          ? "rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300"
          : "rounded-md border border-crimson/40 bg-crimson/10 px-3 py-2 text-sm text-crimson"
      }
    >
      {message}
    </p>
  );
}

/**
 * Admin image field: uploads to MongoDB via `/api/upload` (survives Vercel redeploys).
 * `onChange` receives the public URL string (`/api/uploads/{folder}/{filename}`).
 */
export function ImageUploadField({
  label,
  value,
  onChange,
  folder = "misc",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: UploadFolder;
}) {
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "error"; message: string } | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const previewSrc = publicImageSrc(value);

  async function deleteRemote(url: string) {
    if (!url.startsWith("/api/uploads/")) return;
    await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    }).catch(() => null);
  }

  async function onFile(file: File | null) {
    if (!file) return;
    setUploading(true);
    setToast(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      if (value.startsWith("/api/uploads/")) {
        form.append("replaceUrl", value);
      }
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      onChange(data.url);
      setToast({ type: "ok", message: "Image uploaded" });
    } catch (err) {
      setToast({
        type: "error",
        message: err instanceof Error ? err.message : "Upload failed",
      });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function onRemove() {
    const prev = value;
    onChange("");
    await deleteRemote(prev);
    setToast({ type: "ok", message: "Image removed" });
  }

  return (
    <Field label={label}>
      <div className="space-y-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewSrc}
            alt=""
            className="h-36 w-full rounded-lg border border-white/10 object-cover"
          />
        ) : (
          <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-white/15 text-sm text-white/40">
            No image
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <label className="cursor-pointer rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/80 hover:border-crimson disabled:opacity-60">
            {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              disabled={uploading}
              onChange={(e) => onFile(e.target.files?.[0] || null)}
            />
          </label>
          {value ? (
            <button
              type="button"
              disabled={uploading}
              onClick={onRemove}
              className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/70 hover:border-crimson hover:text-white disabled:opacity-60"
            >
              Remove
            </button>
          ) : null}
        </div>

        {value ? (
          <p className="truncate text-[11px] text-white/35" title={value}>
            {value}
          </p>
        ) : null}

        {toast ? (
          <Toast
            type={toast.type}
            message={toast.message}
            onDone={() => setToast(null)}
          />
        ) : null}
      </div>
    </Field>
  );
}

/** Alias matching the LocalImageField naming from the upload spec. */
export const LocalImageField = ImageUploadField;

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
