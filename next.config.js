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
    IS_STATIC_EXPORT: 'true', // Add flag to detect static export mode in components
    API_BASE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://your-api-url.vercel.app' // Replace with your actual API URL
      : '' // Empty string means use relative URLs in development
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