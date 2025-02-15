/** @type {import('next').NextConfig} */

const nextConfig: import('next').NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    turbo: {}, // Enable Next.js Rust compiler for faster builds
    serverActions: {},
    staleTimes: {
      dynamic: 30,
    },
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  serverExternalPackages: ["@node-rs/argon2"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fileinfo.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "s3-alpha-sig.figma.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  rewrites: async () => ({
    beforeFiles: [
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ],
    afterFiles: [],
    fallback: [],
  }),
  trailingSlash: false,
  output: "standalone",
};

export default nextConfig;
