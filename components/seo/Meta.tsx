import { Metadata } from "next";

type MetaProps = {

  title: string;

  description: string;

  noIndex?: boolean;

};

export function buildMeta({

  title,

  description,

  noIndex = false

}: MetaProps): Metadata {

  return {

    title,

    description,

    robots: {

      index: !noIndex,

      follow: !noIndex

    },

    openGraph: {

      title,

      description,

      type: "website"

    },

    twitter: {

      card: "summary_large_image",

      title,

      description

    }

  };

}