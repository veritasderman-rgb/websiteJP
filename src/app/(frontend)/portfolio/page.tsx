import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../../keystatic.config'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Galerie fotografií — svatby, boudoir, portréty, architektura a street fotografie.',
}

export const revalidate = false

const categoryLabels: Record<string, string> = {
  wedding: 'Svatby',
  boudoir: 'Boudoir & Akt',
  portrait: 'Portréty',
  architecture: 'Architektura',
  street: 'Ulice & Cestování',
  other: 'Ostatní',
}

export default async function PortfolioPage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const galleries = await reader.collections.galleries.all()

  const sorted = [...galleries].sort((a, b) => {
    const da = a.entry.publishedDate || ''
    const db = b.entry.publishedDate || ''
    return db.localeCompare(da)
  })

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl text-primary font-light tracking-wide mb-4">
            Portfolio
          </h1>
          <p className="text-secondary font-sans text-sm tracking-[0.1em]">
            Výběr z mé fotografické tvorby
          </p>
        </header>

        {sorted.length === 0 ? (
          <p className="text-center text-secondary font-sans py-20">
            Galerie jsou připravovány. Brzy se vrátí.
          </p>
        ) : (
          <div className="columns-2 md:columns-3 gap-4">
            {sorted.map(({ slug, entry }) => {
              if (!entry.coverImage) return null
              return (
                <Link
                  key={slug}
                  href={`/portfolio/${slug}`}
                  className="group block mb-4 break-inside-avoid overflow-hidden"
                >
                  <div className="relative overflow-hidden bg-surface">
                    <Image
                      src={entry.coverImage}
                      alt={entry.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-5 opacity-0 group-hover:opacity-100">
                      <div>
                        <p className="text-white/70 text-xs tracking-[0.15em] uppercase font-sans mb-1">
                          {categoryLabels[entry.category] || entry.category}
                        </p>
                        <h2 className="text-white font-display text-xl font-light">{entry.title}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 pb-1 group-hover:hidden">
                    <h2 className="font-display text-base text-primary">{entry.title}</h2>
                    <p className="text-secondary text-xs tracking-wider uppercase font-sans mt-0.5">
                      {categoryLabels[entry.category] || entry.category}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
