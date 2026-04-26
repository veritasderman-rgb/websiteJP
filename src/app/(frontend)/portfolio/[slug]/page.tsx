import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../../../keystatic.config'
import { notFound } from 'next/navigation'
import GalleryMasonry from '@/components/GalleryMasonry'
import type { Metadata } from 'next'

export const revalidate = false

export async function generateStaticParams() {
  const reader = createReader(process.cwd(), keystaticConfig)
  const galleries = await reader.collections.galleries.all()
  return galleries.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const reader = createReader(process.cwd(), keystaticConfig)
  const gallery = await reader.collections.galleries.read(slug)
  if (!gallery) return {}
  return {
    title: gallery.title,
    description: gallery.description || '',
  }
}

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const reader = createReader(process.cwd(), keystaticConfig)
  const gallery = await reader.collections.galleries.read(slug)

  if (!gallery) notFound()

  const images = (gallery.images || [])
    .filter((item) => !!item.image)
    .map((item) => ({
      src: item.image as string,
      alt: gallery.title,
      caption: item.caption || '',
      width: item.width ?? 2048,
      height: item.height ?? 1365,
    }))

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="text-center mb-12">
          <p className="text-accent text-xs tracking-[0.2em] uppercase font-sans mb-3">Portfolio</p>
          <h1 className="font-display text-4xl md:text-5xl text-primary font-light tracking-wide">
            {gallery.title}
          </h1>
          {gallery.description && (
            <p className="text-secondary font-sans text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              {gallery.description}
            </p>
          )}
        </header>

        {images.length > 0 ? (
          <GalleryMasonry images={images} />
        ) : (
          <p className="text-center text-secondary font-sans py-20">Galerie je prázdná.</p>
        )}
      </div>
    </div>
  )
}
