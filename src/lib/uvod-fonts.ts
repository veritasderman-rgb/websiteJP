import {
  Source_Serif_4,
  Inter,
  Newsreader,
  Piazzolla,
  IBM_Plex_Sans,
} from 'next/font/google'

/**
 * Písma pro varianty osobního rozcestníku. Každá varianta používá jinou
 * dvojici, načítáme je jen na /uvod — zbytek webu jede dál na Playfair + DM Sans.
 * latin-ext je kvůli české diakritice povinný.
 */

// 1a — Lázeňský deník
export const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-source-serif',
  display: 'swap',
})

// 1a + 1b — doprovodný sans
export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

// 1b — Inkoust
export const newsreader = Newsreader({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

// 1c — Kolonáda
export const piazzolla = Piazzolla({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-piazzolla',
  display: 'swap',
})

// 1c — doprovodný sans (statické řezy, váhy je nutné vyjmenovat)
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
})

export const uvodFontVariables = [
  sourceSerif.variable,
  inter.variable,
  newsreader.variable,
  piazzolla.variable,
  plexSans.variable,
].join(' ')
