import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl, formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'posts', limit: 200 })
    return result.docs.map((p: any) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    const post = result.docs[0]
    if (!post) return {}
    return { title: post.seo?.metaTitle || post.title, description: post.seo?.metaDescription || post.excerpt || '' }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post: any = null
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, depth: 2 })
    post = result.docs[0]
  } catch {}

  if (!post) notFound()

  const img = typeof post.featuredImage === 'object' ? post.featuredImage : null
  const heroSrc = img?.sizes?.hero?.filename ? getMediaUrl(img.sizes.hero.filename) : img?.filename ? getMediaUrl(img.filename) : null

  return (
    <article className="pt-24 pb-24">
      {heroSrc && (
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden mb-12">
          <Image src={heroSrc} alt={img?.alt || post.title} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blog" className="text-secondary text-xs tracking-[0.15em] uppercase font-sans hover:text-accent transition-colors mb-8 inline-block">
          ← Blog
        </Link>
        {post.publishedDate && (
          <p className="text-secondary text-xs tracking-[0.12em] uppercase font-sans mb-3">{formatDate(post.publishedDate)}</p>
        )}
        <h1 className="font-display text-3xl md:text-5xl text-primary font-light leading-snug mb-10">{post.title}</h1>
        <div className="prose prose-lg max-w-none font-sans text-secondary leading-relaxed">
          {/* Rich text would be rendered here with a lexical renderer */}
          {post.excerpt && <p className="text-base">{post.excerpt}</p>}
        </div>
      </div>
    </article>
  )
}
