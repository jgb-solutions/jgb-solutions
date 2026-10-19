import { Link } from '@tanstack/react-router'
import type { allProjects } from 'content-collections'
import { cn } from '@/lib/utils'

/** Only what a card shows, so lists don't ship whole write-ups to the browser. */
export type ProjectCardData = Pick<
  (typeof allProjects)[number],
  'slug' | 'title' | 'category' | 'year' | 'image'
>

interface ProjectCardProps {
  project: ProjectCardData
  /** Tag the card as one of our own products instead of client work. */
  isProduct?: boolean
  className?: string
}

export function ProjectCard({ project, isProduct = false, className }: ProjectCardProps) {
  return (
    <Link
      to='/projects/$slug'
      params={{ slug: project.slug }}
      className={cn('group flex flex-col gap-4', className)}
    >
      <div className='relative aspect-[4/3] overflow-hidden border border-ink/10 bg-mist'>
        <img
          src={project.image || '/placeholder.svg'}
          alt={`${project.title} screenshot`}
          loading='lazy'
          className='h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105'
        />
        {isProduct && (
          <span className='absolute left-3 top-3 bg-brand px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-ink'>
            Our product
          </span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <h3 className='font-display text-2xl font-bold group-hover:text-brand-strong'>
          {project.title}
        </h3>
        <p className='font-mono text-xs uppercase tracking-[0.15em] text-muted-ink'>
          {[project.category, project.year].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  )
}
