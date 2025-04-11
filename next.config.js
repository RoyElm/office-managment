/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized for Vercel deployment
  output: 'standalone',
  
  images: {
    unoptimized: true, // Needed for backward compatibility
  },
  
  reactStrictMode: true,
  
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  
  // This is needed for the mongoose global fix
  webpack: (config) => {
    // This is to fix the global is not defined error with mongoose caching
    config.resolve.fallback = { fs: false };
    
    return config;
  },
  
  // Ignore ESLint errors during build
  eslint: { 
    ignoreDuringBuilds: true 
  }
};

module.exports = nextConfig; 