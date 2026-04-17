'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import ImageCard from './ImageCard'
import { getMediaUrl } from '@/lib/utils'

interface GalleryImage {
  id?: string
  filename: string
  alt: string
  caption?: string
  sizes?: {
    gallery?: { filename: string }
    card?: { filename: string }
  }
}

interface GalleryMasonryProps {
  images: GalleryImage[]
}

export default function GalleryMasonry({ images }: GalleryMasonryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const slides = images.map((img) => ({
    src: getMediaUrl(img.sizes?.gallery?.filename || img.filename),
    alt: img.alt,
    title: img.caption,
  }))

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3">
        {images.map((img, idx) => (
          <div key={img.id || idx} className="mb-2 md:mb-3 break-inside-avoid">
            <ImageCard
              src={getMediaUrl(img.sizes?.card?.filename || img.filename)}
              alt={img.alt}
              caption={img.caption}
              onClick={() => setLightboxIndex(idx)}
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails, Counter]}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </>
  )
}
