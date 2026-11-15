'use client'

import { useLayoutEffect } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ensureConsentDefault } from '@/lib/consent'

/**
 * GA4 s pojistkou na Consent Mode. GoogleAnalytics spouští své skripty
 * v useEffect; layout efekt téže komponenty běží vždy dřív, takže výchozí stav
 * souhlasu je v dataLayer před `gtag('config')` i tehdy, když se inline skript
 * z <head> neprovedl (stránka vykreslená až v prohlížeči).
 */
export default function GoogleAnalyticsConsent({ gaId }: { gaId: string }) {
  useLayoutEffect(() => {
    ensureConsentDefault()
  }, [])

  return <GoogleAnalytics gaId={gaId} />
}
