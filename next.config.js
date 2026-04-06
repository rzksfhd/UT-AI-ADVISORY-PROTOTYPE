/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/UT-AI-ADVISORY-PROTOTYPE',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
