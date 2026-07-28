import Link from 'next/link'
import { uvodNav } from '@/lib/uvod-content'
import { HubFooter, HubHeader, ACCENT, MUTED, PAPER, RULE } from './HubChrome'

/**
 * Skořápka podstránky osobního webu ve stylu varianty 1a („Lázeňský deník").
 * Drží hlavičku, titulek s perexem, patičku a zpětný odkaz; obsah dodá stránka.
 */
export default function HubPage({
  title,
  perex,
  activeHref,
  children,
}: {
  title: string
  perex?: string
  activeHref?: string
  children: React.ReactNode
}) {
  const activeLabel = uvodNav.find((item) => item.href === activeHref)?.label

  return (
    <div
      className="font-[family-name:var(--font-inter)] flex min-h-screen flex-col text-base leading-[1.65]"
      style={{ background: PAPER, color: '#17191C' }}
    >
      <HubHeader activeLabel={activeLabel} />

      <main className="flex-1 px-6 pt-16 pb-20 md:px-10 md:pt-[84px]">
        <h1 className="font-[family-name:var(--font-source-serif)] m-0 max-w-[18em] text-[clamp(32px,4.6vw,48px)] font-semibold leading-[1.15] tracking-[-0.015em]">
          {title}
        </h1>

        {perex && (
          <p
            className="font-[family-name:var(--font-source-serif)] mt-[18px] max-w-[32em] text-[20px] leading-[1.5] text-pretty italic"
            style={{ color: '#33363C' }}
          >
            {perex}
          </p>
        )}

        {children}

        <p className="mt-16 mb-0 text-[13.5px]">
          <Link href="/" style={{ color: ACCENT }}>
            ← Zpět na úvod
          </Link>
        </p>
      </main>

      <HubFooter />
    </div>
  )
}

/** Nadpis sekce uvnitř stránky. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="m-0 mb-4 text-xs font-semibold uppercase tracking-[0.13em]"
      style={{ color: MUTED }}
    >
      {children}
    </p>
  )
}

/** Odstavce běžného textu. */
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((p) => (
        <p
          key={p}
          className="mt-5 max-w-[38em] text-[17px] leading-[1.7] text-pretty"
          style={{ color: '#2A2D33' }}
        >
          {p}
        </p>
      ))}
    </>
  )
}

/** Karta s titulkem, štítkem stavu a textem. */
export function Card({
  title,
  status,
  url,
  text,
  extra,
}: {
  title: string
  status?: string
  url?: string
  text?: string
  extra?: string[]
}) {
  return (
    <article className="py-6" style={{ borderTop: `1px solid ${RULE}` }}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-[family-name:var(--font-source-serif)] m-0 text-[19px] font-semibold leading-[1.2]">
          {title}
        </h3>
        {status && (
          <span className="text-[12px] uppercase tracking-[0.1em]" style={{ color: MUTED }}>
            {status}
          </span>
        )}
        {url && (
          <a
            href={url}
            className="text-[13.5px] hover:underline"
            style={{ color: ACCENT }}
            target="_blank"
            rel="noreferrer"
          >
            {url.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>
      {text && (
        <p className="mt-2.5 mb-0 max-w-[38em] text-[15.5px] leading-[1.65]" style={{ color: MUTED }}>
          {text}
        </p>
      )}
      {extra?.map((line) => (
        <p
          key={line}
          className="mt-2.5 mb-0 max-w-[38em] text-[15.5px] leading-[1.65]"
          style={{ color: '#2A2D33' }}
        >
          {line}
        </p>
      ))}
    </article>
  )
}
