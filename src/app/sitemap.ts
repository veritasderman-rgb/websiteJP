import { MetadataRoute } from 'next'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://josefpavlovic.cz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/portfolio`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/o-mne`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/nabidka`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/kontakt`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/ochrana-udaju`, priority: 0.4, changeFrequency: 'yearly' },
  ]

  const reader = createReader(process.cwd(), keystaticConfig)
  const galleries = await reader.collections.galleries.all()

  const galleryUrls: MetadataRoute.Sitemap = galleries.map((g) => ({
    url: `${BASE}/portfolio/${g.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...galleryUrls]
}
