import type { Metadata } from 'next'
import HubPage, { SectionLabel } from '@/components/uvod/HubPage'
import { kontakt, EMAIL } from '@/lib/hub-content'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: kontakt.perex,
  alternates: { canonical: '/kontakt' },
}

export const revalidate = false

const ACCENT = '#14606B'
const MUTED = '#6B6E76'

export default function KontaktPage() {
  return (
    <HubPage title={kontakt.title} perex={kontakt.perex} activeHref="/kontakt">
      <p className="mt-12 mb-0">
        <a
          href={`mailto:${EMAIL}`}
          className="font-[family-name:var(--font-source-serif)] text-[26px] font-semibold hover:underline"
          style={{ color: ACCENT }}
        >
          {EMAIL}
        </a>
      </p>

      <section className="mt-16">
        <SectionLabel>{kontakt.mediaLabel}</SectionLabel>
        <ul className="m-0 list-none p-0">
          {kontakt.media.map((item) => (
            <li
              key={item}
              className="relative max-w-[40em] py-1.5 pl-5 text-[15.5px] leading-[1.65]"
              style={{ color: '#2A2D33' }}
            >
              <span className="absolute left-0" style={{ color: MUTED }}>
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </HubPage>
  )
}
