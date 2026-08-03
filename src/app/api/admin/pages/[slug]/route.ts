import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Page } from "@/lib/models";
import { getAdminSession } from "@/lib/auth";
import { revalidatePublicSite } from "@/lib/cms/revalidate";

type Params = { params: Promise<{ slug: string }> };

function normalizeSection(section: {
  key: string;
  title: string;
  fields?: Record<string, string> | Map<string, string>;
  images?: Record<string, string> | Map<string, string>;
}) {
  const fields =
    section.fields instanceof Map
      ? Object.fromEntries(section.fields.entries())
      : { ...(section.fields || {}) };
  const images =
    section.images instanceof Map
      ? Object.fromEntries(section.images.entries())
      : { ...(section.images || {}) };
  return {
    key: section.key,
    title: section.title,
    fields,
    images,
  };
}

export async function GET(_req: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  await connectDB();
  const page = await Page.findOne({ slug }).lean();
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    ...page,
    sections: ((page.sections || []) as Array<{
      key: string;
      title: string;
      fields?: Record<string, string> | Map<string, string>;
      images?: Record<string, string> | Map<string, string>;
    }>).map(normalizeSection),
  });
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const body = await request.json();
  await connectDB();
  const sections = Array.isArray(body.sections)
    ? body.sections.map(normalizeSection)
    : [];
  const page = await Page.findOneAndUpdate(
    { slug },
    { name: body.name, sections },
    { new: true },
  );
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePublicSite();
  return NextResponse.json({
    ...page.toObject(),
    sections: page.sections.map(normalizeSection),
  });
}
