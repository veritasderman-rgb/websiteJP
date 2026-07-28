import { uvodContent, uvodNav } from '@/lib/uvod-content'
import Portrait from './Portrait'

/**
 * Varianta 1c — „Kolonáda"
 * Piazzolla + IBM Plex Sans · akcent smrková zeleň · teplejší papír #FBF8F1
 * Zaoblené karty ve dvou sloupcích, pilulkové menu, „Právě teď" v zeleném boxu.
 */

const ACCENT = 'oklch(0.45 0.07 170)'
const ACCENT_SOFT = 'oklch(0.97 0.012 170)'
const PAPER = '#FBF8F1'
const CARD = '#FFFEFA'
const RULE = '#E8E2D4'
const MUTED = '#726F66'

export default function VariantC() {
  return (
    <div
      className="font-[family-name:var(--font-plex-sans)] text-base leading-[1.65] shadow-[0_2px_14px_rgba(23,25,28,.08)]"
      style={{ background: PAPER, color: '#1C1A16' }}
    >
      {/* Hlavička */}
      <header
        className="flex flex-wrap items-center justify-between gap-y-3 px-6 py-4 md:h-[68px] md:flex-nowrap md:px-11 md:py-0"
        style={{ borderBottom: `1px solid ${RULE}` }}
      >
        <span className="font-[family-name:var(--font-piazzolla)] text-xl font-semibold tracking-[-0.01em]">
          {uvodContent.name}
        </span>
        <nav className="flex flex-wrap gap-1.5 text-[13.5px]" style={{ color: MUTED }}>
          {uvodNav.map((item, i) => (
            <span
              key={item}
              className="px-[11px] py-1.5"
              style={
                i === 0
                  ? {
                      color: PAPER,
                      background: ACCENT,
                      borderRadius: 100,
                      fontWeight: 500,
                    }
                  : undefined
              }
            >
              {item}
            </span>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-[820px] px-6 pt-16 pb-14 md:px-11 md:pt-[92px]">
        <h1 className="font-[family-name:var(--font-piazzolla)] m-0 text-[clamp(42px,6.5vw,68px)] font-semibold leading-[1.08] tracking-[-0.015em]">
          {uvodContent.name}
        </h1>
        <p
          className="font-[family-name:var(--font-piazzolla)] mt-6 text-[22px] leading-[1.55] text-pretty"
          style={{ color: '#3A372F' }}
        >
          {uvodContent.lead}
        </p>
        <p
          className="mt-7 text-[13px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: ACCENT }}
        >
          {uvodContent.place}
        </p>
      </section>

      {/* Oblasti — zaoblené karty */}
      <section className="grid grid-cols-1 gap-4 px-6 pb-2 md:grid-cols-2 md:px-11">
        {uvodContent.areas.map((area, i) => {
          const isLast = i === uvodContent.areas.length - 1
          return (
            <article
              key={area.title}
              className={`rounded-[10px] px-[26px] pt-[26px] pb-[22px] ${
                isLast ? 'md:col-span-2 md:flex md:items-baseline md:justify-between md:gap-6' : ''
              }`}
              style={{ background: CARD, border: `1px solid ${RULE}` }}
            >
              <div>
                <h3 className="font-[family-name:var(--font-piazzolla)] m-0 mb-2 text-xl font-semibold leading-[1.2]">
                  {area.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.6]" style={{ color: MUTED }}>
                  {area.text}
                </p>
              </div>
              <p
                className={`mb-0 text-[13.5px] font-medium ${isLast ? 'mt-3.5 md:mt-0 md:whitespace-nowrap' : 'mt-3.5'}`}
                style={{ color: ACCENT }}
              >
                {area.cta}
              </p>
            </article>
          )
        })}
      </section>

      {/* Právě teď */}
      <section
        className="mx-6 mt-12 rounded-[10px] px-6 py-8 md:mx-11 md:px-[34px]"
        style={{ background: ACCENT_SOFT }}
      >
        <p
          className="m-0 mb-3.5 text-xs font-semibold uppercase tracking-[0.13em]"
          style={{ color: ACCENT }}
        >
          {uvodContent.nowLabel}
        </p>
        <div className="flex flex-col gap-2.5">
          {uvodContent.now.map((item) => (
            <p
              key={item}
              className="font-[family-name:var(--font-piazzolla)] relative m-0 pl-[22px] text-lg"
            >
              <span className="absolute left-0" style={{ color: ACCENT }}>
                —
              </span>
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* Portrét + Zkráceně */}
      <section className="grid grid-cols-1 items-start gap-12 px-6 pt-16 pb-20 md:grid-cols-[220px_1fr] md:px-11 md:pb-[84px]">
        <Portrait
          rounded
          creditColor={MUTED}
          sizes="(max-width: 768px) 60vw, 220px"
          className="max-w-[220px]"
        />
        <div>
          <p
            className="m-0 mb-3.5 text-xs font-semibold uppercase tracking-[0.13em]"
            style={{ color: MUTED }}
          >
            {uvodContent.summaryLabel}
          </p>
          <p
            className="font-[family-name:var(--font-piazzolla)] m-0 max-w-[36em] text-lg leading-[1.7] text-pretty"
            style={{ color: '#2E2B24' }}
          >
            {uvodContent.summary}
          </p>
          <p className="mt-[18px] mb-0 text-base">
            <span style={{ color: ACCENT }}>{uvodContent.cvLabel}</span>
          </p>
        </div>
      </section>

      {/* Patička */}
      <footer
        className="flex flex-col justify-between gap-4 px-6 py-8 text-[13.5px] sm:flex-row md:px-11"
        style={{ borderTop: `1px solid ${RULE}`, color: MUTED }}
      >
        <span>{uvodContent.copyright}</span>
        <span>{uvodContent.email}</span>
      </footer>
    </div>
  )
}
