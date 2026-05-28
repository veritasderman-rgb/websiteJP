'use client'

import Image from 'next/image'

interface ImageCardProps {
  src: string
  alt: string
  caption?: string
  onClick?: () => void
  className?: string
  width?: number
  height?: number
  sizes?: string
}

export default function ImageCard({
  src,
  alt,
  caption,
  onClick,
  className = '',
  width,
  height,
  sizes = '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
}: ImageCardProps) {
  const w = width ?? 800
  const h = height ?? 600

  return (
    <figure
      onClick={onClick}
      style={{ aspectRatio: `${w} / ${h}` }}
      className={`group bg-surface isolate relative overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        sizes={sizes}
      />
      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-xs font-sans">{caption}</p>
        </figcaption>
      )}
    </figure>
  )
}
