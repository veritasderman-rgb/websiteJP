import Link from 'next/link'
import { uvodContent, uvodNav } from '@/lib/uvod-content'

/**
 * Hlavička a patička rozcestníku ve stylu varianty 1a („Lázeňský deník").
 * Sdílí je homepage i podstránky, aby navigace zůstala na jednom místě.
 */

export const ACCENT = '#14606B'
export const PAPER = '#FAF9F6'
export const RULE = '#E4E1DA'
export const MUTED = '#6B6E76'

export function HubHeader({ activeLabel }: { activeLabel?: string }) {
  return (
    <header
      className="flex flex-wrap items-center justify-between gap-y-3 px-6 py-4 md:h-16 md:flex-nowrap md:px-10 md:py-0"
      style={{ borderBottom: `1px solid ${RULE}` }}
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-source-serif)] text-[19px] font-semibold tracking-[-0.01em]"
      >
        {uvodContent.name}
      </Link>
      <nav className="flex flex-wrap gap-1 text-[13.5px]" style={{ color: MUTED }}>
        {uvodNav.map((item) => {
          const className = 'rounded-md px-2.5 py-[7px]'
          const style =
            item.label === activeLabel
              ? { color: ACCENT, background: '#E8F1F2', fontWeight: 500 }
              : undefined
          const linkClassName = `${className} transition-colors hover:text-[#14606B]`
          // mailto: a další externí cíle musí jít přes <a>, ne přes next/link.
          if (item.href?.startsWith('/')) {
            return (
              <Link key={item.label} href={item.href} className={linkClassName} style={style}>
                {item.label}
              </Link>
            )
          }
          return item.href ? (
            <a key={item.label} href={item.href} className={linkClassName} style={style}>
              {item.label}
            </a>
          ) : (
            <span key={item.label} className={className} style={style}>
              {item.label}
            </span>
          )
        })}
      </nav>
    </header>
  )
}

export function HubFooter() {
  return (
    <footer
      className="flex flex-col justify-between gap-4 px-6 py-[34px] text-[13.5px] sm:flex-row md:px-10"
      style={{ borderTop: `1px solid ${RULE}`, color: MUTED }}
    >
      <span>{uvodContent.copyright}</span>
      <a href={`mailto:${uvodContent.email}`} className="hover:text-[#14606B]">
        {uvodContent.email}
      </a>
    </footer>
  )
}
