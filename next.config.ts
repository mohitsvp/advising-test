// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  }
  // Optional:
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,
  // distDir: 'dist',
};

module.exports = nextConfig;
