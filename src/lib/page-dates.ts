/**
 * When each page's content last changed (YYYY-MM-DD), for the sitemap's lastmod. Search engines
 * use it to decide what to recrawl, so bump a date when you change that page's text or layout.
 * Project pages use the `updated` field in their write-up instead.
 */
export const PAGE_UPDATED = {
  '/': '2026-10-19',
  '/services': '2026-10-19',
  '/products': '2026-10-19',
  '/projects': '2026-10-19',
  '/about': '2026-10-19',
  '/privacy': '2026-10-19',
  '/posts': '2026-10-19',
} as const satisfies Record<string, string>

/** Service pages (/services/$slug) share one date: their text lives in src/lib/services.ts. */
export const SERVICES_UPDATED = '2026-10-19'
