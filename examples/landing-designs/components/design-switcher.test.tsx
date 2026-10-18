import { describe, expect, it, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DESIGNS } from '@/components/design-switcher'
import { renderWithRouter } from '@/test/router-utils'

// Keep the pages light; only the switcher is under test
vi.mock('@/components/navbar', () => ({ default: () => <div>Navbar</div> }))
vi.mock('@/components/hero', () => ({ default: () => <div>Hero</div> }))
vi.mock('@/components/marquee-bar', () => ({ default: () => <div>Marquee</div> }))
vi.mock('@/components/featured-projects', () => ({ default: () => <div>FeaturedProjects</div> }))
vi.mock('@/components/about', () => ({ default: () => <div>About</div> }))
vi.mock('@/components/services', () => ({ default: () => <div>Services</div> }))
vi.mock('@/components/recent-posts', () => ({ default: () => <div>RecentPosts</div> }))
vi.mock('@/components/contact', () => ({ default: () => <div>Contact</div> }))
vi.mock('@/components/footer', () => ({ default: () => <div>Footer</div> }))

describe('DesignSwitcher', () => {
  it('shows the current design with links to its neighbours', async () => {
    renderWithRouter({ initialEntries: ['/'] })

    const toggle = await screen.findByRole('button', { name: /current homepage/i })
    expect(toggle).toHaveTextContent(`1/${DESIGNS.length}`)
    expect(screen.getByRole('link', { name: /next design: services overview/i })).toHaveAttribute(
      'href',
      '/landing/services'
    )
    expect(screen.getByRole('link', { name: /previous design: theme stacked/i })).toHaveAttribute(
      'href',
      '/landing/business-theme-stacked'
    )
  })

  it('lists every design and marks the current one', async () => {
    const user = userEvent.setup()
    renderWithRouter({ initialEntries: ['/'] })

    await user.click(await screen.findByRole('button', { name: /current homepage/i }))

    const list = document.getElementById('design-switcher-list')
    expect(list).not.toBeNull()
    const links = within(list as HTMLElement).getAllByRole('link')
    expect(links).toHaveLength(DESIGNS.length)
    expect(links[0]).toHaveAttribute('aria-current', 'page')
  })

  it('moves to the next design', async () => {
    const user = userEvent.setup()
    const { router } = renderWithRouter({ initialEntries: ['/'] })

    await user.click(await screen.findByRole('link', { name: /next design/i }))

    expect(router.state.location.pathname).toBe('/landing/services')
    expect(await screen.findByRole('button', { name: /services overview/i })).toHaveTextContent(
      `2/${DESIGNS.length}`
    )
  })
})
