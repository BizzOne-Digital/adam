export const GALLERY_CATEGORIES = [
  "All",
  "Before and After",
  "Personal Training",
  "In-Home Training",
  "Gym Training",
  "Online Coaching",
  "Nutrition & Lifestyle",
  "Inclusive Fitness",
] as const;

export type GalleryCategory = Exclude<(typeof GALLERY_CATEGORIES)[number], "All">;

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
}

export const IMAGES = {
  homeHero: "/images/hero-inclusive-training.png",
  homeHeroAlt:
    "Inclusive personal training session with a coach guiding a client during a cable row workout",

  aboutPreview1: "/images/Personal-Training.png",
  aboutPreview1Alt: "Coach providing one-on-one personal training guidance",

  aboutPreview2: "/images/In-Home-Training.png",
  aboutPreview2Alt: "Inclusive adaptive training session with supportive coaching",

  aboutPreview3: "/images/Online-Coaching.png",
  aboutPreview3Alt: "Client building strength and confidence during a workout",

  inclusive: "/images/Every-Body-Deserves.png",
  inclusiveAlt:
    "Supportive coaching environment welcoming clients of different abilities",

  homeTraining: "/images/at-your-home.png",
  homeTrainingAlt: "In-home training session with guided movement coaching",

  gymTraining: "/images/at-your-gym.png",
  gymTrainingAlt: "Strength training session inside a modern gym",

  onlineTraining: "/images/online-from-anywhere.png",
  onlineTrainingAlt: "Client training with remote online coaching support",

  offerBanner: "/images/claim-offer.png",
  offerBannerAlt:
    "Limited time offer: Get 50% off your nutrition program when you purchase training sessions",

  finalCta: "/images/your-stronger.png",
  finalCtaAlt: "Athlete training hard — your stronger life starts here",

  aboutHero: "/images/about-hero.png",
  aboutHeroAlt: "Personal coach preparing for a focused training session",

  aboutTrainer: "/images/about-our-story-1.png",
  aboutTrainerAlt: "Trainer guiding a client through form-focused coaching",

  aboutAdaptive: "/images/about-every-ability.png",
  aboutAdaptiveAlt: "Adaptive fitness coaching with patient, respectful support",

  aboutHome: "/images/about-in-your-home.png",
  aboutHomeAlt: "Home workout environment prepared for mobile personal training",

  aboutGym: "/images/about-at-your-local-gym.png",
  aboutGymAlt: "Gym-based strength training with free weights",

  aboutSenior: "/images/about-our-story-2.png",
  aboutSeniorAlt: "Supportive coaching suited for senior-friendly exercise",

  contactHero: "/images/your-stronger.png",
  contactHeroAlt: "Client ready to begin a consultation for personal training",

  galleryHero: "/images/gallery-personal-1.png",
  galleryHeroAlt: "Cinematic fitness gallery hero featuring athletic training energy",

  servicesHero: "/images/Personal-Training.png",
  servicesHeroAlt: "Overview of personal training service environments and coaching",
} as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "ba1",
    src: "/images/before-after-alyssa.png",
    alt: "Alyssa before and after fitness transformation",
    caption: "Alyssa",
    category: "Before and After",
  },
  {
    id: "ba2",
    src: "/images/before-after-jodi.png",
    alt: "Jodi before and after nutrition client transformation",
    caption: "Jodi · Nutrition Client",
    category: "Before and After",
  },
  {
    id: "ba3",
    src: "/images/before-after-taylor.png",
    alt: "Taylor before and after nutrition and training transformation",
    caption: "Taylor · Nutrition and Training Client",
    category: "Before and After",
  },
  {
    id: "g1",
    src: "/images/gallery-personal-1.png",
    alt: "One-on-one personal training coaching session",
    caption: "Focused One-on-One Coaching",
    category: "Personal Training",
  },
  {
    id: "g2",
    src: "/images/gallery-personal-2.png",
    alt: "Client building strength during a personal training workout",
    caption: "Strength With Intention",
    category: "Personal Training",
  },
  {
    id: "g3",
    src: "/images/gallery-home-1.png",
    alt: "In-home personal training session in a living space",
    caption: "Training That Comes to You",
    category: "In-Home Training",
  },
  {
    id: "g4",
    src: "/images/gallery-home-2.png",
    alt: "Private home workout with mobile personal coaching",
    caption: "Private Home Sessions",
    category: "In-Home Training",
  },
  {
    id: "g5",
    src: "/images/gallery-gym-1.png",
    alt: "Strength training session inside a modern gym",
    caption: "Gym Confidence Starts Here",
    category: "Gym Training",
  },
  {
    id: "g7",
    src: "/images/gallery-online-1.png",
    alt: "Client following a remote online coaching plan",
    caption: "Remote Accountability",
    category: "Online Coaching",
  },
  {
    id: "g8",
    src: "/images/gallery-online-2.png",
    alt: "Athlete training independently with online coaching support",
    caption: "Train From Anywhere",
    category: "Online Coaching",
  },
  {
    id: "g9",
    src: "/images/gallery-nutrition-1.png",
    alt: "Healthy meal prep supporting nutrition and lifestyle goals",
    caption: "Fuel That Supports Training",
    category: "Nutrition & Lifestyle",
  },
  {
    id: "g10",
    src: "/images/gallery-nutrition-2.png",
    alt: "Balanced nutrition habits that support fitness progress",
    caption: "Sustainable Everyday Habits",
    category: "Nutrition & Lifestyle",
  },
  {
    id: "g11",
    src: "/images/Every-Body-Deserves.png",
    alt: "Inclusive fitness coaching with adaptive support",
    caption: "Coaching That Adapts",
    category: "Inclusive Fitness",
  },
  {
    id: "g12",
    src: "/images/about-every-ability.png",
    alt: "Supportive training environment welcoming all abilities",
    caption: "Every Body Belongs",
    category: "Inclusive Fitness",
  },
];
