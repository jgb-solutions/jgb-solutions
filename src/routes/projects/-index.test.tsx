import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import type { allProjects } from 'content-collections'
import { renderWithRouter } from '@/test/router-utils'

// Mock content-collections to populate the real loader
vi.mock('content-collections', () => ({
  allProjects: [
    { slug: 'p1', title: 'Project 1', category: 'Cat 1', order: 1 },
    { slug: 'p2', title: 'Project 2', category: 'Cat 2', order: 2 },
  ],
  allPosts: [],
}))

// Mock Components
vi.mock('@/components/navbar', () => ({ default: () => <div>Navbar</div> }))
vi.mock('@/components/footer', () => ({ default: () => <div>Footer</div> }))
vi.mock('@/components/project-card', () => ({
  ProjectCard: ({ project }: { project: (typeof allProjects)[number] }) => (
    <div data-testid='project-card'>{project.title}</div>
  ),
}))

describe('Projects Index Route', () => {
  it('renders list of projects', async () => {
    renderWithRouter({ initialEntries: ['/projects'] })

    expect(await screen.findByText('All Projects')).toBeInTheDocument()

    // Should render 2 project cards
    const cards = screen.getAllByTestId('project-card')
    expect(cards).toHaveLength(2)
    expect(cards[0]).toHaveTextContent('Project 1')
    expect(cards[1]).toHaveTextContent('Project 2')
  })
})
