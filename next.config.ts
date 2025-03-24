/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {

  source: "/portfolio/:path*",
  output: "export",
  headers: [
    {
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    },
  ],
  images: { unoptimized: true },
}

export default nextConfig;
