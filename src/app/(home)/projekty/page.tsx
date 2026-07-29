import type { Metadata } from 'next'
import HubPage, { Card, SectionLabel } from '@/components/uvod/HubPage'
import { projekty } from '@/lib/hub-content'

export const metadata: Metadata = {
  title: 'Projekty',
  description:
    'HSPA Česko, marienbad.com, marketing lázeňských hotelů Ensana a hry pro radost. Většina z toho vznikla proto, že to nikdo jiný neudělal.',
  alternates: { canonical: '/projekty' },
}

export const revalidate = false

const MUTED = '#6B6E76'

export default function ProjektyPage() {
  return (
    <HubPage title={projekty.title} perex={projekty.perex} activeHref="/projekty">
      <section className="mt-12">
        {projekty.items.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </section>

      <section className="mt-16">
        <SectionLabel>{projekty.hryLabel}</SectionLabel>
        <p className="m-0 mb-2 max-w-[38em] text-[15px] italic" style={{ color: MUTED }}>
          {projekty.hryPerex}
        </p>
        <p className="m-0 mb-2 max-w-[38em] text-[15px]" style={{ color: MUTED }}>
          {projekty.hryNote}
        </p>
        {projekty.hry.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </section>
    </HubPage>
  )
}
