/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // App Router is default in Next 13+
  // No experimental flags needed

  // Safe for Vercel + API routes
  output: "standalone",

  // Optional: headers, redirects future-ready
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
