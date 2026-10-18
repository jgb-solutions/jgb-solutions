import { describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

vi.mock('content-collections', () => ({
  allProjects: [
    {
      slug: 'jgb-tools',
      title: 'JGB Tools',
      category: 'WEB TOOLS',
      description: 'Free tools.',
      image: '/tools.jpg',
      url: 'https://tools.jgb.solutions/',
      order: 10,
    },
    {
      slug: 'eneph',
      title: 'ENEPH',
      category: 'WEBSITE',
      description: 'A non-profit.',
      image: '/eneph.jpg',
      year: '2022',
      order: 50,
    },
    {
      slug: 'jgb-solutions',
      title: 'JGB Solutions',
      category: 'PORTFOLIO',
      description: 'This site.',
      image: '/site.jpg',
      order: 90,
    },
    {
      slug: 'hidden',
      title: 'Hidden Draft',
      category: 'WEBSITE',
      description: 'Not ready.',
      image: '/x.jpg',
      order: 1,
      draft: true,
    },
  ],
  allPosts: [
    {
      slug: 'talk-less',
      title: 'Talk Less, Listen More',
      category: 'Thoughts',
      readTime: '3 min read',
      excerpt: 'Hi, the name is Jean.',
      date: '2022-09-02',
    },
  ],
}))

describe('Home Route', () => {
  it('speaks as the business and offers a way to start a project', async () => {
    renderWithRouter({ initialEntries: ['/'] })

    expect(
      await screen.findByRole('heading', { level: 1, name: /websites, apps and social media/i })
    ).toBeInTheDocument()
    expect(screen.queryByText(/jean/i)).not.toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /start a project/i }).length).toBeGreaterThan(0)
  })

  it('shows only the services we offer', async () => {
    renderWithRouter({ initialEntries: ['/'] })

    const services = await screen.findByRole('heading', { name: 'Three services, one team' })
    const section = services.closest('section') as HTMLElement
    expect(within(section).getByText('Mobile App Design & Development')).toBeInTheDocument()
    expect(screen.queryByText(/graphic design/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/photography/i)).not.toBeInTheDocument()
  })

  it('separates our products from client work', async () => {
    renderWithRouter({ initialEntries: ['/'] })

    const products = (
      await screen.findByRole('heading', { name: 'Apps and media we build and run' })
    ).closest('section') as HTMLElement
    expect(within(products).getByRole('link', { name: 'JGB Tools' })).toBeInTheDocument()
    expect(within(products).queryByText('ENEPH')).not.toBeInTheDocument()

    const work = screen
      .getByRole('heading', { name: 'Recent projects' })
      .closest('section') as HTMLElement
    expect(within(work).getByText('ENEPH')).toBeInTheDocument()
    expect(within(work).queryByText('JGB Tools')).not.toBeInTheDocument()
    expect(within(work).queryByText('JGB Solutions')).not.toBeInTheDocument()
    expect(screen.queryByText('Hidden Draft')).not.toBeInTheDocument()
  })

  it('lists recent posts and the contact options', async () => {
    renderWithRouter({ initialEntries: ['/'] })

    expect(await screen.findByText('Talk Less, Listen More')).toBeInTheDocument()
    const cta = screen
      .getByRole('heading', { name: 'Have a project in mind?' })
      .closest('section') as HTMLElement
    expect(within(cta).getByRole('link', { name: 'services@jgb.solutions' })).toHaveAttribute(
      'href',
      'mailto:services@jgb.solutions'
    )
    expect(within(cta).getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
      'href',
      'https://wa.me/14383895465'
    )
  })

  it('switches between the bold and light looks', async () => {
    renderWithRouter({ initialEntries: ['/?look=light'] })

    const group = await screen.findByRole('group', { name: 'Home page look' })
    expect(within(group).getByRole('link', { name: 'Light' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(within(group).getByRole('link', { name: 'Bold' })).not.toHaveAttribute('aria-current')
  })
})
