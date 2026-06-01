/** @type {import('next').NextConfig} */

const nextConfig: import('next').NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  serverExternalPackages: ["@node-rs/argon2"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fileinfo.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "s3-alpha-sig.figma.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/ads.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/hashtag/:tag",
        destination: "/search?query=%23:tag",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots",
      }
    ];
  },
};

export default nextConfig;
