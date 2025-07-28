import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://capitalfirm.vercel.app'),
  title: 'Capital Firm - Raise Capital with an Unfair Advantage',
  description: 'Revolutionize your fundraising journey with our results-driven approach. Unlocking access to capital globally for private equity, venture capital funds and emerging businesses.',
  keywords: 'capital raising, fundraising, private equity, venture capital, investment, capital access, fundraising services',
  authors: [{ name: 'Capital Firm' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Capital Firm - Raise Capital with an Unfair Advantage',
    description: 'Revolutionize your fundraising journey with our results-driven approach. Unlocking access to capital globally for private equity, venture capital funds and emerging businesses.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 