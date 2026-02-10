import { NextResponse } from "next/server";

import fs from "fs";

import path from "path";

/**

 * GET /api/project/files

 * Returns list of generated project files (relative paths)

 */

const PROJECT_ROOT = process.cwd();

// Directories we never expose

const IGNORE_DIRS = new Set([

  "node_modules",

  ".git",

  ".next",

  "public",

]);

function walk(dir: string, base = dir, files: string[] = []) {

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {

    if (IGNORE_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {

      walk(fullPath, base, files);

    } else {

      files.push(path.relative(base, fullPath));

    }

  }

  return files;

}

export async function GET() {

  try {

    const files = walk(PROJECT_ROOT).map(p => ({

      path: p

    }));

    return NextResponse.json({ files });

  } catch (err) {

    console.error("[FILES API ERROR]", err);

    return NextResponse.json(

      { files: [] },

      { status: 500 }

    );

  }

}