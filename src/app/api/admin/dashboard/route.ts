import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/cms";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stats = await getDashboardStats();
  return NextResponse.json(stats);
}
