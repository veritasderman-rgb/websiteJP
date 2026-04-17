import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Galerie fotografií — svatby, boudoir, portréty, architektura a street fotografie.',
}

export const revalidate = 3600

const categoryLabels: Record<string, string> = {
  wedding: 'Svatby',
  boudoir: 'Boudoir & Akt',
  portrait: 'Portréty',
  architecture: 'Architektura',
  street: 'Ulice & Cestování',
  other: 'Ostatní',
}

export default async function PortfolioPage() {
  let galleries: any[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'galleries',
      limit: 100,
      depth: 2,
      sort: '-publishedDate',
    })
    galleries = result.docs
  } catch {
    // show empty state if DB not ready
  }

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

        {galleries.length === 0 ? (
          <p className="text-center text-secondary font-sans py-20">
            Galerie jsou připravovány. Brzy se vrátí.
          </p>
        ) : (
          <div className="columns-2 md:columns-3 gap-4">
            {galleries.map((gallery: any) => {
              const cover = typeof gallery.coverImage === 'object' ? gallery.coverImage : null
              const src = cover?.sizes?.card?.filename
                ? getMediaUrl(cover.sizes.card.filename)
                : cover?.filename
                ? getMediaUrl(cover.filename)
                : null

              if (!src) return null

              return (
                <Link
                  key={gallery.id}
                  href={`/portfolio/${gallery.slug}`}
                  className="group block mb-4 break-inside-avoid overflow-hidden"
                >
                  <div className="relative overflow-hidden bg-surface">
                    <Image
                      src={src}
                      alt={cover?.alt || gallery.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-5 opacity-0 group-hover:opacity-100">
                      <div>
                        <p className="text-white/70 text-xs tracking-[0.15em] uppercase font-sans mb-1">
                          {categoryLabels[gallery.category] || gallery.category}
                        </p>
                        <h2 className="text-white font-display text-xl font-light">{gallery.title}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 pb-1 group-hover:hidden">
                    <h2 className="font-display text-base text-primary">{gallery.title}</h2>
                    <p className="text-secondary text-xs tracking-wider uppercase font-sans mt-0.5">
                      {categoryLabels[gallery.category] || gallery.category}
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
