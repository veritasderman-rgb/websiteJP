'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import {
  isConsentOpen,
  isConsentOpenOnServer,
  reopenConsent,
  subscribeConsent,
  writeConsent,
} from '@/lib/consent'

export default function CookieConsent() {
  // localStorage je externí úložiště mimo React — čteme ho přes
  // useSyncExternalStore, ať se banner překreslí po volbě i po znovuotevření
  // z patičky. Serverový snapshot banner skrývá, aby při hydrataci neblikl.
  const open = useSyncExternalStore(subscribeConsent, isConsentOpen, isConsentOpenOnServer)

  if (!open) return null

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
              onClick={() => writeConsent('denied')}
              className="border border-primary text-primary text-xs tracking-[0.15em] uppercase px-5 py-3 hover:bg-primary hover:text-white transition-colors font-sans whitespace-nowrap"
            >
              Odmítnout
            </button>
            <button
              type="button"
              onClick={() => writeConsent('granted')}
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

/** Odkaz do patičky, kterým jde souhlas kdykoli znovu otevřít a odvolat. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={reopenConsent} className={className}>
      Nastavení cookies
    </button>
  )
}
