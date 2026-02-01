import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  output: 'standalone',

  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/api/access-token',
          destination: '/api/access-token',
        },
        {
          source: '/api/:path*',
          destination: process.env.NEXT_API_URL + '/api/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
