import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl, formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Zápisky o fotografii, inspirace a tipy pro klienty.',
}

export const revalidate = 3600

export default async function BlogPage() {
  let posts: any[] = []
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'posts',
      limit: 20,
      depth: 2,
      sort: '-publishedDate',
    })
    posts = result.docs
  } catch {}

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl text-primary font-light tracking-wide">
            Blog
          </h1>
        </header>

        {posts.length === 0 ? (
          <p className="text-center text-secondary font-sans py-20">Žádné příspěvky zatím nejsou k dispozici.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: any) => {
              const img = typeof post.featuredImage === 'object' ? post.featuredImage : null
              const src = img?.sizes?.card?.filename ? getMediaUrl(img.sizes.card.filename) : img?.filename ? getMediaUrl(img.filename) : null
              return (
                <article key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    {src && (
                      <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-surface">
                        <Image
                          src={src}
                          alt={img?.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div>
                      {post.publishedDate && (
                        <p className="text-secondary text-xs tracking-[0.12em] uppercase font-sans mb-2">
                          {formatDate(post.publishedDate)}
                        </p>
                      )}
                      <h2 className="font-display text-xl text-primary font-light leading-snug group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-secondary font-sans text-sm mt-2 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
