import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Route } from './index'

// Mock Data
const mockProjects = [
  { slug: 'p1', title: 'Project 1', category: 'Cat 1' },
  { slug: 'p2', title: 'Project 2', category: 'Cat 2' },
]

// Mock Router
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    createFileRoute: () => (config: any) => ({
      ...config,
      component: config.component,
      useLoaderData: () => ({ projects: mockProjects }),
    }),
    Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  }
})

// Mock Components
vi.mock('@/components/navbar', () => ({ default: () => <div>Navbar</div> }))
vi.mock('@/components/footer', () => ({ default: () => <div>Footer</div> }))
vi.mock('@/components/project-card', () => ({
  ProjectCard: ({ project }: any) => <div data-testid='project-card'>{project.title}</div>,
}))

describe('Projects Index Route', () => {
  it('renders list of projects', () => {
    const ProjectsPage = Route.component as React.ComponentType
    render(<ProjectsPage />)

    expect(screen.getByText('All Projects')).toBeInTheDocument()

    // Should render 2 project cards
    const cards = screen.getAllByTestId('project-card')
    expect(cards).toHaveLength(2)
    expect(cards[0]).toHaveTextContent('Project 1')
    expect(cards[1]).toHaveTextContent('Project 2')
  })
})
