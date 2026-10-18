import { describe, expect, it } from 'vitest'
import { OFFERED_SERVICES, SERVICES, getServiceBySlug } from '@/lib/services'

describe('services', () => {
  it('offers only the services we sell today', () => {
    expect(OFFERED_SERVICES.map(s => s.slug)).toEqual(['websites', 'mobile-apps', 'social-media'])
  })

  it('keeps planned services out of lookups', () => {
    expect(SERVICES.some(s => s.slug === 'graphic-design')).toBe(true)
    expect(getServiceBySlug('graphic-design')).toBeUndefined()
    expect(getServiceBySlug('websites')?.title).toBe('Websites')
  })
})
