import { describe, expect, it, mock } from 'bun:test'
import { render } from '@testing-library/react'

mock.module('@/lib/analytics', () => ({
  ANALYTICS_ENABLED: false,
  CF_ANALYTICS_TOKEN: undefined,
}))

// Imported after the mock above, so it reads the mocked module
const { VisitorMetrics } = await import('./visitor-metrics')

describe('VisitorMetrics', () => {
  it('loads nothing without a token or outside production', () => {
    const { container } = render(<VisitorMetrics />)
    expect(container.querySelector('script')).toBeNull()
  })

  it('loads the Cloudflare beacon with the site token when enabled', () => {
    // Registering the mock again updates the bindings the component already imported
    mock.module('@/lib/analytics', () => ({
      ANALYTICS_ENABLED: true,
      CF_ANALYTICS_TOKEN: 'test-token',
    }))
    const { container } = render(<VisitorMetrics />)
    const script = container.querySelector('script')
    expect(script?.getAttribute('src')).toBe('https://static.cloudflareinsights.com/beacon.min.js')
    expect(JSON.parse(script?.getAttribute('data-cf-beacon') ?? '{}')).toEqual({
      token: 'test-token',
      spa: true,
    })
  })
})
