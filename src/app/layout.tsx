import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { playfair, dmSans } from '@/lib/fonts'
import CookieConsent from '@/components/CookieConsent'
import SiteOnly from '@/components/SiteOnly'
import GoogleAnalyticsConsent from '@/components/GoogleAnalyticsConsent'
import { CONSENT_DEFAULT_SCRIPT } from '@/lib/consent'
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
  const gaEnabled = process.env.NODE_ENV === 'production' && Boolean(GA_ID)

  return (
    <html lang="cs" className={`${playfair.variable} ${dmSans.variable} h-full`}>
      {gaEnabled && (
        <head>
          {/* Výchozí stav souhlasu (Consent Mode v2) ještě před načtením GA.
              Druhou pojistku drží GoogleAnalyticsConsent — viz lib/consent.ts. */}
          <script
            id="ga-consent-default"
            dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }}
          />
        </head>
      )}
      <body className="min-h-full flex flex-col bg-background text-primary antialiased">
        {children}
        <SiteOnly>
          {gaEnabled && <GoogleAnalyticsConsent gaId={GA_ID} />}
          <Analytics />
          <SpeedInsights />
          <CookieConsent />
        </SiteOnly>
      </body>
    </html>
  )
}
