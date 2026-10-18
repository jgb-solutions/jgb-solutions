import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

describe('Site header and footer', () => {
  it('shows the main navigation and a way to start a project', async () => {
    renderWithRouter({ initialEntries: ['/projects'] })

    const nav = await screen.findByRole('navigation', { name: 'Main' })
    expect(within(nav).getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/projects')
    expect(within(nav).getByRole('link', { name: 'Insights' })).toHaveAttribute('href', '/posts')
    expect(within(nav).getByRole('link', { name: 'Start a project' })).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:services@jgb.solutions')
    )
  })

  it('lists only offered services and the business contact details', async () => {
    renderWithRouter({ initialEntries: ['/projects'] })

    const footer = await screen.findByRole('contentinfo')
    expect(within(footer).getByText('Web Design & Development')).toBeInTheDocument()
    expect(within(footer).queryByText('Graphic Design')).not.toBeInTheDocument()
    expect(within(footer).queryByText(/photography/i)).not.toBeInTheDocument()
    expect(within(footer).getByRole('link', { name: 'services@jgb.solutions' })).toBeInTheDocument()
    expect(within(footer).getAllByText(/Laval, Québec/).length).toBeGreaterThan(0)
  })
})
