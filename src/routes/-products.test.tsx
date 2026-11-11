import { describe, expect, it, mock } from 'bun:test'
import { screen } from '@testing-library/react'
import { contentModule } from '@/test/content'

mock.module('content-collections', () =>
  contentModule({
    allProjects: [
      {
        slug: 'jgb-tools',
        title: 'JGB Tools',
        category: 'WEB TOOLS',
        description: 'Free tools.',
        overview: 'Tools that open instantly.',
        image: '/tools.jpg',
        url: 'https://tools.jgb.solutions/',
        services: ['TanStack Start', 'Expo (React Native)'],
        order: 10,
      },
      {
        slug: 'street-brawl',
        title: 'Dojo Rivals',
        category: 'GAME',
        description: 'A fighting game.',
        // The build falls back to the description when there's no overview (see lib/overview)
        overview: 'A fighting game.',
        image: '/brawl.jpg',
        url: 'https://dojorivals.jgb.solutions/',
        order: 12,
      },
      {
        slug: 'eneph',
        title: 'ENEPH',
        category: 'WEBSITE',
        description: 'A non-profit.',
        image: '/eneph.jpg',
        order: 50,
      },
    ],
    allPosts: [],
  })
)

// Imported after the mocks above, so they read the mocked modules
const { renderWithRouter } = await import('@/test/router-utils')

describe('Products page', () => {
  it('lists our products with their overview, stack and links', async () => {
    renderWithRouter({ initialEntries: ['/products'] })

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      /we build our own products too/i
    )
    expect(screen.getByRole('heading', { level: 2, name: 'JGB Tools' })).toBeInTheDocument()
    expect(screen.getByText('Tools that open instantly.')).toBeInTheDocument()
    expect(screen.getByText('Expo (React Native)')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /visit jgb tools/i })).toHaveAttribute(
      'href',
      'https://tools.jgb.solutions/'
    )
    expect(screen.getByRole('link', { name: 'How we built JGB Tools' })).toHaveAttribute(
      'href',
      '/projects/jgb-tools'
    )
    // A product without an overview paragraph shows its description
    expect(screen.getByText('A fighting game.')).toBeInTheDocument()
  })

  it('leaves client work off', async () => {
    renderWithRouter({ initialEntries: ['/products'] })

    await screen.findByRole('heading', { level: 1 })
    expect(screen.queryByRole('heading', { name: 'ENEPH' })).not.toBeInTheDocument()
  })
})
