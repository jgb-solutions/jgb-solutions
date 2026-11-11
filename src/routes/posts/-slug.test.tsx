import { describe, expect, it, mock } from 'bun:test'
import { screen } from '@testing-library/react'
import { contentModule } from '@/test/content'

// Mock content-collections
// The blog is switched off on the site; these tests cover the pages for when it's back on
mock.module('@/lib/features', () => ({ FEATURES: { blog: true } }))

mock.module('content-collections', () =>
  contentModule({
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
  })
)

// Mock Components
mock.module('@/components/site/site-header', () => ({ SiteHeader: () => <div>Navbar</div> }))
mock.module('@/components/site/site-footer', () => ({ SiteFooter: () => <div>Footer</div> }))
mock.module('@/components/mdx-provider', () => ({
  MdxRenderer: () => <div data-testid='mdx-content'>MDX Rendered</div>,
}))

// Imported after the mocks above, so they read the mocked modules
const { renderWithRouter } = await import('@/test/router-utils')

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
