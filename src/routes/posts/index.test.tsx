import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Route } from './index'

// Mock Data
const mockPosts = [
  { slug: 'p1', title: 'Post 1', category: 'Tech' },
  { slug: 'p2', title: 'Post 2', category: 'Life' },
]
const mockCategories = ['Tech', 'Life']

// Mock Hooks
const mockNavigate = vi.fn()
const mockUseSearch = vi.fn<() => { category?: string }>(() => ({ category: undefined }))

// Mock Router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    createFileRoute: () => (config: any) => ({
      ...config,
      component: config.component,
      useLoaderData: () => ({ posts: mockPosts, categories: mockCategories }),
      useSearch: () => mockUseSearch(),
    }),
    useNavigate: () => mockNavigate,
    Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  }
})

// Mock Components
vi.mock('@/components/navbar', () => ({ default: () => <div>Navbar</div> }))
vi.mock('@/components/footer', () => ({ default: () => <div>Footer</div> }))
vi.mock('@/components/post-card', () => ({
  PostCard: ({ post }: any) => <div data-testid='post-card'>{post.title}</div>,
}))

describe('Posts Index Route', () => {
  it('renders list of posts and categories', () => {
    const PostsPage = Route.component as React.ComponentType
    render(<PostsPage />)

    expect(screen.getByText('Latest Posts')).toBeInTheDocument()

    // Check categories
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Tech')).toBeInTheDocument()
    expect(screen.getByText('Life')).toBeInTheDocument()

    // Check posts
    const cards = screen.getAllByTestId('post-card')
    expect(cards).toHaveLength(2)
  })

  it('filters posts when category is selected', () => {
    // Mock search params to filter by 'Tech'
    mockUseSearch.mockReturnValue({ category: 'Tech' })

    const PostsPage = Route.component as React.ComponentType
    render(<PostsPage />)

    const cards = screen.getAllByTestId('post-card')
    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveTextContent('Post 1')
  })
})
