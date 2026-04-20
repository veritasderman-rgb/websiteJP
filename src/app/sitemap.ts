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
    { url: `${BASE}/blog`, priority: 0.6, changeFrequency: 'weekly' },
    { url: `${BASE}/kontakt`, priority: 0.7, changeFrequency: 'monthly' },
  ]

  const reader = createReader(process.cwd(), keystaticConfig)
  const [galleries, posts] = await Promise.all([
    reader.collections.galleries.all(),
    reader.collections.posts.all(),
  ])

  const galleryUrls: MetadataRoute.Sitemap = galleries.map((g) => ({
    url: `${BASE}/portfolio/${g.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    priority: 0.5,
    changeFrequency: 'never' as const,
  }))

  return [...staticPages, ...galleryUrls, ...postUrls]
}
