import type { NextConfig } from 'next'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  // Enable React's Strict Mode during development
  reactStrictMode: true,
  // Allow external image host for next/image
  images: {
    domains: ['medusa-public-images.s3.eu-west-1.amazonaws.com'],
  },
  // You can uncomment and customize additional settings as needed:
  // swcMinify: true,
  // remotePatterns: [
  //   { protocol: 'https', hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com', pathname: '/**' },
  // ],
}

export default nextConfig
