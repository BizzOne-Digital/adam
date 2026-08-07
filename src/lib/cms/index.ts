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
import { SITE, OFFER, BUSINESS_HOURS, NAV_LINKS } from "@/lib/constants";
import { SERVICES, type Service } from "@/lib/services";
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from "@/lib/images";
import { REAL_FAQS, REAL_TESTIMONIALS } from "@/lib/content/reviews";
import type { CmsBits, CmsPage, CmsSection } from "@/lib/cms/types";
import { publicImageSrc } from "@/lib/media";

export type { CmsBits, CmsPage, CmsSection } from "@/lib/cms/types";

function mapToObject(map?: Map<string, string> | Record<string, string> | null) {
  if (!map) return {} as Record<string, string>;
  if (map instanceof Map) return Object.fromEntries(map.entries());
  return { ...map };
}

export async function getSettings() {
  try {
    await connectDB();
    const doc = await Settings.findOne().lean();
    if (!doc) {
      return {
        name: SITE.name,
        shortName: SITE.shortName,
        tagline: SITE.tagline,
        phone: SITE.phone,
        phoneHref: SITE.phoneHref,
        email: SITE.email,
        emailHref: SITE.emailHref,
        social: SITE.social,
        socialHref: SITE.socialHref,
        socialLabel: "Instagram",
      logo: SITE.logo,
      url: SITE.url,
      serviceArea: SITE.serviceArea,
      businessHours: BUSINESS_HOURS,
      offerTitle: OFFER.title,
      offerNote: OFFER.note,
      offerCta: OFFER.cta,
      offerHref: OFFER.href,
      whatsappHref: SITE.whatsappHref,
      };
    }
    return {
      name: doc.name,
      shortName: doc.shortName,
      tagline: doc.tagline,
      phone: doc.phone,
      phoneHref: doc.phoneHref,
      email: doc.email,
      emailHref: doc.emailHref,
      social: doc.social,
      socialHref: doc.socialHref,
      socialLabel: doc.socialLabel,
      logo: publicImageSrc(doc.logo),
      url: doc.url,
      serviceArea: doc.serviceArea,
      businessHours: doc.businessHours,
      offerTitle: doc.offerTitle,
      offerNote: doc.offerNote,
      offerCta: doc.offerCta,
      offerHref: doc.offerHref,
      whatsappHref:
        `https://wa.me/${String(doc.phoneHref || SITE.phoneHref).replace(/\D/g, "")}` ||
        SITE.whatsappHref,
    };
  } catch {
    return {
      name: SITE.name,
      shortName: SITE.shortName,
      tagline: SITE.tagline,
      phone: SITE.phone,
      phoneHref: SITE.phoneHref,
      email: SITE.email,
      emailHref: SITE.emailHref,
      social: SITE.social,
      socialHref: SITE.socialHref,
      socialLabel: "Instagram",
      logo: SITE.logo,
      url: SITE.url,
      serviceArea: SITE.serviceArea,
      businessHours: BUSINESS_HOURS,
      offerTitle: OFFER.title,
      offerNote: OFFER.note,
      offerCta: OFFER.cta,
      offerHref: OFFER.href,
      whatsappHref: SITE.whatsappHref,
    };
  }
}

export async function getPage(slug: string): Promise<CmsPage | null> {
  try {
    await connectDB();
    const doc = await Page.findOne({ slug }).lean();
    if (!doc) return null;
    return {
      slug: doc.slug as string,
      name: doc.name as string,
      sections: ((doc.sections || []) as Array<{
        key: string;
        title: string;
        fields?: unknown;
        images?: unknown;
      }>).map((s) => ({
        key: s.key,
        title: s.title,
        fields: mapToObject(s.fields as never),
        images: Object.fromEntries(
          Object.entries(mapToObject(s.images as never)).map(([key, val]) => [
            key,
            publicImageSrc(val),
          ]),
        ),
      })),
    };
  } catch {
    return null;
  }
}

export function getSection(page: CmsPage | null, key: string): CmsSection | null {
  return page?.sections.find((s: CmsSection) => s.key === key) ?? null;
}

export function sectionBits(page: CmsPage | null, key: string): CmsBits | null {
  const s = getSection(page, key);
  if (!s) return null;
  return { fields: s.fields, images: s.images };
}

