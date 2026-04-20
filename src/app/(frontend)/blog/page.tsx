import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../../keystatic.config'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Zápisky o fotografii, inspirace a tipy pro klienty.',
}

export const revalidate = false

export default async function BlogPage() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const posts = await reader.collections.posts.all()

  const sorted = [...posts].sort((a, b) => {
    const da = a.entry.publishedDate || ''
    const db = b.entry.publishedDate || ''
    return db.localeCompare(da)
  })

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl text-primary font-light tracking-wide">
            Blog
          </h1>
        </header>

        {sorted.length === 0 ? (
          <p className="text-center text-secondary font-sans py-20">Žádné příspěvky zatím nejsou k dispozici.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sorted.map(({ slug, entry }) => (
              <article key={slug}>
                <Link href={`/blog/${slug}`} className="group block">
                  {entry.featuredImage && (
                    <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-surface">
                      <Image
                        src={entry.featuredImage}
                        alt={entry.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div>
                    {entry.publishedDate && (
                      <p className="text-secondary text-xs tracking-[0.12em] uppercase font-sans mb-2">
                        {formatDate(entry.publishedDate)}
                      </p>
                    )}
                    <h2 className="font-display text-xl text-primary font-light leading-snug group-hover:text-accent transition-colors">
                      {entry.title}
                    </h2>
                    {entry.excerpt && (
                      <p className="text-secondary font-sans text-sm mt-2 leading-relaxed line-clamp-3">
                        {entry.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
