# KJCDramas — Phase 1 Production Cleanup

## Completed
- Removed user watchlist/account UI from the initial release.
- Removed the watchlist provider and route.
- Kept admin UI as a prototype; real authentication/database come later.
- Consolidated package dependencies and removed the duplicate `src/package.json`.
- Added branded page title, description, theme color and favicon.
- Added stable public paths for logo and default OG image.
- Added `robots.txt` with admin/search exclusions.

## Intentionally deferred
- Supabase database and authentication
- Real CMS persistence
- Server/static-rendered SEO
- Dynamic XML sitemap generation
- Adsterra production scripts
- Media/CDN pipeline
- Cloudflare deployment

## Important
The project remains a React + Vite + TypeScript + Tailwind app. We are not rewriting it to Astro at this stage because the MagicPattern export already has a useful component structure.
