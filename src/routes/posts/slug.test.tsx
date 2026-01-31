import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Route } from './$slug'

// Mock Data
const mockPost = {
  slug: 'test-post',
  title: 'Test Post',
  category: 'Tech',
  date: '2024-01-01',
  readTime: '5 min',
  image: '/test.png',
  mdx: 'MDX Content',
}

// Mock Router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    createFileRoute: () => (config: any) => ({
      ...config,
      component: config.component,
      useLoaderData: () => ({ post: mockPost }),
    }),
    Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  }
})

// Mock Components
vi.mock('@/components/navbar', () => ({ default: () => <div>Navbar</div> }))
vi.mock('@/components/footer', () => ({ default: () => <div>Footer</div> }))
// Fix: Mock named export MdxRenderer
vi.mock('@/components/mdx-provider', () => ({
  MdxRenderer: () => <div data-testid='mdx-content'>MDX Rendered</div>,
}))

describe('Post Detail Route', () => {
  it('renders post details', () => {
    const PostPage = Route.component as React.ComponentType
    render(<PostPage />)

    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('Tech')).toBeInTheDocument()
    expect(screen.getByText('2024-01-01')).toBeInTheDocument()
    expect(screen.getByText('5 min')).toBeInTheDocument()

    // Check MDX content
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
  })
})
