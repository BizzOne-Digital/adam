import { Schema, models, model, type InferSchemaType } from "mongoose";

const TestimonialSchema = new Schema(
  {
    quote: { type: String, required: true },
    name: { type: String, required: true },
    detail: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type TestimonialDoc = InferSchemaType<typeof TestimonialSchema> & {
  _id: string;
};

export const Testimonial =
  models.Testimonial || model("Testimonial", TestimonialSchema);
