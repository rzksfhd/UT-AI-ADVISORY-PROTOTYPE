/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  
  // CONFIG FOR GITHUB PAGES (with basePath)
  // Uncomment for GitHub Pages deployment:
  basePath: '/UT-AI-ADVISORY-PROTOTYPE',
  
  // CONFIG FOR CLOUDFLARE PAGES (clean URLs)
  // Uncomment for Cloudflare Pages deployment:
  // basePath: '',
  
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
