import { Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/project-card'

const featuredProjects = allProjects.sort((a, b) => a.order - b.order).slice(0, 4)

export default function FeaturedProjects() {
  return (
    <section id='projects' className='py-20 px-6 md:px-20'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-end mb-12'>
          <h2 className='text-3xl md:text-4xl font-light'>Featured Projects</h2>
          <Link to='/projects'>
            <Button variant='outline' className='rounded-xl bg-transparent'>
              View All Projects
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {featuredProjects.map(project => (
            <ProjectCard key={project.slug} project={project} variant='featured' />
          ))}
        </div>
      </div>
    </section>
  )
}
