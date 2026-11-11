// Preloaded before every test file (bunfig.toml). Registers happy-dom's browser globals first:
// Testing Library reads `document` when it's imported, so it's imported after.
import { GlobalRegistrator } from '@happy-dom/global-registrator'
import { afterEach, expect, mock } from 'bun:test'

GlobalRegistrator.register()

// The module's default export isn't a matcher, so it's left out
const { default: _default, ...matchers } = await import('@testing-library/jest-dom/matchers')
expect.extend(matchers)

const { cleanup } = await import('@testing-library/react')
afterEach(() => {
  cleanup()
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mock((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: mock(), // deprecated
    removeListener: mock(), // deprecated
    addEventListener: mock(),
    removeEventListener: mock(),
    dispatchEvent: mock(),
  })),
})

// Server functions need TanStack Start's compiler and request context, which only exist in the
// real build. In tests a route's server function just runs its handler in-process with the
// validated input, which is all this site's loaders need (`.validator()` and `.handler()`).
type ServerFnHandler = (ctx: { data: unknown }) => unknown
function createServerFn() {
  let validate = (input: unknown) => input
  const builder = {
    validator(fn: (input: unknown) => unknown) {
      validate = fn
      return builder
    },
    handler(fn: ServerFnHandler) {
      return (opts?: { data?: unknown }) =>
        Promise.resolve().then(() => fn({ data: validate(opts?.data) }))
    },
  }
  return builder
}
const reactStart = await import('@tanstack/react-start')
mock.module('@tanstack/react-start', () => ({ ...reactStart, createServerFn }))

// Empty content by default; a test file that needs projects or posts mocks the module itself, then
// imports what reads it (see src/routes/-index.test.tsx).
const { contentModule } = await import('@/test/content')
mock.module('content-collections', () => contentModule({}))
