'use client'

import { usePathname } from 'next/navigation'

/**
 * Vykreslí obsah všude kromě administrace. Měření návštěvnosti ani cookie
 * lišta do /keystatic nepatří — překrývaly by editor a počítaly by správce
 * mezi návštěvníky.
 */
export default function SiteOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/keystatic')) return null
  return <>{children}</>
}
