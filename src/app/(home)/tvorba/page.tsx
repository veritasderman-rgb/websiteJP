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
const MUTED = '#6B6E76'

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
        <SectionLabel>{tvorba.videoLabel}</SectionLabel>
        <p className="m-0 mb-5 max-w-[38em] text-[15px] italic" style={{ color: MUTED }}>
          {tvorba.videoPerex}
        </p>
        <div className="grid max-w-[52em] grid-cols-1 gap-6 sm:grid-cols-2">
          {tvorba.videa.map((video) => (
            <figure key={video.id} className="m-0">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '16 / 9', border: `1px solid ${RULE}` }}
              >
                <iframe
                  // nocookie doména, ať se návštěvníkovi nesbírají cookies
                  // dřív, než na video vůbec klikne
                  src={`https://www.youtube-nocookie.com/embed/${video.id}${
                    'start' in video && video.start ? `?start=${video.start}` : ''
                  }`}
                  title={video.titulek}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                />
              </div>
              <figcaption className="mt-2 text-[13.5px]" style={{ color: MUTED }}>
                {video.titulek} · {video.kanal}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionLabel>{tvorba.fotografieLabel}</SectionLabel>
        {tvorba.fotografie.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-0 mb-4 max-w-[38em] text-[17px] leading-[1.7]"
            style={{ color: '#2A2D33' }}
          >
            {paragraph}
          </p>
        ))}
        <p className="mt-5 mb-0 max-w-[38em] text-[15px]" style={{ color: MUTED }}>
          {tvorba.vopat.text}{' '}
          <a href={tvorba.vopat.url} target="_blank" rel="noreferrer" style={{ color: ACCENT }}>
            {tvorba.vopat.label}
          </a>
        </p>
        <p className="mt-6 mb-0">
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
