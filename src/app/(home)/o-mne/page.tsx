import type { Metadata } from 'next'
import Image from 'next/image'
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
      {/* Text vlevo, portrét vpravo; na mobilu portrét nahoře nad textem. */}
      <div className="mt-8 grid grid-cols-1 gap-x-12 md:grid-cols-[1fr_340px]">
        <div className="order-2 md:order-1">
          <Prose paragraphs={oMne.bio} />

          <p className="mt-5 max-w-[38em] text-[17px] leading-[1.7]" style={{ color: '#2A2D33' }}>
            Psát mi můžete na{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: ACCENT }}>
              {EMAIL}
            </a>
            .
          </p>
        </div>

        <figure className="order-1 mb-8 md:sticky md:top-8 md:order-2 md:mb-0 md:self-start">
          <Image
            src={oMne.portret.src}
            alt={oMne.portret.alt}
            width={1400}
            height={933}
            priority
            sizes="(max-width: 768px) 100vw, 21rem"
            className="h-auto w-full"
            style={{ border: `1px solid ${RULE}` }}
          />
          <figcaption className="mt-2 text-[13px]" style={{ color: MUTED }}>
            {oMne.portret.kredit}
          </figcaption>
        </figure>
      </div>

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
              {'fotky' in item && item.fotky && (
                <div
                  className={`mt-4 grid gap-2 ${
                    // Samotná fotka dostane celou šířku karty, víc jich jde vedle sebe.
                    item.fotky.length > 1 ? 'grid-cols-3' : 'grid-cols-1'
                  }`}
                >
                  {item.fotky.map((foto) => (
                    <Image
                      key={foto.src}
                      src={foto.src}
                      alt={foto.alt}
                      width={foto.w}
                      height={foto.h}
                      // Jedna fotka zabírá celou šířku karty (~35rem), tři se
                      // dělí o třetiny. Bez rozlišení si prohlížeč stahoval
                      // 192px zdroj do 552px slotu a fotka byla rozmazaná.
                      sizes={
                        item.fotky.length > 1
                          ? '(max-width: 640px) 30vw, 12rem'
                          : '(max-width: 640px) 100vw, 35rem'
                      }
                      className="h-auto w-full"
                      style={{ border: `1px solid ${RULE}` }}
                    />
                  ))}
                </div>
              )}
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
