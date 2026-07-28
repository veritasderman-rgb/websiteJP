import { MetadataRoute } from 'next'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'
import { hubSections } from '@/lib/uvod-content'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://josefpavlovic.cz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/foto`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/portfolio`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/o-mne`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/nabidka`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/kontakt`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/ochrana-udaju`, priority: 0.4, changeFrequency: 'yearly' },
  ]

  // Rozpracované sekce rozcestníku nesou zatím jen perex — drží noindex,
  // takže je do sitemapy nepouštíme.
  const hubUrls: MetadataRoute.Sitemap = hubSections
    .filter((section) => !section.draft)
    .map((section) => ({
      url: `${BASE}/${section.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }))

  const reader = createReader(process.cwd(), keystaticConfig)
  const galleries = await reader.collections.galleries.all()

  const galleryUrls: MetadataRoute.Sitemap = galleries.map((g) => ({
    url: `${BASE}/portfolio/${g.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...hubUrls, ...galleryUrls]
}
