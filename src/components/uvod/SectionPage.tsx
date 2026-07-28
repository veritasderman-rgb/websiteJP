import Link from 'next/link'
import type { HubSection } from '@/lib/uvod-content'
import { uvodContent, uvodNav } from '@/lib/uvod-content'
import { HubFooter, HubHeader, ACCENT, MUTED, PAPER, RULE } from './HubChrome'

/**
 * Podstránka rozcestníku ve stylu varianty 1a. Zatím drží perex z dlaždice;
 * jakmile sekce dostane `body`, vykreslí se místo poznámky o rozpracovanosti.
 */
export default function SectionPage({ section }: { section: HubSection }) {
  const activeLabel = uvodNav.find((item) => item.href === `/${section.slug}`)?.label

  return (
    <div
      className="font-[family-name:var(--font-inter)] flex min-h-screen flex-col text-base leading-[1.65]"
      style={{ background: PAPER, color: '#17191C' }}
    >
      <HubHeader activeLabel={activeLabel} />

      <main className="flex-1 px-6 pt-16 pb-20 md:px-10 md:pt-[84px]">
        <h1 className="font-[family-name:var(--font-source-serif)] m-0 max-w-[16em] text-[clamp(34px,5vw,52px)] font-semibold leading-[1.15] tracking-[-0.015em]">
          {section.title}
        </h1>

        <p
          className="font-[family-name:var(--font-source-serif)] mt-[22px] max-w-[30em] text-[21px] leading-[1.5] text-pretty"
          style={{ color: '#33363C' }}
        >
          {section.perex}
        </p>

        {section.body?.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-6 max-w-[38em] text-[17px] leading-[1.7] text-pretty"
            style={{ color: '#2A2D33' }}
          >
            {paragraph}
          </p>
        ))}

        {section.list && (
          <section className="mt-12 max-w-[38em]">
            {section.listLabel && (
              <p
                className="m-0 mb-3.5 text-xs font-semibold uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                {section.listLabel}
              </p>
            )}
            <dl className="m-0">
              {section.list.map((item, i) => (
                <div
                  key={item.label}
                  className="grid grid-cols-1 gap-x-6 py-3 sm:grid-cols-[11em_1fr]"
                  style={i > 0 ? { borderTop: `1px solid ${RULE}` } : undefined}
                >
                  <dt className="text-[15px] font-medium">{item.label}</dt>
                  <dd className="m-0 text-[15px] leading-[1.6]" style={{ color: MUTED }}>
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <p
          className="mt-12 max-w-[34em] border-l-2 pl-4 text-[15px] leading-[1.6]"
          style={{ borderColor: RULE, color: MUTED }}
        >
          Máte k tomu otázku nebo poznámku? Napište mi na{' '}
          <a href={`mailto:${uvodContent.email}`} style={{ color: ACCENT }}>
            {uvodContent.email}
          </a>
          .
        </p>

        <p className="mt-12 mb-0 text-[13.5px]">
          <Link href="/" style={{ color: ACCENT }}>
            ← Zpět na úvod
          </Link>
        </p>
      </main>

      <HubFooter />
    </div>
  )
}
