import { connectDB } from "@/lib/db";
import { StoredUpload } from "@/lib/models/StoredUpload";
import { parseStoredUploadUrl } from "@/lib/media";

export {
  LEGACY_UPLOAD_PLACEHOLDER,
  UPLOAD_FOLDERS,
  isUploadFolder,
  parseStoredUploadUrl,
  publicImageSrc,
  type UploadFolder,
} from "@/lib/media";

/** Delete Mongo upload when URL points at `/api/uploads/...`. Server-only. */
export async function deleteStoredUploadByUrl(url: string): Promise<boolean> {
  const parsed = parseStoredUploadUrl(url);
  if (!parsed) return false;
  await connectDB();
  const res = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });
  return res.deletedCount > 0;
}
