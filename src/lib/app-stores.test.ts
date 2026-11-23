import { describe, expect, it } from 'bun:test'
import type { StoreFeed } from '@/lib/app-stores'
import fixture from '@/test/fixtures/app-stores-preview.json'
import { appCategoryIn, platforms, storeLinks, storeLinksIn } from '@/lib/app-stores'
import { mobileAppJsonLd } from '@/lib/seo'

const PLAY = fixture.musivo.googlePlay
const APP_STORE = fixture.musivo.appStore

const testFeed: StoreFeed = {
  products: [
    { id: 'both', category: 'Entertainment', app: { googlePlay: PLAY, appStore: APP_STORE } },
    { id: 'android', category: 'Tools', app: { googlePlay: PLAY, appStore: null } },
    { id: 'empty', category: 'Reference', app: { googlePlay: null, appStore: null } },
    { id: 'web-only', category: 'Games' },
    { id: 'wrong-host', app: { googlePlay: 'https://example.com/app', appStore: null } },
  ],
}

const project = {
  slug: 'both',
  title: 'Both',
  description: 'An app in both stores.',
  image: '/assets/images/projects/both/featured.jpg',
}

describe('store links', () => {
  it('read the filled links', () => {
    expect(storeLinksIn(testFeed, 'both')).toEqual({ googlePlay: PLAY, appStore: APP_STORE })
    expect(storeLinksIn(testFeed, 'android')).toEqual({ googlePlay: PLAY, appStore: null })
  })

  it('are empty for null links, web-only products, client work and other hosts', () => {
    const none = { googlePlay: null, appStore: null }
    for (const slug of ['empty', 'web-only', 'client-site', 'wrong-host']) {
      expect(storeLinksIn(testFeed, slug)).toEqual(none)
    }
  })

  it('are empty on the live feed until an app is published', () => {
    // The real products.json has no store links yet; update this when the first app goes live.
    expect(storeLinks('musivo')).toEqual({ googlePlay: null, appStore: null })
  })
})

describe('platforms', () => {
  it('lists Web plus each store the app is in', () => {
    expect(platforms(storeLinksIn(testFeed, 'both'))).toEqual(['Web', 'Android', 'iOS'])
    expect(platforms(storeLinksIn(testFeed, 'android'))).toEqual(['Web', 'Android'])
  })

  it('is empty without an app, so web-only products show no chips', () => {
    expect(platforms(storeLinksIn(testFeed, 'empty'))).toEqual([])
    expect(platforms(storeLinksIn(testFeed, 'web-only'))).toEqual([])
  })
})

describe('mobile app structured data', () => {
  it('has one MobileApplication per store, with its OS and store URL', () => {
    const entries = mobileAppJsonLd(
      project,
      storeLinksIn(testFeed, 'both'),
      appCategoryIn(testFeed, 'both')
    )
    expect(entries).toHaveLength(2)
    expect(entries[0]).toMatchObject({
      '@type': 'MobileApplication',
      name: 'Both',
      operatingSystem: 'Android',
      applicationCategory: 'EntertainmentApplication',
      url: PLAY,
      installUrl: PLAY,
      offers: { '@type': 'Offer', price: '0' },
    })
    expect(entries[1]).toMatchObject({ operatingSystem: 'iOS', url: APP_STORE })
  })

  it('is empty without store links', () => {
    expect(
      mobileAppJsonLd(project, storeLinksIn(testFeed, 'empty'), 'UtilitiesApplication')
    ).toEqual([])
  })
})
