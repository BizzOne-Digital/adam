import { Schema, models, model, type InferSchemaType } from "mongoose";

const ServiceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, default: "" },
    overview: { type: String, default: "" },
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    detailImage: { type: String, default: "" },
    benefits: { type: [String], default: [] },
    suitableFor: { type: [String], default: [] },
    expect: { type: [String], default: [] },
    process: {
      type: [
        {
          title: String,
          description: String,
        },
      ],
      default: [],
    },
    faqs: {
      type: [
        {
          question: String,
          answer: String,
        },
      ],
      default: [],
    },
    related: { type: [String], default: [] },
    accent: { type: String, enum: ["red", "blue", "silver"], default: "red" },
    showOffer: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type ServiceDoc = InferSchemaType<typeof ServiceSchema> & { _id: string };

export const ServiceModel = models.Service || model("Service", ServiceSchema);
