import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  experimental: {
    reactCompiler: true,
    serverActions: {
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') ?? [],
    },
  },
};

export default nextConfig;
