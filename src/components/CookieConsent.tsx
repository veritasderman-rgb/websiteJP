'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CONSENT_KEY } from '@/lib/consent'

// Aktualizuje Google Consent Mode v2 po volbě uživatele. Pokud GA ještě
// není načtená (dev / GA vypnutá), funkce se tiše neprovede.
function updateGtagConsent(granted: boolean) {
  if (typeof window === 'undefined') return
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== 'function') return
  const value = granted ? 'granted' : 'denied'
  gtag('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY)
      if (stored !== 'granted' && stored !== 'denied') setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const choose = (granted: boolean) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied')
    } catch {
      // localStorage nedostupné (např. private mode) – volbu jen aplikujeme
    }
    updateGtagConsent(granted)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-3xl bg-white border border-primary/10 shadow-lg px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-secondary text-xs sm:text-sm font-sans leading-relaxed">
            Tento web používá cookies pro anonymní měření návštěvnosti (Google
            Analytics, Vercel). Více v{' '}
            <Link href="/ochrana-udaju" className="underline hover:text-primary">
              ochraně osobních údajů
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => choose(false)}
              className="border border-primary text-primary text-xs tracking-[0.15em] uppercase px-5 py-3 hover:bg-primary hover:text-white transition-colors font-sans whitespace-nowrap"
            >
              Odmítnout
            </button>
            <button
              type="button"
              onClick={() => choose(true)}
              className="bg-primary text-white text-xs tracking-[0.15em] uppercase px-5 py-3 hover:bg-accent transition-colors font-sans whitespace-nowrap"
            >
              Souhlasím
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
