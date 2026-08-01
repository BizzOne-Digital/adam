import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { SITE, OFFER } from "@/lib/constants";

export const metadata = createMetadata({
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for using the A1 Fitness & Nutrition website and requesting coaching services.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6">
      <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-crimson uppercase">
        Legal
      </p>
      <h1 className="font-heading text-[clamp(2.25rem,9vw,3.5rem)] text-ice">Terms and Conditions</h1>
      <p className="mt-4 text-sm text-muted">
        By using the {SITE.name} website, you agree to the following terms.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted">
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">Services</h2>
          <p>
            Website content describes personal training, in-home training, gym training,
            online coaching, and nutrition coaching services offered across Long Island and
            online. Service details may be customized after consultation. Contact for
            personalized program options.
          </p>
        </div>
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">No Medical Advice</h2>
          <p>
            Information on this website is for general fitness education and marketing
            purposes. It is not medical advice, diagnosis, or treatment. Nutrition coaching
            is lifestyle-focused and is not presented as medical nutrition therapy.
            Consult a qualified healthcare professional before beginning a new exercise or
            nutrition program.
          </p>
        </div>
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">Promotional Offers</h2>
          <p>
            Current promotional messaging includes: &quot;{OFFER.title}&quot;. Eligibility,
            availability, and program details are confirmed during consultation. Offers may
            change or end without notice.
          </p>
        </div>
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">Website Use</h2>
          <p>
            You agree not to misuse website forms, attempt to disrupt the site, or submit
            unlawful content. Content, branding, and design elements are owned by{" "}
            {SITE.name} unless otherwise noted.
          </p>
        </div>
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">Limitation of Liability</h2>
          <p>
            While every effort is made to keep website information accurate and up to date,
            {SITE.name} is not liable for decisions made solely based on website content.
            Training outcomes vary by individual.
          </p>
        </div>
        <div>
          <h2 className="font-display mb-2 text-2xl text-ice">Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={SITE.emailHref} className="text-crimson hover:underline">
              {SITE.email}
            </a>{" "}
            or by calling{" "}
            <a href={SITE.phoneHref} className="text-crimson hover:underline">
              {SITE.phone}
            </a>
            .
          </p>
        </div>
      </div>

      <Link href="/" className="mt-10 inline-block text-sm text-crimson hover:underline">
        Return Home
      </Link>
    </section>
  );
}
