"use client";

import { useBuildProgress } from "@/hooks/useBuildProgress";

export default function StatusBar() {

  const { progress } = useBuildProgress(3000);

  if (!progress) {

    return (

      <footer

        style={{

          height: "32px",

          background: "var(--bg-panel)",

          borderTop: "1px solid var(--border-color)",

          display: "flex",

          alignItems: "center",

          padding: "0 0.75rem",

          fontSize: "0.75rem",

          color: "var(--text-secondary)"

        }}

      >

        AuraEdit ready

      </footer>

    );

  }

  return (

    <footer

      style={{

        height: "32px",

        background: "var(--bg-panel)",

        borderTop: "1px solid var(--border-color)",

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        padding: "0 0.75rem",

        fontSize: "0.75rem",

        color: "var(--text-secondary)"

      }}

    >

      <span>

        Status: <strong>{progress.status}</strong>

      </span>

      <span>

        {progress.completedFiles}/{progress.totalFiles} files

      </span>

    </footer>

  );

}