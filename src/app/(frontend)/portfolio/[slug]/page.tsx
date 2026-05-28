import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../../../../keystatic.config'
import { notFound } from 'next/navigation'
import GalleryMasonry from '@/components/GalleryMasonry'
import AgeGate from '@/components/AgeGate'
import { getPhotoMeta } from '@/lib/portfolio'
import type { Metadata } from 'next'

export const revalidate = false

const NSFW_SLUGS = new Set(['portfolio-fine-art-akt'])

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
    .map((item) => {
      const src = item.image as string
      const meta = getPhotoMeta(src)
      return {
        src,
        alt: gallery.title,
        caption: item.caption || '',
        thumb: meta?.thumb,
        width: meta?.width,
        height: meta?.height,
      }
    })

  const isNsfw = NSFW_SLUGS.has(slug)

  const galleryView =
    images.length > 0 ? (
      <GalleryMasonry images={images} />
    ) : (
      <p className="text-center text-secondary font-sans py-20">Galerie je prázdná.</p>
    )

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

        {isNsfw ? <AgeGate galleryTitle={gallery.title}>{galleryView}</AgeGate> : galleryView}
      </div>
    </div>
  )
}
