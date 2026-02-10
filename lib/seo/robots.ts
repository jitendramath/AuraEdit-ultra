import { MetadataRoute } from "next";

/**

 * Robots.txt configuration

 * Controls search engine crawling behavior

 */

export default function robots(): MetadataRoute.Robots {

  const allowIndexing =

    process.env.NEXT_PUBLIC_INDEXING !== "false";

  return {

    rules: [

      {

        userAgent: "*",

        allow: allowIndexing ? "/" : "",

        disallow: allowIndexing

          ? ["/dashboard", "/api"]

          : ["/"]

      }

    ],

    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/api/seo/sitemap`

  };

}