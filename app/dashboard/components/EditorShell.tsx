"use client";

import { useEffect, useState } from "react";

export default function EditorShell() {

  const [status, setStatus] = useState<"idle" | "building" | "done">("idle");

  useEffect(() => {

    // Placeholder: future AI orchestration hook

    // For now, shell is fully functional

  }, []);

  return (

    <div

      style={{

        flex: 1,

        display: "flex",

        flexDirection: "column",

        height: "100%",

        width: "100%"

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

        <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>

          Status: {status}

        </span>

      </header>

      {/* Body */}

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

            padding: "1rem",

            fontSize: "0.9rem",

            color: "var(--text-secondary)"

          }}

        >

          File Tree

        </aside>

        {/* Editor Area */}

        <section

          style={{

            flex: 1,

            background: "var(--bg-main)",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            color: "var(--text-secondary)"

          }}

        >

          Editor Area

        </section>

      </div>

    </div>

  );

}