import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

describe('About page', () => {
  it('introduces the studio and its founder', async () => {
    renderWithRouter({ initialEntries: ['/about'] })

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/made to last/i)
    expect(screen.getByText(/web and mobile studio in Laval, Québec/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Jean Gérard Bousiquot' })
    ).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /founder of JGB Solutions/i })).toBeInTheDocument()
    expect(screen.getByText('10+')).toBeInTheDocument()
  })

  it('links to both resumes', async () => {
    renderWithRouter({ initialEntries: ['/about'] })

    expect(await screen.findByRole('link', { name: /resume \(english\)/i })).toHaveAttribute(
      'href',
      '/assets/resumes/Resume-English.pdf'
    )
    expect(screen.getByRole('link', { name: /resume \(french\)/i })).toHaveAttribute(
      'href',
      '/assets/resumes/Resume-French.pdf'
    )
  })
})
