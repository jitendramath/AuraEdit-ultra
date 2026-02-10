/** @type {import('next').NextConfig} */

const nextConfig = {

  reactStrictMode: true,

  // ✅ App Router enabled

  experimental: {

    appDir: true

  },

  // ✅ SEO & Performance

  compress: true,

  poweredByHeader: false,

  // ✅ Image Optimization (future-proof)

  images: {

    formats: ["image/avif", "image/webp"],

    remotePatterns: []

  },

  // ✅ Environment security

  env: {

    NEXT_PUBLIC_APP_NAME: "AuraEdit"

  },

  // ✅ Headers for SEO & security

  async headers() {

    return [

      {

        source: "/(.*)",

        headers: [

          { key: "X-DNS-Prefetch-Control", value: "on" },

          { key: "X-Frame-Options", value: "SAMEORIGIN" },

          { key: "X-Content-Type-Options", value: "nosniff" },

          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }

        ]

      }

    ];

  }

};

module.exports = nextConfig;