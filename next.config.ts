import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  eslint: {
    // ✅ Disattiva ESLint durante i build su Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Mantieni i controlli TypeScript: se ci sono errori di tipo il build fallisce
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
