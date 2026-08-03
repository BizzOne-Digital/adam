import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Page } from "@/lib/models";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const pages = await Page.find().sort({ name: 1 }).lean();
  return NextResponse.json(pages);
}
