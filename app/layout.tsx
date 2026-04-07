import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'AI Advisory Pajak - Universitas Terbuka',
  description: 'Aplikasi AI Advisory untuk konsultasi perpajakan penelitian dan pengabdian masyarakat di Universitas Terbuka. Berbasis regulasi PMK 83/2021, PMK 90/2020, dan PP 94/2010.',
  keywords: ['AI Advisory', 'Pajak', 'Universitas Terbuka', 'Penelitian', 'Pengabdian Masyarakat', 'PPh 21', 'PPh 23', 'PPN'],
  authors: [{ name: 'Universitas Terbuka' }],
  creator: 'Universitas Terbuka',
  publisher: 'Universitas Terbuka',
  openGraph: {
    title: 'AI Advisory Pajak - Universitas Terbuka',
    description: 'Konsultasi perpajakan penelitian dan pengabdian masyarakat dengan AI',
    type: 'website',
    locale: 'id_ID',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
