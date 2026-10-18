import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

describe('Site header and footer', () => {
  it('shows the main navigation and a way to start a project', async () => {
    renderWithRouter({ initialEntries: ['/projects'] })

    const nav = await screen.findByRole('navigation', { name: 'Main' })
    expect(within(nav).getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services')
    expect(within(nav).getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/projects')
    expect(within(nav).queryByRole('link', { name: 'Insights' })).not.toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'Start a project' })).toHaveAttribute(
      'href',
      '/#contact'
    )
  })

  it('lists only offered services and the business contact details', async () => {
    renderWithRouter({ initialEntries: ['/projects'] })

    const footer = await screen.findByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: 'Websites' })).toHaveAttribute(
      'href',
      '/services/websites'
    )
    expect(within(footer).queryByText('Graphic Design')).not.toBeInTheDocument()
    expect(within(footer).queryByText(/photography/i)).not.toBeInTheDocument()
    expect(within(footer).getByRole('link', { name: 'services@jgb.solutions' })).toBeInTheDocument()
    expect(within(footer).getByRole('link', { name: '+1 438 389 5465' })).toHaveAttribute(
      'href',
      'https://wa.me/14383895465'
    )
    expect(within(footer).queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument()
    expect(within(footer).queryByText('Insights')).not.toBeInTheDocument()
  })
})
