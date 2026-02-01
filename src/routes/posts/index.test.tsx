import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import type { allPosts } from 'content-collections'
import { renderWithRouter } from '@/test/router-utils'

// Mock content-collections
vi.mock('content-collections', () => ({
  allPosts: [
    { slug: 'p1', title: 'Post 1', category: 'Tech', date: '2024-01-01' },
    { slug: 'p2', title: 'Post 2', category: 'Life', date: '2024-01-02' },
  ],
  allProjects: [],
}))

// Mock Components
vi.mock('@/components/navbar', () => ({ default: () => <div>Navbar</div> }))
vi.mock('@/components/footer', () => ({ default: () => <div>Footer</div> }))
vi.mock('@/components/post-card', () => ({
  PostCard: ({ post }: { post: (typeof allPosts)[number] }) => (
    <div data-testid='post-card'>{post.title}</div>
  ),
}))

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
