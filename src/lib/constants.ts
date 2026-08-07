export const SITE = {
  name: "A1 Fitness & Nutrition",
  shortName: "A1 Fitness",
  tagline: "Strength. Health. Confidence.",
  phone: "(516) 310-3338",
  phoneHref: "tel:+15163103338",
  /** WhatsApp chat — same number as phone */
  whatsappHref: "https://wa.me/15163103338",
  email: "a1training5438@gmail.com",
  emailHref: "mailto:a1training5438@gmail.com",
  social: "@adamsrlichfitness5438",
  socialHref: "https://www.instagram.com/adamsrlichfitness5438",
  socialLabel: "Instagram",
  logo: "/images/a1-fitness-logo.png",
  url: "https://a1fitnessnutrition.com",
  serviceArea: "Serving all of Long Island",
} as const;

/** Build a WhatsApp deep link with an optional prefilled message. */
export function whatsappLink(message?: string, base: string = SITE.whatsappHref) {
  if (!message) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(message)}`;
}

export type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export const OFFER = {
  title: "Get 50% Off Your Nutrition Program When You Purchase Training Sessions",
  note: "Contact A1 Fitness & Nutrition for eligibility and program details.",
  cta: "Claim Your Offer",
  href: "/contact?offer=nutrition",
} as const;

export const CREDIBILITY = [
  "Customized Training",
  "Equipment Provided",
  "Disability-Inclusive Coaching",
  "Flexible Scheduling",
  "In-Person & Online",
] as const;

export const AUDIENCES = [
  {
    title: "Beginners",
    description:
      "Start with clear guidance, supportive coaching, and a plan that builds confidence from day one.",
    icon: "Sparkles",
  },
  {
    title: "Weight-Loss Clients",
    description:
      "Train with structure and accountability designed to support fat loss, energy, and sustainable habits.",
    icon: "Target",
  },
  {
    title: "Strength & Muscle Building",
    description:
      "Progressive programming focused on strength, muscle development, and confident lifting technique.",
    icon: "Dumbbell",
  },
  {
    title: "Seniors",
    description:
      "Safe, respectful coaching that prioritizes mobility, balance, strength, and independence.",
    icon: "Heart",
  },
  {
    title: "Individuals With Disabilities",
    description:
      "Adaptive sessions shaped around ability, comfort, communication preferences, and long-term progress.",
    icon: "Accessibility",
  },
  {
    title: "Athletes",
    description:
      "Performance-minded training that supports sport goals, conditioning, and resilient movement.",
    icon: "Trophy",
  },
  {
    title: "Online Coaching Clients",
    description:
      "Remote plans, check-ins, and accountability for clients who need flexible coaching from anywhere.",
    icon: "Monitor",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Tell Us Your Goals",
    description:
      "Share your fitness goals, schedule preferences, and any accessibility needs so training can start with clarity.",
  },
  {
    step: "02",
    title: "Receive Your Personal Plan",
    description:
      "Get a customized program shaped around your body, abilities, lifestyle, and the results you want.",
  },
  {
    step: "03",
    title: "Train With Expert Support",
    description:
      "Train at home, at your gym, or online with guided coaching, form support, and consistent accountability.",
  },
  {
    step: "04",
    title: "Build Lasting Results",
    description:
      "Build strength, health, and confidence through sustainable progress that fits real life.",
  },
] as const;

export const VALUES = [
  {
    title: "Respect",
    description:
      "Every client is met with dignity, clear communication, and a coaching environment that feels supportive.",
  },
  {
    title: "Personalization",
    description:
      "Programs are built around your body, schedule, abilities, and goals—not a one-size-fits-all template.",
  },
  {
    title: "Consistency",
    description:
      "Sustainable routines and accountability help turn short-term motivation into lasting progress.",
  },
  {
    title: "Confidence",
    description:
      "Technique guidance and progressive challenge help you feel stronger and more capable in every session.",
  },
  {
    title: "Accessibility",
    description:
      "Coaching adapts with patience and care so clients of different ages, experience levels, and abilities can thrive.",
  },
  {
    title: "Sustainable Progress",
    description:
      "Results are built through realistic habits, smart programming, and training that fits everyday life.",
  },
] as const;

export const WHY_CHOOSE = [
  "Customized plans for every fitness level and ability",
  "In-home sessions with equipment provided across Long Island",
  "Gym coaching focused on form, confidence, and progression",
  "Online support for flexible remote accountability",
  "Inclusive adaptive coaching with respect and care",
  "Nutrition guidance that supports real-life routines",
] as const;

export const BUSINESS_HOURS =
  "Flexible scheduling by appointment across Long Island. Contact A1 Fitness & Nutrition to find a time that fits your routine.";
