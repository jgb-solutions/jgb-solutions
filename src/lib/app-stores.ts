import feed from '../../public/products.json'

/**
 * A product's mobile app store pages, read from public/products.json (`app.googlePlay`,
 * `app.appStore`). Both stay null until the app is live in that store (the owner's rule: no store
 * links before then), and nothing about the app shows on the site until one is filled in.
 */
export interface StoreLinks {
  googlePlay: string | null
  appStore: string | null
}

export type Platform = 'Web' | 'Android' | 'iOS'

/** The part of the feed this reads, so tests can pass their own. */
export interface StoreFeed {
  products: ReadonlyArray<{
    id: string
    category?: string
    app?: { googlePlay: string | null; appStore: string | null } | null
  }>
}

const PLAY_PREFIX = 'https://play.google.com/store/apps/details?id='
const APP_STORE_PREFIX = 'https://apps.apple.com/'

const NO_STORES: StoreLinks = { googlePlay: null, appStore: null }

export function storeLinksIn(source: StoreFeed, slug: string): StoreLinks {
  const app = source.products.find(product => product.id === slug)?.app
  if (!app) return NO_STORES
  return {
    googlePlay: app.googlePlay?.startsWith(PLAY_PREFIX) ? app.googlePlay : null,
    appStore: app.appStore?.startsWith(APP_STORE_PREFIX) ? app.appStore : null,
  }
}

/** This site's store links for a product (empty for client work). */
export const storeLinks = (slug: string) => storeLinksIn(feed, slug)

export const hasStoreLink = (links: StoreLinks) => Boolean(links.googlePlay || links.appStore)

/**
 * Where a product runs: the web (every product), plus Android and iOS once their store links are in.
 * Empty when there's no app yet, so web-only products show no chips.
 */
export function platforms(links: StoreLinks): Array<Platform> {
  if (!hasStoreLink(links)) return []
  return [
    'Web',
    ...(links.googlePlay ? (['Android'] as const) : []),
    ...(links.appStore ? (['iOS'] as const) : []),
  ]
}

/** schema.org applicationCategory for a product's app, from its footer category in the feed. */
const APP_CATEGORIES: Record<string, string> = {
  Tools: 'UtilitiesApplication',
  Entertainment: 'EntertainmentApplication',
  Reference: 'ReferenceApplication',
  Games: 'GameApplication',
  Podcasts: 'MultimediaApplication',
  Music: 'MultimediaApplication',
}

export function appCategoryIn(source: StoreFeed, slug: string) {
  const category = source.products.find(product => product.id === slug)?.category ?? ''
  return APP_CATEGORIES[category] ?? 'LifestyleApplication'
}

export const appCategory = (slug: string) => appCategoryIn(feed, slug)
