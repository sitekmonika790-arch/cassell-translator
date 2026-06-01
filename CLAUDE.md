# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Next.js 16 Breaking Changes

This project uses Next.js 16.2.6 which has breaking changes vs. older Next.js. BEFORE writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Key differences from older Next.js may include APIs, conventions, and file structure. Heed deprecation notices.

## Commands

```bash
npm run dev      # Start dev server (Turbopack, port 3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

## Architecture

```
app/
  page.tsx                          # Main page — assembles all visual layers
  layout.tsx                        # Root layout with Cinzel + Cormorant Garamond fonts
  globals.css                       # Tailwind v4 + CSS custom properties + animations
  api/translate/route.ts            # POST /api/translate — Google Translate proxy
components/
  Header.tsx                        # Cassell College emblem, title, motto
  TranslationPanel.tsx              # "use client" — input/output boxes with 500ms debounce
  Footer.tsx                        # Motto + copyright
  BackgroundScene.tsx               # SVG gothic arch + Nidhogg dragon (z-0)
  Portraits.tsx                     # SVG Lu Mingfei (left) + Chen Motong (right) (z-1)
lib/
  translate.ts                      # detectLanguage() + MyMemory fallback (not used by route)
```

## Translation Flow

1. User types in `TranslationPanel` (client component) → 500ms debounce
2. POST to `/api/translate` with `{ text }`
3. API route detects language via Chinese char regex (`[一-鿿㐀-䶿]`)
4. Calls `translate.googleapis.com/translate_a/single?client=gtx&sl=...&tl=...&dt=t&dt=at`
5. Parses main translation from `data[0]`, alternatives from `data[5][0][2]`
6. Returns `{ translation, from, to, alternatives? }`

Note: `lib/translate.ts` has an older MyMemory fallback that the API route does NOT use. The route directly calls Google Translate.

## Visual Layer Stack (z-index)

| Layer | z-index | Content |
|-------|---------|---------|
| 0 | z-0 | `BackgroundScene` — Gothic arch + Nidhogg dragon SVG |
| 1 | z-[1] | `Portraits` — Lu Mingfei (left), Chen Motong (right) |
| 2 | z-[2] | Floating dust particles (CSS animated) |
| 10 | z-10 | Main content: Header, TranslationPanel, Footer |

## Design Tokens (CSS custom properties)

All colors in `app/globals.css` `:root`:
- `--bg-primary: #1f1012` (deep burgundy)
- `--text-primary: #d4b896` (warm parchment)
- `--gold: #c9a84c`, `--gold-light: #d4b896`
- `--border-gold: rgba(201, 168, 76, 0.2)`
- Fonts: Cinzel (headings), Georgia/Noto Serif SC (body)

## Tailwind v4 Notes

This project uses Tailwind CSS v4 with `@import "tailwindcss"` and `@theme inline` syntax (not the old `@tailwind` directives). The PostCSS config uses `@tailwindcss/postcss`.

## Deployment

Deployed on Vercel free tier. Repository: `sitekmonika790-arch/cassell-translator`. No database, no environment variables needed — purely static + one serverless API route.
