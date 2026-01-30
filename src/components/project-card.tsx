import { Link } from '@tanstack/react-router'
import type { allProjects } from 'content-collections'

type Project = (typeof allProjects)[number]

interface ProjectCardProps {
  project: Project
  variant?: 'featured' | 'grid'
  className?: string
}

export function ProjectCard({ project, variant = 'grid', className = '' }: ProjectCardProps) {
  const isFeatured = variant === 'featured'

  return (
    <Link
      to='/projects/$slug'
      params={{ slug: project.slug }}
      className={`group block ${className}`}
    >
      <div className={`relative overflow-hidden rounded-2xl ${isFeatured ? '' : 'aspect-[4/3]'}`}>
        <img
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          width={isFeatured ? 800 : undefined}
          height={isFeatured ? 600 : undefined}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isFeatured ? '' : 'h-full absolute inset-0'}`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 bg-black/70 rounded-b-2xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${isFeatured ? 'p-8' : 'p-6'}`}
        >
          <h3 className={`text-white mb-2 ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
            {project.title}
          </h3>
          <p className={`text-white/90 mb-1 ${isFeatured ? 'text-base' : 'text-sm'}`}>
            {project.category}
          </p>
          {project.summary && (
            <p className={`text-white/70 ${isFeatured ? 'text-sm' : 'text-xs'}`}>
              {project.summary}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
