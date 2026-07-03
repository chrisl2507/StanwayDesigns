# Stanway Designs

Website for Stanway Designs — bespoke furniture, joinery, woodturning and restoration by Max Stanway, Nottingham, UK. Live at [www.stanwaydesigns.co.uk](https://www.stanwaydesigns.co.uk).

## Tech overview

Static HTML site, no build step. Hosted on Netlify.

- **Pages** — plain HTML at the root, plus `furniture/`, `joinery/`, `woodturning/`, `blog/` and `shop/` subdirectories.
- **Navigation** — injected on every page by `nav.js` (single source of truth). Root pages load it with `data-root=""`, subdirectory pages with `data-root="../"`. The footer is NOT shared — it is duplicated in every HTML file, so footer changes must be applied to all pages.
- **Shared behaviour** — `luxury.js` (scroll effects, mobile menu, animations).
- **Styles** — `css/base.css`, `css/layout.css`, `css/components.css`, `css/pages.css`, plus page-specific sheets.
- **Contact form** — Netlify Forms (`contact.html`), posts to `contact-success.html`, honeypot field for spam.
- **Shop** — `shop.html` loads product data at runtime from a published Google Sheet CSV; checkout links go to SumUp. Products are managed in the sheet, not in this repo.
- **Headers** — `_headers` sets security headers (CSP, HSTS, etc.) and cache rules on Netlify.

## Service worker / cache busting

`sw.js` precaches the CSS and JS and serves them **cache-first**. Filenames are not versioned, so:

> **After editing any CSS or JS file, bump `CACHE_NAME` in `sw.js`** (e.g. `stanway-v4` → `stanway-v5`), otherwise returning visitors keep the old files.

HTML is fetched network-first, so content edits ship without a bump — but a bump is always safe.

## Images

- All page images are WebP with responsive `-400w`/`-800w` variants and `srcset`; original JPGs in `includes/images/` are not referenced by any page.
- Several pages still await real photography. `hero-placeholders.md` lists the hero images that don't exist yet — those pages hide the hero image via `onerror` and show a dark hero until the file is added. Adding a file with the exact listed name lights the hero up; no HTML change needed.

## SEO files

- `sitemap.xml` — update when adding/removing pages. Don't list `noindex` pages.
- `robots.txt` — allows everything; keep `/includes/images/` crawlable so Google Images and social-share previews work.
