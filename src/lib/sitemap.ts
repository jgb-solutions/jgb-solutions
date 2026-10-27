import { allPosts } from 'content-collections'
import { SITE } from '@/lib/constants'
import { FEATURES } from '@/lib/features'
import { PAGE_UPDATED, SERVICES_UPDATED } from '@/lib/page-dates'
import { publishedProjects } from '@/lib/projects'
import { OFFERED_SERVICES } from '@/lib/services'

export interface SitemapEntry {
  path: string
  /** YYYY-MM-DD */
  lastmod: string
}

/** Every public URL with the date its content last changed (see src/lib/page-dates.ts). */
export function sitemapEntries(): Array<SitemapEntry> {
  const pages: Array<SitemapEntry> = (
    ['/', '/services', '/products', '/projects', '/about', '/privacy'] as const
  ).map(path => ({ path, lastmod: PAGE_UPDATED[path] }))

  const services = OFFERED_SERVICES.map(service => ({
    path: `/services/${service.slug}`,
    lastmod: SERVICES_UPDATED,
  }))

  const projects = publishedProjects.map(project => ({
    path: `/projects/${project.slug}`,
    lastmod: project.updated,
  }))

  const posts = FEATURES.blog
    ? [
        { path: '/posts', lastmod: PAGE_UPDATED['/posts'] },
        ...allPosts.map(post => ({ path: `/posts/${post.slug}`, lastmod: post.date })),
      ]
    : []

  return [...pages, ...services, ...projects, ...posts]
}

/** The sitemap XML. A plain function: the sitemap route's GET handler already runs on the server. */
export function buildSitemap() {
  const urls = sitemapEntries()
    .map(
      ({ path, lastmod }) =>
        `  <url>\n    <loc>${SITE.url}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
