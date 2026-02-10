"use client";

import { useEffect, useState } from "react";

type Props = {
  filePath: string | null;
};

export default function EditorPreview({ filePath }: Props) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filePath) {
      setContent("");
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);

    fetch(`/api/project/file?path=${encodeURIComponent(filePath)}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load file");
        return res.json();
      })
      .then(data => {
        if (active) setContent(data.content || "");
      })
      .catch(() => {
        if (active) setError("Unable to load file");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [filePath]);

  if (!filePath) {
    return (
      <div style={{ color: "var(--text-secondary)" }}>
        Select a file to preview its content
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ color: "var(--text-secondary)" }}>
        Loading {filePath}…
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "var(--danger)" }}>
        {error}
      </div>
    );
  }

  return (
    <pre
      style={{
        height: "100%",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-color)",
        borderRadius: "8px",
        padding: "1rem",
        overflow: "auto",
        fontSize: "0.85rem",
        lineHeight: 1.5,
        whiteSpace: "pre-wrap",
        color: "var(--text-primary)"
      }}
    >
      {content}
    </pre>
  );
}
