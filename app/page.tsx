import Link from "next/link";

export default function HomePage() {

  return (

    <main

      style={{

        minHeight: "100vh",

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        padding: "2rem",

        textAlign: "center"

      }}

    >

      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>

        AuraEdit

      </h1>

      <p

        style={{

          maxWidth: "720px",

          fontSize: "1.1rem",

          color: "var(--text-secondary)",

          marginBottom: "2rem"

        }}

      >

        A production-grade AI coding workspace that converts ideas into

        complete applications using deterministic, file-by-file Gemini

        orchestration.

      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>

        <Link href="/dashboard">

          <button>Open Workspace</button>

        </Link>

        <a

          href="https://github.com"

          target="_blank"

          rel="noopener noreferrer"

        >

          <button

            style={{

              background: "transparent",

              border: "1px solid var(--border-color)"

            }}

          >

            View Docs

          </button>

        </a>

      </div>

      <footer

        style={{

          marginTop: "4rem",

          fontSize: "0.85rem",

          color: "var(--text-secondary)"

        }}

      >

        © {new Date().getFullYear()} AuraEdit. Built for real engineers.

      </footer>

    </main>

  );

}