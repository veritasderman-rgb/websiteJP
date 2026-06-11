// Jednotné odesílání událostí do GA4 i Vercel Analytics.
//
// Volá se z klientských komponent (event handlery). Obě volání jsou
// obalená v try/catch, takže když analytika není načtená (např. v dev
// nebo před udělením souhlasu), nic se nerozbije.
import { sendGAEvent } from '@next/third-parties/google'
import { track } from '@vercel/analytics'

type EventParams = Record<string, string | number | boolean>

export function trackEvent(name: string, params?: EventParams) {
  try {
    sendGAEvent('event', name, params ?? {})
  } catch {
    // GA není načtená – ignorovat
  }
  try {
    track(name, params)
  } catch {
    // Vercel Analytics není dostupná – ignorovat
  }
}
