import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectCard } from './project-card'
import type { allProjects } from 'content-collections'

// Mock the Link component from TanStack Router
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => (
    <a {...props}>{children}</a>
  ),
}))

// Mock Project Data
const mockProject: (typeof allProjects)[number] = {
  title: 'Test Project',
  category: 'Web Development',
  description: 'Test Description',
  image: '/test.png',
  slug: 'test-project',
  order: 10,
  updated: '2026-10-19',
  summary: 'This is a test summary',
  content: 'Test content',
  _meta: {
    filePath: 'test.mdx',
    fileName: 'test.mdx',
    directory: 'projects',
    path: 'projects/test',
    extension: 'mdx',
  },
  mdx: 'compiled-mdx-code',
}

describe('ProjectCard', () => {
  it('shows the title, category and year', () => {
    render(<ProjectCard project={{ ...mockProject, year: '2024' }} />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Web Development · 2024')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Test Project screenshot' })).toHaveAttribute(
      'src',
      '/test.png'
    )
    expect(screen.queryByText('Our product')).not.toBeInTheDocument()
  })

  it('tags our own products', () => {
    render(<ProjectCard project={mockProject} isProduct />)

    expect(screen.getByText('Our product')).toBeInTheDocument()
  })
})
