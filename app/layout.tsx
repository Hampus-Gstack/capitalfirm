import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://capitalfirm.vercel.app'),
  title: 'Capital Firm - Professional Financial Services',
  description: 'Expert financial services and investment solutions for your business and personal needs.',
  keywords: 'financial services, investment, capital, business finance, wealth management',
  authors: [{ name: 'Capital Firm' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Capital Firm - Professional Financial Services',
    description: 'Expert financial services and investment solutions for your business and personal needs.',
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