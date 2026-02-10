"use client";

import { useState } from "react";

export default function CreateProject() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!idea.trim()) {
      alert("Please describe your app idea");
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/ai/orchestrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectName: "AuraEdit Project",
          appGoal: idea,
          techStack: "Next.js 14, TypeScript",
          folderTree: "AUTO_GENERATED",
          files: []
        })
      });
    } catch (err) {
      alert("Failed to start AI build");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        background: "var(--bg-panel)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        padding: "1.5rem"
      }}
    >
      <h2 style={{ marginBottom: "0.75rem" }}>
        Create New Project
      </h2>

      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          marginBottom: "1rem"
        }}
      >
        Describe what you want to build. AuraEdit will generate
        a complete app file-by-file.
      </p>

      <textarea
        value={idea}
        onChange={e => setIdea(e.target.value)}
        placeholder="Example: Build a SaaS dashboard with auth, billing and admin panel"
        style={{
          width: "100%",
          minHeight: "120px",
          background: "var(--bg-main)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-color)",
          borderRadius: "8px",
          padding: "0.75rem",
          resize: "vertical"
        }}
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          borderRadius: "8px",
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "Starting AI…" : "Generate App"}
      </button>
    </div>
  );
}
