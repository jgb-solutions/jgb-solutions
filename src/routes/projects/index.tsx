import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { publishedProjects } from '@/lib/projects'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { ProjectCard } from '@/components/project-card'
import { createPageSEO } from '@/lib/seo'

const getProjects = createServerFn({ method: 'GET' }).handler(() => {
  const sortedProjects = [...publishedProjects].sort((a, b) => a.order - b.order)
  return { projects: sortedProjects }
})

export const Route = createFileRoute('/projects/')({
  loader: () => getProjects(),
  head: () =>
    createPageSEO({
      title: 'Projects - JGB Solutions',
      description:
        'Browse my portfolio of 20+ successful projects including e-commerce platforms, mobile apps, content management systems, and custom web applications.',
      path: '/projects',
    }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const { projects } = Route.useLoaderData()

  return (
    <main className='min-h-screen bg-background'>
      <SiteHeader />

      <section className='py-12 sm:py-16 md:py-20 px-6 md:px-20'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-8 md:mb-12'>
            <Link
              to='/'
              className='text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block'
            >
              ← Back to Home
            </Link>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4'>
              All Projects
            </h1>
            <p className='text-base md:text-lg text-muted-foreground max-w-2xl'>
              A comprehensive portfolio showcasing expertise in full-stack development, AI
              integration, system architecture, and performance optimization.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {projects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
