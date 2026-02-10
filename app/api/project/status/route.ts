import { NextResponse } from "next/server";

import { calculateProgress } from "@/lib/project/progress";

/**

 * NOTE:

 * Abhi ke version mein build state memory-based hai.

 * Future mein isko Redis / DB se hook kar sakte ho.

 */

// Temporary in-memory store (prototype-safe)

let BUILD_STATE = {

  totalFiles: 0,

  completedFiles: 0,

  remainingFiles: 0,

  status: "idle" as

    | "idle"

    | "initializing"

    | "building"

    | "recovering"

    | "completed"

    | "failed"

};

// External setter (orchestrator future hook)

export function __updateBuildState(state: Partial<typeof BUILD_STATE>) {

  BUILD_STATE = { ...BUILD_STATE, ...state };

}

export async function GET() {

  const progress = calculateProgress({

    totalFiles: BUILD_STATE.totalFiles,

    completedFiles: BUILD_STATE.completedFiles,

    remainingFiles: BUILD_STATE.remainingFiles,

    status: BUILD_STATE.status

  });

  return NextResponse.json(progress);

}