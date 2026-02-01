import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock content-collections globally
vi.mock('content-collections', () => ({
  allProjects: [],
  allPosts: [],
}))

// Mock @tanstack/react-start createServerFn
vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => {
    const builder = {
      inputValidator: () => builder,
      handler: (fn: unknown) => fn,
    }
    return builder
  },
}))
