/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  
  // ===========================================
  // GITHUB PAGES CONFIG (Required!)
  // Must match repository name exactly
  // ===========================================
  basePath: '/UT-AI-ADVISORY-PROTOTYPE',
  
  // ===========================================
  // ALTERNATIVE: Cloudflare Pages Config
  // Uncomment below for Cloudflare (no basePath needed)
  // basePath: '',
  // ===========================================
  
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
