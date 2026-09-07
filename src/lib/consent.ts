// Cookie consent (GDPR / Google Consent Mode v2)
//
// Sdílený klíč pro localStorage. Používá ho jak inline skript v root layoutu
// (nastaví výchozí stav souhlasu ještě před načtením GA), tak banner
// CookieConsent, který volbu ukládá a aktualizuje gtag. Banner se na stav ptá
// přes useSyncExternalStore, aby se překreslil po volbě i po znovuotevření
// z patičky — proto tu vedle čtení a zápisu žije i drobná registrace
// posluchačů.
export const CONSENT_KEY = 'jp.cookieConsent.v1'

export type ConsentChoice = 'granted' | 'denied'

let listeners: (() => void)[] = []

/** Banner otevřený z patičky, i když volba už padla (odvolání souhlasu). */
let reopened = false

function notify(): void {
  for (const l of listeners) l()
}

export function subscribeConsent(onChange: () => void): () => void {
  listeners = [...listeners, onChange]
  return () => {
    listeners = listeners.filter((l) => l !== onChange)
  }
}

function readStored(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY)
    return stored === 'granted' || stored === 'denied' ? stored : null
  } catch {
    // Privátní režim — chováme se, jako by volba nepadla.
    return null
  }
}

/** Má se banner vykreslit? */
export function isConsentOpen(): boolean {
  return reopened || readStored() === null
}

/** Na serveru se banner nevykresluje, jinak by blikl při hydrataci. */
export function isConsentOpenOnServer(): boolean {
  return false
}

/** Odkaz „Nastavení cookies" v patičce — souhlas musí jít odvolat stejně
 *  snadno, jako se dával. */
export function reopenConsent(): void {
  reopened = true
  notify()
}

export function writeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice)
  } catch {
    // localStorage nedostupné (např. private mode) – volbu jen aplikujeme
  }
  reopened = false
  updateGtagConsent(choice)
  notify()
}

// Aktualizuje Google Consent Mode v2 po volbě uživatele. Pokud GA ještě
// není načtená (dev / GA vypnutá), funkce se tiše neprovede.
//
// Přepíná se jen `analytics_storage`. Reklamní souhlas zůstává denied —
// banner slibuje anonymní měření návštěvnosti a nic víc, takže na reklamní
// účely souhlas nemáme.
function updateGtagConsent(choice: ConsentChoice): void {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== 'function') return
  gtag('consent', 'update', { analytics_storage: choice })
}
