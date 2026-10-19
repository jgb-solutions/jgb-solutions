import { describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

vi.mock('content-collections', () => ({
  allProjects: [
    { slug: 'eneph', title: 'ENEPH', category: 'WEBSITE', image: '/e.jpg', order: 50 },
    { slug: 'jgb-tools', title: 'JGB Tools', category: 'WEB TOOLS', image: '/t.jpg', order: 10 },
    {
      slug: 'jgb-solutions',
      title: 'JGB Solutions',
      category: 'PORTFOLIO',
      image: '/s.jpg',
      order: 90,
    },
    {
      slug: 'draft',
      title: 'Draft Project',
      category: 'WEBSITE',
      image: '/d.jpg',
      order: 1,
      draft: true,
    },
  ],
  allPosts: [],
}))

const titles = () =>
  screen.getAllByRole('heading', { level: 3 }).map(heading => heading.textContent)

describe('Work page', () => {
  it('lists published work in order and tags our products', async () => {
    renderWithRouter({ initialEntries: ['/projects'] })

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/websites and apps/i)
    expect(titles()).toEqual(['JGB Tools', 'ENEPH', 'JGB Solutions'])
    const toolsCard = screen.getByRole('link', { name: /JGB Tools/ })
    expect(within(toolsCard).getByText('Our product')).toBeInTheDocument()
    expect(screen.queryByText('Draft Project')).not.toBeInTheDocument()
  })

  it('filters client work and products', async () => {
    renderWithRouter({ initialEntries: ['/projects?show=clients'] })
    await screen.findByRole('heading', { level: 1 })
    expect(titles()).toEqual(['ENEPH'])
    expect(screen.getByRole('link', { name: 'Client work' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })

  it('shows only our products', async () => {
    renderWithRouter({ initialEntries: ['/projects?show=products'] })
    await screen.findByRole('heading', { level: 1 })
    expect(titles()).toEqual(['JGB Tools'])
  })
})
