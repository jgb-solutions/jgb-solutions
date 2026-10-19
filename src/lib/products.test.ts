import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'

/**
 * public/products.json lists JGB Solutions' own products (not client work). It's served at
 * https://jgb.solutions/products.json and read by every product's build for its
 * "More from JGB Solutions" links, so its shape must stay exactly this (version 1).
 */
const productsFeed = z.object({
  version: z.literal(1),
  products: z.array(
    z.strictObject({
      id: z.string().min(1),
      name: z.string().min(1),
      tagline: z.string().min(1),
      url: z.url({ protocol: /^https$/ }),
      kind: z.enum(['web-app', 'game', 'media']),
    })
  ),
})

const feed = productsFeed.parse(JSON.parse(readFileSync('public/products.json', 'utf8')))

describe('public/products.json', () => {
  it('matches the shape products read', () => {
    expect(feed.products.length).toBeGreaterThan(0)
  })

  it('has unique ids', () => {
    expect(new Set(feed.products.map(p => p.id)).size).toBe(feed.products.length)
  })
})
