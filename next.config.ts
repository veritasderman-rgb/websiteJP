import type { NextConfig } from 'next'

/**
 * Režim úložiště Keystaticu pro server i prohlížeč (viz keystatic.config.ts).
 * Lze ho vynutit ručně; jinak se odvodí z toho, jestli je nastavená GitHub App.
 */
const keystaticStorage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE ||
  (process.env.KEYSTATIC_GITHUB_CLIENT_ID ? 'github' : 'local')

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_KEYSTATIC_STORAGE: keystaticStorage,
  },
  outputFileTracingRoot: process.cwd(),
  /**
   * Fotosekce se přestěhovala pod /foto, aby hub mohl převzít kanonické adresy.
   * Staré adresy jsou indexované, proto trvalé přesměrování.
   *
   * /o-mne a /kontakt tady nejsou schválně — ty adresy si bere hub a fotografické
   * verze žijí na /foto/o-mne a /foto/kontakt.
   */
  async redirects() {
    return [
      { source: '/portfolio', destination: '/foto/portfolio', permanent: true },
      { source: '/portfolio/:slug', destination: '/foto/portfolio/:slug', permanent: true },
      { source: '/nabidka', destination: '/foto/nabidka', permanent: true },
    ]
  },
  images: {
    // Hero fotka se servíruje v kvalitě 90; od Next 16 musí být každá použitá
    // hodnota `quality` vyjmenovaná tady.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'josefpavlovic.cz',
      },
    ],
  },
}

export default nextConfig
