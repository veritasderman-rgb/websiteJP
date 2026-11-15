import type { Metadata } from 'next'
import HubNotFound from '@/components/uvod/HubNotFound'

export const metadata: Metadata = {
  title: 'Stránka nenalezena',
  robots: { index: false },
}

export default function NotFound() {
  return <HubNotFound />
}
