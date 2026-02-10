import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {

  title: {

    default: "AuraEdit – AI Powered Code Builder",

    template: "%s | AuraEdit"

  },

  description:

    "AuraEdit is a production-grade AI coding workspace that converts ideas into full applications using intelligent Gemini orchestration.",

  applicationName: "AuraEdit",

  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),

  robots: {

    index: true,

    follow: true

  },

  openGraph: {

    type: "website",

    locale: "en_US",

    url: "/",

    title: "AuraEdit – AI Powered Code Builder",

    description:

      "Build real production-ready applications with AI. File-by-file. Deterministic. Scalable.",

    siteName: "AuraEdit"

  },

  twitter: {

    card: "summary_large_image",

    title: "AuraEdit – AI Powered Code Builder",

    description:

      "Production-grade AI coding workspace with Gemini orchestration.",

    creator: "@auraedit"

  },

  viewport: {

    width: "device-width",

    initialScale: 1

  }

};

export default function RootLayout({

  children

}: {

  children: React.ReactNode;

}) {

  return (

    <html lang="en">

      <body>

        {children}

      </body>

    </html>

  );

}