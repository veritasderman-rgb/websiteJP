import { config, collection, fields, singleton } from '@keystatic/core'

export default config({
  storage: {
    kind: process.env.KEYSTATIC_GITHUB_CLIENT_ID ? 'github' : 'local',
    ...(process.env.KEYSTATIC_GITHUB_CLIENT_ID
      ? { repo: 'veritasderman-rgb/websiteJP' }
      : {}),
  } as Parameters<typeof config>[0]['storage'],

  ui: {
    brand: { name: 'Josef Pavlovic' },
    navigation: {
      'Galerie a blog': ['galleries', 'posts'],
      'Ostatní': ['testimonials', 'siteSettings'],
    },
  },

  collections: {
    galleries: collection({
      label: 'Galerie',
      slugField: 'title',
      path: 'content/galleries/*',
      schema: {
        title: fields.slug({ name: { label: 'Název galerie' } }),
        category: fields.select({
          label: 'Kategorie',
          options: [
            { label: 'Svatby', value: 'wedding' },
            { label: 'Boudoir & Akt', value: 'boudoir' },
            { label: 'Portréty', value: 'portrait' },
            { label: 'Architektura', value: 'architecture' },
            { label: 'Ulice & Cestování', value: 'street' },
            { label: 'Ostatní', value: 'other' },
          ],
          defaultValue: 'other',
        }),
        coverImage: fields.image({
          label: 'Titulní foto',
          directory: 'public/media',
          publicPath: '/media/',
        }),
        images: fields.array(
          fields.object({
            image: fields.image({
              label: 'Fotografie',
              directory: 'public/media',
              publicPath: '/media/',
            }),
            caption: fields.text({ label: 'Popisek', multiline: false }),
          }),
          { label: 'Fotografie', itemLabel: (props) => props.fields.caption.value || 'Fotografie' },
        ),
        featured: fields.checkbox({ label: 'Zobrazit na homepage', defaultValue: false }),
        description: fields.text({ label: 'Popis galerie', multiline: true }),
        publishedDate: fields.date({ label: 'Datum' }),
      },
    }),

    posts: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Název článku' } }),
        featuredImage: fields.image({
          label: 'Titulní obrázek',
          directory: 'public/media',
          publicPath: '/media/',
        }),
        excerpt: fields.text({ label: 'Perex', multiline: true }),
        publishedDate: fields.date({ label: 'Datum publikace' }),
        content: fields.markdoc({ label: 'Obsah článku' }),
      },
    }),

    testimonials: collection({
      label: 'Reference',
      slugField: 'author',
      path: 'content/testimonials/*',
      schema: {
        author: fields.slug({ name: { label: 'Jméno klienta' } }),
        quote: fields.text({ label: 'Citát', multiline: true }),
        occasion: fields.text({ label: 'Příležitost (např. Svatba 2024)' }),
        featured: fields.checkbox({ label: 'Zobrazit na homepage', defaultValue: false }),
      },
    }),
  },

  singletons: {
    siteSettings: singleton({
      label: 'Nastavení webu',
      path: 'content/site-settings',
      schema: {
        siteName: fields.text({ label: 'Název webu', defaultValue: 'Josef Pavlovic' }),
        tagline: fields.text({ label: 'Tagline', defaultValue: 'Svatební & Fine Art Fotograf' }),
        email: fields.text({ label: 'E-mail' }),
        phone: fields.text({ label: 'Telefon' }),
        instagram: fields.text({ label: 'Instagram (handle bez @)' }),
        facebook: fields.text({ label: 'Facebook URL' }),
        location: fields.text({ label: 'Lokalita', defaultValue: 'Mariánské Lázně, Česká republika' }),
        aboutText: fields.text({
          label: 'O fotografovi',
          multiline: true,
        }),
        heroImage: fields.image({
          label: 'Hero obrázek (homepage)',
          directory: 'public/media',
          publicPath: '/media/',
        }),
        aboutImage: fields.image({
          label: 'Foto pro sekci "O mně"',
          directory: 'public/media',
          publicPath: '/media/',
        }),
        ctaImage: fields.image({
          label: 'Pozadí CTA sekce',
          directory: 'public/media',
          publicPath: '/media/',
        }),
      },
    }),
  },
})
