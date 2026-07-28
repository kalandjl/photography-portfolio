/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    qualities: [50, 75, 80],
    unoptimized: true
  },
  output: 'export',
};

export default nextConfig;
