import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/router-utils'

// Mock components to keep the test focused and fast
vi.mock('@/components/navbar', () => ({ default: () => <div data-testid='navbar'>Navbar</div> }))
vi.mock('@/components/hero', () => ({ default: () => <div data-testid='hero'>Hero</div> }))
vi.mock('@/components/marquee-bar', () => ({
  default: () => <div data-testid='marquee'>Marquee</div>,
}))
vi.mock('@/components/featured-projects', () => ({
  default: () => <div data-testid='featured-projects'>FeaturedProjects</div>,
}))
vi.mock('@/components/about', () => ({ default: () => <div data-testid='about'>About</div> }))
vi.mock('@/components/services', () => ({
  default: () => <div data-testid='services'>Services</div>,
}))
vi.mock('@/components/recent-posts', () => ({
  default: () => <div data-testid='recent-posts'>RecentPosts</div>,
}))
vi.mock('@/components/contact', () => ({ default: () => <div data-testid='contact'>Contact</div> }))
vi.mock('@/components/footer', () => ({ default: () => <div data-testid='footer'>Footer</div> }))

describe('Home Route', () => {
  it('renders all sections', async () => {
    renderWithRouter({ initialEntries: ['/'] })

    // Wait for the router to render the route
    // Using findBy because router rendering might be async
    expect(await screen.findByTestId('navbar')).toBeInTheDocument()
    expect(await screen.findByTestId('hero')).toBeInTheDocument()
    expect(await screen.findByTestId('marquee')).toBeInTheDocument()
    expect(await screen.findByTestId('featured-projects')).toBeInTheDocument()
    expect(await screen.findByTestId('about')).toBeInTheDocument()
    expect(await screen.findByTestId('services')).toBeInTheDocument()
    expect(await screen.findByTestId('recent-posts')).toBeInTheDocument()
    expect(await screen.findByTestId('contact')).toBeInTheDocument()
    expect(await screen.findByTestId('footer')).toBeInTheDocument()
  })
})
