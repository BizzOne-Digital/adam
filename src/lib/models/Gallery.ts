import { Schema, models, model, Types, type InferSchemaType } from "mongoose";

const GalleryCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const GalleryItemSchema = new Schema(
  {
    categoryId: { type: Types.ObjectId, ref: "GalleryCategory", required: true },
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    caption: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type GalleryCategoryDoc = InferSchemaType<typeof GalleryCategorySchema> & {
  _id: string;
};
export type GalleryItemDoc = InferSchemaType<typeof GalleryItemSchema> & {
  _id: string;
};

export const GalleryCategory =
  models.GalleryCategory || model("GalleryCategory", GalleryCategorySchema);
export const GalleryItem =
  models.GalleryItem || model("GalleryItem", GalleryItemSchema);
