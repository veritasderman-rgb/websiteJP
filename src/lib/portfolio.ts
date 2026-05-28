import fs from 'node:fs'
import path from 'node:path'

interface ManifestPhoto {
  order: number
  localOrder?: number
  category: string
  categoryTitle?: string
  source?: string
  image: string
  thumb: string
  width: number
  height: number
  bytes?: number
  thumbBytes?: number
}

interface Manifest {
  categories: Record<string, { title: string; description?: string }>
  photos: ManifestPhoto[]
}

export interface PhotoMeta {
  width: number
  height: number
  thumb: string
  order: number
  category: string
}

let cached: Map<string, PhotoMeta> | null = null

function loadManifest(): Map<string, PhotoMeta> {
  if (cached) return cached
  const file = path.join(process.cwd(), 'public/media/portfolio/manifest.json')
  const map = new Map<string, PhotoMeta>()
  try {
    const raw = fs.readFileSync(file, 'utf8')
    const data = JSON.parse(raw) as Manifest
    for (const photo of data.photos) {
      map.set(photo.image, {
        width: photo.width,
        height: photo.height,
        thumb: photo.thumb,
        order: photo.order,
        category: photo.category,
      })
    }
  } catch {
    // manifest unavailable — fallback to no meta
  }
  cached = map
  return map
}

export function getPhotoMeta(src: string | null | undefined): PhotoMeta | null {
  if (!src) return null
  return loadManifest().get(src) ?? null
}

export function thumbFor(src: string | null | undefined): string | null {
  if (!src) return null
  return getPhotoMeta(src)?.thumb ?? src
}
