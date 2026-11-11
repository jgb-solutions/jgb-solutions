import { describe, expect, it, mock } from 'bun:test'
import { render, screen } from '@testing-library/react'
import type { allPosts } from 'content-collections'

// Mock Link
mock.module('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
    <a {...props}>{children}</a>
  ),
}))

// Mock Post Data
const mockPost: (typeof allPosts)[number] = {
  title: 'Test Post',
  category: 'Tech',
  excerpt: 'Test excerpt',
  date: '2024-01-01',
  image: '/test.png',
  readTime: '5 min read',
  slug: 'test-post',
  summary: 'Post summary text',
  _meta: {
    filePath: 'test.mdx',
    fileName: 'test.mdx',
    directory: 'posts',
    path: 'posts/test',
    extension: 'mdx',
  },
}

// Imported after the mocks above, so they read the mocked modules
const { PostCard } = await import('./post-card')

describe('PostCard', () => {
  it('renders post details correctly', () => {
    render(<PostCard post={mockPost} />)

    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('Tech')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    // Summary is present in the DOM (just hidden/translated)
    expect(screen.getByText('Post summary text')).toBeInTheDocument()
  })

  it('renders with date when showDate is true', () => {
    render(<PostCard post={mockPost} showDate={true} />)
    expect(screen.getByText('2024-01-01')).toBeInTheDocument()
  })

  it('renders excerpt when showExcerpt is true', () => {
    render(<PostCard post={mockPost} showExcerpt={true} />)
    expect(screen.getByText('Test excerpt')).toBeInTheDocument()
  })
})
