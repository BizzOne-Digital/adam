import { Schema, models, model, type InferSchemaType } from "mongoose";
import { UPLOAD_FOLDERS } from "@/lib/media";

export { UPLOAD_FOLDERS, type UploadFolder } from "@/lib/media";

export const ALLOWED_UPLOAD_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const StoredUploadSchema = new Schema(
  {
    folder: {
      type: String,
      required: true,
      enum: UPLOAD_FOLDERS,
      index: true,
    },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true },
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export type StoredUploadDoc = InferSchemaType<typeof StoredUploadSchema> & {
  _id: string;
};

export const StoredUpload =
  models.StoredUpload || model("StoredUpload", StoredUploadSchema);
