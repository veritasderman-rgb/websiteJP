import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Galleries } from './collections/Galleries'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Testimonials } from './collections/Testimonials'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' — Josef Pavlovic Admin',
    },
  },
  collections: [
    Media,
    Galleries,
    Posts,
    Categories,
    Testimonials,
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [],
    },
  ],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 50_000_000, // 50MB
    },
  },
})
