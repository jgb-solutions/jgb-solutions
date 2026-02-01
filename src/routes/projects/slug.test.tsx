import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

// Mock content-collections
vi.mock('content-collections', () => ({
  allProjects: [
    {
      slug: 'test-project',
      title: 'Test Project',
      category: 'Web',
      description: 'Desc',
      services: ['React', 'Node'],
      gallery: ['img1.png', 'img2.png'],
      mdx: 'MDX Content',
      order: 1,
    },
  ],
  allPosts: [],
}))

// Mock Components
vi.mock('@/components/navbar', () => ({ default: () => <div>Navbar</div> }))
vi.mock('@/components/footer', () => ({ default: () => <div>Footer</div> }))
vi.mock('@/components/mdx-provider', () => ({
  MdxRenderer: () => <div data-testid='mdx-content'>MDX Rendered</div>,
}))

describe('Project Detail Route', () => {
  it('renders project details', async () => {
    renderWithRouter({ initialEntries: ['/projects/test-project'] })

    // Wait for content to appear
    expect(await screen.findByText('Test Project')).toBeInTheDocument()
    expect(await screen.findByText('Web')).toBeInTheDocument()
    expect(await screen.findByText('Desc')).toBeInTheDocument()

    // Check services
    expect(await screen.findByText('React')).toBeInTheDocument()
    expect(await screen.findByText('Node')).toBeInTheDocument()

    // Check MDX content
    expect(await screen.findByTestId('mdx-content')).toBeInTheDocument()
  })
})
