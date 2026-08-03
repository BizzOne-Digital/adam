import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { GalleryItem } from "@/lib/models";
import { getAdminSession } from "@/lib/auth";
import { revalidatePublicSite } from "@/lib/cms/revalidate";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const query = categoryId ? { categoryId } : {};
  const items = await GalleryItem.find(query).sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await request.json();
  const count = await GalleryItem.countDocuments({ categoryId: body.categoryId });
  const item = await GalleryItem.create({
    ...body,
    order: body.order ?? count,
  });
  revalidatePublicSite();
  return NextResponse.json(item, { status: 201 });
}
