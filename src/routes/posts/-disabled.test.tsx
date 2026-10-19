import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

// With the blog switched off (src/lib/features.ts), its pages are not found
describe('Posts while the blog is off', () => {
  it('shows the not-found page for the post list', async () => {
    renderWithRouter({ initialEntries: ['/posts'] })
    expect(await screen.findByText('Page Not Found')).toBeInTheDocument()
  })

  it('shows the not-found page for a post', async () => {
    renderWithRouter({ initialEntries: ['/posts/talk-less-listen-more'] })
    expect(await screen.findByText(/not found/i)).toBeInTheDocument()
  })
})
