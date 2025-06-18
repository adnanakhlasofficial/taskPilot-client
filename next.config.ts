import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["variety.com", "media.gq.com"], // ✅ add other trusted domains here if needed
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
