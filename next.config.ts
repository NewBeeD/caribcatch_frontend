import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'medusa-public-images.s3.eu-west-1.amazonaws.com', // Existing Medusa domain
      'localhost',       // Add this for local development
      '127.0.0.1'       // Optional: Covers alternative localhost access
    ],
  },
  // Optional remotePatterns (more granular control)
  // remotePatterns: [
  //   {
  //     protocol: 'https',
  //     hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
  //     pathname: '/**',
  //   },
  //   {
  //     protocol: 'http',
  //     hostname: 'localhost',
  //     port: '9000', // Specify if you want port-specific validation
  //     pathname: '/static/**',
  //   },
  // ],
}

export default nextConfig