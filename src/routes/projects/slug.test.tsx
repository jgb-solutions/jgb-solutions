import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Route } from './$slug'

// Mock Data
const mockProject = {
  slug: 'test-project',
  title: 'Test Project',
  category: 'Web',
  description: 'Desc',
  services: ['React', 'Node'],
  gallery: ['img1.png', 'img2.png'],
  mdx: 'MDX Content',
}

// Mock Router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    createFileRoute: () => (config: any) => ({
      ...config,
      component: config.component,
      useLoaderData: () => ({ project: mockProject }),
    }),
    Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  }
})

// Mock Components
vi.mock('@/components/navbar', () => ({ default: () => <div>Navbar</div> }))
vi.mock('@/components/footer', () => ({ default: () => <div>Footer</div> }))
// Fix: Mock named export MdxRenderer
vi.mock('@/components/mdx-provider', () => ({
  MdxRenderer: () => <div data-testid='mdx-content'>MDX Rendered</div>,
}))

describe('Project Detail Route', () => {
  it('renders project details', () => {
    const ProjectPage = Route.component as React.ComponentType
    render(<ProjectPage />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Web')).toBeInTheDocument()
    expect(screen.getByText('Desc')).toBeInTheDocument()

    // Check services
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node')).toBeInTheDocument()

    // Check MDX content
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
  })
})
