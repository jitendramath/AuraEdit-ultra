"use client";

import { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function MobileDrawer({
  open,
  onClose,
  title = "Files",
  children
}: Props) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 40
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "82vw",
          maxWidth: "320px",
          background: "#020617",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #1e293b",
          animation: "slideIn 0.25s ease-out"
        }}
      >
        {/* Header */}
        <div
          style={{
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 14px",
            borderBottom: "1px solid #1e293b"
          }}
        >
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            {title}
          </div>

          <button
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "#020617",
              border: "1px solid #1e293b",
              color: "#e5e7eb",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
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

      {/* Animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
