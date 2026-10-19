import { describe, expect, it } from 'vitest'
import { createOrganizationJsonLd, createPageSEO } from './seo'

describe('seo', () => {
  describe('createPageSEO', () => {
    it('creates basic SEO tags', () => {
      const seo = createPageSEO({
        title: 'Test Title',
        description: 'Test Description',
        path: '/test',
      })

      // Check title in meta
      expect(seo.meta).toContainEqual({ title: 'Test Title' })

      // Check description meta tags
      expect(seo.meta).toContainEqual({ name: 'description', content: 'Test Description' })
      expect(seo.meta).toContainEqual({ property: 'og:description', content: 'Test Description' })
      expect(seo.meta).toContainEqual({ name: 'twitter:description', content: 'Test Description' })

      // Check Open Graph
      expect(seo.meta).toContainEqual({ property: 'og:title', content: 'Test Title' })

      expect(seo.meta).toContainEqual({ property: 'og:url', content: 'https://jgb.solutions/test' })
      expect(seo.meta).toContainEqual({
        property: 'og:image',
        content: 'https://jgb.solutions/og-image.png',
      })
      expect(seo.meta).not.toContainEqual(expect.objectContaining({ name: 'twitter:site' }))

      // Check Links (Canonical)
      expect(seo.links).toContainEqual({ rel: 'canonical', href: 'https://jgb.solutions/test' })
    })

    it('handles image prop', () => {
      const seo = createPageSEO({
        title: 'Test',
        description: 'Desc',
        path: '/test',
        image: '/image.png',
      })

      expect(seo.meta).toContainEqual({
        property: 'og:image',
        content: 'https://jgb.solutions/image.png',
      })
      expect(seo.meta).toContainEqual({
        name: 'twitter:image',
        content: 'https://jgb.solutions/image.png',
      })
    })

    it('handles type prop', () => {
      const seo = createPageSEO({
        title: 'Test',
        description: 'Desc',
        path: '/test',
        type: 'article',
      })

      expect(seo.meta).toContainEqual({ property: 'og:type', content: 'article' })
    })
  })

  describe('createOrganizationJsonLd', () => {
    it('describes the business with its contact details and services', () => {
      const script = createOrganizationJsonLd()
      expect(script.type).toBe('application/ld+json')

      const data = JSON.parse(script.children) as Record<string, unknown>
      expect(data).toMatchObject({
        '@type': 'ProfessionalService',
        name: 'JGB Solutions',
        email: 'services@jgb.solutions',
        telephone: '+14383895465',
        address: { addressLocality: 'Laval', addressCountry: 'CA' },
      })
      const offers = data.makesOffer as Array<{ itemOffered: { name: string } }>
      expect(offers.map(offer => offer.itemOffered.name)).toEqual([
        'Websites',
        'Mobile Apps',
        'Social Media',
      ])
    })
  })
})
