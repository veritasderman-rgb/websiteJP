import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../../../keystatic.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const revalidate = false

export async function generateStaticParams() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const posts = await reader.collections.posts.all()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const reader = createReader(process.cwd(), keystaticConfig)
  const post = await reader.collections.posts.read(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt || '',
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const reader = createReader(process.cwd(), keystaticConfig)
  const post = await reader.collections.posts.read(slug)

  if (!post) notFound()

  const content = await post.content()

  return (
    <article className="pt-24 pb-24">
      {post.featuredImage && (
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden mb-12">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/blog"
          className="text-secondary text-xs tracking-[0.15em] uppercase font-sans hover:text-accent transition-colors mb-8 inline-block"
        >
          ← Blog
        </Link>
        {post.publishedDate && (
          <p className="text-secondary text-xs tracking-[0.12em] uppercase font-sans mb-3">
            {formatDate(post.publishedDate)}
          </p>
        )}
        <h1 className="font-display text-3xl md:text-5xl text-primary font-light leading-snug mb-10">
          {post.title}
        </h1>
        <div className="prose prose-lg max-w-none font-sans text-secondary leading-relaxed">
          {post.excerpt && <p className="text-base">{post.excerpt}</p>}
          {content?.node && (
            <div dangerouslySetInnerHTML={{ __html: '' }} />
          )}
        </div>
      </div>
    </article>
  )
}
