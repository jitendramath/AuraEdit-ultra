import { NextRequest, NextResponse } from "next/server";

/**

 * EDGE MIDDLEWARE

 * - SEO safety

 * - Future auth / rate-limit hooks

 */

export function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;

  // Block indexing of internal routes at edge level

  if (

    pathname.startsWith("/dashboard") ||

    pathname.startsWith("/api")

  ) {

    const res = NextResponse.next();

    res.headers.set("X-Robots-Tag", "noindex, nofollow");

    return res;

  }

  return NextResponse.next();

}

/**

 * Apply middleware only where needed

 */

export const config = {

  matcher: [

    "/dashboard/:path*",

    "/api/:path*"

  ]

};