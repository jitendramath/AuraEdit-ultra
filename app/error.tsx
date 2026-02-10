"use client";

import { useEffect } from "react";

export default function GlobalError({

  error,

  reset

}: {

  error: Error & { digest?: string };

  reset: () => void;

}) {

  useEffect(() => {

    console.error("[AuraEdit Error]", error);

  }, [error]);

  return (

    <div

      style={{

        height: "100vh",

        width: "100vw",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        background: "var(--bg-main)",

        color: "var(--text-primary)",

        padding: "2rem",

        textAlign: "center"

      }}

    >

      <div

        style={{

          maxWidth: "520px",

          display: "flex",

          flexDirection: "column",

          gap: "1rem"

        }}

      >

        <h1 style={{ fontSize: "2rem", color: "var(--danger)" }}>

          Something went wrong

        </h1>

        <p style={{ color: "var(--text-secondary)" }}>

          AuraEdit hit an unexpected error. Don’t worry, your data is safe.

        </p>

        <button

          onClick={() => reset()}

          style={{ marginTop: "1rem" }}

        >

          Retry

        </button>

      </div>

    </div>

  );

}