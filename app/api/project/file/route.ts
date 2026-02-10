import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * GET /api/project/file?path=relative/file/path
 * Returns file content safely for preview
 */

const PROJECT_ROOT = process.cwd();

// Basic path safety
function sanitize(p: string) {
  const normalized = path.normalize(p);
  if (normalized.includes("..")) {
    throw new Error("Invalid path");
  }
  return normalized;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filePath = searchParams.get("path");

    if (!filePath) {
      return NextResponse.json(
        { error: "Missing file path" },
        { status: 400 }
      );
    }

    const safePath = sanitize(filePath);
    const absolutePath = path.join(PROJECT_ROOT, safePath);

    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    const content = fs.readFileSync(absolutePath, "utf-8");

    return NextResponse.json({
      path: filePath,
      content
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to read file" },
      { status: 500 }
    );
  }
}
