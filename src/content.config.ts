import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['architecture', 'events', 'portraits', 'landscape']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    cover: z.string(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).default([]),
    description: z.string().optional(),
    location: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { gallery };
