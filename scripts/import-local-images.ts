/**
 * Bulk-import local JPG images from the uploads directory into Payload media.
 *
 * Usage:
 *   npx tsx scripts/import-local-images.ts \
 *     --dir /path/to/uploads/2017 \
 *     --limit 50
 */

import { config as dotenv } from 'dotenv'
dotenv({ path: new URL('../.env.local', import.meta.url).pathname })

import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import payloadConfig from '../src/payload/payload.config'

const args = process.argv.slice(2)
const getArg = (flag: string) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : undefined }

const dir = getArg('--dir') || '/Users/josefpavlovic/Downloads/JP/uploads'
const limitArg = parseInt(getArg('--limit') || '999', 10)

function isOriginalImage(filepath: string): boolean {
  const name = path.basename(filepath)
  // Skip WP-generated thumbnails and cropped variants
  if (/\-\d{2,4}x\d{2,4}/.test(name)) return false
  if (/_c\./.test(name)) return false
  // Skip t-shirt product images from 2013
  if (/^(T_|hoodie_)/.test(name)) return false
  return true
}

function findImages(rootDir: string): string[] {
  const results: string[] = []
  const recurse = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name)
      if (entry.isDirectory()) {
        recurse(full)
      } else if (/\.(jpg|jpeg|JPG|JPEG)$/.test(entry.name) && isOriginalImage(full)) {
        results.push(full)
      }
    }
  }
  recurse(rootDir)
  return results
}

async function main() {
  console.log('Loading Payload...')
  const payload = await getPayload({ config: payloadConfig })

  const allImages = findImages(dir)
  const images = allImages.slice(0, limitArg)
  console.log(`Found ${allImages.length} original images, importing up to ${limitArg}...`)

  let imported = 0
  let skipped = 0

  for (const imgPath of images) {
    const filename = path.basename(imgPath)
    const alt = filename.replace(/\.(jpg|jpeg|JPG|JPEG)$/, '').replace(/[-_]/g, ' ')

    try {
      // Check if already imported
      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        skipped++
        process.stdout.write('.')
        continue
      }

      const fileBuffer = fs.readFileSync(imgPath)
      await payload.create({
        collection: 'media',
        data: { alt },
        file: {
          data: fileBuffer,
          mimetype: 'image/jpeg',
          name: filename,
          size: fileBuffer.length,
        },
      })
      imported++
      process.stdout.write('+')
    } catch (err: any) {
      console.log(`\n  ERROR ${filename}:`, err?.message?.slice(0, 80))
    }
  }

  console.log(`\n\nDone! Imported: ${imported}, Skipped (existing): ${skipped}`)
  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
