import { ANALYTICS_ENABLED, CF_ANALYTICS_TOKEN } from '@/lib/analytics'

/** The Cloudflare Web Analytics beacon, from jgb-starter's VisitorMetrics (see `@/lib/analytics`). */
export function VisitorMetrics() {
  if (!ANALYTICS_ENABLED) return null
  return (
    <script
      defer
      src='https://static.cloudflareinsights.com/beacon.min.js'
      data-cf-beacon={JSON.stringify({ token: CF_ANALYTICS_TOKEN, spa: true })}
    />
  )
}
