/**
 * RUNTIME BUILD STATE (IN-MEMORY)
 * --------------------------------
 * NOTE:
 * - This state lives only during runtime
 * - Serverless redeploy / restart will reset it
 * - This is EXPECTED behavior for now
 */

export type RuntimeBuildState = {
  totalFiles: number;
  completedFiles: number;
  remainingFiles: number;
  status:
    | "idle"
    | "initializing"
    | "building"
    | "recovering"
    | "completed"
    | "failed";
};

let BUILD_STATE: RuntimeBuildState = {
  totalFiles: 0,
  completedFiles: 0,
  remainingFiles: 0,
  status: "idle"
};

// READ (used by API route)
export function getBuildState(): RuntimeBuildState {
  return BUILD_STATE;
}

// WRITE (used by orchestrator)
export function setBuildState(
  next: Partial<RuntimeBuildState>
) {
  BUILD_STATE = {
    ...BUILD_STATE,
    ...next
  };
}

// RESET (optional utility)
export function resetBuildState() {
  BUILD_STATE = {
    totalFiles: 0,
    completedFiles: 0,
    remainingFiles: 0,
    status: "idle"
  };
}
