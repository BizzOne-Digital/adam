import { Schema, models, model, type InferSchemaType } from "mongoose";

const PageSectionSchema = new Schema(
  {
    key: { type: String, required: true },
    title: { type: String, required: true },
    fields: { type: Map, of: String, default: {} },
    images: { type: Map, of: String, default: {} },
  },
  { _id: false },
);

const PageSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "home",
        "about",
        "services",
        "gallery",
        "testimonials",
        "faqs",
        "contact",
      ],
    },
    name: { type: String, required: true },
    sections: { type: [PageSectionSchema], default: [] },
  },
  { timestamps: true },
);

export type PageDoc = InferSchemaType<typeof PageSchema> & { _id: string };

export const Page = models.Page || model("Page", PageSchema);
