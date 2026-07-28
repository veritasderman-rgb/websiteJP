import { MetadataRoute } from 'next'
import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '../../keystatic.config'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://josefpavlovic.cz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Osobní web
  const hubPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/o-mne`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/verejna-sluzba`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/projekty`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/produktivita`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/tvorba`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/kontakt`, priority: 0.7, changeFrequency: 'monthly' },
  ]

  // Fotografické portfolio
  const fotoPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/foto`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/foto/portfolio`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/foto/o-mne`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/foto/nabidka`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/foto/kontakt`, priority: 0.6, changeFrequency: 'monthly' },
  ]

  const reader = createReader(process.cwd(), keystaticConfig)
  const galleries = await reader.collections.galleries.all()

  const galleryUrls: MetadataRoute.Sitemap = galleries.map((g) => ({
    url: `${BASE}/foto/portfolio/${g.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  return [
    ...hubPages,
    ...fotoPages,
    ...galleryUrls,
    { url: `${BASE}/ochrana-udaju`, priority: 0.4, changeFrequency: 'yearly' },
  ]
}
