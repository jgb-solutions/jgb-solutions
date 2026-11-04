/**
 * Cloudflare Web Analytics (cookieless page views and Core Web Vitals), the owner's choice for every
 * live site (2026-10-21). jgb.solutions is on Vercel and its DNS isn't proxied through Cloudflare,
 * so the beacon is added in code. Set VITE_CF_ANALYTICS_TOKEN in Vercel (Cloudflare dashboard →
 * Web Analytics → add site); without it, and outside production builds, nothing loads and the
 * Privacy page says there are no analytics.
 */
export const CF_ANALYTICS_TOKEN = import.meta.env.VITE_CF_ANALYTICS_TOKEN as string | undefined

export const ANALYTICS_ENABLED = import.meta.env.PROD && Boolean(CF_ANALYTICS_TOKEN)
