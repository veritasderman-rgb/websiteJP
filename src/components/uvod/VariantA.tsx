import Link from 'next/link'
import { uvodContent } from '@/lib/uvod-content'
import Portrait from './Portrait'
import { HubFooter, HubHeader, ACCENT, MUTED, PAPER, RULE } from './HubChrome'

/**
 * Varianta 1a — „Lázeňský deník"
 * Source Serif 4 + Inter · akcent #14606B · papír #FAF9F6
 * Dlaždice ve 12sloupcové mřížce (3+3+3+3, 4+4+4), oddělovače hairline 1px.
 */

// Rozložení dlaždic podle designu: první čtyři na 3 sloupce, zbylé tři na 4.
const SPANS = [3, 3, 3, 3, 4, 4, 4]

export default function VariantA() {
  return (
    <div
      className="font-[family-name:var(--font-inter)] text-base leading-[1.65] shadow-[0_2px_14px_rgba(23,25,28,.08)]"
      style={{ background: PAPER, color: '#17191C' }}
    >
      {/* Hlavička */}
      <HubHeader activeLabel="Úvod" />

      {/* Hero */}
      <section
        className="grid grid-cols-1 items-end gap-14 px-6 pt-16 pb-14 md:grid-cols-[1fr_300px] md:px-10 md:pt-[84px]"
        style={{ borderBottom: `1px solid ${RULE}` }}
      >
        <div>
          <h1 className="font-[family-name:var(--font-source-serif)] m-0 text-[clamp(44px,7vw,72px)] font-semibold leading-[1.1] tracking-[-0.015em]">
            {uvodContent.name}
          </h1>
          <p
            className="font-[family-name:var(--font-source-serif)] mt-[22px] max-w-[26em] text-[22px] leading-[1.5] text-pretty"
            style={{ color: '#33363C' }}
          >
            {uvodContent.lead}
          </p>
          <p
            className="mt-[26px] text-[13px] uppercase tracking-[0.1em]"
            style={{ color: MUTED }}
          >
            {uvodContent.place}
          </p>
        </div>
        <Portrait borderColor={RULE} priority />
      </section>

      {/* Oblasti */}
      <section
        className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-12"
        style={{ background: RULE, borderBottom: `1px solid ${RULE}` }}
      >
        {uvodContent.areas.map((area, i) => {
          const body = (
            <>
              <h3 className="font-[family-name:var(--font-source-serif)] m-0 mb-2.5 text-[19px] font-semibold leading-[1.2]">
                {area.title}
              </h3>
              <p className="m-0 text-sm leading-[1.6]" style={{ color: MUTED }}>
                {area.text}
              </p>
              <p className="mt-4 mb-0 text-[13.5px] font-medium" style={{ color: ACCENT }}>
                {area.cta}
              </p>
            </>
          )
          const className = 'px-[26px] pt-[30px] pb-[26px]'
          const style = { background: PAPER, gridColumn: `span ${SPANS[i]}` }
          return area.href ? (
            <Link
              key={area.title}
              href={area.href}
              className={`${className} block transition-colors hover:bg-[#F2F0E9]`}
              style={style}
            >
              {body}
            </Link>
          ) : (
            <article key={area.title} className={className} style={style}>
              {body}
            </article>
          )
        })}
      </section>

      {/* Právě teď */}
      <section className="px-6 py-12 md:px-10" style={{ borderBottom: `1px solid ${RULE}` }}>
        <p
          className="m-0 mb-3.5 text-xs font-semibold uppercase tracking-[0.13em]"
          style={{ color: MUTED }}
        >
          {uvodContent.nowLabel}
        </p>
        <div className="flex flex-col">
          {uvodContent.now.map((item, i) => (
            <p
              key={item}
              className="font-[family-name:var(--font-source-serif)] relative m-0 py-[9px] pl-[22px] text-lg"
              style={
                i < uvodContent.now.length - 1
                  ? { borderBottom: `1px dashed ${RULE}` }
                  : undefined
              }
            >
              <span className="absolute left-0" style={{ color: ACCENT }}>
                —
              </span>
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* Zkráceně */}
      <section className="px-6 pt-16 pb-20 md:px-10">
        <p
          className="m-0 mb-3.5 text-xs font-semibold uppercase tracking-[0.13em]"
          style={{ color: MUTED }}
        >
          {uvodContent.summaryLabel}
        </p>
        <p
          className="font-[family-name:var(--font-source-serif)] m-0 max-w-[38em] text-lg leading-[1.7] text-pretty"
          style={{ color: '#2A2D33' }}
        >
          {uvodContent.summary}
        </p>
        <p className="mt-[18px] mb-0 text-base">
          <Link href={uvodContent.cvHref} style={{ color: ACCENT }}>
            {uvodContent.cvLabel}
          </Link>
        </p>
      </section>

      {/* Patička */}
      <HubFooter />
    </div>
  )
}