export async function getServices(): Promise<Service[]> {
  try {
    await connectDB();
    const docs = await ServiceModel.find({ published: true }).sort({ order: 1 }).lean();
    if (!docs.length) return SERVICES;
    return docs.map((s) => ({
      slug: s.slug,
      title: s.title,
      href: `/services/${s.slug}`,
      summary: s.summary,
      overview: s.overview,
      image: publicImageSrc(s.image),
      imageAlt: s.imageAlt || s.title,
      benefits: s.benefits || [],
      suitableFor: s.suitableFor || [],
      expect: s.expect || [],
      process: (s.process || []).map(
        (p: { title?: string; description?: string }) => ({
          title: p.title || "",
          description: p.description || "",
        }),
      ),
      faqs: (s.faqs || []).map((f: { question?: string; answer?: string }) => ({
        question: f.question || "",
        answer: f.answer || "",
      })),
      related: s.related || [],
      accent: (s.accent as Service["accent"]) || "red",
      showOffer: s.showOffer,
      heroImage: publicImageSrc(s.heroImage || s.image),
      detailImage: publicImageSrc(s.detailImage || s.image),
    })) as Service[];
  } catch {
    return SERVICES;
  }
}

export async function getServiceBySlug(slug: string) {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getTestimonials() {
  try {
    await connectDB();
    const docs = await Testimonial.find({ published: true }).sort({ order: 1 }).lean();
    if (!docs.length) {
      return REAL_TESTIMONIALS.map((t) => ({
        quote: t.quote,
        name: t.name,
        detail: t.detail,
      }));
    }
    return docs.map((t) => ({
      id: String(t._id),
      quote: t.quote,
      name: t.name,
      detail: t.detail,
    }));
  } catch {
    return REAL_TESTIMONIALS.map((t) => ({
      quote: t.quote,
      name: t.name,
      detail: t.detail,
    }));
  }
}

export async function getFaqs() {
  try {
    await connectDB();
    const docs = await Faq.find({ published: true }).sort({ order: 1 }).lean();
    if (!docs.length) {
      return REAL_FAQS.map((f) => ({
        question: f.question,
        answer: f.answer,
      }));
    }
    return docs.map((f) => ({
      id: String(f._id),
      question: f.question,
      answer: f.answer,
    }));
  } catch {
    return REAL_FAQS.map((f) => ({
      question: f.question,
      answer: f.answer,
    }));
  }
}

export async function getGalleryData() {
  try {
    await connectDB();
    const categories = await GalleryCategory.find().sort({ order: 1 }).lean();
    const items = await GalleryItem.find().sort({ order: 1 }).lean();
    if (!categories.length) {
      return {
        categories: [...GALLERY_CATEGORIES],
        items: GALLERY_ITEMS,
      };
    }
    const catMap = new Map(categories.map((c) => [String(c._id), c.name]));
    const mongoItems = items.map((item) => ({
      id: String(item._id),
      src: publicImageSrc(item.src),
      alt: item.alt,
      caption: item.caption,
      category: catMap.get(String(item.categoryId)) || "Personal Training",
    }));

    // Merge static items (e.g. Before and After) when production Mongo
    // was seeded before those assets existed.
    const existingSrc = new Set(mongoItems.map((i) => i.src));
    const missingStatic = GALLERY_ITEMS.filter((i) => !existingSrc.has(i.src)).map(
      (i) => ({
        id: i.id,
        src: publicImageSrc(i.src),
        alt: i.alt,
        caption: i.caption,
        category: i.category,
      }),
    );

    const catNames = categories.map((c) => c.name);
    const catSet = new Set(catNames);
    const missingCats = GALLERY_CATEGORIES.filter(
      (c) => c !== "All" && !catSet.has(c),
    );

    return {
      categories: ["All", ...catNames, ...missingCats],
      items: [...missingStatic, ...mongoItems],
    };
  } catch {
    return {
      categories: [...GALLERY_CATEGORIES],
      items: GALLERY_ITEMS,
    };
  }
}

export async function getDashboardStats() {
  try {
    await connectDB();
    const [pages, services, gallery, testimonials, faqs, settings] =
      await Promise.all([
        Page.countDocuments(),
        ServiceModel.countDocuments(),
        GalleryItem.countDocuments(),
        Testimonial.countDocuments(),
        Faq.countDocuments(),
        Settings.findOne().lean(),
      ]);
    return { pages, services, gallery, testimonials, faqs, settings };
  } catch {
    return {
      pages: 0,
      services: 0,
      gallery: 0,
      testimonials: 0,
      faqs: 0,
      settings: null,
    };
  }
}

export function getNavLinks() {
  return [
    ...NAV_LINKS.slice(0, 4),
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQs", href: "/faqs" },
    NAV_LINKS[4],
  ];
}
