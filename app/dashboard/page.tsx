import EditorShell from "./components/EditorShell";

export const metadata = {

  title: "Workspace",

  description: "AuraEdit AI Workspace – Build production apps file by file."

};

export default function DashboardPage() {

  return (

    <main

      style={{

        height: "100vh",

        width: "100vw",

        display: "flex",

        flexDirection: "column",

        background: "var(--bg-main)"

      }}

    >

      <EditorShell />

    </main>

  );

}