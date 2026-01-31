import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      const result = cn('c1', 'c2')
      expect(result).toBe('c1 c2')
    })

    it('handles conditional classes', () => {
      const result = cn('c1', true && 'c2', false && 'c3')
      expect(result).toBe('c1 c2')
    })

    it('merges tailwind classes using tailwind-merge', () => {
      const result = cn('px-2 py-1', 'p-4')
      expect(result).toBe('p-4')
    })

    it('handles arrays and objects', () => {
      const result = cn(['c1', 'c2'], { c3: true, c4: false })
      expect(result).toBe('c1 c2 c3')
    })
  })
})
