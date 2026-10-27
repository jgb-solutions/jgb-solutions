import { describe, expect, it } from 'vitest'
import {
  breadcrumbJsonLd,
  clientProjectJsonLd,
  createOrganizationJsonLd,
  createPageSEO,
  productJsonLd,
  serviceJsonLd,
} from './seo'
import { getServiceBySlug } from './services'

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
      expect(seo.meta).toContainEqual({ name: 'twitter:site', content: '@jgb_solutions' })

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

  describe('page structured data', () => {
    const parse = (script: { children: string }) =>
      JSON.parse(script.children) as Record<string, unknown>

    it('adds breadcrumbs and page entries as script tags', () => {
      const service = getServiceBySlug('websites')
      if (!service) throw new Error('websites service missing')
      const seo = createPageSEO({
        title: 'Websites',
        path: '/services/websites',
        breadcrumbs: [
          { name: 'Services', path: '/services' },
          { name: 'Websites', path: '/services/websites' },
        ],
        jsonLd: [serviceJsonLd(service)],
      })

      const [breadcrumbs, serviceData] = (seo.scripts ?? []).map(parse)
      expect(breadcrumbs['@type']).toBe('BreadcrumbList')
      expect(serviceData).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Websites',
        provider: { '@id': 'https://jgb.solutions/#organization' },
      })
    })

    it('has no scripts when a page has no structured data', () => {
      expect(createPageSEO({ title: 'T', path: '/x' })).not.toHaveProperty('scripts')
    })

    it('builds a breadcrumb trail from Home', () => {
      const trail = breadcrumbJsonLd([{ name: 'Work', path: '/projects' }])
      expect(trail.itemListElement).toEqual([
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jgb.solutions' },
        { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://jgb.solutions/projects' },
      ])
    })

    const project = {
      slug: 'street-brawl',
      title: 'Street Brawl',
      description: 'A game.',
      image: '/assets/images/projects/street-brawl/featured.jpg',
      url: 'https://streetbrawl.jgb.solutions/',
      year: '2026',
    }

    it('describes products by kind', () => {
      expect(productJsonLd(project, 'game')).toMatchObject({
        '@type': 'VideoGame',
        url: 'https://streetbrawl.jgb.solutions/',
        image: 'https://jgb.solutions/assets/images/projects/street-brawl/featured.jpg',
        isAccessibleForFree: true,
      })
      expect(productJsonLd(project, 'web-app')['@type']).toBe('WebApplication')
      expect(productJsonLd(project, 'media')['@type']).toBe('WebSite')
    })

    it('credits client work to the business', () => {
      expect(clientProjectJsonLd({ ...project, client: 'ENEPH' })).toMatchObject({
        '@type': 'CreativeWork',
        url: 'https://jgb.solutions/projects/street-brawl',
        creator: { '@id': 'https://jgb.solutions/#organization' },
        sourceOrganization: { '@type': 'Organization', name: 'ENEPH' },
      })
    })
  })
})
