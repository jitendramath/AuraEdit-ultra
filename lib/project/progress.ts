/**

 * BUILD PROGRESS TRACKER

 * Keeps user-facing progress clean and accurate

 */

export type BuildProgress = {

  totalFiles: number;

  completedFiles: number;

  remainingFiles: number;

  percentage: number;

  status:

    | "idle"

    | "initializing"

    | "building"

    | "recovering"

    | "completed"

    | "failed";

};

export function calculateProgress(params: {

  totalFiles: number;

  completedFiles: number;

  remainingFiles: number;

  status: BuildProgress["status"];

}): BuildProgress {

  const {

    totalFiles,

    completedFiles,

    remainingFiles,

    status

  } = params;

  const safeTotal = totalFiles || 1;

  const percentage = Math.min(

    100,

    Math.round((completedFiles / safeTotal) * 100)

  );

  return {

    totalFiles,

    completedFiles,

    remainingFiles,

    percentage,

    status

  };

}