import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

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

  try {
    const payload = await getPayload({ config })
    const [galleries, posts] = await Promise.all([
      payload.find({ collection: 'galleries', limit: 200, depth: 0 }),
      payload.find({ collection: 'posts', limit: 200, depth: 0 }),
    ])

    const galleryUrls: MetadataRoute.Sitemap = galleries.docs.map((g: any) => ({
      url: `${BASE}/portfolio/${g.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    }))

    const postUrls: MetadataRoute.Sitemap = posts.docs.map((p: any) => ({
      url: `${BASE}/blog/${p.slug}`,
      priority: 0.5,
      changeFrequency: 'never' as const,
    }))

    return [...staticPages, ...galleryUrls, ...postUrls]
  } catch {
    return staticPages
  }
}
