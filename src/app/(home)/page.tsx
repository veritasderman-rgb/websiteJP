import type { Metadata } from 'next'
import VariantA from '@/components/uvod/VariantA'
import { uvodContent } from '@/lib/uvod-content'

export const metadata: Metadata = {
  title: 'Josef Pavlovic — Mariánské Lázně',
  description: uvodContent.summary,
  alternates: { canonical: '/' },
}

export const revalidate = false

export default function HomePage() {
  return <VariantA />
}
