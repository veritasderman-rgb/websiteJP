/**
 * WordPress to Payload CMS import script.
 *
 * Usage:
 *   npx tsx scripts/import-wordpress.ts \
 *     --xml /path/to/export.xml \
 *     --media /path/to/uploads/
 */

// Load env vars before anything else (Payload needs DATABASE_URI etc.)
import { config as dotenv } from 'dotenv'
dotenv({ path: new URL('../.env.local', import.meta.url).pathname })

import { XMLParser } from 'fast-xml-parser'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import payloadConfig from '../src/payload/payload.config'

// ---------- arg parsing ----------
const args = process.argv.slice(2)
const getArg = (flag: string) => {
  const i = args.indexOf(flag)
  return i !== -1 ? args[i + 1] : undefined
}

const xmlPath = getArg('--xml')
const mediaDir = getArg('--media')

if (!xmlPath || !mediaDir) {
  console.error('Usage: npx tsx scripts/import-wordpress.ts --xml <file> --media <dir>')
  process.exit(1)
}

// ---------- category mapping ----------
const categoryMap: Record<string, string> = {
  svatby: 'wedding',
  wedding: 'wedding',
  'boudoir': 'boudoir',
  akt: 'boudoir',
  'portréty': 'portrait',
  portrait: 'portrait',
  people: 'portrait',
  casual: 'portrait',
  buildings: 'architecture',
  cityscape: 'architecture',
  architecture: 'architecture',
  culture: 'other',
  safari: 'other',
  tropical: 'other',
  mountain: 'other',
  'mariánské lázně': 'other',
  'marianské lázně': 'other',
  hotely: 'other',
}

// Extract value from { __cdata: '...' } or plain string
function val(field: any): string {
  if (field == null) return ''
  if (typeof field === 'object' && '__cdata' in field) return String(field.__cdata ?? '')
  return String(field)
}

function mapCategory(cats: string[]): string {
  for (const cat of cats) {
    const lower = cat.toLowerCase()
    if (categoryMap[lower]) return categoryMap[lower]
  }
  return 'other'
}

function stripShortcodes(html: string): string {
  return html
    .replace(/\[fusion_[^\]]*\][\s\S]*?\[\/fusion_[^\]]*\]/g, '')
    .replace(/\[[^\]]+\]/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

// ---------- resolve local media path ----------
function resolveLocalImage(wpUrl: string): string | null {
  try {
    const url = new URL(wpUrl)
    const relPath = url.pathname.replace('/wp-content/uploads/', '')
    const fullPath = path.join(mediaDir!, relPath)
    return fs.existsSync(fullPath) ? fullPath : null
  } catch {
    return null
  }
}

