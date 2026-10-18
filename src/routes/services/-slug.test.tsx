import { describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

vi.mock('content-collections', () => ({
  allProjects: [
    {
      slug: 'eneph',
      title: 'ENEPH',
      category: 'WEBSITE',
      description: 'A non-profit.',
      image: '/eneph.jpg',
      order: 50,
    },
    {
      slug: 'jgb-tools',
      title: 'JGB Tools',
      category: 'WEB TOOLS',
      description: 'Free tools.',
      image: '/tools.jpg',
      order: 10,
    },
  ],
  allPosts: [],
}))

describe('Service page', () => {
  it('shows what the service includes, examples and the other services', async () => {
    renderWithRouter({ initialEntries: ['/services/websites'] })

    expect(await screen.findByRole('heading', { level: 1, name: 'Websites' })).toBeInTheDocument()
    expect(screen.getByText('Custom website design')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Built for phones first' })).toBeInTheDocument()

    const examples = screen
      .getByRole('heading', { name: 'Work we have done' })
      .closest('section') as HTMLElement
    expect(within(examples).getByRole('link', { name: /ENEPH/ })).toHaveAttribute(
      'href',
      '/projects/eneph'
    )

    const others = screen.getByText('Other services').closest('section') as HTMLElement
    expect(within(others).getByRole('link', { name: /Mobile Apps/ })).toHaveAttribute(
      'href',
      '/services/mobile-apps'
    )
    expect(within(others).queryByRole('link', { name: /^Websites/ })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Have a project in mind?' })).toBeInTheDocument()
  })

  it('labels our own products among the examples', async () => {
    renderWithRouter({ initialEntries: ['/services/mobile-apps'] })

    const examples = (await screen.findByRole('heading', { name: 'Work we have done' })).closest(
      'section'
    ) as HTMLElement
    expect(within(examples).getByText('JGB Tools')).toBeInTheDocument()
    expect(within(examples).getByText('Our product')).toBeInTheDocument()
  })

  it('hides the examples section when a service has none', async () => {
    renderWithRouter({ initialEntries: ['/services/social-media'] })

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Social Media' })
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Work we have done' })).not.toBeInTheDocument()
  })

  it.each(['graphic-design', 'not-a-service'])('shows the not-found page for %s', async slug => {
    renderWithRouter({ initialEntries: [`/services/${slug}`] })
    expect(await screen.findByText('Page Not Found')).toBeInTheDocument()
  })
})
