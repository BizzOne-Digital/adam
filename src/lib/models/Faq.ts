import { Schema, models, model, type InferSchemaType } from "mongoose";

const FaqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type FaqDoc = InferSchemaType<typeof FaqSchema> & { _id: string };

export const Faq = models.Faq || model("Faq", FaqSchema);
