export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export const LEGACY_UPLOAD_PLACEHOLDER = "/images/a1-fitness-logo.png";

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

/** Parse `/api/uploads/{folder}/{filename}` into parts, or null if invalid. */
export function parseStoredUploadUrl(url: string): {
  folder: UploadFolder;
  filename: string;
} | null {
  if (!url?.startsWith("/api/uploads/")) return null;
  const rest = url.slice("/api/uploads/".length);
  const slash = rest.indexOf("/");
  if (slash <= 0) return null;
  const folder = rest.slice(0, slash);
  const filename = rest.slice(slash + 1);
  if (!isUploadFolder(folder)) return null;
  if (!filename || filename.includes("..") || filename.includes("/")) return null;
  return { folder, filename };
}

/**
 * Resolve a content image URL for the frontend.
 * Legacy disk `/uploads/...` paths fall back to a placeholder (not on Vercel FS).
 */
export function publicImageSrc(src: string | null | undefined): string {
  if (!src) return LEGACY_UPLOAD_PLACEHOLDER;
  if (src.startsWith("/uploads/") || src.startsWith("uploads/")) {
    return LEGACY_UPLOAD_PLACEHOLDER;
  }
  return src;
}
