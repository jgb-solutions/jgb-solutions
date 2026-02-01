import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ArrowLeft, Calendar, ExternalLink, Layers, User } from 'lucide-react'
import { createServerFn } from '@tanstack/react-start'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MdxRenderer } from '@/components/mdx-provider'
import { createPageSEO } from '@/lib/seo'
import { Button } from '@/components/ui/button'

const getProject = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(({ data: slug }) => {
    const project = allProjects.find(p => p.slug === slug)
    if (!project) throw notFound()
    return { project }
  })

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => getProject({ data: params.slug }),
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { project } = loaderData
    return createPageSEO({
      title: `${project.title} - Project | JGB Solutions`,
      description: project.description,
      image: project.image,
      type: 'article',
      path: `/projects/${project.slug}`,
    })
  },
  notFoundComponent: () => {
    return (
      <main className='min-h-screen bg-background'>
        <Navbar />
        <section className='py-20 px-6 md:px-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl font-light mb-4'>Project Not Found</h1>
            <Link to='/projects' className='text-primary hover:underline'>
              ← Back to Projects
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  },
  component: ProjectDetailPage,
})

function ProjectDetailPage() {
  const { project } = Route.useLoaderData()

  return (
    <main className='min-h-screen bg-background'>
      <Navbar />

      <section className='pt-24 pb-12 md:pt-32 md:pb-20 px-4 md:px-6 lg:px-20'>
        <div className='max-w-7xl mx-auto'>
          {/* Header Card */}
          <div className='bg-card border border-border rounded-3xl p-6 md:p-12 mb-8 md:mb-12 shadow-sm'>
            <Link
              to='/projects'
              className='inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6'
            >
              <ArrowLeft className='w-4 h-4 mr-2' /> Back to Projects
            </Link>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
              <div className='order-2 lg:order-1'>
                <span className='inline-block px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm font-medium mb-4'>
                  {project.category}
                </span>
                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 text-foreground'>
                  {project.title}
                </h1>
                <p className='text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8'>
                  {project.description}
                </p>
                {project.url && (
                  <a href={project.url} target='_blank' rel='noopener noreferrer'>
                    <Button size='lg' className='rounded-xl text-base w-full sm:w-auto'>
                      Visit Project <ExternalLink className='ml-2 w-4 h-4' />
                    </Button>
                  </a>
                )}
              </div>
              <div className='order-1 lg:order-2 relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]'>
                <img
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12'>
            {/* Sidebar / Details Section */}
            <div className='lg:col-span-4 order-1 lg:order-1'>
              <div className='lg:sticky lg:top-32 p-6 md:p-8 bg-secondary/30 rounded-2xl border border-border/50 backdrop-blur-sm'>
                <h3 className='text-xl font-semibold mb-6'>Project Details</h3>

                <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6'>
                  {project.client && (
                    <div className='flex items-start gap-4'>
                      <div className='bg-background p-2 rounded-lg border border-border shrink-0'>
                        <User className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1'>
                          Client
                        </p>
                        <p className='font-medium'>{project.client}</p>
                      </div>
                    </div>
                  )}

                  {project.year && (
                    <div className='flex items-start gap-4'>
                      <div className='bg-background p-2 rounded-lg border border-border shrink-0'>
                        <Calendar className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1'>
                          Year
                        </p>
                        <p className='font-medium'>{project.year}</p>
                      </div>
                    </div>
                  )}

                  {project.services && project.services.length > 0 && (
                    <div className='flex items-start gap-4'>
                      <div className='bg-background p-2 rounded-lg border border-border shrink-0'>
                        <Layers className='w-5 h-5 text-primary' />
                      </div>
                      <div>
                        <p className='text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1'>
                          Services
                        </p>
                        <ul className='space-y-1'>
                          {project.services.map((service, i) => (
                            <li key={i} className='font-medium'>
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className='pt-6 border-t border-border mt-6'>
                  <p className='text-sm text-muted-foreground italic'>
                    Interested in a similar project? <br />
                    <Link
                      to='/'
                      hash='contact'
                      className='text-primary hover:underline not-italic font-medium'
                    >
                      Get in touch →
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className='lg:col-span-8 order-2 lg:order-2'>
              <div className='prose prose-lg dark:prose-invert max-w-none mb-12 md:mb-16 prose-headings:font-bold prose-headings:tracking-tight prose-headings:mb-2 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-img:rounded-2xl prose-img:shadow-lg'>
                <MdxRenderer code={project.mdx} />
              </div>

              {project.gallery && project.gallery.length > 0 && (
                <div className='space-y-6 md:space-y-8'>
                  <h3 className='text-2xl font-semibold'>Gallery</h3>
                  <div className='grid grid-cols-1 gap-6'>
                    {project.gallery.map((img, i) => (
                      <div
                        key={i}
                        className='rounded-xl overflow-hidden border border-border shadow-md'
                      >
                        <img
                          src={img}
                          alt={`${project.title} gallery ${i + 1}`}
                          className='w-full h-auto'
                          loading='lazy'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
