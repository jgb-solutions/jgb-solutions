import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      const result = cn('c1', 'c2')
      expect(result).toBe('c1 c2')
    })

    it('handles conditional classes', () => {
      // Use strings for conditions to avoid ESLint warnings about constant binary expressions
      const isTrue = true
      const isFalse = false
      const result = cn('c1', isTrue && 'c2', isFalse && 'c3')
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
