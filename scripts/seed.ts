import { connectDB } from "@/lib/db";
import {
  Settings,
  Page,
  ServiceModel,
  GalleryCategory,
  GalleryItem,
  Testimonial,
  Faq,
} from "@/lib/models";
import { SERVICES } from "@/lib/services";
import { GALLERY_ITEMS } from "@/lib/images";
import { SITE, OFFER, BUSINESS_HOURS } from "@/lib/constants";
import { REAL_FAQS, REAL_TESTIMONIALS } from "@/lib/content/reviews";

type SectionInput = {
  key: string;
  title: string;
  fields?: Record<string, string>;
  images?: Record<string, string>;
};

function section(
  key: string,
  title: string,
  fields: Record<string, string> = {},
  images: Record<string, string> = {},
): SectionInput {
  return { key, title, fields, images };
}

const PAGES: { slug: string; name: string; sections: SectionInput[] }[] = [
  {
    slug: "home",
    name: "Home",
    sections: [
      section(
        "hero",
        "Hero",
        {
          eyebrow: "Personal Training Across Long Island",
          titleLine1: "Build Strength.",
          titleLine2: "Own Your Confidence.",
          subtitle:
            "Customized coaching at the gym, in your home, or online—built around your goals, abilities, and lifestyle.",
          ctaPrimary: "Start Your Journey",
          ctaSecondary: "Explore Services",
          badge1: "All Fitness Levels",
          badge2: "Inclusive Coaching",
        },
        { background: "/images/hero-inclusive-training.png" },
      ),
      section("credibility", "Credibility Strip", {
        item1: "Customized Training",
        item2: "Equipment Provided",
        item3: "Disability-Inclusive Coaching",
        item4: "Flexible Scheduling",
        item5: "In-Person & Online",
      }),
      section(
        "aboutPreview",
        "About Preview",
        {
          eyebrow: "About A1",
          title: "Fitness Built Around You",
          body: "At A1 Fitness & Nutrition, the mission is simple: to help you become the strongest, healthiest and most confident version of yourself. Every program is created around your body, abilities, lifestyle and goals.",
          cta: "Meet Your Coach",
        },
        {
          photo1: "/images/Personal-Training.png",
          photo2: "/images/In-Home-Training.png",
          photo3: "/images/Online-Coaching.png",
        },
      ),
      section("whoWeHelp", "Who We Help", {
        eyebrow: "Why Choose Us?",
        title: "Training for Every Body",
      }),
      section("services", "Services Showcase", {
        eyebrow: "Our Services",
        title: "Choose How You Train",
      }),
      section(
        "inclusive",
        "Inclusive Feature",
        {
          title: "Every Body Deserves to Feel Strong",
          body: "We're proud to coach people of all ages, abilities, and backgrounds. Our inclusive approach ensures that everyone has the support and respect they deserve.",
          point1: "Accessible Environments",
          point2: "Adaptive Approach",
          point3: "Empowering Coaching",
        },
        { image: "/images/Every-Body-Deserves.png" },
      ),
      section("locations", "Train Where You Are", {
        title: "Train Where You Are",
      }),
      section("process", "How It Works", {
        eyebrow: "Our Process",
        title: "Your Journey, Built for You",
      }),
      section(
        "offer",
        "Offer Banner",
        {
          eyebrow: "Limited Time Offer",
          title: "Get 50% Off Your Nutrition Program",
          subtitle: "When You Purchase Training Sessions",
          cta: "Claim Your Offer",
        },
        { background: "/images/claim-offer.png" },
      ),
      section("testimonials", "Testimonials Preview", {
        eyebrow: "Client Feedback",
        title: "Real Support. Real Confidence.",
      }),
      section(
        "finalCta",
        "Final CTA",
        {
          title: "Your Stronger Life Starts Here",
          subtitle: "Let's build a plan that works for you.",
          ctaPrimary: "Book a Consultation",
        },
        { background: "/images/your-stronger.png" },
      ),
    ],
  },
  {
    slug: "about",
    name: "About",
    sections: [
      section(
        "hero",
        "Hero",
        {
          eyebrow: "The Story Behind A1",
          title: "Built to Help You Become Your Strongest Self",
          subtitle:
            "At A1 Fitness & Nutrition, the mission is simple: help you become the strongest, healthiest version of yourself through customized coaching for every fitness level and ability.",
          cta: "Start Your Journey",
        },
        { background: "/images/about-hero.png" },
      ),
      section(
        "story",
        "Our Story",
        {
          eyebrow: "Our Story",
          title: "Adam Erlich",
          intro: "Been in fitness industry for over 30 years",
          point1: "Former competitive bodybuilder & powerlifter",
          point2: "Father of a child on the autism spectrum",
          point3: "ISSA Certified Personal Trainer",
          point4: "ISSA Certified Nutrition Coach",
          sayingsLabel: "Some of my favorite sayings",
          saying1: "The only bad workout is the one that didn't happen",
          saying2: "The heavier weight in the gym is the front door",
          saying3: "Celebrate progress not perfection",
          sayingsNote: "I live by these sayings",
        },
        {
          image1: "/images/about-our-story-1.png",
          image2: "/images/about-our-story-2.png",
          image3: "/images/about-our-story-3.png",
        },
      ),
      section(
        "mission",
        "Mission",
        {
          eyebrow: "Our Mission",
          title: "Strength, Health, and Confidence for Every Client",
          body: "Deliver customized coaching that builds lasting strength and confidence across Long Island.",
        },
        { background: "/images/about-our-mission.png" },
      ),
      section("audiences", "Who We Help", {
        eyebrow: "Who We Help",
        title: "Coaching for Every Fitness Journey",
      }),
      section(
        "inclusive",
        "Inclusive Banner",
        {
          title: "Every Ability. Every Goal. Every Person.",
          body: "A1 Fitness & Nutrition proudly welcomes individuals of different ages, experience levels and abilities.",
        },
        { background: "/images/about-every-ability.png" },
      ),
      section("values", "Values", {
        eyebrow: "Our Values",
        title: "What A1 Stands For",
      }),
      section(
        "approach",
        "Approach",
        {
          eyebrow: "The A1 Approach",
          title: "A Clear Path to Lasting Results",
        },
        { image: "/images/about-our-approach.png" },
      ),
      section("locations", "Where You Can Train", {
        eyebrow: "Flexibility",
        title: "Train Where It Works for You",
      }),
      section(
        "support",
        "Support",
        {
          eyebrow: "Ongoing Support",
          title: "Support That Moves With You",
        },
        { image: "/images/about-sec-after-where-you-can.png" },
      ),
      section(
        "offer",
        "Offer",
        {
          eyebrow: "Limited Offer",
          title: "Train Stronger. Eat Smarter.",
          body: "Get 50% off your nutrition program when you purchase training sessions.",
          cta: "Claim Your Offer",
        },
        { background: "/images/claim-offer.png" },
      ),
    ],
  },
  {
    slug: "services",
    name: "Services",
    sections: [
      section(
        "hero",
        "Hero",
        {
          title: "Services",
          subtitle:
            "Choose the coaching format that fits your lifestyle—home, gym, or online.",
        },
        { background: "/images/Personal-Training.png" },
      ),
    ],
  },
  {
    slug: "gallery",
    name: "Gallery",
    sections: [
      section(
        "hero",
        "Hero",
        {
          title: "Gallery",
          subtitle:
            "A cinematic look at training environments, coaching moments, and inclusive fitness across Long Island.",
        },
        { background: "/images/gallery-personal-1.png" },
      ),
    ],
  },
  {
    slug: "testimonials",
    name: "Testimonials",
    sections: [
      section(
        "hero",
        "Hero",
        {
          title: "Testimonials",
          subtitle: "Real support. Real confidence. Hear from clients across Long Island.",
        },
        { background: "/images/your-stronger.png" },
      ),
    ],
  },
  {
    slug: "faqs",
    name: "FAQs",
    sections: [
      section(
        "hero",
        "Hero",
        {
          title: "FAQs",
          subtitle: "Quick answers about training, nutrition, and getting started with A1.",
        },
        { background: "/images/Online-Coaching.png" },
      ),
    ],
  },
  {
    slug: "contact",
    name: "Contact",
    sections: [
      section(
        "hero",
        "Hero",
        {
          title: "Contact",
          subtitle:
            "Start your consultation and take the next step toward strength, health, and confidence.",
        },
        { background: "/images/your-stronger.png" },
      ),
    ],
  },
];

