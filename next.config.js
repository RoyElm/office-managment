/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: process.env.NODE_ENV === 'production' ? '/office-managment' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/office-managment/' : '',
  images: {
    unoptimized: true, // This is necessary for static export
  },
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  // Enable experimental features to improve API compatibility
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
    serverActions: true
  },
  // This is needed for the mongoose global fix
  webpack: (config) => {
    // This is to fix the global is not defined error with mongoose caching
    config.resolve.fallback = { fs: false };
    
    return config;
  },
  // Ignore ESLint errors during build for GitHub Pages
  eslint: { 
    ignoreDuringBuilds: true 
  },
  // Explicitly exclude API routes from static build
  trailingSlash: true,
};

module.exports = nextConfig; 