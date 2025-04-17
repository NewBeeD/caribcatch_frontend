import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Remove any reference to 'next export'
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Optional for SPA behavior:

};

export default nextConfig;