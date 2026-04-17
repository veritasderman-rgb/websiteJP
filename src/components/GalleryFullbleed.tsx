'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import { getMediaUrl } from '@/lib/utils'

interface GalleryImage {
  id?: string
  filename: string
  alt: string
  caption?: string
  sizes?: { gallery?: { filename: string } }
}

export default function GalleryFullbleed({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const slides = images.map((img) => ({
    src: getMediaUrl(img.sizes?.gallery?.filename || img.filename),
    alt: img.alt,
    title: img.caption,
  }))

  return (
    <>
      <div className="flex flex-col gap-2">
        {images.map((img, idx) => (
          <div
            key={img.id || idx}
            className="relative w-full cursor-pointer overflow-hidden"
            style={{ maxHeight: '90vh' }}
            onClick={() => setLightboxIndex(idx)}
          >
            <Image
              src={getMediaUrl(img.sizes?.gallery?.filename || img.filename)}
              alt={img.alt}
              width={2400}
              height={1600}
              className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-700"
              sizes="100vw"
            />
            {img.caption && (
              <figcaption className="absolute bottom-4 left-4 text-white/70 text-xs font-sans tracking-wider">
                {img.caption}
              </figcaption>
            )}
          </div>
        ))}
      </div>
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Counter]}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />
    </>
  )
}
