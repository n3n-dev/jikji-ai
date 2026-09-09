import type { NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  output: isDevelopment ? undefined : 'export',
  ...(isDevelopment ? {
    async redirects() {
      return [{ source: '/blog', destination: 'http://localhost:2368/', permanent: false }];
    },
  } : {}),
  trailingSlash: true,
  transpilePackages: ['motion'],
};

export default withMDX(nextConfig);
