import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Route } from './index'

// Mock components
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

// Mock TanStack Router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    // Fix: createFileRoute returns a function that takes the component config
    createFileRoute: () => (config: any) => ({
      ...config,
      component: config.component,
    }),
    ClientOnly: ({ children, fallback }: any) => <>{children || fallback}</>,
  }
})

describe('Home Route', () => {
  it('renders all sections', () => {
    // Get the component from the route definition
    const HomeComponent = Route.component as React.ComponentType

    render(<HomeComponent />)

    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('marquee')).toBeInTheDocument()
    expect(screen.getByTestId('featured-projects')).toBeInTheDocument()
    expect(screen.getByTestId('about')).toBeInTheDocument()
    expect(screen.getByTestId('services')).toBeInTheDocument()
    expect(screen.getByTestId('recent-posts')).toBeInTheDocument()
    expect(screen.getByTestId('contact')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})
