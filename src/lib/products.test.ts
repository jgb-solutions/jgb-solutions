import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import feed from '../../public/products.json'
import { overviewOf } from '@/lib/products'

describe('overviewOf', () => {
  it('returns the first paragraph of the project overview', () => {
    const content =
      '## Project Overview\n\nFirst **paragraph** here.\n\nSecond one.\n\n## The Challenge\n\nMore.'
    expect(overviewOf({ content, description: 'Fallback.' })).toBe('First paragraph here.')
  })

  it('falls back to the description', () => {
    expect(overviewOf({ content: '## Something else\n\nText.', description: 'Fallback.' })).toBe(
      'Fallback.'
    )
    expect(overviewOf({ description: 'Fallback.' })).toBe('Fallback.')
  })
})

/** The shape every product reads from https://jgb.solutions/products.json (version 1). */
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

describe('public/products.json', () => {
  it('matches the shape every product reads, with unique ids', () => {
    const { products } = productsFeed.parse(feed)
    expect(products.length).toBeGreaterThan(0)
    expect(new Set(products.map(p => p.id)).size).toBe(products.length)
  })
})
