import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

describe('Services page', () => {
  it('lists the services we offer, each linking to its page', async () => {
    renderWithRouter({ initialEntries: ['/services'] })

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      /everything your business needs online/i
    )
    for (const [title, slug] of [
      ['Websites', 'websites'],
      ['Mobile Apps', 'mobile-apps'],
      ['Social Media', 'social-media'],
    ]) {
      expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: `Learn more about ${title}` })).toHaveAttribute(
        'href',
        `/services/${slug}`
      )
    }
  })

  it('leaves planned services off', async () => {
    renderWithRouter({ initialEntries: ['/services'] })

    await screen.findByRole('heading', { level: 1 })
    expect(screen.queryByText(/graphic design/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/photography/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/^print$/i)).not.toBeInTheDocument()
  })
})
