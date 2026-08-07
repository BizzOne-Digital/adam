import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Allow Next/Image for Mongo-backed upload URLs served by the app
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/api/uploads/**" },
      { pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;
