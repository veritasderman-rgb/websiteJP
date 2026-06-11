import type { Metadata } from 'next'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { playfair, dmSans } from '@/lib/fonts'
import CookieConsent from '@/components/CookieConsent'
import { CONSENT_KEY } from '@/lib/consent'
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
        {process.env.NODE_ENV === 'production' && GA_ID && (
          <>
            {/* Google Consent Mode v2 – výchozí stav (denied) se nastaví
                ještě před načtením GA. Pokud už uživatel dříve souhlasil,
                načteme volbu z localStorage. */}
            <Script id="ga-consent-default" strategy="beforeInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
var granted = false;
try { granted = localStorage.getItem('${CONSENT_KEY}') === 'granted'; } catch (e) {}
gtag('consent', 'default', {
  ad_storage: granted ? 'granted' : 'denied',
  ad_user_data: granted ? 'granted' : 'denied',
  ad_personalization: granted ? 'granted' : 'denied',
  analytics_storage: granted ? 'granted' : 'denied',
  wait_for_update: 500
});`}
            </Script>
            <GoogleAnalytics gaId={GA_ID} />
          </>
        )}
        <Analytics />
        <SpeedInsights />
        <CookieConsent />
      </body>
    </html>
  )
}
