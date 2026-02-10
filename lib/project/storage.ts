import fs from "fs";

import path from "path";

/**

 * STORAGE LAYER

 * Responsible for writing AI-generated files safely to disk

 * - Creates directories if missing

 * - Prevents path traversal

 * - Atomic writes

 */

const PROJECT_ROOT = process.cwd();

function sanitizePath(filePath: string): string {

  const normalized = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, "");

  return normalized;

}

export function ensureDirExists(dirPath: string) {

  if (!fs.existsSync(dirPath)) {

    fs.mkdirSync(dirPath, { recursive: true });

  }

}

export function writeFileSafe(

  relativeFilePath: string,

  content: string

) {

  const safePath = sanitizePath(relativeFilePath);

  const absolutePath = path.join(PROJECT_ROOT, safePath);

  const dir = path.dirname(absolutePath);

  ensureDirExists(dir);

  const tempPath = `${absolutePath}.tmp`;

  fs.writeFileSync(tempPath, content, { encoding: "utf-8" });

  fs.renameSync(tempPath, absolutePath);

}

export function fileExists(relativeFilePath: string): boolean {

  const safePath = sanitizePath(relativeFilePath);

  const absolutePath = path.join(PROJECT_ROOT, safePath);

  return fs.existsSync(absolutePath);

}