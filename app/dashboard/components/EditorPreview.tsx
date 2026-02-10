"use client";

import { useEffect, useState } from "react";

type Props = {
  filePath: string;
};

export default function EditorPreview({ filePath }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetch(`/api/project/file?path=${encodeURIComponent(filePath)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load file");
        return res.json();
      })
      .then((data) => {
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

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* File name bar */}
      <div
        style={{
          padding: "10px 12px",
          borderRadius: "12px",
          background: "#020617",
          border: "1px solid #1e293b",
          marginBottom: "10px",
          fontSize: "13px",
          color: "#93c5fd",
          fontWeight: 500
        }}
      >
        {filePath}
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          borderRadius: "14px",
          background: "#020617",
          border: "1px solid #1e293b",
          overflow: "auto",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {loading && (
          <div
            style={{
              padding: "14px",
              fontSize: "13px",
              color: "#94a3b8"
            }}
          >
            Loading file…
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "14px",
              fontSize: "13px",
              color: "#f87171"
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <pre
            style={{
              margin: 0,
              padding: "14px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#e5e7eb",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
            }}
          >
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}
