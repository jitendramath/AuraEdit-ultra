"use client";

type Props = {
  status: "idle" | "initializing" | "building" | "completed" | "failed";
  completed?: number;
  total?: number;
  onOpenFiles?: () => void;
};

export default function MobileStatusBar({
  status,
  completed = 0,
  total = 0,
  onOpenFiles
}: Props) {
  const percent =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const statusText = {
    idle: "Idle",
    initializing: "Starting…",
    building: "Building files…",
    completed: "Completed",
    failed: "Failed"
  }[status];

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px",
        background: "#020617",
        borderTop: "1px solid #1e293b",
        zIndex: 40
      }}
    >
      {/* Left: Status */}
      <div
        style={{
          fontSize: "12px",
          color: "#e5e7eb"
        }}
      >
        {statusText}
        {status === "building" && total > 0 && (
          <span style={{ color: "#94a3b8" }}>
            {" "}
            {completed}/{total}
          </span>
        )}
      </div>

      {/* Center: Progress */}
      {status === "building" && total > 0 && (
        <div
          style={{
            flex: 1,
            margin: "0 12px",
            height: "6px",
            borderRadius: "999px",
            background: "#020617",
            border: "1px solid #1e293b",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${percent}%`,
              background: "#2563eb",
              transition: "width 0.3s ease"
            }}
          />
        </div>
      )}

      {/* Right: Files shortcut */}
      <button
        onClick={onOpenFiles}
        style={{
          fontSize: "12px",
          padding: "6px 10px",
          borderRadius: "999px",
          background: "#020617",
          border: "1px solid #1e293b",
          color: "#93c5fd",
          cursor: "pointer"
        }}
      >
        Files
      </button>
    </div>
  );
}
