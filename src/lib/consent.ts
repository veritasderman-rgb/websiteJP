// Cookie consent (GDPR / Google Consent Mode v2)
//
// Sdílený klíč pro localStorage. Používá ho jak inline skript v root layoutu
// (nastaví výchozí stav souhlasu ještě před načtením GA), tak banner
// CookieConsent, který volbu ukládá a aktualizuje gtag.
export const CONSENT_KEY = 'jp.cookieConsent.v1'

export type ConsentChoice = 'granted' | 'denied'
