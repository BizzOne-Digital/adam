"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "Personal Training",
  "In-Home Training",
  "Gym Training",
  "Online Coaching",
  "Nutrition Coaching",
  "Not Sure Yet",
] as const;

const TRAINING_OPTIONS = [
  "At Home",
  "At a Local Gym",
  "Online",
  "Help Me Choose",
] as const;

const CONTACT_METHODS = ["Phone", "Email", "Either"] as const;
const FITNESS_LEVELS = ["Beginner", "Intermediate", "Advanced", "Returning After a Break"] as const;
const GOALS = [
  "Build Strength",
  "Lose Weight",
  "Improve Health",
  "Gain Confidence",
  "Athletic Performance",
  "Mobility & Balance",
  "Other",
] as const;
const SCHEDULES = ["Weekday Mornings", "Weekday Afternoons", "Weekday Evenings", "Weekends", "Flexible"] as const;

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  contactMethod: string;
  serviceInterest: string;
  trainingPreference: string;
  fitnessLevel: string;
  primaryGoal: string;
  preferredSchedule: string;
  accessibility: string;
  message: string;
  offer: boolean;
  consent: boolean;
};

const initial: FormState = {
  fullName: "",
  email: "",
  phone: "",
  contactMethod: "",
  serviceInterest: "",
  trainingPreference: "",
  fitnessLevel: "",
  primaryGoal: "",
  preferredSchedule: "",
  accessibility: "",
  message: "",
  offer: false,
  consent: false,
};

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ice">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-crimson" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-obsidian/70 px-4 py-3.5 text-base text-ice outline-none transition focus:border-crimson focus:ring-2 focus:ring-crimson/30 sm:text-sm sm:py-3";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const offer = searchParams.get("offer");
    const service = searchParams.get("service");
    setForm((prev) => ({
      ...prev,
      offer: offer === "nutrition" || prev.offer,
      serviceInterest:
        service === "nutrition"
          ? "Nutrition Coaching"
          : service === "personal-training"
            ? "Personal Training"
            : service === "in-home-training"
              ? "In-Home Training"
              : service === "gym-training"
                ? "Gym Training"
                : service === "online-coaching"
                  ? "Online Coaching"
                  : prev.serviceInterest,
      message:
        offer === "nutrition" && !prev.message
          ? "I'm interested in the 50% off nutrition program offer with training sessions."
          : prev.message,
    }));
  }, [searchParams]);

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!form.contactMethod) next.contactMethod = "Select a preferred contact method.";
    if (!form.serviceInterest) next.serviceInterest = "Select a service interest.";
    if (!form.trainingPreference) next.trainingPreference = "Select a training preference.";
    if (!form.fitnessLevel) next.fitnessLevel = "Select your fitness level.";
    if (!form.primaryGoal) next.primaryGoal = "Select your primary goal.";
    if (!form.message.trim()) next.message = "Please share a brief message.";
    if (!form.consent) next.consent = "Consent is required to submit this form.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
    setForm(initial);
    setErrors({});
  };

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status !== "loading") setStatus("idle");
  };

  const helper = useMemo(
    () =>
      status === "success"
        ? "Thank you. Your consultation request has been prepared. Please also call or email if you need faster assistance."
        : status === "error"
          ? "Please review the highlighted fields and try again."
          : "Share what you need—we'll help you choose the right training path.",
    [status],
  );

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-crimson/30 bg-graphite/80 p-8 text-center md:p-12"
      >
        <CheckCircle2 className="mx-auto h-14 w-14 text-crimson" />
        <h3 className="font-heading mt-4 text-3xl text-ice">Request Received</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted">{helper}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-md bg-crimson px-5 py-3 text-sm font-bold tracking-wide text-white uppercase"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-white/10 bg-graphite/60 p-4 sm:rounded-3xl sm:p-6 md:p-8"
      aria-describedby="contact-form-helper"
    >
      <p id="contact-form-helper" className="text-sm text-muted">
        {helper}
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" id="fullName" error={errors.fullName}>
          <input
            id="fullName"
            className={inputClass}
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Email Address" id="email" error={errors.email}>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            required
          />
        </Field>
        <Field label="Phone Number" id="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel"
            required
          />
        </Field>
        <Field label="Preferred Contact Method" id="contactMethod" error={errors.contactMethod}>
          <select
            id="contactMethod"
            className={inputClass}
            value={form.contactMethod}
            onChange={(e) => set("contactMethod", e.target.value)}
            required
          >
            <option value="">Select...</option>
            {CONTACT_METHODS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Service Interest" id="serviceInterest" error={errors.serviceInterest}>
          <select
            id="serviceInterest"
            className={inputClass}
            value={form.serviceInterest}
            onChange={(e) => set("serviceInterest", e.target.value)}
            required
          >
            <option value="">Select...</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Training Preference" id="trainingPreference" error={errors.trainingPreference}>
          <select
            id="trainingPreference"
            className={inputClass}
            value={form.trainingPreference}
            onChange={(e) => set("trainingPreference", e.target.value)}
            required
          >
            <option value="">Select...</option>
            {TRAINING_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Fitness Level" id="fitnessLevel" error={errors.fitnessLevel}>
          <select
            id="fitnessLevel"
            className={inputClass}
            value={form.fitnessLevel}
            onChange={(e) => set("fitnessLevel", e.target.value)}
            required
          >
            <option value="">Select...</option>
            {FITNESS_LEVELS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Primary Goal" id="primaryGoal" error={errors.primaryGoal}>
          <select
            id="primaryGoal"
            className={inputClass}
            value={form.primaryGoal}
            onChange={(e) => set("primaryGoal", e.target.value)}
            required
          >
            <option value="">Select...</option>
            {GOALS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Preferred Schedule" id="preferredSchedule">
        <select
          id="preferredSchedule"
          className={inputClass}
          value={form.preferredSchedule}
          onChange={(e) => set("preferredSchedule", e.target.value)}
        >
          <option value="">Select...</option>
          {SCHEDULES.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Accessibility or Accommodation Requirements"
        id="accessibility"
      >
        <textarea
          id="accessibility"
          rows={3}
          className={inputClass}
          value={form.accessibility}
          onChange={(e) => set("accessibility", e.target.value)}
          placeholder="Optional — share any accommodations that help you train comfortably."
        />
      </Field>

      <Field label="Message" id="message" error={errors.message}>
        <textarea
          id="message"
          rows={4}
          className={inputClass}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          required
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          checked={form.offer}
          onChange={(e) => set("offer", e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-obsidian text-crimson"
        />
        <span>I&apos;m interested in the 50% off nutrition program offer.</span>
      </label>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-obsidian text-crimson"
          required
        />
        <span>
          I consent to being contacted about training and coaching services. Please do not
          include detailed medical diagnoses in this form.
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-crimson" role="alert">
          {errors.consent}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-md bg-crimson px-6 py-4 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-[#ff1a25] disabled:opacity-70",
        )}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Submit Consultation Request"
        )}
      </button>
    </form>
  );
}
