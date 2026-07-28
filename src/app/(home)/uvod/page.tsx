import Link from 'next/link'
import type { Metadata } from 'next'
import { uvodVariants, CANVAS_BG } from '@/lib/uvod-variants'

export const metadata: Metadata = {
  title: 'Homepage — varianty',
  description: 'Tři varianty osobního rozcestníku Josefa Pavloviče: Lázeňský deník, Inkoust, Kolonáda.',
  robots: { index: false, follow: false },
}

export const revalidate = false

/**
 * Srovnávací plátno — všechny tři varianty pod sebou, stejně jako v designu
 * „Homepage variace". Každá má nad sebou štítek 1a / 1b / 1c.
 */
export default function UvodIndexPage() {
  return (
    <div className="px-4 py-8 md:px-12 md:py-12" style={{ background: CANVAS_BG }}>
      <header className="mx-auto mb-10 max-w-[1180px]">
        <h1 className="font-[family-name:var(--font-inter)] text-2xl font-semibold text-[#17191C]">
          Homepage — varianty
        </h1>
        <p className="font-[family-name:var(--font-inter)] mt-2 text-sm text-[#55585F]">
          Stejný obsah ve třech typografických a layoutových provedeních. Každou lze otevřít
          samostatně přes odkaz u štítku.
        </p>
      </header>

      <div className="flex flex-col gap-14">
        {uvodVariants.map(({ id, name, note, Component }) => (
          <section key={id} className="mx-auto w-full max-w-[1180px]">
            <div className="mb-3.5 flex flex-wrap items-baseline gap-3">
              <span className="rounded bg-[#17191C] px-2.5 py-[3px] font-mono text-[13px] font-bold text-[#FAF9F6]">
                {id}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#55585F]">
                {name} — {note}
              </span>
              <Link
                href={`/uvod/${id}`}
                className="font-[family-name:var(--font-inter)] text-[13px] text-[#14606B] underline underline-offset-2 hover:text-[#0E4A53]"
              >
                Otevřít samostatně →
              </Link>
            </div>
            <Component />
          </section>
        ))}
      </div>
    </div>
  )
}
