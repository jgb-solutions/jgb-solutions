import { describe, expect, it, mock } from 'bun:test'
import { screen, within } from '@testing-library/react'
import { contentModule } from '@/test/content'

mock.module('content-collections', () =>
  contentModule({
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
      {
        slug: 'anboudou-creations',
        title: 'Anboudou Créations',
        category: 'SHOPIFY STORE',
        description: 'A Shopify store.',
        summary: 'A Shopify store for handmade accessories.',
        image: '/anboudou.jpg',
        url: 'https://anboudoucreations.ca/en',
        order: 15,
      },
    ],
    allPosts: [],
  })
)

// Imported after the mocks above, so they read the mocked modules
const { renderWithRouter } = await import('@/test/router-utils')

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

  it.each([
    ['social-media', 'Social Media'],
    // The JGB Tools app isn't in the stores yet, so Mobile Apps has no examples
    ['mobile-apps', 'Mobile Apps'],
  ])('hides the examples section on %s, which has none', async (slug, title) => {
    renderWithRouter({ initialEntries: [`/services/${slug}`] })

    expect(await screen.findByRole('heading', { level: 1, name: title })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Work we have done' })).not.toBeInTheDocument()
  })

  it('shows who it is for, the case study and the FAQ on the Shopify page', async () => {
    renderWithRouter({ initialEntries: ['/services/shopify'] })

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Shopify E-commerce Stores' })
    ).toBeInTheDocument()
    expect(screen.getByText('We are a Shopify Partner')).toBeInTheDocument()
    expect(screen.queryByText(/Shopify Expert/)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Makers and small brands' })).toBeInTheDocument()

    const caseStudy = document.getElementById('case-study') as HTMLElement
    expect(
      within(caseStudy).getByRole('heading', { name: 'Anboudou Créations' })
    ).toBeInTheDocument()
    expect(within(caseStudy).getByRole('link', { name: /Read the case study/ })).toHaveAttribute(
      'href',
      '/projects/anboudou-creations'
    )
    // The case study isn't repeated in an examples grid
    expect(screen.queryByRole('heading', { name: 'Work we have done' })).not.toBeInTheDocument()

    expect(screen.getByText('Who owns the store?')).toBeInTheDocument()
    // Quote only: no prices on the page
    expect(document.body.textContent).not.toMatch(/\$\s?\d/)
  })

  it.each(['graphic-design', 'not-a-service'])('shows the not-found page for %s', async slug => {
    renderWithRouter({ initialEntries: [`/services/${slug}`] })
    expect(await screen.findByText('Page Not Found')).toBeInTheDocument()
  })
})
