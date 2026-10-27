/**
 * SEO Helper Functions for TanStack Start
 * Based on: https://tanstack.com/start/latest/docs/framework/react/guide/seo
 */

import { OG_IMAGE, SEO, SITE, X_ACCOUNT } from './constants'
import { OFFERED_SERVICES } from './services'
import type { Service } from './services'

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
    { name: 'twitter:site', content: X_ACCOUNT.handle },
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

/** schema.org data as a script tag for a route's head(). */
type JsonLd = Record<string, unknown>

export function jsonLdScript(data: JsonLd) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify({ '@context': 'https://schema.org', ...data }),
  }
}

export interface Breadcrumb {
  name: string
  path: string
}

/** BreadcrumbList, starting at Home; the last crumb is the current page. */
export function breadcrumbJsonLd(crumbs: Array<Breadcrumb>): JsonLd {
  const trail = [{ name: 'Home', path: '/' }, ...crumbs]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE.url}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  }
}

/** A reference to the business described by the root route's structured data. */
export const ORGANIZATION_REF = { '@id': `${SITE.url}/#organization` } as const

/**
 * Complete SEO configuration for a route: meta tags, canonical link and structured data
 * (breadcrumbs for inner pages, plus any page-specific schema.org entries).
 */
export function createPageSEO(
  config: SEOConfig & { path: string; breadcrumbs?: Array<Breadcrumb>; jsonLd?: Array<JsonLd> }
) {
  const { breadcrumbs, jsonLd = [], ...seo } = config
  const data = breadcrumbs ? [breadcrumbJsonLd(breadcrumbs), ...jsonLd] : jsonLd
  return {
    meta: createSEOMeta(seo),
    links: createCanonicalLink(seo.path),
    ...(data.length > 0 ? { scripts: data.map(jsonLdScript) } : {}),
  }
}

/** The home page as a WebSite published by the business. */
export function websiteJsonLd(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'en',
    publisher: ORGANIZATION_REF,
  }
}

/** One of the services we sell. */
export function serviceJsonLd(service: Service): JsonLd {
  return {
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: `${SITE.url}/services/${service.slug}`,
    provider: ORGANIZATION_REF,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title}: what's included`,
      itemListElement: service.offerings.map(offering => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: offering },
      })),
    },
  }
}

/** schema.org type for each kind of product in public/products.json. */
const PRODUCT_TYPES = {
  'web-app': 'WebApplication',
  game: 'VideoGame',
  media: 'WebSite',
} as const

export type ProductKind = keyof typeof PRODUCT_TYPES

interface ProjectForJsonLd {
  slug: string
  title: string
  description: string
  image: string
  url?: string
  year?: string
}

/** One of our own products: a web app, a game or a media site. */
export function productJsonLd(project: ProjectForJsonLd, kind: ProductKind): JsonLd {
  const type = PRODUCT_TYPES[kind]
  return {
    '@type': type,
    name: project.title,
    description: project.description,
    image: `${SITE.url}${project.image}`,
    url: project.url ?? `${SITE.url}/projects/${project.slug}`,
    // Free web apps and games that run in any browser
    ...(type === 'WebApplication' ? { browserRequirements: 'A modern web browser' } : {}),
    ...(type === 'VideoGame'
      ? { gamePlatform: 'Web browser', applicationCategory: 'GameApplication' }
      : {}),
    isAccessibleForFree: true,
    publisher: ORGANIZATION_REF,
  }
}

/** Client work: the site we made, credited to the business. */
export function clientProjectJsonLd(project: ProjectForJsonLd & { client?: string }): JsonLd {
  return {
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: `${SITE.url}${project.image}`,
    url: `${SITE.url}/projects/${project.slug}`,
    ...(project.url ? { sameAs: project.url } : {}),
    ...(project.year ? { dateCreated: project.year } : {}),
    creator: ORGANIZATION_REF,
    ...(project.client
      ? { sourceOrganization: { '@type': 'Organization', name: project.client } }
      : {}),
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
      sameAs: [X_ACCOUNT.url],
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
