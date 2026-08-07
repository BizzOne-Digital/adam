import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { storeUploadedFile } from "@/lib/store-upload";
import { deleteStoredUploadByUrl } from "@/lib/uploads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const folderRaw = String(form.get("folder") || "misc");
    const replaceUrl = String(form.get("replaceUrl") || "");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const result = await storeUploadedFile(file, folderRaw, replaceUrl);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      filename: result.filename,
      size: result.size,
      folder: result.folder,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

/** Delete a stored upload by public URL (body: { url }). */
export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const url = String(body.url || "");
    if (!url.startsWith("/api/uploads/")) {
      return NextResponse.json({ error: "Not a stored upload URL" }, { status: 400 });
    }
    const deleted = await deleteStoredUploadByUrl(url);
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("Upload delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
