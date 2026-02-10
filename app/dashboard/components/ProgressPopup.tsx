"use client";

import { useBuildProgress } from "@/hooks/useBuildProgress";

export default function ProgressPopup() {

  const { progress, error } = useBuildProgress(2000);

  if (!progress || progress.status === "idle") return null;

  return (

    <div

      style={{

        position: "fixed",

        inset: 0,

        background: "rgba(0,0,0,0.55)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        zIndex: 1000

      }}

    >

      <div

        style={{

          width: "420px",

          background: "var(--bg-panel)",

          border: "1px solid var(--border-color)",

          borderRadius: "12px",

          padding: "1.5rem",

          color: "var(--text-primary)"

        }}

      >

        <h3 style={{ marginBottom: "0.5rem" }}>

          AI creating your app…

        </h3>

        {error && (

          <p style={{ color: "var(--danger)" }}>

            {error}

          </p>

        )}

        <p

          style={{

            fontSize: "0.9rem",

            color: "var(--text-secondary)",

            marginBottom: "1rem"

          }}

        >

          {progress.completedFiles} of {progress.totalFiles} files generated

        </p>

        <div

          style={{

            height: "8px",

            background: "var(--bg-elevated)",

            borderRadius: "6px",

            overflow: "hidden"

          }}

        >

          <div

            style={{

              height: "100%",

              width: `${progress.percentage}%`,

              background: "var(--accent)",

              transition: "width 0.3s ease"

            }}

          />

        </div>

        <p

          style={{

            marginTop: "0.75rem",

            fontSize: "0.8rem",

            color: "var(--text-secondary)"

          }}

        >

          Status: {progress.status}

        </p>

        {progress.status === "completed" && (

          <p

            style={{

              marginTop: "1rem",

              color: "var(--success)"

            }}

          >

            ✔ Build completed successfully

          </p>

        )}

        {progress.status === "failed" && (

          <p

            style={{

              marginTop: "1rem",

              color: "var(--danger)"

            }}

          >

            ✖ Build failed. Please retry.

          </p>

        )}

      </div>

    </div>

  );

}