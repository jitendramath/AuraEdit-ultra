"use client";

import { useEffect, useState } from "react";

type BuildProgress = {

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

export function useBuildProgress(pollInterval = 2000) {

  const [progress, setProgress] = useState<BuildProgress | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    let active = true;

    let timer: NodeJS.Timeout;

    const fetchProgress = async () => {

      try {

        const res = await fetch("/api/project/status");

        if (!res.ok) {

          throw new Error("Failed to fetch build status");

        }

        const data = await res.json();

        if (active) {

          setProgress(data);

        }

      } catch (err: any) {

        if (active) {

          setError(err?.message || "Unknown error");

        }

      } finally {

        if (active) {

          timer = setTimeout(fetchProgress, pollInterval);

        }

      }

    };

    fetchProgress();

    return () => {

      active = false;

      if (timer) clearTimeout(timer);

    };

  }, [pollInterval]);

  return {

    progress,

    error

  };

}