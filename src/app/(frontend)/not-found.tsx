import type { Metadata } from 'next'
import NotFoundContent from '@/components/NotFoundContent'

export const metadata: Metadata = {
  title: 'Stránka nenalezena',
  robots: { index: false },
}

export default function NotFound() {
  return <NotFoundContent />
}
