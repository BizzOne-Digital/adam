/**
 * Upserts Before and After gallery category + Alyssa / Jodi / Taylor items.
 * Run: npx tsx --env-file=.env.local scripts/seed-before-after.ts
 */
import { connectDB } from "../src/lib/db";
import { GalleryCategory, GalleryItem } from "../src/lib/models";

const ITEMS = [
  {
    src: "/images/before-after-alyssa.png",
    alt: "Alyssa before and after fitness transformation",
    caption: "Alyssa",
    order: 0,
  },
  {
    src: "/images/before-after-jodi.png",
    alt: "Jodi before and after nutrition client transformation",
    caption: "Jodi · Nutrition Client",
    order: 1,
  },
  {
    src: "/images/before-after-taylor.png",
    alt: "Taylor before and after nutrition and training transformation",
    caption: "Taylor · Nutrition and Training Client",
    order: 2,
  },
];

async function main() {
  await connectDB();

  let cat = await GalleryCategory.findOne({ name: "Before and After" });
  if (!cat) {
    cat = await GalleryCategory.create({
      name: "Before and After",
      slug: "before-and-after",
      order: 0,
    });
    console.log("Created category: Before and After");
  } else {
    console.log("Category already exists:", cat._id);
  }

  // Remove previous before-after items for this category so we don't duplicate
  await GalleryItem.deleteMany({
    categoryId: cat._id,
    src: { $in: ITEMS.map((i) => i.src) },
  });

  for (const item of ITEMS) {
    await GalleryItem.create({
      categoryId: cat._id,
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      order: item.order,
    });
    console.log("Added:", item.caption);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
