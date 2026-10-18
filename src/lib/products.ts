import { publishedProjects } from '@/lib/projects'

/**
 * Projects that are JGB Solutions' own products (apps and media sites we build and run), in display
 * order. Everything else is client work. The user decides which is which: ask before adding one.
 */
// Ti Kwen Pam is also ours but hidden (draft) at the user's request: the user doesn't find it nice enough to show.
export const PRODUCT_SLUGS = ['jgb-tools', 'street-brawl', 'mp3pam', 'techtalk']

/** This site's own write-up: neither a product nor client work on the home page. */
const SITE_SLUG = 'jgb-solutions'

const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order

export const products = PRODUCT_SLUGS.flatMap(slug => {
  const project = publishedProjects.find(p => p.slug === slug)
  return project ? [project] : []
})

export const clientProjects = publishedProjects
  .filter(p => !PRODUCT_SLUGS.includes(p.slug) && p.slug !== SITE_SLUG)
  .sort(byOrder)
