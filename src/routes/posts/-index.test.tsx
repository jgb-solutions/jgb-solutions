import { describe, expect, it, mock } from 'bun:test'
import { screen } from '@testing-library/react'
import type { allPosts } from 'content-collections'
import { contentModule } from '@/test/content'

// Mock content-collections
// The blog is switched off on the site; these tests cover the pages for when it's back on
mock.module('@/lib/features', () => ({ FEATURES: { blog: true } }))

mock.module('content-collections', () =>
  contentModule({
    allPosts: [
      { slug: 'p1', title: 'Post 1', category: 'Tech', date: '2024-01-01' },
      { slug: 'p2', title: 'Post 2', category: 'Life', date: '2024-01-02' },
    ],
    allProjects: [],
  })
)

// Mock Components
mock.module('@/components/site/site-header', () => ({ SiteHeader: () => <div>Navbar</div> }))
mock.module('@/components/site/site-footer', () => ({ SiteFooter: () => <div>Footer</div> }))
mock.module('@/components/post-card', () => ({
  PostCard: ({ post }: { post: (typeof allPosts)[number] }) => (
    <div data-testid='post-card'>{post.title}</div>
  ),
}))

// Imported after the mocks above, so they read the mocked modules
const { renderWithRouter } = await import('@/test/router-utils')

describe('Posts Index Route', () => {
  it('renders list of posts and categories', async () => {
    renderWithRouter({ initialEntries: ['/posts'] })

    expect(await screen.findByText('Latest Posts')).toBeInTheDocument()

    // Check categories
    expect(await screen.findByText('All')).toBeInTheDocument()
    expect(await screen.findByText('Tech')).toBeInTheDocument()
    expect(await screen.findByText('Life')).toBeInTheDocument()

    // Check posts
    const cards = screen.getAllByTestId('post-card')
    expect(cards).toHaveLength(2)
  })

  it('filters posts when category is selected via URL', async () => {
    renderWithRouter({ initialEntries: ['/posts?category=Tech'] })

    expect(await screen.findByText('Latest Posts')).toBeInTheDocument()

    const cards = screen.getAllByTestId('post-card')
    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveTextContent('Post 1')
  })
})
