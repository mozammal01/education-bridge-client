import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "education-bridge-server.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://education-bridge-server.vercel.app").replace(/\/+$/, "");

    return [
      {
        source: "/uploads/:path*",
        destination: `${baseUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
