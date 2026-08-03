import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/lib/models";
import { getAdminSession } from "@/lib/auth";
import { revalidatePublicSite } from "@/lib/cms/revalidate";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const services = await ServiceModel.find().sort({ order: 1 }).lean();
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await request.json();
  const slug =
    body.slug ||
    String(body.title || "service")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const count = await ServiceModel.countDocuments();
  const service = await ServiceModel.create({
    ...body,
    slug,
    order: body.order ?? count,
    published: body.published ?? true,
  });
  revalidatePublicSite();
  return NextResponse.json(service, { status: 201 });
}
