/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  
  // ===========================================
  // CONFIGURATION FOR CLOUDFLARE PAGES
  // Clean URLs without basePath
  // ===========================================
  basePath: '',
  
  // ===========================================
  // ALTERNATIVE: GitHub Pages Config
  // Uncomment below and comment above for GitHub:
  // basePath: '/UT-AI-ADVISORY-PROTOTYPE',
  // ===========================================
  
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
