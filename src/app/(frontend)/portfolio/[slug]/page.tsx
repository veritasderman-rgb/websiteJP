import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import GalleryMasonry from '@/components/GalleryMasonry'
import GalleryFullbleed from '@/components/GalleryFullbleed'
import { getMediaUrl } from '@/lib/utils'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'galleries', limit: 200 })
    return result.docs.map((g: any) => ({ slug: g.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'galleries',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    const gallery = result.docs[0]
    if (!gallery) return {}
    return {
      title: gallery.seo?.metaTitle || gallery.title,
      description: gallery.seo?.metaDescription || '',
    }
  } catch {
    return {}
  }
}

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let gallery: any = null
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'galleries',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    gallery = result.docs[0]
  } catch {
    notFound()
  }

  if (!gallery) notFound()

  const images = (gallery.images || [])
    .map((item: any) => {
      const img = typeof item.image === 'object' ? item.image : null
      if (!img) return null
      return {
        id: img.id,
        filename: img.filename,
        alt: img.alt || gallery.title,
        caption: item.caption || img.caption,
        sizes: img.sizes,
      }
    })
    .filter(Boolean)

  const GalleryComponent = gallery.layout === 'vertical-fullbleed' ? GalleryFullbleed : GalleryMasonry

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="text-center mb-12">
          <p className="text-accent text-xs tracking-[0.2em] uppercase font-sans mb-3">Portfolio</p>
          <h1 className="font-display text-4xl md:text-5xl text-primary font-light tracking-wide">
            {gallery.title}
          </h1>
        </header>

        {images.length > 0 ? (
          <GalleryComponent images={images} />
        ) : (
          <p className="text-center text-secondary font-sans py-20">Galerie je prázdná.</p>
        )}
      </div>
    </div>
  )
}
