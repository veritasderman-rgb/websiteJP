import type { Metadata } from 'next'
import Image from 'next/image'
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
const RULE = '#E4E1DA'

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

        <p className="mt-8 mb-1 text-[13px] font-semibold uppercase tracking-[0.08em]">
          {kontakt.fotkyLabel}
        </p>
        <p className="m-0 mb-4 text-[13px]" style={{ color: MUTED }}>
          {kontakt.fotkyNote}
        </p>
        <div className="grid max-w-[42em] grid-cols-1 gap-6 sm:grid-cols-2">
          {kontakt.fotky.map((f) => (
            <figure key={f.popis} className="m-0">
              <Image
                src={f.nahled}
                alt={f.popis}
                width={1600}
                height={1067}
                sizes="(max-width: 640px) 100vw, 20rem"
                className="h-auto w-full"
                style={{ border: `1px solid ${RULE}` }}
              />
              <figcaption className="mt-2 text-[13px]" style={{ color: MUTED }}>
                {f.popis}
                {f.kredit ? ` · ${f.kredit}` : ''}
                <span className="mt-1 block">
                  <a href={f.web} download style={{ color: ACCENT }}>
                    web
                  </a>
                  {'tisk' in f && f.tisk ? (
                    <>
                      {' · '}
                      <a href={f.tisk} download style={{ color: ACCENT }}>
                        tisk ({f.tiskPopis})
                      </a>
                    </>
                  ) : null}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </HubPage>
  )
}
