/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [320, 640, 960, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    quality: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**',
      },
    ],
    domains: ['firebasestorage.googleapis.com'], // Alternative option
  },
  
  async headers() {
    return [
      {
        source: "/portfolio/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
