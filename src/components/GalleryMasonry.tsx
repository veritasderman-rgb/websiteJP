'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export default function GalleryMasonry({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const slides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: img.caption,
    width: img.width,
    height: img.height,
  }))

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setLightboxIndex(idx)}
            className="block w-full mb-2 md:mb-3 break-inside-avoid cursor-zoom-in group"
          >
            <div className="relative overflow-hidden bg-neutral-100">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="w-full h-auto block transition-opacity duration-300 group-hover:opacity-85"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {img.caption && (
                <span className="absolute bottom-0 inset-x-0 px-3 py-2 bg-gradient-to-t from-black/55 to-transparent text-white/85 text-xs font-sans tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
                  {img.caption}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Counter]}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
      />
    </>
  )
}
