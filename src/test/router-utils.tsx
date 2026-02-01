import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router'
import { render } from '@testing-library/react'
import { routeTree } from '../routeTree.gen'

export function createTestRouter(initialEntries: Array<string> = ['/']) {
  return createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries,
    }),
  })
}

export function renderWithRouter({ initialEntries = ['/'] } = {}) {
  const router = createTestRouter(initialEntries)

  return {
    router,
    ...render(<RouterProvider router={router} />),
  }
}
