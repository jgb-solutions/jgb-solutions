import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectCard } from './project-card'
import type { allProjects } from 'content-collections'

// Mock the Link component from TanStack Router
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

// Mock Project Data
const mockProject: (typeof allProjects)[number] = {
  title: 'Test Project',
  category: 'Web Development',
  description: 'Test Description',
  image: '/test.png',
  slug: 'test-project',
  order: 10,
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
  it('renders project details correctly', () => {
    render(<ProjectCard project={mockProject} />)

    // Check title
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    // Check category
    expect(screen.getByText('Web Development')).toBeInTheDocument()
    // Check summary
    expect(screen.getByText('This is a test summary')).toBeInTheDocument()
  })

  it('renders featured variant with correct styling classes', () => {
    render(<ProjectCard project={mockProject} variant='featured' />)

    const title = screen.getByText('Test Project')
    // Featured variant uses text-2xl
    expect(title).toHaveClass('text-2xl')
  })

  it('renders grid variant with correct styling classes', () => {
    render(<ProjectCard project={mockProject} variant='grid' />)

    const title = screen.getByText('Test Project')
    // Grid variant uses text-xl
    expect(title).toHaveClass('text-xl')
  })
})
