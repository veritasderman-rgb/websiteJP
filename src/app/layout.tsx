import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { playfair, dmSans } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://josefpavlovic.cz'),
  title: {
    template: '%s | Josef Pavlovic',
    default: 'Josef Pavlovic — Svatební & Fine Art Fotograf',
  },
  description: 'Profesionální fotograf z Karlovarského kraje. Specializace na svatební fotografii a fine art akt / boudoir.',
  openGraph: {
    siteName: 'Josef Pavlovic',
    locale: 'cs_CZ',
    type: 'website',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-2S72BHM3Z5'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${playfair.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-primary antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        <Analytics />
      </body>
    </html>
  )
}
