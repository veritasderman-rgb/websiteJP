import type { CollectionConfig } from 'payload'

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'publishedDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Svatby', value: 'wedding' },
        { label: 'Boudoir & Akt', value: 'boudoir' },
        { label: 'Portréty', value: 'portrait' },
        { label: 'Architektura', value: 'architecture' },
        { label: 'Ulice & Cestování', value: 'street' },
        { label: 'Ostatní', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Fotografie',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'masonry',
      options: [
        { label: 'Masonry', value: 'masonry' },
        { label: 'Horizontální posun', value: 'horizontal-scroll' },
        { label: 'Vertikální full-bleed', value: 'vertical-fullbleed' },
        { label: 'Prezentace', value: 'slideshow' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Zobrazit na úvodní stránce',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta titulek' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta popis' },
      ],
    },
  ],
}
