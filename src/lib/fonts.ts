import { Playfair_Display, DM_Sans } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
})

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
