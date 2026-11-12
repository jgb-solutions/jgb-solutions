import { afterEach, describe, expect, it, mock } from 'bun:test'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ShareButtons } from '@/components/site/share-buttons'

const original = Object.getOwnPropertyDescriptor(navigator, 'share')

afterEach(() => {
  if (original) Object.defineProperty(navigator, 'share', original)
  else Reflect.deleteProperty(navigator, 'share')
})

describe('ShareButtons', () => {
  it('links to every network with the page URL', () => {
    render(<ShareButtons path='/projects/musivo' title='Musivo' />)
    for (const label of ['WhatsApp', 'Facebook', 'X', 'Telegram', 'Pinterest', 'LinkedIn']) {
      const link = screen.getByRole('link', { name: `Share on ${label}` })
      expect(link.getAttribute('href')).toContain(
        encodeURIComponent('https://jgb.solutions/projects/musivo')
      )
      expect(link.getAttribute('target')).toBe('_blank')
    }
    expect(screen.getByRole('link', { name: 'Share on Email' }).getAttribute('href')).toStartWith(
      'mailto:'
    )
    expect(screen.getByRole('button', { name: 'Copy link' })).toBeInTheDocument()
  })

  it("shows the phone's share sheet only where the browser has one", async () => {
    const share = mock(() => Promise.resolve())
    Object.defineProperty(navigator, 'share', { value: share, configurable: true })
    render(<ShareButtons path='/products' title='Products' />)
    const button = await screen.findByRole('button', { name: 'Share' })
    fireEvent.click(button)
    await waitFor(() =>
      expect(share).toHaveBeenCalledWith({
        title: 'Products',
        url: 'https://jgb.solutions/products',
      })
    )
  })

  it('has no share sheet button without the API', () => {
    Reflect.deleteProperty(navigator, 'share')
    render(<ShareButtons path='/products' title='Products' />)
    expect(screen.queryByRole('button', { name: 'Share' })).toBeNull()
  })
})
