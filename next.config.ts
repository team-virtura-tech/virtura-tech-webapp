import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self'; frame-src 'self' https://www.google.com https://www.gstatic.com https://recaptcha.google.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
