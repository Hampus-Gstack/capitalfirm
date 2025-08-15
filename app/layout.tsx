import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import SWRegister from './sw-register'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://cursuscapital.co'),
  title: 'Cursus Capital - Raise Capital with an Unfair Advantage',
  description: 'Transform your capital raising with our comprehensive platform. Get investor-ready, track meetings, and close deals faster.',
  keywords: ['capital raising', 'investor relations', 'startup funding', 'venture capital', 'investment platform'],
  authors: [{ name: 'Cursus Capital' }],
  creator: 'Cursus Capital',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cursuscapital.co',
    title: 'Cursus Capital'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursus Capital - Raise Capital with an Unfair Advantage',
    description: 'Transform your capital raising with our comprehensive platform. Get investor-ready, track meetings, and close deals faster.',
    images: ['https://cursuscapital.co/og-image.jpg'],
  },
  robots: 'index, follow',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Cursus Capital'
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <SWRegister />
      </body>
    </html>
  )
} 