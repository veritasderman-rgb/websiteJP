import { uvodContent, uvodNav } from '@/lib/uvod-content'
import Portrait from './Portrait'

/**
 * Varianta 1b — „Inkoust"
 * Newsreader (kurzívní H1) + Inter · akcent hlubší petrolej · papír #FBFAF7
 * Novinová linka 2px pod hlavičkou, číslovaný seznam 01–07 ve dvou sloupcích.
 */

const ACCENT = 'oklch(0.40 0.06 210)'
const PAPER = '#FBFAF7'
const INK = '#1A1B1E'
const RULE = '#E6E3DB'
const MUTED = '#6B6E76'

export default function VariantB() {
  return (
    <div
      className="font-[family-name:var(--font-inter)] text-base leading-[1.65] shadow-[0_2px_14px_rgba(23,25,28,.08)]"
      style={{ background: PAPER, color: INK }}
    >
      {/* Hlavička */}
      <header
        className="flex flex-wrap items-baseline justify-between gap-y-3 px-6 pt-6 pb-6 md:px-12"
        style={{ borderBottom: `2px solid ${INK}` }}
      >
        <span className="font-[family-name:var(--font-newsreader)] text-[21px] font-medium tracking-[-0.01em]">
          {uvodContent.name}
        </span>
        <nav
          className="flex flex-wrap gap-x-[22px] gap-y-2 text-[12.5px] uppercase tracking-[0.08em]"
          style={{ color: MUTED }}
        >
          {uvodNav.map((item, i) => (
            <span
              key={item}
              style={
                i === 0
                  ? {
                      color: ACCENT,
                      borderBottom: `2px solid ${ACCENT}`,
                      paddingBottom: 3,
                      fontWeight: 600,
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
      <section
        className="grid grid-cols-1 gap-16 px-6 pt-16 pb-16 md:grid-cols-[1fr_280px] md:px-12 md:pt-[88px]"
        style={{ borderBottom: `1px solid ${RULE}` }}
      >
        <div>
          <p
            className="m-0 mb-5 text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color: MUTED }}
          >
            {uvodContent.place}
          </p>
          <h1 className="font-[family-name:var(--font-newsreader)] m-0 text-[clamp(48px,8vw,82px)] font-medium italic leading-[1.06] tracking-[-0.02em]">
            {uvodContent.name}
          </h1>
          <p
            className="font-[family-name:var(--font-newsreader)] mt-[26px] max-w-[25em] text-[23px] leading-[1.5] text-pretty"
            style={{ color: '#34363B' }}
          >
            {uvodContent.lead}
          </p>
        </div>
        <div className="self-start">
          <Portrait
            priority
            sizes="(max-width: 768px) 60vw, 280px"
            className="max-w-[280px] max-md:max-w-[240px]"
          />
        </div>
      </section>

      {/* Oblasti — číslovaný seznam */}
      <section className="px-6 pt-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
          {uvodContent.areas.map((area, i) => (
            <div
              key={area.title}
              className="flex items-baseline gap-[18px] py-6"
              style={{ borderBottom: `1px solid ${RULE}` }}
            >
              <span
                className="font-[family-name:var(--font-newsreader)] min-w-[22px] text-[15px] italic"
                style={{ color: ACCENT }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-newsreader)] m-0 mb-1.5 text-[21px] font-medium leading-[1.2]">
                  {area.title}
                </h3>
                <p className="m-0 text-sm leading-[1.6]" style={{ color: MUTED }}>
                  {area.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Právě teď + Zkráceně */}
      <section className="grid grid-cols-1 gap-16 px-6 pt-16 pb-20 md:grid-cols-2 md:px-12 md:pb-[84px]">
        <div className="pl-[26px]" style={{ borderLeft: `3px solid ${ACCENT}` }}>
          <p
            className="m-0 mb-3.5 text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: ACCENT }}
          >
            {uvodContent.nowLabel}
          </p>
          <div className="flex flex-col gap-3">
            {uvodContent.now.map((item) => (
              <p
                key={item}
                className="font-[family-name:var(--font-newsreader)] m-0 text-[19px] italic leading-[1.45]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p
            className="m-0 mb-3.5 text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: MUTED }}
          >
            {uvodContent.summaryLabel}
          </p>
          <p
            className="font-[family-name:var(--font-newsreader)] m-0 text-[17.5px] leading-[1.7] text-pretty"
            style={{ color: '#2A2D33' }}
          >
            {uvodContent.summary}
          </p>
          <p className="mt-4 mb-0 text-[15px]">
            <span style={{ color: ACCENT }}>{uvodContent.cvLabel}</span>
          </p>
        </div>
      </section>

      {/* Patička */}
      <footer
        className="flex flex-col justify-between gap-4 px-6 py-[30px] text-[13px] sm:flex-row md:px-12"
        style={{ borderTop: `2px solid ${INK}`, color: MUTED }}
      >
        <span>{uvodContent.copyright}</span>
        <span>{uvodContent.email}</span>
      </footer>
    </div>
  )
}
