"use client";

import { useState } from "react";

import MobileShell from "@/app/dashboard/components/MobileShell";
import MobileHeader from "@/app/dashboard/components/MobileHeader";
import MobileDrawer from "@/app/dashboard/components/MobileDrawer";
import MobileStatusBar from "@/app/dashboard/components/MobileStatusBar";

import FileTree from "@/app/dashboard/components/FileTree";
import EditorPreview from "@/app/dashboard/components/EditorPreview";
import CreateProject from "@/app/dashboard/components/CreateProject";

export default function EditorShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "initializing" | "building" | "completed" | "failed"
  >("idle");

  // NOTE: demo values for now (can be wired to runtimeState later)
  const completedFiles = status === "building" ? 1 : 0;
  const totalFiles = status === "building" ? 2 : 0;

  return (
    <MobileShell
      header={
        <MobileHeader
          status={status}
          onMenuClick={() => setDrawerOpen(true)}
        />
      }
    >
      {/* Drawer: File Tree */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Project Files"
      >
        <FileTree
          onSelect={(path) => {
            setSelectedFile(path);
            setDrawerOpen(false);
          }}
        />
      </MobileDrawer>

      {/* Main Content */}
      <div style={{ paddingBottom: "56px" }}>
        {selectedFile ? (
          <EditorPreview filePath={selectedFile} />
        ) : (
          <CreateProject
            onStartBuild={() => setStatus("initializing")}
            onBuildProgress={() => setStatus("building")}
            onBuildComplete={() => setStatus("completed")}
            onBuildFail={() => setStatus("failed")}
          />
        )}
      </div>

      {/* Bottom Status Bar */}
      <MobileStatusBar
        status={status}
        completed={completedFiles}
        total={totalFiles}
        onOpenFiles={() => setDrawerOpen(true)}
      />
    </MobileShell>
  );
}
