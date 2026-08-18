import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
        pathname: '/img/**',
      },
      // Every psychologist avatar the API returns is hosted here.
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
    ],
  },
};

export default nextConfig;
