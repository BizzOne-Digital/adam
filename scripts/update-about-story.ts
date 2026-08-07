/**
 * Updates About → Our Story section with Adam Erlich bio.
 * Run: npx tsx --env-file=.env.local scripts/update-about-story.ts
 */
import { connectDB } from "../src/lib/db";
import { Page } from "../src/lib/models";

const STORY_FIELDS: Record<string, string> = {
  eyebrow: "Our Story",
  title: "Adam Erlich",
  intro: "Been in fitness industry for over 30 years",
  point1: "Former competitive bodybuilder & powerlifter",
  point2: "Father of a child on the autism spectrum",
  sayingsLabel: "Some of my favorite sayings",
  saying1: "The only bad workout is the one that didn't happen",
  saying2: "The heavier weight in the gym is the front door",
  saying3: "Celebrate progress not perfection",
  sayingsNote: "I live by these sayings",
};

async function main() {
  await connectDB();
  const page = await Page.findOne({ slug: "about" });
  if (!page) {
    console.error("About page not found. Run npm run seed first.");
    process.exit(1);
  }

  page.sections = page.sections.map(
    (s: { key: string; title: string; fields?: Map<string, string> | Record<string, string>; images?: Map<string, string> | Record<string, string> }) => {
    if (s.key !== "story") return s;
    const images =
      s.images instanceof Map
        ? Object.fromEntries(s.images.entries())
        : { ...(s.images as Record<string, string>) };
    return {
      key: s.key,
      title: "Our Story",
      fields: STORY_FIELDS,
      images,
    };
  },
  );  page.markModified("sections");
  await page.save();
  console.log("About → Our Story updated with Adam Erlich bio.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
