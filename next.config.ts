/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {

  source: "/portfolio/:path*",
  output: "static",
  headers: [
    {
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    },
  ],
}

export default nextConfig;
