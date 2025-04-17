// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static exports
  trailingSlash: true, // Helps with static hosting routing
  images: {
    unoptimized: true, // Required for static exports
  },
  // Optional: Add if using custom domain/subpath
  // basePath: process.env.NODE_ENV === 'production' ? '/your-subpath' : '',
};

export default nextConfig;