/**
 * SEO Helper Functions for TanStack Start
 * Based on: https://tanstack.com/start/latest/docs/framework/react/guide/seo
 */

import { OG_IMAGE, SEO, SITE } from './constants'
import { OFFERED_SERVICES } from './services'

export interface SEOConfig {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  author?: string
  publishedTime?: string
  section?: string
  keywords?: Array<string>
  /** Page path, for og:url. */
  path?: string
}

/**
 * Generate SEO meta tags with sensible defaults and automatic fallbacks
 */
export function createSEOMeta(config: SEOConfig = {}) {
  const {
    title = SEO.defaultTitle,
    description = SEO.description,
    image: rawImage,
    type = 'website',
    author: rawAuthor,
    publishedTime,
    section,
    keywords,
    path,
  } = config

  // Smart image handling: use provided image, or fallback to default OG image
  // If image starts with /, prepend site URL; otherwise use as-is
  let image: string = OG_IMAGE.url
  if (rawImage) {
    image = rawImage.startsWith('/') ? `${SITE.url}${rawImage}` : rawImage
  }

  // Smart author handling: use provided author, or fallback to site author
  const author = rawAuthor || SITE.author

  const meta: Array<{ title?: string; name?: string; property?: string; content?: string }> = [
    { title },
    { name: 'description', content: description },
  ]

  // Keywords
  if (keywords && keywords.length > 0) {
    meta.push({ name: 'keywords', content: keywords.join(', ') })
  }

  // Open Graph
  meta.push(
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: OG_IMAGE.width.toString() },
    { property: 'og:image:height', content: OG_IMAGE.height.toString() },
    { property: 'og:image:alt', content: rawImage ? title : OG_IMAGE.alt }
  )
  if (path !== undefined) {
    meta.push({ property: 'og:url', content: `${SITE.url}${path}` })
  }

  // Article-specific OG tags
  if (type === 'article') {
    meta.push({ property: 'article:author', content: author })
    if (publishedTime) {
      meta.push({ property: 'article:published_time', content: publishedTime })
    }
    if (section) {
      meta.push({ property: 'article:section', content: section })
    }
  }

  // Twitter Card
  meta.push(
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image }
  )

  return meta
}

/**
 * Create canonical link
 */
export function createCanonicalLink(path: string) {
  return [{ rel: 'canonical', href: `${SITE.url}${path}` }]
}

/**
 * Complete SEO configuration for a route
 */
export function createPageSEO(config: SEOConfig & { path: string }) {
  return {
    meta: createSEOMeta(config),
    links: createCanonicalLink(config.path),
  }
}

/**
 * Structured data describing the business (schema.org ProfessionalService), added to every page by
 * the root route so search engines know jgb.solutions is a company, not a person.
 */
export function createOrganizationJsonLd() {
  return {
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/logo.png`,
      image: OG_IMAGE.url,
      description: SEO.description,
      email: SITE.email,
      telephone: SITE.phone.replace(/\s/g, ''),
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Laval',
        addressRegion: 'QC',
        addressCountry: 'CA',
      },
      makesOffer: OFFERED_SERVICES.map(service => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.shortDescription,
          url: `${SITE.url}/services/${service.slug}`,
        },
      })),
    }),
  }
}
