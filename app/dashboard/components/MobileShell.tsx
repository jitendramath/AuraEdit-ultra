"use client";

import { ReactNode } from "react";

type Props = {
  header: ReactNode;
  children: ReactNode;
};

export default function MobileShell({ header, children }: Props) {
  return (
    <div
      style={{
        maxWidth: "100vw",
        minHeight: "100vh",
        background: "#0b0f19",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      {/* Mobile Header */}
      <div
        style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          borderBottom: "1px solid #1f2937",
          background: "#0f172a",
          position: "sticky",
          top: 0,
          zIndex: 50
        }}
      >
        {header}
      </div>

      {/* Mobile Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px"
        }}
      >
        {children}
      </div>
    </div>
  );
}
