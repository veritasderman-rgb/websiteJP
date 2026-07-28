import type { Metadata } from 'next'
import HubPage, { Prose, SectionLabel } from '@/components/uvod/HubPage'
import { oMne, EMAIL } from '@/lib/hub-content'
import { uvodContent } from '@/lib/uvod-content'

export const metadata: Metadata = {
  title: 'O mně',
  description: uvodContent.summary,
  alternates: { canonical: '/o-mne' },
}

export const revalidate = false

const RULE = '#E4E1DA'
const MUTED = '#6B6E76'
const ACCENT = '#14606B'

export default function OMnePage() {
  return (
    <HubPage title={oMne.title} activeHref="/o-mne">
      <Prose paragraphs={oMne.bio} />

      <p className="mt-5 max-w-[38em] text-[17px] leading-[1.7]" style={{ color: '#2A2D33' }}>
        Psát mi můžete na{' '}
        <a href={`mailto:${EMAIL}`} style={{ color: ACCENT }}>
          {EMAIL}
        </a>
        .
      </p>

      <section className="mt-16">
        <SectionLabel>{oMne.mimoPraciLabel}</SectionLabel>
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2" style={{ background: RULE }}>
          {oMne.mimoPraci.map((item, i) => (
            <article
              key={item.title}
              className="px-6 py-6"
              style={{
                background: '#FAF9F6',
                // Lichá poslední karta zabere celou šířku, ať v mřížce nezůstane díra.
                ...(i === oMne.mimoPraci.length - 1 && oMne.mimoPraci.length % 2 === 1
                  ? { gridColumn: 'span 2' }
                  : {}),
              }}
            >
              <h3 className="font-[family-name:var(--font-source-serif)] m-0 text-[18px] font-semibold">
                {item.title}
              </h3>
              <p className="mt-1 mb-0 text-[12px] uppercase tracking-[0.1em]" style={{ color: MUTED }}>
                {item.meta}
              </p>
              <p className="mt-3 mb-0 text-[15.5px] leading-[1.65]" style={{ color: MUTED }}>
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionLabel>{oMne.bioLabel}</SectionLabel>
        {oMne.bios.map((bio) => (
          <div key={bio.label} className="mt-6 max-w-[40em]">
            <p className="m-0 mb-2 text-[13.5px] font-medium">{bio.label}</p>
            <blockquote
              className="m-0 py-3 pl-4 text-[15.5px] leading-[1.7]"
              style={{ borderLeft: `2px solid ${RULE}`, color: '#2A2D33' }}
            >
              {bio.text.split('\n\n').map((para) => (
                <p key={para} className="m-0 mt-3 first:mt-0">
                  {para}
                </p>
              ))}
            </blockquote>
          </div>
        ))}
        <p className="mt-6 max-w-[40em] text-[13.5px]" style={{ color: MUTED }}>
          Dlouhá verze je text výše.
        </p>
      </section>
    </HubPage>
  )
}
