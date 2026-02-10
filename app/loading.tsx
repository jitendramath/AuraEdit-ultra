export default function Loading() {

  return (

    <div

      style={{

        height: "100vh",

        width: "100vw",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        background: "var(--bg-main)",

        color: "var(--text-secondary)",

        fontSize: "1rem"

      }}

    >

      <div

        style={{

          display: "flex",

          flexDirection: "column",

          alignItems: "center",

          gap: "1rem"

        }}

      >

        <div

          style={{

            width: "36px",

            height: "36px",

            border: "3px solid var(--border-color)",

            borderTop: "3px solid var(--accent)",

            borderRadius: "50%",

            animation: "spin 1s linear infinite"

          }}

        />

        <span>Loading AuraEdit…</span>

      </div>

      <style>{`

        @keyframes spin {

          from { transform: rotate(0deg); }

          to { transform: rotate(360deg); }

        }

      `}</style>

    </div>

  );

}