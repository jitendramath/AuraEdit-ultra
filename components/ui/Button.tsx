"use client";

import { ReactNode } from "react";

import clsx from "clsx";

type ButtonProps = {

  children: ReactNode;

  onClick?: () => void;

  disabled?: boolean;

  variant?: "primary" | "secondary" | "danger";

  type?: "button" | "submit";

};

export default function Button({

  children,

  onClick,

  disabled = false,

  variant = "primary",

  type = "button"

}: ButtonProps) {

  return (

    <button

      type={type}

      onClick={onClick}

      disabled={disabled}

      className={clsx("ae-btn", `ae-btn-${variant}`)}

    >

      {children}

      <style jsx>{`

        .ae-btn {

          padding: 0.6rem 1rem;

          border-radius: var(--radius);

          border: none;

          font-size: 0.85rem;

          cursor: pointer;

          transition: background 0.15s ease, opacity 0.15s ease;

        }

        .ae-btn-primary {

          background: var(--accent);

          color: #fff;

        }

        .ae-btn-primary:hover {

          background: var(--accent-hover);

        }

        .ae-btn-secondary {

          background: transparent;

          border: 1px solid var(--border-color);

          color: var(--text-primary);

        }

        .ae-btn-secondary:hover {

          background: var(--bg-elevated);

        }

        .ae-btn-danger {

          background: var(--danger);

          color: #fff;

        }

        .ae-btn-danger:hover {

          opacity: 0.9;

        }

        .ae-btn:disabled {

          opacity: 0.6;

          cursor: not-allowed;

        }

      `}</style>

    </button>

  );

}