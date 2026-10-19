import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { ProjectCard } from '@/components/project-card'
import { Container, SectionLabel } from '@/components/site/section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { PRODUCT_SLUGS, SITE_SLUG } from '@/lib/products'
import { publishedProjects } from '@/lib/projects'
import { createPageSEO } from '@/lib/seo'
import { cn } from '@/lib/utils'

const FILTERS = [
  { value: 'all', label: 'All work' },
  { value: 'clients', label: 'Client work' },
  { value: 'products', label: 'Our products' },
] as const

const projectsSearchSchema = z.object({
  show: z.enum(['all', 'clients', 'products']).optional(),
})

const getProjects = createServerFn({ method: 'GET' }).handler(() => {
  const projects = [...publishedProjects]
    .sort((a, b) => a.order - b.order)
    .map(project => ({
      slug: project.slug,
      title: project.title,
      category: project.category,
      year: project.year,
      image: project.image,
      isProduct: PRODUCT_SLUGS.includes(project.slug),
      // This site's own write-up is neither client work nor a product: "All work" only
      isClientWork: !PRODUCT_SLUGS.includes(project.slug) && project.slug !== SITE_SLUG,
    }))
  return { projects }
})

export const Route = createFileRoute('/projects/')({
  validateSearch: projectsSearchSchema,
  loader: () => getProjects(),
  head: () =>
    createPageSEO({
      title: 'Work - Websites, Apps and Products | JGB Solutions',
      description:
        'Websites and apps JGB Solutions has built for clients, and the products we build and run ourselves.',
      path: '/projects',
    }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const { projects } = Route.useLoaderData()
  const { show = 'all' } = Route.useSearch()

  const visible = projects.filter(project =>
    show === 'all' ? true : show === 'products' ? project.isProduct : project.isClientWork
  )

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main className='flex-1'>
        <section className='bg-ink py-16 text-paper md:py-24'>
          <Container className='flex flex-col gap-6'>
            <SectionLabel className='text-brand opacity-100'>Work</SectionLabel>
            <h1 className='max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl'>
              Websites and apps we've <span className='text-brand'>built</span>.
            </h1>
            <p className='max-w-2xl text-lg leading-relaxed text-muted-paper md:text-xl'>
              Sites for businesses, organizations and creators, and the products we build and run
              ourselves.
            </p>
          </Container>
        </section>

        <Container className='flex flex-col gap-10 py-14 md:py-20'>
          <nav aria-label='Filter work' className='flex flex-wrap gap-2'>
            {FILTERS.map(filter => (
              <Link
                key={filter.value}
                to='/projects'
                search={filter.value === 'all' ? {} : { show: filter.value }}
                aria-current={filter.value === show ? 'page' : undefined}
                className={cn(
                  'border-2 px-4 py-2 font-display text-sm font-bold uppercase tracking-wider transition-colors',
                  filter.value === show
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/15 hover:border-ink'
                )}
              >
                {filter.label}
              </Link>
            ))}
          </nav>

          <div className='grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
            {visible.map(project => (
              <ProjectCard key={project.slug} project={project} isProduct={project.isProduct} />
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  )
}
