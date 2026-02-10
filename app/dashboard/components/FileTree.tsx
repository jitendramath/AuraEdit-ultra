"use client";

import { useEffect, useState } from "react";

type FileItem = {
  path: string;
};

type Props = {
  onSelect?: (path: string) => void;
};

export default function FileTree({ onSelect }: Props) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("/api/project/status")
      .then(res => res.json())
      .then(data => {
        const list =
          (data?.completedFilesList || []).map((p: string) => ({
            path: p
          })) || [];
        setFiles(list);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
        Loading files…
      </div>
    );
  }

  if (!files.length) {
    return (
      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
        No files yet
      </div>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {files.map(f => (
        <li
          key={f.path}
          onClick={() => onSelect?.(f.path)}
          style={{
            padding: "0.35rem 0.5rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.85rem"
          }}
          onMouseEnter={e =>
            (e.currentTarget.style.background =
              "var(--bg-hover)")
          }
          onMouseLeave={e =>
            (e.currentTarget.style.background =
              "transparent")
          }
        >
          {f.path}
        </li>
      ))}
    </ul>
  );
}