async function seed() {
  await connectDB();

  await Settings.deleteMany({});
  await Settings.create({
    name: SITE.name,
    shortName: SITE.shortName,
    tagline: SITE.tagline,
    phone: SITE.phone,
    phoneHref: SITE.phoneHref,
    email: SITE.email,
    emailHref: SITE.emailHref,
    social: SITE.social,
    socialHref: SITE.socialHref,
    socialLabel: SITE.socialLabel || "Instagram",
    logo: SITE.logo,
    url: SITE.url,
    serviceArea: SITE.serviceArea,
    businessHours: BUSINESS_HOURS,
    offerTitle: OFFER.title,
    offerNote: OFFER.note,
    offerCta: OFFER.cta,
    offerHref: OFFER.href,
  });

  await Page.deleteMany({});
  for (const page of PAGES) {
    await Page.create(page);
  }

  await ServiceModel.deleteMany({});
  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    await ServiceModel.create({
      slug: s.slug,
      title: s.title,
      summary: s.summary,
      overview: s.overview,
      image: s.image,
      imageAlt: s.imageAlt,
      heroImage: s.image,
      detailImage: s.image,
      benefits: s.benefits,
      suitableFor: s.suitableFor,
      expect: s.expect,
      process: s.process,
      faqs: s.faqs,
      related: s.related,
      accent: s.accent,
      showOffer: Boolean(s.showOffer),
      order: i,
      published: true,
    });
  }

  await GalleryItem.deleteMany({});
  await GalleryCategory.deleteMany({});

  const categoryNames = [
    "Personal Training",
    "In-Home Training",
    "Gym Training",
    "Online Coaching",
    "Nutrition & Lifestyle",
    "Inclusive Fitness",
  ];

  const categoryMap = new Map<string, string>();
  for (let i = 0; i < categoryNames.length; i++) {
    const name = categoryNames[i];
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const cat = await GalleryCategory.create({ name, slug, order: i });
    categoryMap.set(name, String(cat._id));
  }

  for (let i = 0; i < GALLERY_ITEMS.length; i++) {
    const item = GALLERY_ITEMS[i];
    const categoryId = categoryMap.get(item.category);
    if (!categoryId) continue;
    await GalleryItem.create({
      categoryId,
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      order: i,
    });
  }

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

  console.log("Seed complete: settings, pages, services, gallery, testimonials, faqs");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
