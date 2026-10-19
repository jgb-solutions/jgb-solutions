import { describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

describe('Privacy page', () => {
  it('explains what the site collects and how to reach us', async () => {
    renderWithRouter({ initialEntries: ['/privacy'] })

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Privacy Policy' })
    ).toBeInTheDocument()
    expect(screen.getByText(/doesn't use cookies, analytics or any tracking/i)).toBeInTheDocument()
    for (const title of ['What we collect', 'Services we rely on', 'Your rights']) {
      expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument()
    }
    const rights = screen
      .getByRole('heading', { name: 'Your rights' })
      .closest('section') as HTMLElement
    expect(within(rights).getByRole('link', { name: 'services@jgb.solutions' })).toBeInTheDocument()
  })

  it('is linked from the footer', async () => {
    renderWithRouter({ initialEntries: ['/'] })

    const footer = await screen.findByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: 'Privacy' })).toHaveAttribute(
      'href',
      '/privacy'
    )
  })
})
