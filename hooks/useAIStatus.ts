"use client";

import { useEffect, useState } from "react";

type AIStatus =

  | "idle"

  | "running"

  | "recovering"

  | "completed"

  | "failed"

  | "offline";

export function useAIStatus(pollInterval = 3000) {

  const [status, setStatus] = useState<AIStatus>("idle");

  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  useEffect(() => {

    let active = true;

    let timer: NodeJS.Timeout;

    const checkStatus = async () => {

      try {

        const res = await fetch("/api/project/status");

        if (!res.ok) {

          throw new Error("Status endpoint unreachable");

        }

        const data = await res.json();

        if (!active) return;

        setStatus(data.status || "idle");

        setLastUpdated(Date.now());

      } catch {

        if (active) {

          setStatus("offline");

        }

      } finally {

        if (active) {

          timer = setTimeout(checkStatus, pollInterval);

        }

      }

    };

    checkStatus();

    return () => {

      active = false;

      if (timer) clearTimeout(timer);

    };

  }, [pollInterval]);

  return {

    status,

    lastUpdated

  };

}