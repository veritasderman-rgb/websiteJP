import type { Metadata } from 'next'
import Link from 'next/link'
import HubPage, { Card, SectionLabel } from '@/components/uvod/HubPage'
import { tvorba } from '@/lib/hub-content'

export const metadata: Metadata = {
  title: 'Tvorba',
  description:
    'Městská fantasy Česká hlídka, analýzy a interpelace ke zdravotnictví, fotografie. Dvě věci, které spolu na první pohled nesouvisí.',
  alternates: { canonical: '/tvorba' },
}

export const revalidate = false

const ACCENT = '#14606B'
const RULE = '#E4E1DA'

export default function TvorbaPage() {
  return (
    <HubPage title={tvorba.title} perex={tvorba.perex} activeHref="/tvorba">
      <section className="mt-12">
        <SectionLabel>{tvorba.beletrieLabel}</SectionLabel>
        {tvorba.beletrie.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </section>

      <section className="mt-16">
        <SectionLabel>{tvorba.analyzyLabel}</SectionLabel>
        {tvorba.analyzy.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </section>

      <section className="mt-16">
        <SectionLabel>{tvorba.fotografieLabel}</SectionLabel>
        <p
          className="mt-0 mb-0 max-w-[38em] text-[17px] leading-[1.7]"
          style={{ color: '#2A2D33' }}
        >
          {tvorba.fotografie}
        </p>
        <p className="mt-5 mb-0">
          <Link
            href={tvorba.fotografieHref}
            className="inline-block px-5 py-2.5 text-[15px] font-medium"
            style={{ border: `1px solid ${RULE}`, color: ACCENT }}
          >
            {tvorba.fotografieCta}
          </Link>
        </p>
      </section>
    </HubPage>
  )
}
