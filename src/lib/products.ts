import feed from '../../public/products.json'
import type { ProductKind } from '@/lib/seo'
import { publishedProjects } from '@/lib/projects'

/**
 * public/products.json is the one list of JGB Solutions' own products (apps and media sites we
 * build and run). It's served at https://jgb.solutions/products.json, where every product reads it
 * for its "More from JGB Solutions" links, and this site uses it for the Products page. Everything
 * else is client work. The user decides which is which: ask before adding one.
 * Ti Kwen Pam is also ours but hidden (draft) at the user's request, so it isn't in the list.
 * Its shape is checked by src/lib/products.test.ts (kept out of here so zod stays out of the
 * page bundle). PRODUCT_SLUGS: product ids in display order; each is also the slug of the
 * product's project page.
 */
export const PRODUCT_SLUGS: ReadonlyArray<string> = feed.products.map(p => p.id)

/** What kind of product a slug is (web app, game or media site), or undefined for client work. */
export function productKind(slug: string): ProductKind | undefined {
  return feed.products.find(p => p.id === slug)?.kind as ProductKind | undefined
}

/** This site's own write-up: neither a product nor client work on the home page. */
export const SITE_SLUG = 'jgb-solutions'

const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order

export const products = PRODUCT_SLUGS.flatMap(slug => {
  const project = publishedProjects.find(p => p.slug === slug)
  return project ? [project] : []
})

export const clientProjects = publishedProjects
  .filter(p => !PRODUCT_SLUGS.includes(p.slug) && p.slug !== SITE_SLUG)
  .sort(byOrder)

/**
 * The first paragraph under "## Project Overview" in a project's write-up (plain text), for
 * product summaries. Falls back to the description when there's no overview.
 */
export function overviewOf(project: { content?: string; description: string }): string {
  const match = project.content?.match(/## Project Overview\s+([\s\S]*?)(?:\n\s*\n|$)/)
  const paragraph = match?.[1].trim()
  return paragraph ? paragraph.replace(/\*\*|__|`/g, '') : project.description
}