// ---------- main ----------
async function main() {
  console.log('Loading Payload...')
  const payload = await getPayload({ config: payloadConfig })

  console.log('Parsing XML:', xmlPath)
  const xml = fs.readFileSync(xmlPath!, 'utf-8')
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    cdataPropName: '__cdata',
    isArray: (name) => ['item', 'category', 'wp:postmeta', 'wp:term'].includes(name),
  })
  const parsed = parser.parse(xml)
  const channel = parsed?.rss?.channel
  const items: any[] = Array.isArray(channel?.item) ? channel.item : []

  console.log(`Found ${items.length} items in XML`)

  // --- Step 1: Import attachments (images) ---
  const attachments = items.filter((i) => val(i['wp:post_type']) === 'attachment')
  console.log(`\n[1/3] Importing ${attachments.length} media attachments...`)

  const mediaIdMap: Record<string, string> = {} // wp post id → payload media id

  for (const att of attachments) {
    const wpId = val(att['wp:post_id'])
    const url = val(att['wp:attachment_url'])
    if (!url) continue

    const localPath = resolveLocalImage(url)
    if (!localPath) {
      console.log(`  SKIP (not found locally): ${url}`)
      continue
    }

    const filename = path.basename(localPath)
    const altText = val(att.title) || filename.replace(/\.[^.]+$/, '')

    try {
      // Check if already imported (by filename match)
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        mediaIdMap[wpId] = existing.docs[0].id as string
        process.stdout.write('.')
        continue
      }

      const fileBuffer = fs.readFileSync(localPath)
      const mimeType = filename.endsWith('.png') ? 'image/png' : 'image/jpeg'

      const media = await payload.create({
        collection: 'media',
        data: { alt: altText },
        file: {
          data: fileBuffer,
          mimetype: mimeType,
          name: filename,
          size: fileBuffer.length,
        },
      })
      mediaIdMap[wpId] = media.id as string
      process.stdout.write('+')
    } catch (err: any) {
      console.log(`\n  ERROR importing ${filename}:`, err?.message || err)
    }
  }
  console.log(`\n  Done. Imported ${Object.keys(mediaIdMap).length} images.`)

  // --- Step 2: Import portfolio → galleries ---
  const portfolioItems = items.filter((i) => val(i['wp:post_type']) === 'avada_portfolio' && val(i['wp:status']) !== 'trash')
  console.log(`\n[2/3] Importing ${portfolioItems.length} portfolio items as galleries...`)

  for (const item of portfolioItems) {
    const title = val(item.title) || 'Bez názvu'
    const slug = slugify(title)
    const cats: string[] = (item.category || [])
      .filter((c: any) => c['@_domain'] === 'portfolio_category')
      .map((c: any) => val(c) || c['#text'] || '')
    const category = mapCategory(cats)

    // get thumbnail post id from postmeta
    const metas: any[] = Array.isArray(item['wp:postmeta']) ? item['wp:postmeta'] : []
    const thumbIdMeta = metas.find((m) => val(m['wp:meta_key']) === '_thumbnail_id')
    const thumbWpId = thumbIdMeta ? val(thumbIdMeta['wp:meta_value']) : null
    const coverMediaId = thumbWpId ? mediaIdMap[thumbWpId] : undefined

    if (!coverMediaId) {
      console.log(`  SKIP gallery "${title}" (no cover image resolved)`)
      continue
    }

    try {
      const existing = await payload.find({ collection: 'galleries', where: { slug: { equals: slug } }, limit: 1 })
      if (existing.docs.length > 0) {
        console.log(`  EXISTS: ${title}`)
        continue
      }

      await payload.create({
        collection: 'galleries',
        data: {
          title,
          slug,
          category: category as any,
          coverImage: coverMediaId,
          featured: true,
          layout: 'masonry',
          images: [],
          publishedDate: val(item['wp:post_date'])?.slice(0, 10) || undefined,
        },
      })
      console.log(`  ✓ Gallery: ${title} [${category}]`)
    } catch (err: any) {
      console.log(`  ERROR gallery "${title}":`, err?.message || err)
    }
  }

  // --- Step 3: Import blog posts ---
  const posts = items.filter((i) => val(i['wp:post_type']) === 'post' && val(i['wp:status']) === 'publish')
  console.log(`\n[3/3] Importing ${posts.length} blog posts...`)

  for (const item of posts) {
    const title = val(item.title) || 'Bez názvu'
    const slug = slugify(title)
    const rawContent = val(item['content:encoded'])
    const excerpt = stripShortcodes(rawContent).slice(0, 300)

    const metas: any[] = Array.isArray(item['wp:postmeta']) ? item['wp:postmeta'] : []
    const thumbIdMeta = metas.find((m) => val(m['wp:meta_key']) === '_thumbnail_id')
    const thumbWpId = thumbIdMeta ? val(thumbIdMeta['wp:meta_value']) : null
    const featuredImageId = thumbWpId ? mediaIdMap[thumbWpId] : undefined

    try {
      const existing = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
      if (existing.docs.length > 0) {
        console.log(`  EXISTS: ${title}`)
        continue
      }

      await payload.create({
        collection: 'posts',
        data: {
          title,
          slug,
          excerpt,
          featuredImage: featuredImageId,
          publishedDate: val(item['wp:post_date'])?.slice(0, 10) || undefined,
        },
      })
      console.log(`  ✓ Post: ${title}`)
    } catch (err: any) {
      console.log(`  ERROR post "${title}":`, err?.message || err)
    }
  }

  console.log('\n✓ Import complete!')
  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
