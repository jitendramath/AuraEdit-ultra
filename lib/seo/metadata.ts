import { Metadata } from "next";

export const DEFAULT_METADATA: Metadata = {

  title: {

    default: "AuraEdit – AI Powered Code Builder",

    template: "%s | AuraEdit"

  },

  description:

    "AuraEdit is a production-grade AI coding workspace that builds complete applications using deterministic, file-by-file Gemini orchestration.",

  applicationName: "AuraEdit",

  keywords: [

    "AI code editor",

    "AI app builder",

    "Gemini AI",

    "Next.js AI",

    "developer tools",

    "AuraEdit"

  ],

  authors: [{ name: "AuraEdit Team" }],

  creator: "AuraEdit",

  robots: {

    index: true,

    follow: true

  },

  openGraph: {

    type: "website",

    siteName: "AuraEdit",

    title: "AuraEdit – AI Powered Code Builder",

    description:

      "Build real production-ready applications with AI. One file at a time.",

    locale: "en_US"

  },

  twitter: {

    card: "summary_large_image",

    title: "AuraEdit – AI Powered Code Builder",

    description:

      "Production-grade AI coding workspace with Gemini orchestration."

  }

};