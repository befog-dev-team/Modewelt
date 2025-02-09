/** @type {import('next').NextConfig} */

// Import the necessary modules
const nextConfig: import('next').NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  experimental: { // Enable experimental features
    staleTimes: { // Configure the stale time for the cache
      dynamic: 30, // Set the stale time for dynamic pages to 30 seconds
    },
  },
  serverExternalPackages: ["@node-rs/argon2"], // Required for password hashing

  images: { // Configure remote images
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
  },

  async rewrites() { // Define the rewrites
    return [
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ];
  },
};

// Export the configuration
export default nextConfig;