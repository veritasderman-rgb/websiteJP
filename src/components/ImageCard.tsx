'use client'

import Image from 'next/image'

interface ImageCardProps {
  src: string
  alt: string
  caption?: string
  onClick?: () => void
  className?: string
  aspectRatio?: 'auto' | 'square' | 'portrait' | 'landscape'
}

export default function ImageCard({
  src,
  alt,
  caption,
  onClick,
  className = '',
  aspectRatio = 'auto',
}: ImageCardProps) {
  const aspectClass = {
    auto: '',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  }[aspectRatio]

  return (
    <figure
      onClick={onClick}
      className={`group bg-surface isolate ${onClick ? 'cursor-pointer' : ''} ${aspectRatio !== 'auto' ? aspectClass + ' relative overflow-hidden' : 'relative overflow-hidden'} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill={aspectRatio !== 'auto'}
        width={aspectRatio === 'auto' ? 800 : undefined}
        height={aspectRatio === 'auto' ? 600 : undefined}
        className={`object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.03] ${aspectRatio === 'auto' ? 'w-full h-auto' : ''}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-xs font-sans">{caption}</p>
        </figcaption>
      )}
    </figure>
  )
}
