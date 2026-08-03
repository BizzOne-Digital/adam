import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/lib/models";
import { getAdminSession } from "@/lib/auth";
import { revalidatePublicSite } from "@/lib/cms/revalidate";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const items = await Testimonial.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await request.json();
  const count = await Testimonial.countDocuments();
  const item = await Testimonial.create({
    ...body,
    order: body.order ?? count,
    published: body.published ?? true,
  });
  revalidatePublicSite();
  return NextResponse.json(item, { status: 201 });
}
