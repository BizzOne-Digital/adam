import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { GalleryCategory, GalleryItem } from "@/lib/models";
import { getAdminSession } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  await connectDB();
  const cat = await GalleryCategory.findByIdAndUpdate(id, body, { new: true });
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(cat);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await connectDB();
  await GalleryItem.deleteMany({ categoryId: id });
  await GalleryCategory.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
