import { NextResponse } from "next/server";

const BASE_URL =

  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

/**

 * GET /api/seo/sitemap

 * Dynamic sitemap for search engines

 */

export async function GET() {

  const staticPages = [

    "",

    "/"

  ];

  const urls = staticPages

    .map(

      path => `

  <url>

    <loc>${BASE_URL}${path}</loc>

    <changefreq>weekly</changefreq>

    <priority>1.0</priority>

  </url>`

    )

    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset

  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  ${urls}

</urlset>`;

  return new NextResponse(sitemap, {

    headers: {

      "Content-Type": "application/xml"

    }

  });

}