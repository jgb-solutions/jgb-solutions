import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

// Mock content-collections
vi.mock('content-collections', () => ({
  allPosts: [
    {
      slug: 'test-post',
      title: 'Test Post',
      category: 'Tech',
      date: '2024-01-01',
      readTime: '5 min',
      image: '/test.png',
      mdx: 'MDX Content',
    },
  ],
  allProjects: [],
}))

// Mock Components
vi.mock('@/components/navbar', () => ({ default: () => <div>Navbar</div> }))
vi.mock('@/components/footer', () => ({ default: () => <div>Footer</div> }))
vi.mock('@/components/mdx-provider', () => ({
  MdxRenderer: () => <div data-testid='mdx-content'>MDX Rendered</div>,
}))

describe('Post Detail Route', () => {
  it('renders post details', async () => {
    renderWithRouter({ initialEntries: ['/posts/test-post'] })

    // Wait for content to appear
    expect(await screen.findByText('Test Post')).toBeInTheDocument()
    expect(await screen.findByText('Tech')).toBeInTheDocument()
    expect(await screen.findByText('2024-01-01')).toBeInTheDocument()
    expect(await screen.findByText('5 min')).toBeInTheDocument()

    // Check MDX content
    expect(await screen.findByTestId('mdx-content')).toBeInTheDocument()
  })
})
