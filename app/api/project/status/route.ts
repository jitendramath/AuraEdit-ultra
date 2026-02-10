import { NextResponse } from "next/server";
import { calculateProgress } from "@/lib/project/progress";
import { getBuildState } from "@/lib/project/runtimeState";

/**
 * GET /api/project/status
 * Returns current AI build progress
 */

export async function GET() {
  const state = getBuildState();

  const progress = calculateProgress({
    totalFiles: state.totalFiles,
    completedFiles: state.completedFiles,
    remainingFiles: state.remainingFiles,
    status: state.status
  });

  return NextResponse.json(progress);
}
