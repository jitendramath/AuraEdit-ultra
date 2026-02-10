import Link from "next/link";

export default function NotFound() {

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

        <h1 style={{ fontSize: "2.5rem" }}>404</h1>

        <p style={{ color: "var(--text-secondary)" }}>

          The page you are looking for doesn’t exist or has been moved.

        </p>

        <Link href="/">

          <button style={{ marginTop: "1rem" }}>

            Go back home

          </button>

        </Link>

      </div>

    </div>

  );

}