"use client";

import { ReactNode, useEffect } from "react";

type ModalProps = {

  open: boolean;

  title?: string;

  children: ReactNode;

  onClose: () => void;

};

export default function Modal({

  open,

  title,

  children,

  onClose

}: ModalProps) {

  useEffect(() => {

    if (!open) return;

    const onEsc = (e: KeyboardEvent) => {

      if (e.key === "Escape") onClose();

    };

    document.addEventListener("keydown", onEsc);

    return () => document.removeEventListener("keydown", onEsc);

  }, [open, onClose]);

  if (!open) return null;

  return (

    <div

      style={{

        position: "fixed",

        inset: 0,

        background: "rgba(0,0,0,0.55)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        zIndex: 2000

      }}

      onClick={onClose}

    >

      <div

        onClick={e => e.stopPropagation()}

        style={{

          minWidth: "320px",

          maxWidth: "90vw",

          background: "var(--bg-panel)",

          border: "1px solid var(--border-color)",

          borderRadius: "12px",

          padding: "1.25rem",

          color: "var(--text-primary)"

        }}

      >

        {title && (

          <h3 style={{ marginBottom: "0.75rem" }}>

            {title}

          </h3>

        )}

        {children}

      </div>

    </div>

  );

}