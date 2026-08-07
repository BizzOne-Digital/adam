import { randomBytes } from "crypto";
import { connectDB } from "@/lib/db";
import {
  ALLOWED_UPLOAD_MIME,
  MAX_UPLOAD_BYTES,
  StoredUpload,
} from "@/lib/models/StoredUpload";
import { deleteStoredUploadByUrl, isUploadFolder } from "@/lib/uploads";

export type UploadResult =
  | {
      ok: true;
      success: true;
      url: string;
      filename: string;
      size: number;
      folder: string;
    }
  | { ok: false; status: number; error: string };

export async function storeUploadedFile(
  file: File,
  folderRaw: string,
  replaceUrl = "",
): Promise<UploadResult> {
  if (!isUploadFolder(folderRaw)) {
    return {
      ok: false,
      status: 400,
      error: "Invalid folder. Use products | gallery | pages | misc",
    };
  }

  const mimeType = file.type;
  const ext = ALLOWED_UPLOAD_MIME[mimeType];
  if (!ext) {
    return {
      ok: false,
      status: 400,
      error: "Invalid type. Allowed: jpeg, png, webp, gif",
    };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, status: 400, error: "File too large. Max size is 8MB" };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;

  await connectDB();
  await StoredUpload.create({
    folder: folderRaw,
    filename,
    mimeType,
    size: buffer.length,
    data: buffer,
  });

  if (replaceUrl.startsWith("/api/uploads/")) {
    await deleteStoredUploadByUrl(replaceUrl).catch(() => false);
  }

  return {
    ok: true,
    success: true,
    url: `/api/uploads/${folderRaw}/${filename}`,
    filename,
    size: buffer.length,
    folder: folderRaw,
  };
}
