import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { getServiceBySlug, getServices } from "@/lib/cms";
import { ServiceDetailContent } from "@/components/sections/ServiceDetailContent";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const services = await getServices();
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return createMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, all] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
  ]);
  if (!service) notFound();
  const relatedServices = all.filter(
    (s) => service.related.includes(s.slug) && s.slug !== service.slug,
  );
  return (
    <ServiceDetailContent service={service} relatedServices={relatedServices} />
  );
}
