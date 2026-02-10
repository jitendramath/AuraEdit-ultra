/**

 * AI BUILD STATE MACHINE

 * Controls the lifecycle of a project build

 */

export type BuildPhase =

  | "IDLE"

  | "INITIALIZING"

  | "GENERATING_FILE"

  | "VALIDATING_OUTPUT"

  | "RECOVERING"

  | "COMPLETED"

  | "FAILED";

export type BuildState = {

  phase: BuildPhase;

  currentFile?: string;

  completedFiles: string[];

  remainingFiles: string[];

  retries: number;

  lastError?: string;

};

export const INITIAL_BUILD_STATE: BuildState = {

  phase: "IDLE",

  completedFiles: [],

  remainingFiles: [],

  retries: 0

};

export function transitionState(

  state: BuildState,

  next: Partial<BuildState>

): BuildState {

  return {

    ...state,

    ...next

  };

}

/**

 * Utility helpers

 */

export function canRetry(state: BuildState): boolean {

  const maxRetries = Number(process.env.AI_MAX_RETRIES || 10);

  return state.retries < maxRetries;

}

export function markFileCompleted(

  state: BuildState,

  filePath: string

): BuildState {

  return {

    ...state,

    completedFiles: [...state.completedFiles, filePath],

    remainingFiles: state.remainingFiles.filter(

      f => f !== filePath

    ),

    currentFile: undefined

  };

}

export function markFailure(

  state: BuildState,

  error: string

): BuildState {

  return {

    ...state,

    phase: "FAILED",

    lastError: error

  };

}