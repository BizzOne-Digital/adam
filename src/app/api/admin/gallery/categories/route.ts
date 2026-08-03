import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { GalleryCategory, GalleryItem } from "@/lib/models";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const categories = await GalleryCategory.find().sort({ order: 1 }).lean();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await request.json();
  const slug =
    body.slug ||
    String(body.name || "category")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const count = await GalleryCategory.countDocuments();
  const cat = await GalleryCategory.create({
    name: body.name,
    slug,
    order: body.order ?? count,
  });
  return NextResponse.json(cat, { status: 201 });
}
