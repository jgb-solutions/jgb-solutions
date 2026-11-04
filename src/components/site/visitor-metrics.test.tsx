import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { VisitorMetrics } from './visitor-metrics'

const analytics = vi.hoisted(() => ({
  ANALYTICS_ENABLED: false,
  CF_ANALYTICS_TOKEN: undefined as string | undefined,
}))
vi.mock('@/lib/analytics', () => analytics)

describe('VisitorMetrics', () => {
  it('loads nothing without a token or outside production', () => {
    const { container } = render(<VisitorMetrics />)
    expect(container.querySelector('script')).toBeNull()
  })

  it('loads the Cloudflare beacon with the site token when enabled', () => {
    analytics.ANALYTICS_ENABLED = true
    analytics.CF_ANALYTICS_TOKEN = 'test-token'
    const { container } = render(<VisitorMetrics />)
    const script = container.querySelector('script')
    expect(script?.getAttribute('src')).toBe('https://static.cloudflareinsights.com/beacon.min.js')
    expect(JSON.parse(script?.getAttribute('data-cf-beacon') ?? '{}')).toEqual({
      token: 'test-token',
      spa: true,
    })
  })
})
