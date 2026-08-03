import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Settings } from "@/lib/models";
import { getAdminSession } from "@/lib/auth";
import { revalidatePublicSite } from "@/lib/cms/revalidate";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const doc = await Settings.findOne().lean();
  return NextResponse.json(doc);
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await request.json();
  const doc = await Settings.findOneAndUpdate({}, body, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
  revalidatePublicSite();
  return NextResponse.json(doc);
}
