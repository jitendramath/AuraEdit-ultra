"use client";

import { useState } from "react";

import MobileShell from "@/app/dashboard/components/MobileShell";
import MobileHeader from "@/app/dashboard/components/MobileHeader";
import MobileDrawer from "@/app/dashboard/components/MobileDrawer";

import FileTree from "@/app/dashboard/components/FileTree";
import EditorPreview from "@/app/dashboard/components/EditorPreview";
import CreateProject from "@/app/dashboard/components/CreateProject";

export default function EditorShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "initializing" | "building" | "completed" | "failed"
  >("idle");

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
    </MobileShell>
  );
}
