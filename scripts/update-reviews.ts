/**
 * Updates only FAQs + testimonials without wiping other CMS content.
 */
import { connectDB } from "@/lib/db";
import { Faq, Testimonial } from "@/lib/models";
import { REAL_FAQS, REAL_TESTIMONIALS } from "@/lib/content/reviews";

async function main() {
  await connectDB();

  await Testimonial.deleteMany({});
  await Testimonial.insertMany(
    REAL_TESTIMONIALS.map((t, i) => ({
      quote: t.quote,
      name: t.name,
      detail: t.detail,
      order: i,
      published: true,
    })),
  );

  await Faq.deleteMany({});
  await Faq.insertMany(
    REAL_FAQS.map((f, i) => ({
      question: f.question,
      answer: f.answer,
      order: i,
      published: true,
    })),
  );

  console.log(
    `Updated ${REAL_TESTIMONIALS.length} testimonials and ${REAL_FAQS.length} FAQs`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
