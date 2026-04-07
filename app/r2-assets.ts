// R2 Asset Manager for Cloudflare Integration
// This module handles loading assets from Cloudflare R2

const R2_CONFIG = {
  accountId: '5eb7e3c34157b7d9330be03c225d173a',
  bucketName: 'paperclip-hermes',
  publicUrl: 'https://pub-5eb7e3c34157b7d9330be03c225d173a.r2.dev',
  folder: 'advisory'
}

/**
 * Get R2 public URL for an asset
 * @param filename - Name of the file in R2
 * @returns Full URL to access the file
 */
export function getR2AssetUrl(filename: string): string {
  return `${R2_CONFIG.publicUrl}/${R2_CONFIG.folder}/${filename}`
}

/**
 * List of important assets stored in R2
 */
export const R2_ASSETS = {
  // Documents
  proposal: getR2AssetUrl('proposal-penelitian.docx'),
  rabExcel: getR2AssetUrl('rencana-anggaran-belanja.xlsx'),
  rabWord: getR2AssetUrl('rencana-anggaran-belanja.docx'),
  
  // Technical docs
  plan: getR2AssetUrl('plan.md'),
  coretaxPlan: getR2AssetUrl('coretax-integration-plan.md'),
  userGuide: getR2AssetUrl('USER-GUIDE-DJP-IMPORT.md'),
  
  // Prototype
  prototypeZip: getR2AssetUrl('UT-AI-ADVISORY-PROTOTYPE-v1.0-FINAL.zip'),
  
  // Guides
  fixGuide: getR2AssetUrl('FIX-GITHUB-PAGES.md'),
  deployGuide: getR2AssetUrl('DEPLOY-GUIDE.md'),
  readme: getR2AssetUrl('README-PROTOTYPE.md'),
}

/**
 * Download file from R2
 * @param filename - File to download
 * @param downloadName - Optional custom download name
 */
export function downloadFromR2(filename: string, downloadName?: string) {
  const url = getR2AssetUrl(filename)
  const link = document.createElement('a')
  link.href = url
  link.download = downloadName || filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Architecture info for display
 */
export const ARCHITECTURE_INFO = {
  version: '2.0',
  stack: {
    frontend: 'Next.js 14 + TypeScript',
    hosting: 'Cloudflare Pages (CDN)',
    versionControl: 'GitHub',
    assets: 'Cloudflare R2',
    ciCd: 'GitHub Actions'
  },
  benefits: [
    'Global CDN (300+ edge locations)',
    'Sub-100ms latency worldwide',
    'Native R2 integration',
    'Automatic preview deployments',
    'Built-in analytics',
    'Free SSL certificates',
    '99.9% uptime SLA'
  ]
}

export default {
  getR2AssetUrl,
  R2_ASSETS,
  downloadFromR2,
  ARCHITECTURE_INFO,
  R2_CONFIG
}
