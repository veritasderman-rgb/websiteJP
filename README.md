# Josef Pavlovic — Photography Portfolio

Fotografické portfolio postavené na **Astro** + **Decap CMS**.

## Architektura

```
src/
├── content/
│   ├── portfolio/       ← Markdown soubory s projekty (editovatelné přes CMS)
│   │   ├── architecture-kolonada.md
│   │   ├── street-marianky.md
│   │   └── ...
│   ├── pages/           ← Statické stránky (O mně, Kontakt)
│   │   └── about.md
│   └── settings/        ← Nastavení webu (JSON, editovatelné přes CMS)
│       └── site.json
├── components/          ← Astro komponenty (Header, Footer, Card, Lightbox)
├── layouts/             ← Base layout
├── pages/               ← Routy (homepage, portfolio/[slug], portfolio/[category], about)
└── styles/              ← Globální CSS (dark editorial theme)
public/
├── admin/               ← Decap CMS admin panel
│   ├── index.html
│   └── config.yml       ← Definice editovatelných polí
└── images/              ← Obrázky (portfolio + site)
```

## Jak to funguje

### 1. Obsah přes admin panel (`/admin/`)
- Přidávej, edituj, maž portfolio projekty
- Nahráváj fotky přímo v prohlížeči
- Edituj stránky (O mně, Kontakt)
- Měň nastavení webu (hero obrázek, kontakt)
- Vše se uloží jako commit do GitHub repozitáře

### 2. Design přes Claude Code
- Otevři projekt v Claude Code
- Řekni např. "Změň barvu akcentu na modrou" nebo "Přidej parallax efekt na hero"
- Claude upraví soubory v `src/styles/`, `src/components/`, `src/layouts/`
- Pushni změny → web se automaticky přestaví

### 3. Ruční editace
- Portfolio projekty: edituj Markdown soubory v `src/content/portfolio/`
- Stránky: edituj `src/content/pages/about.md`
- Nastavení: edituj `src/content/settings/site.json`
- Design: edituj CSS v `src/styles/global.css`

## Rychlý start

### Lokální vývoj

```bash
# Naklonuj repozitář
git clone https://github.com/TVUJ-USERNAME/josefpavlovic-portfolio.git
cd josefpavlovic-portfolio

# Nainstaluj závislosti
npm install

# Spusť dev server
npm run dev
# → http://localhost:4321

# Spusť lokální CMS (v dalším terminálu)
npx decap-server
# → Admin panel na http://localhost:4321/admin/
```

### Deploy na Netlify (doporučeno pro Decap CMS)

1. Pushni repozitář na GitHub
2. Jdi na [app.netlify.com](https://app.netlify.com) → New site from Git
3. Vyber repozitář, build command a publish dir se nastaví automaticky z `netlify.toml`
4. V Netlify nastavení zapni:
   - **Identity** → Enable → Registration: Invite only
   - **Identity** → Services → Enable **Git Gateway**
5. Pozvi sám sebe jako uživatele v Identity
6. Jdi na `https://tvuj-web.netlify.app/admin/` a přihlaš se

### Vlastní doména (josefpavlovic.cz)

1. V Netlify → Domain settings → Add custom domain
2. Nastav DNS záznamy dle instrukcí
3. HTTPS se nastaví automaticky

## Přidání nového portfolio projektu

### Přes admin panel
1. Jdi na `/admin/`
2. Klikni "Portfolio" → "Nový Projekt"
3. Vyplň název, kategorii, nahraj fotky
4. Ulož → automaticky se commitne a web se přestaví

### Přes soubory (Claude Code / ručně)

Vytvoř nový `.md` soubor v `src/content/portfolio/`:

```markdown
---
title: "Název projektu"
category: architecture    # architecture | portraits | landscape | street | events | nudes
date: "2026-03-15"
cover: /images/portfolio/muj-cover.jpg
featured: true
draft: false
order: 1
images:
  - src: /images/portfolio/foto-01.jpg
    alt: "Popis fotky"
    caption: "Volitelný popisek"
  - src: /images/portfolio/foto-02.jpg
    alt: "Další fotka"
---

Volitelný text pod galerií. Podporuje **Markdown**.
```

## Přizpůsobení designu

### Barvy a typografie
Vše je v CSS proměnných v `src/styles/global.css`:

```css
:root {
  --color-bg: #0a0a0a;           /* Pozadí */
  --color-accent: #c8956a;       /* Akcentní barva (amber) */
  --color-text: #e8e4e0;         /* Text */
  --font-display: 'Playfair Display', serif;  /* Nadpisy */
  --font-body: 'Libre Franklin', sans-serif;  /* Tělo textu */
}
```

### Kategorie
Definované na 3 místech (přidej/odeber dle potřeby):
1. `src/content/config.ts` — schéma (validace)
2. `public/admin/config.yml` — admin panel (dropdown)
3. `src/pages/index.astro` — filter tlačítka na homepage

### Navigace
Edituj pole `navItems` v `src/components/Header.astro`.

## Pro Claude Code

Tento projekt je navržený tak, aby Claude Code mohl efektivně upravovat design i strukturu:

**Klíčové soubory pro design změny:**
- `src/styles/global.css` — veškeré styly, CSS proměnné
- `src/layouts/Base.astro` — HTML struktura, meta tagy, fonty
- `src/components/*.astro` — jednotlivé komponenty

**Klíčové soubory pro obsah:**
- `src/content/portfolio/*.md` — portfolio projekty
- `src/content/pages/*.md` — statické stránky
- `src/content/settings/site.json` — nastavení webu
- `public/admin/config.yml` — definice CMS polí

**Příklady promptů pro Claude Code:**
- "Změň font nadpisů na Cormorant Garamond"
- "Přidej do portfolio karty datum"
- "Vytvoř novou stránku /services/ pro komerční nabídku"
- "Přidej lazy loading s blur placeholder efektem"
- "Změň grid na masonry layout"

## Technologie

- [Astro](https://astro.build/) — statický generátor
- [Decap CMS](https://decapcms.org/) — Git-based CMS s admin panelem
- [Netlify](https://netlify.com/) — hosting + Identity + Git Gateway
- Vanilla CSS (žádný framework, plná kontrola)
- Zero JavaScript runtime (kromě admin panelu a lightboxu)

## Licence

Obsah (fotografie, texty) © Josef Pavlovic. Kód pod MIT licencí.
