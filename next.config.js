/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: process.env.NODE_ENV === 'production' ? '/office-managment' : '',
  images: {
    unoptimized: true, // This is necessary for static export
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  // Exclude API routes from the static export since they won't work
  distDir: 'out',
  // Exclude API routes from the build
  exportPathMap: async function () {
    return {
      '/': { page: '/' }
    };
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
};

module.exports = nextConfig; 