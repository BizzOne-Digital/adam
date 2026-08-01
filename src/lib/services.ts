export type ServiceAccent = "red" | "blue" | "silver";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  href: string;
  summary: string;
  overview: string;
  image: string;
  imageAlt: string;
  benefits: string[];
  suitableFor: string[];
  expect: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
  related: string[];
  accent: ServiceAccent;
  showOffer?: boolean;
}

export const SERVICES: Service[] = [
  {
    slug: "personal-training",
    title: "Personal Training",
    href: "/services/personal-training",
    summary:
      "One-on-one coaching designed around your goals, abilities, and lifestyle with focused guidance and accountability.",
    overview:
      "One-on-one workouts designed around your individual goals, abilities, experience and lifestyle. Receive focused coaching, proper exercise guidance, accountability and a program that grows with you.",
    image: "/images/Personal-Training.png",
    imageAlt: "Personal trainer coaching a client through a strength session",
    benefits: [
      "Personalized program",
      "One-on-one attention",
      "Technique guidance",
      "Accountability",
      "Progress tracking",
      "Adaptable workout intensity",
    ],
    suitableFor: [
      "Beginners who want clear coaching and confidence",
      "Clients focused on fat loss, strength, or conditioning",
      "Anyone who prefers structured one-on-one support",
      "Individuals who need adaptable session intensity",
    ],
    expect: [
      "A consultation to clarify goals, preferences, and accessibility needs",
      "Customized sessions with form-focused coaching",
      "Progressive programming that evolves with your results",
      "Clear communication and accountability between sessions",
    ],
    process: [
      {
        title: "Consult",
        description:
          "Share your goals, training preferences, and any accommodations so coaching starts with clarity.",
      },
      {
        title: "Plan",
        description:
          "Receive a personalized training structure built around your body, lifestyle, and schedule.",
      },
      {
        title: "Train",
        description:
          "Work one-on-one with guided technique support, motivation, and progressive challenge.",
      },
      {
        title: "Progress",
        description:
          "Track momentum and refine the plan as strength, confidence, and consistency grow.",
      },
    ],
    faqs: [
      {
        question: "Do I need prior gym experience?",
        answer:
          "No. Personal training is available for beginners and experienced clients. Sessions are adapted to your current level.",
      },
      {
        question: "Where do personal training sessions take place?",
        answer:
          "Sessions can be arranged based on your preferred format—home, local gym access permitting, or as part of a broader coaching plan.",
      },
      {
        question: "Are programs customized?",
        answer:
          "Yes. Every program is shaped around your goals, abilities, lifestyle, and preferred training environment.",
      },
      {
        question: "Is pricing listed online?",
        answer:
          "Contact for personalized program options. The right plan depends on your goals, format, and schedule.",
      },
    ],
    related: ["in-home-training", "gym-training", "nutrition-coaching"],
    accent: "red",
  },
  {
    slug: "in-home-training",
    title: "In-Home Training",
    href: "/services/in-home-training",
    summary:
      "Mobile personal training across Long Island with equipment provided for private, convenient sessions at home.",
    overview:
      "A1 Fitness & Nutrition brings personal training directly to your home, making professional coaching convenient, comfortable and stress-free.",
    image: "/images/In-Home-Training.png",
    imageAlt: "In-home personal training session in a living space",
    benefits: [
      "Mobile personal training throughout Long Island",
      "Equipment provided for home sessions",
      "Customized workouts for available space",
      "Flexible scheduling",
      "Reduced travel time",
      "Comfortable and private environment",
    ],
    suitableFor: [
      "Busy clients who want training without commuting",
      "People who prefer privacy at home",
      "Beginners building confidence in a familiar space",
      "Anyone needing adapted sessions in a controlled environment",
    ],
    expect: [
      "Equipment brought for effective home-based workouts",
      "Programming shaped around your available space",
      "Private coaching with clear form guidance",
      "Scheduling designed around your routine",
    ],
    process: [
      {
        title: "Book",
        description:
          "Request in-home coaching and share your location preferences across Long Island.",
      },
      {
        title: "Prepare",
        description:
          "Discuss goals, space considerations, and any accessibility needs before the first session.",
      },
      {
        title: "Train at Home",
        description:
          "Receive guided workouts with equipment provided and coaching tailored to your environment.",
      },
      {
        title: "Build Consistency",
        description:
          "Develop a sustainable home-training rhythm with progressive updates over time.",
      },
    ],
    faqs: [
      {
        question: "Do I need equipment at home?",
        answer:
          "No. Equipment can be provided for home sessions so you can train effectively without a full home gym.",
      },
      {
        question: "Do you serve all of Long Island?",
        answer:
          "Yes. In-home training is available throughout Long Island, subject to scheduling and consultation.",
      },
      {
        question: "Can workouts be adapted for small spaces?",
        answer:
          "Absolutely. Sessions are customized for the space you have while staying effective and safe.",
      },
      {
        question: "Is in-home training private?",
        answer:
          "Yes. Home sessions offer a private, comfortable environment with one-on-one coaching.",
      },
    ],
    related: ["personal-training", "online-coaching", "nutrition-coaching"],
    accent: "red",
  },
  {
    slug: "gym-training",
    title: "Gym Training",
    href: "/services/gym-training",
    summary:
      "Meet at your local gym for form-focused coaching, progressive programming, and confident equipment use.",
    overview:
      "Meet at your local gym for focused, personalized coaching that helps you train with confidence and use gym equipment correctly.",
    image: "/images/Gym-Training.png",
    imageAlt: "Client training with guidance in a modern gym",
    benefits: [
      "Exercise-form guidance",
      "Strength and conditioning",
      "Personalized workout structure",
      "Confidence using gym equipment",
      "Progressive programming",
      "Goal-focused sessions",
    ],
    suitableFor: [
      "Clients with access to a local gym",
      "Lifters who want better form and structure",
      "People building strength and conditioning",
      "Anyone who prefers training in a full gym environment",
    ],
    expect: [
      "Sessions at an agreed local gym where access and permission are available",
      "Clear coaching on technique and equipment use",
      "Progressive strength and conditioning work",
      "Programming aligned with your goals and experience",
    ],
    process: [
      {
        title: "Align",
        description:
          "Confirm gym access preferences and define strength, conditioning, or physique goals.",
      },
      {
        title: "Structure",
        description:
          "Build a personalized workout framework that fits the equipment available at your gym.",
      },
      {
        title: "Coach",
        description:
          "Train with hands-on form guidance and progressive session intensity.",
      },
      {
        title: "Advance",
        description:
          "Update programming as confidence, strength, and recovery improve.",
      },
    ],
    faqs: [
      {
        question: "Does A1 Fitness own a gym?",
        answer:
          "No. Gym training sessions take place at an agreed local gym where access and permission are available.",
      },
      {
        question: "Will I learn how to use equipment correctly?",
        answer:
          "Yes. Form guidance and equipment confidence are core parts of gym-based coaching.",
      },
      {
        question: "Is this only for advanced lifters?",
        answer:
          "No. Gym training can support beginners through advanced clients with appropriately scaled programming.",
      },
      {
        question: "Can gym training pair with nutrition coaching?",
        answer:
          "Yes. Many clients combine gym sessions with nutrition coaching for more complete support.",
      },
    ],
    related: ["personal-training", "nutrition-coaching", "online-coaching"],
    accent: "red",
  },
  {
    slug: "online-coaching",
    title: "Online Coaching",
    href: "/services/online-coaching",
    summary:
      "Remote workout plans, check-ins, and accountability so you can train effectively from anywhere.",
    overview:
      "Receive workout plans, nutrition guidance, accountability and ongoing support from anywhere.",
    image: "/images/Online-Coaching.png",
    imageAlt: "Athlete following an online coaching workout plan",
    benefits: [
      "Customized workout plans",
      "Remote check-ins",
      "Progress tracking",
      "Accountability",
      "Exercise guidance",
      "Flexible access",
      "Suitable for clients outside in-person scheduling areas",
    ],
    suitableFor: [
      "Clients who need flexible remote support",
      "People outside convenient in-person scheduling areas",
      "Busy schedules that benefit from digital accountability",
      "Anyone wanting structured plans with ongoing guidance",
    ],
    expect: [
      "Personalized remote programming based on your goals and equipment",
      "Regular check-ins for accountability and adjustments",
      "Exercise guidance to support confident independent training",
      "Flexible support that fits your lifestyle",
    ],
    process: [
      {
        title: "Connect",
        description:
          "Share your goals, training environment, and preferred communication style.",
      },
      {
        title: "Customize",
        description:
          "Receive a remote plan designed for your schedule, equipment, and experience level.",
      },
      {
        title: "Check In",
        description:
          "Stay accountable with remote support, progress reviews, and coaching feedback.",
      },
      {
        title: "Refine",
        description:
          "Adjust the plan as your strength, consistency, and lifestyle needs evolve.",
      },
    ],
    faqs: [
      {
        question: "Do I need a full home gym for online coaching?",
        answer:
          "No. Plans can be adapted to the equipment and space you have available.",
      },
      {
        question: "How does accountability work online?",
        answer:
          "Through scheduled check-ins, progress tracking, and ongoing coaching communication.",
      },
      {
        question: "Can online coaching include nutrition guidance?",
        answer:
          "Yes. Online coaching can include nutrition support as part of a broader plan when requested.",
      },
      {
        question: "Is online coaching only for advanced clients?",
        answer:
          "No. Online coaching supports beginners through experienced clients with tailored programming.",
      },
    ],
    related: ["personal-training", "nutrition-coaching", "in-home-training"],
    accent: "blue",
  },
  {
    slug: "nutrition-coaching",
    title: "Nutrition Coaching",
    href: "/services/nutrition-coaching",
    summary:
      "Practical, sustainable nutrition guidance that supports training goals, energy, and everyday routines.",
    overview:
      "Learn sustainable eating habits that support your fitness goals, energy and everyday routine.",
    image: "/images/Nutrition-Coaching.png",
    imageAlt: "Healthy meal preparation supporting nutrition coaching goals",
    benefits: [
      "Practical nutrition guidance",
      "Goal-aligned eating habits",
      "Accountability",
      "Sustainable routines",
      "Flexible strategies",
      "Coordination with training goals",
    ],
    suitableFor: [
      "Clients who want nutrition support alongside training",
      "People seeking sustainable habit-based coaching",
      "Anyone looking for flexible strategies that fit real life",
      "Clients interested in the current nutrition program offer",
    ],
    expect: [
      "Lifestyle-focused nutrition coaching—not medical nutrition therapy",
      "Practical strategies aligned with your training goals",
      "Accountability and habit support over time",
      "Guidance that respects your routine and preferences",
    ],
    process: [
      {
        title: "Assess",
        description:
          "Review your goals, training format, and everyday routine to shape realistic nutrition support.",
      },
      {
        title: "Guide",
        description:
          "Build practical eating habits that support energy, consistency, and training progress.",
      },
      {
        title: "Support",
        description:
          "Stay accountable with coaching that adapts as your schedule and goals change.",
      },
      {
        title: "Sustain",
        description:
          "Reinforce flexible strategies designed for long-term consistency—not short-term extremes.",
      },
    ],
    faqs: [
      {
        question: "Is this medical nutrition therapy?",
        answer:
          "No. Nutrition coaching is lifestyle-focused and is not presented as medical nutrition therapy. Consult a qualified healthcare professional for medical concerns.",
      },
      {
        question: "Can nutrition coaching pair with training?",
        answer:
          "Yes. Nutrition guidance is often coordinated with personal training, gym sessions, or online coaching.",
      },
      {
        question: "What is the current offer?",
        answer:
          "Get 50% off your nutrition program when you purchase training sessions. Contact A1 Fitness & Nutrition for eligibility and program details.",
      },
      {
        question: "Will I receive a rigid meal plan?",
        answer:
          "Coaching emphasizes practical, sustainable strategies that can flex with your lifestyle rather than extreme restriction.",
      },
    ],
    related: ["personal-training", "online-coaching", "in-home-training"],
    accent: "silver",
    showOffer: true,
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getRelatedServices(slugs: string[]): Service[] {
  return slugs
    .map((slug) => getService(slug))
    .filter((service): service is Service => Boolean(service));
}
