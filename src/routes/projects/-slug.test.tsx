import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

vi.mock('content-collections', () => ({
  allProjects: [
    {
      slug: 'test-project',
      title: 'Test Project',
      category: 'WEBSITE',
      description: 'Desc',
      client: 'Test Client',
      year: '2024',
      url: 'https://example.com/',
      image: '/featured.jpg',
      services: ['React', 'Node'],
      gallery: ['/img1.png', '/img2.png'],
      mdx: 'MDX Content',
      order: 1,
    },
    {
      slug: 'jgb-tools',
      title: 'JGB Tools',
      category: 'WEB TOOLS',
      description: 'Free tools.',
      client: 'JGB SOLUTIONS',
      image: '/tools.jpg',
      mdx: 'MDX Content',
      order: 2,
    },
  ],
  allPosts: [],
}))

vi.mock('@/components/mdx-provider', () => ({
  MdxRenderer: () => <div data-testid='mdx-content'>MDX Rendered</div>,
}))

describe('Project page', () => {
  it('shows the write-up, details, gallery and a link to the site', async () => {
    renderWithRouter({ initialEntries: ['/projects/test-project'] })

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Test Project' })
    ).toBeInTheDocument()
    expect(screen.getByText('WEBSITE')).toBeInTheDocument()
    expect(screen.getByText('Desc')).toBeInTheDocument()
    expect(screen.getByText('Test Client')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Test Project screenshot 2' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /visit the site/i })).toHaveAttribute(
      'href',
      'https://example.com/'
    )
  })

  it('links to the next project, wrapping around', async () => {
    renderWithRouter({ initialEntries: ['/projects/test-project'] })
    expect(await screen.findByRole('link', { name: 'Next project: JGB Tools' })).toHaveAttribute(
      'href',
      '/projects/jgb-tools'
    )
  })

  it('labels our own products', async () => {
    renderWithRouter({ initialEntries: ['/projects/jgb-tools'] })

    expect(await screen.findByText('Our product · WEB TOOLS')).toBeInTheDocument()
    expect(screen.getByText('Made by')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Next project: Test Project' })).toBeInTheDocument()
  })

  it('shows the not-found page for an unknown project', async () => {
    renderWithRouter({ initialEntries: ['/projects/nope'] })
    expect(await screen.findByText('Page Not Found')).toBeInTheDocument()
  })
})
