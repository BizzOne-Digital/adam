import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/lib/models";
import { getAdminSession } from "@/lib/auth";
import { revalidatePublicSite } from "@/lib/cms/revalidate";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await connectDB();
  const service = await ServiceModel.findById(id).lean();
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  await connectDB();
  const service = await ServiceModel.findByIdAndUpdate(id, body, { new: true });
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePublicSite();
  return NextResponse.json(service);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await connectDB();
  await ServiceModel.findByIdAndDelete(id);
  revalidatePublicSite();
  return NextResponse.json({ ok: true });
}
