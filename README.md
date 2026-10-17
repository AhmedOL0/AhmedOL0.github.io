# Ahmed Ouarrali: Portfolio

Single-page personal portfolio, bilingual (EN/FR), with dark and light themes. Built with React 19, TypeScript (strict) and Vite, styled with Tailwind CSS v4 plus a hand-written design layer.

Live site: [ahmedol0.github.io](https://ahmedol0.github.io/)

## Highlights

- **Bilingual by design**: every string lives in `src/i18n-data.ts`; the switcher swaps the whole page and syncs `lang` and the document title
- **Dossier visual language**: archival layout, serif display type, hairline geometry, sharp ink accents
- **Accessibility**: skip link, visible focus indicators, sequential headings, labeled controls, reduced-motion support and WCAG 2.2 oriented contrast tokens
- **Performance**: code-split sections, `content-visibility` per section, self-hosted latin variable fonts, deferred analytics
- **Case studies**: each project renders a dossier card with its engineering highlight and result
- **Privacy-first analytics**: GoatCounter page views plus Web Vitals and JS error events, no cookies

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19, TypeScript (strict) |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 with a custom dossier layer in `src/index.css` |
| Quality | Playwright (4 browser engines), oxlint |
| Hosting | GitHub Pages via GitHub Actions |

## Getting started

```sh
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check (`tsc -b`, strict) and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run oxlint |
| `npm run test:e2e` | Playwright end-to-end suite |
| `npm run test:e2e:ui` | Playwright UI mode |
| `npm run test:e2e:report` | Open the last HTML report |

## Testing

The e2e suite runs against chromium, firefox, webkit and mobile-chrome (532 checks). It covers content integrity (including a French copy leak guard), accessibility (WCAG 2.2), keyboard navigation, responsive layout, security meta, SEO and mobile journeys.

Run it against a production build:

```sh
npm run build && npm run preview
npm run test:e2e
```

On Windows, firefox headless can flake under maximum parallelism; `npx playwright test --workers=4` is the stable local configuration.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: the site is built, the chromium e2e smoke must pass, then `dist/` is published to GitHub Pages. Pull requests run the same build plus e2e gates without deploying.

## Project structure

```text
src/
  components/     section UI (Hero, Work, Experience, Contact, Dock, ...)
  i18n-data.ts    EN/FR copy: hero, projects, stack, contact, footer
  i18n.tsx        language provider and switcher
  hooks.ts        reveal, active-section and lazy-mount hooks
  analytics.ts    GoatCounter events plus web-vitals reporting
  index.css       design tokens and the dossier styling layer
e2e/              Playwright specs
public/           static assets, fonts, CV, llms.txt, portfolio.json, manifest
```

## Assets

`public/assets/` holds responsive portraits (`photo-240.webp` / `photo-480.webp` with `.jpg` fallbacks) and `CV_Ahmed_Ouarrali.pdf`. Self-hosted latin variable fonts live in `public/fonts/`. Machine-readable metadata (`llms.txt`, `portfolio.json`, `sitemap.xml`, `robots.txt`) ships alongside.
