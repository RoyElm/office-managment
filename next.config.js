/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use output 'export' for GitHub Pages and 'standalone' for Vercel
  output: process.env.GITHUB_ACTIONS === 'true' ? 'export' : 'standalone',
  
  // Base path and asset prefix only needed for GitHub Pages
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/office-managment' : '',
  assetPrefix: process.env.GITHUB_ACTIONS === 'true' ? '/office-managment/' : '',
  
  images: {
    unoptimized: true, // Needed for GitHub Pages static export
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
  },
  
  // Add trailing slash only for GitHub Pages
  trailingSlash: process.env.GITHUB_ACTIONS === 'true',
};

module.exports = nextConfig; 