# Josef Pavlovic — Svatební fotograf

Prodejní web svatebního a portrétního fotografa. Postaven na **Astro** + **Decap CMS**.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

## Project Structure

```
src/
  content/
    portfolio/     ← Portfolio projects (Markdown)
    pages/         ← Static pages (About, etc.)
    settings/      ← Site settings (JSON)
  components/      ← Astro components
  layouts/         ← Page layout
  pages/           ← Route pages
  styles/          ← Global CSS theme
public/
  admin/           ← Decap CMS admin panel
  images/          ← Uploaded images
```

## Content Management

### Option 1: Decap CMS (Browser)
Go to `/admin/` on your deployed site. Log in with GitHub and edit content visually — add projects, upload photos, change settings.

### Option 2: Edit Files Directly
Edit Markdown files in `src/content/portfolio/` and `src/content/pages/`.

### Adding a New Portfolio Project
Create a new `.md` file in `src/content/portfolio/`:

```markdown
---
title: "Project Name"
description: "Short description"
category: architecture  # architecture | street | landscape | portrait | documentary
date: 2024-01-15
cover: /images/portfolio/cover.jpg
gallery:
  - /images/portfolio/photo-01.jpg
  - /images/portfolio/photo-02.jpg
featured: false
---

Project description in Markdown.
```

## Deploy

### Vercel (primary)
1. Importuj repozitář na [vercel.com/new](https://vercel.com/new)
2. Framework bude automaticky detekován jako Astro
3. Klikni **Deploy** — hotovo

### GitHub Pages (alternative)
Enable GitHub Pages in repo settings. The workflow in `.github/workflows/deploy.yml` handles builds automatically.

## Customization

- **Colors & fonts**: `src/styles/global.css` (CSS variables at the top)
- **Site info**: `src/content/settings/site.json`
- **Navigation**: `src/components/Header.astro`
