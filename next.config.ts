import type { NextConfig } from 'next';

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  throw new Error(
    'API_URL is not set. Add it to .env.local for local development and to the environment variables of the deployment.',
  );
}

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
  // Keeps the session cookie first-party: the browser only ever talks to our own origin.
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
