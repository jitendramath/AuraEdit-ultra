"use client";

import { useState } from "react";

export type CreateProjectProps = {
  onStartBuild?: () => void;
  onBuildProgress?: () => void;
  onBuildComplete?: () => void;
  onBuildFail?: () => void;
};

const CreateProject = ({
  onStartBuild,
  onBuildProgress,
  onBuildComplete,
  onBuildFail
}: CreateProjectProps) => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  async function startBuild() {
    if (!idea.trim()) return;

    setLoading(true);
    onStartBuild?.();

    try {
      onBuildProgress?.();

      const res = await fetch("/api/ai/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea })
      });

      if (!res.ok) throw new Error("Build failed");

      onBuildComplete?.();
      setIdea("");
    } catch (err) {
      console.error(err);
      onBuildFail?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between"
      }}
    >
      {/* Top */}
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "6px" }}>
          Create New Project
        </h2>

        <p
          style={{
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "14px"
          }}
        >
          Describe what you want to build. AuraEdit will generate a complete
          mobile-first app.
        </p>

        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Example: Mobile-only code editor with AI file generation"
          rows={6}
          style={{
            width: "100%",
            resize: "none",
            borderRadius: "14px",
            padding: "12px",
            background: "#020617",
            border: "1px solid #1e293b",
            color: "#e5e7eb",
            fontSize: "14px",
            outline: "none"
          }}
        />
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          paddingTop: "14px",
          background: "linear-gradient(to top, #0b0f19 60%, transparent)"
        }}
      >
        <button
          onClick={startBuild}
          disabled={loading || !idea.trim()}
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "16px",
            background: loading ? "#334155" : "#2563eb",
            border: "none",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 600,
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.8 : 1
          }}
        >
          {loading ? "Building…" : "Generate App"}
        </button>
      </div>
    </div>
  );
};

export default CreateProject;
