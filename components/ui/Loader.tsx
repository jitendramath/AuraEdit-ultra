"use client";

type LoaderProps = {

  size?: number;

  label?: string;

};

export default function Loader({

  size = 32,

  label

}: LoaderProps) {

  return (

    <div

      style={{

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        gap: "0.5rem",

        color: "var(--text-secondary)"

      }}

    >

      <div

        style={{

          width: size,

          height: size,

          border: "3px solid var(--border-color)",

          borderTop: "3px solid var(--accent)",

          borderRadius: "50%",

          animation: "spin 1s linear infinite"

        }}

      />

      {label && (

        <span style={{ fontSize: "0.75rem" }}>

          {label}

        </span>

      )}

      <style>{`

        @keyframes spin {

          from { transform: rotate(0deg); }

          to { transform: rotate(360deg); }

        }

      `}</style>

    </div>

  );

}