import { Schema, models, model, type InferSchemaType } from "mongoose";

const SettingsSchema = new Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    tagline: { type: String, default: "" },
    phone: { type: String, required: true },
    phoneHref: { type: String, required: true },
    email: { type: String, required: true },
    emailHref: { type: String, required: true },
    social: { type: String, default: "" },
    socialHref: { type: String, default: "" },
    socialLabel: { type: String, default: "Instagram" },
    logo: { type: String, default: "/images/a1-fitness-logo.png" },
    url: { type: String, default: "" },
    serviceArea: { type: String, default: "" },
    businessHours: { type: String, default: "" },
    offerTitle: { type: String, default: "" },
    offerNote: { type: String, default: "" },
    offerCta: { type: String, default: "Claim Your Offer" },
    offerHref: { type: String, default: "/contact?offer=nutrition" },
  },
  { timestamps: true },
);

export type SettingsDoc = InferSchemaType<typeof SettingsSchema> & { _id: string };

export const Settings =
  models.Settings || model("Settings", SettingsSchema);
