import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",
  
  // GitHub Pages repository path
  basePath: "/elite-animation-studio",
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slashes for GitHub Pages compatibility
  trailingSlash: true,
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  reactStrictMode: false,
};

export default nextConfig;
