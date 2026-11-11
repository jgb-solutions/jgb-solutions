// Types for `bun test` only: the bun:test module and Testing Library's jest-dom matchers. Site code
// doesn't get the `Bun` global, since the site runs on Vercel's runtime, not as a Bun script.
/// <reference types="bun-types/test" />
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'
import type { expect } from 'bun:test'

type StringContaining = ReturnType<typeof expect.stringContaining>

declare module 'bun:test' {
  interface Matchers<T> extends TestingLibraryMatchers<StringContaining, T> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers<unknown, unknown> {}
}
