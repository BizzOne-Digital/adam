import { createMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for A1 Fitness & Nutrition. Learn how consultation inquiries and contact information are handled.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6">
      <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-crimson uppercase">
        Legal
      </p>
      <h1 className="font-heading text-[clamp(2.25rem,9vw,3.5rem)] text-ice">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">
        Last updated: {new Date().getFullYear()}. This policy explains how{" "}
        {SITE.name} handles information submitted through this website.
      </p>

      <div className="prose-invert mt-10 space-y-8 text-sm leading-relaxed text-muted">
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">Information We Collect</h2>
          <p>
            When you submit the contact form, you may provide your name, email address,
            phone number, service preferences, training preferences, fitness level,
            goals, schedule preferences, optional accessibility notes, and a message.
            We do not ask for detailed medical diagnoses through the general contact form.
          </p>
        </div>
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">How Information Is Used</h2>
          <p>
            Contact details and consultation information are used to respond to inquiries,
            discuss training options, and provide requested coaching services. Information
            is not sold to third parties.
          </p>
        </div>
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">Communications</h2>
          <p>
            By submitting the form, you consent to being contacted via your preferred
            method regarding training and coaching services. You may request to stop
            communications at any time by emailing{" "}
            <a href={SITE.emailHref} className="text-crimson hover:underline">
              {SITE.email}
            </a>
            .
          </p>
        </div>
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">Website Analytics & Cookies</h2>
          <p>
            This website may use standard browser storage for experience features such as
            session-based intro preferences. If additional analytics tools are added later,
            this policy will be updated accordingly.
          </p>
        </div>
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">Contact</h2>
          <p>
            For privacy questions, contact {SITE.name} at{" "}
            <a href={SITE.emailHref} className="text-crimson hover:underline">
              {SITE.email}
            </a>{" "}
            or{" "}
            <a href={SITE.phoneHref} className="text-crimson hover:underline">
              {SITE.phone}
            </a>
            .
          </p>
        </div>
      </div>

      <Link href="/contact" className="mt-10 inline-block text-sm text-crimson hover:underline">
        Return to Contact
      </Link>
    </section>
  );
}
