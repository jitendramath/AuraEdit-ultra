"use client";

type Props = {
  status: "idle" | "initializing" | "building" | "completed" | "failed";
  onMenuClick: () => void;
};

export default function MobileHeader({ status, onMenuClick }: Props) {
  const statusColor = {
    idle: "#64748b",
    initializing: "#38bdf8",
    building: "#facc15",
    completed: "#4ade80",
    failed: "#f87171"
  }[status];

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {/* Left: Hamburger + App Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "#020617",
            border: "1px solid #1e293b",
            color: "#e5e7eb",
            fontSize: "20px",
            cursor: "pointer"
          }}
        >
          ☰
        </button>

        <div>
          <div style={{ fontWeight: 600, fontSize: "15px" }}>
            AuraEdit
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#94a3b8"
            }}
          >
            Mobile Workspace
          </div>
        </div>
      </div>

      {/* Right: Status pill */}
      <div
        style={{
          padding: "6px 10px",
          borderRadius: "999px",
          fontSize: "11px",
          background: "#020617",
          border: `1px solid ${statusColor}`,
          color: statusColor,
          textTransform: "capitalize"
        }}
      >
        {status}
      </div>
    </div>
  );
}
