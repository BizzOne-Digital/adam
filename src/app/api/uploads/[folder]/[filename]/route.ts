import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { StoredUpload } from "@/lib/models/StoredUpload";
import { isUploadFolder } from "@/lib/uploads";

export const runtime = "nodejs";

type Params = { params: Promise<{ folder: string; filename: string }> };

function toBuffer(data: unknown): Buffer {
  if (Buffer.isBuffer(data)) return data;
  if (data instanceof Uint8Array) return Buffer.from(data);
  if (
    data &&
    typeof data === "object" &&
    "buffer" in data &&
    (data as { buffer: ArrayBuffer }).buffer
  ) {
    const bin = data as {
      buffer: ArrayBuffer;
      byteOffset?: number;
      byteLength?: number;
    };
    return Buffer.from(bin.buffer, bin.byteOffset ?? 0, bin.byteLength);
  }
  return Buffer.from(data as ArrayBuffer);
}

export async function GET(_request: Request, { params }: Params) {
  const { folder, filename } = await params;

  if (
    !isUploadFolder(folder) ||
    !filename ||
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\")
  ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    await connectDB();
    const doc = await StoredUpload.findOne({ folder, filename }).lean();
    if (!doc?.data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = toBuffer(doc.data);
    const body = new Uint8Array(data);

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": doc.mimeType || "application/octet-stream",
        "Content-Length": String(doc.size || body.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Serve upload error:", error);
    return NextResponse.json({ error: "Failed to load file" }, { status: 500 });
  }
}
