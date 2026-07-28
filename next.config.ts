import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'josefpavlovic.cz',
      },
    ],
  },
}

export default nextConfig
