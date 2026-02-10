"use client";

import { useState } from "react";
import CreateProject from "./CreateProject";
import ProgressPopup from "./ProgressPopup";
import StatusBar from "./StatusBar";
import FileTree from "./FileTree";
import EditorPreview from "./EditorPreview";

export default function EditorShell() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "var(--bg-main)"
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
          background: "var(--bg-panel)",
          borderBottom: "1px solid var(--border-color)"
        }}
      >
        <strong>AuraEdit Workspace</strong>
        <span
          style={{
            fontSize: "0.85rem",
            color: "var(--text-secondary)"
          }}
        >
          Status: active
        </span>
      </header>

      {/* Main Body */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden"
        }}
      >
        {/* File Tree */}
        <aside
          style={{
            width: "260px",
            background: "var(--bg-panel)",
            borderRight: "1px solid var(--border-color)",
            padding: "1rem"
          }}
        >
          <h4
            style={{
              fontSize: "0.8rem",
              marginBottom: "0.75rem",
              color: "var(--text-secondary)"
            }}
          >
            File Tree
          </h4>

          <FileTree onSelect={setSelectedFile} />
        </aside>

        {/* Editor Area */}
        <section
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem"
          }}
        >
          {selectedFile ? (
            <EditorPreview filePath={selectedFile} />
          ) : (
            <CreateProject />
          )}
        </section>
      </div>

      {/* Bottom Status Bar */}
      <StatusBar />

      {/* Global Progress Popup */}
      <ProgressPopup />
    </div>
  );
}
