import { describe, expect, it } from 'vitest'
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
