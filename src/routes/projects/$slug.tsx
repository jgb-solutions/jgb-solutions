import { Link, createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { MdxRenderer } from '@/components/mdx-provider'
import { Container, SectionLabel, buttonStyles } from '@/components/site/section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { PRODUCT_SLUGS, productKind } from '@/lib/products'
import { publishedProjects } from '@/lib/projects'
import { clientProjectJsonLd, createPageSEO, productJsonLd } from '@/lib/seo'

const getProject = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(({ data: slug }) => {
    const ordered = [...publishedProjects].sort((a, b) => a.order - b.order)
    const index = ordered.findIndex(p => p.slug === slug)
    if (index === -1) throw notFound()
    const next = ordered[(index + 1) % ordered.length]
    return {
      project: ordered[index],
      isProduct: PRODUCT_SLUGS.includes(slug),
      next:
        next.slug === slug
          ? null
          : { slug: next.slug, title: next.title, category: next.category, image: next.image },
    }
  })

/** Projects that were renamed: their old slug moves to the new page for good. */
const RENAMED: Record<string, string> = { mp3pam: 'musivo', allflix: 'cinetta' }

export const Route = createFileRoute('/projects/$slug')({
  beforeLoad: ({ params }) => {
    const slug = RENAMED[params.slug]
    if (slug) throw redirect({ to: '/projects/$slug', params: { slug }, statusCode: 301 })
  },
  loader: ({ params }) => getProject({ data: params.slug }),
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { project } = loaderData
    const kind = productKind(project.slug)
    return createPageSEO({
      title: `${project.title} - Work | JGB Solutions`,
      description: project.description,
      image: project.image,
      type: 'article',
      path: `/projects/${project.slug}`,
      breadcrumbs: [
        { name: 'Work', path: '/projects' },
        { name: project.title, path: `/projects/${project.slug}` },
      ],
      jsonLd: [kind ? productJsonLd(project, kind) : clientProjectJsonLd(project)],
    })
  },
  component: ProjectDetailPage,
})

const proseClasses =
  'prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-3xl prose-p:text-muted-ink prose-li:text-muted-ink prose-strong:text-ink prose-a:text-brand-strong prose-img:border prose-img:border-ink/10'

function ProjectDetailPage() {
  const { project, isProduct, next } = Route.useLoaderData()
  const label = isProduct ? `Our product · ${project.category}` : project.category

  const details = [
    { term: isProduct ? 'Made by' : 'Client', value: project.client },
    { term: 'Year', value: project.year },
  ].filter((detail): detail is { term: string; value: string } => Boolean(detail.value))

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main id='main' className='flex-1'>
        <section className='bg-ink py-16 text-paper md:py-20'>
          <Container className='flex flex-col items-start gap-6'>
            <Link
              to='/projects'
              className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-paper hover:text-brand'
            >
              <ArrowLeft className='h-3.5 w-3.5' aria-hidden /> All work
            </Link>
            <SectionLabel className='text-brand opacity-100'>{label}</SectionLabel>
            <h1 className='max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl'>
              {project.title}
            </h1>
            <p className='max-w-2xl text-lg leading-relaxed text-muted-paper md:text-xl'>
              {project.description}
            </p>
            {project.url && (
              <a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className={buttonStyles('brand')}
              >
                Visit the site <ArrowUpRight className='h-4 w-4' aria-hidden />
              </a>
            )}
          </Container>
        </section>

        <Container className='-mt-px pt-12 md:pt-16'>
          <div className='aspect-[16/10] overflow-hidden border border-ink/10 bg-mist'>
            <img
              src={project.image || '/placeholder.svg'}
              alt={`${project.title} home page`}
              className='h-full w-full object-cover object-top'
            />
          </div>
        </Container>

        <Container className='grid grid-cols-1 gap-12 py-12 md:py-16 lg:grid-cols-[1fr_18rem] lg:gap-16'>
          <article className={proseClasses}>
            <MdxRenderer code={project.mdx} />
          </article>

          <aside className='flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start'>
            {details.length > 0 && (
              <dl className='flex flex-col gap-5 border-t-4 border-brand pt-6'>
                {details.map(detail => (
                  <div key={detail.term} className='flex flex-col gap-1'>
                    <dt className='font-mono text-xs uppercase tracking-[0.2em] text-muted-ink'>
                      {detail.term}
                    </dt>
                    <dd className='font-display text-lg font-semibold'>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {project.services && project.services.length > 0 && (
              <div className='flex flex-col gap-3'>
                <p className='font-mono text-xs uppercase tracking-[0.2em] text-muted-ink'>
                  Services and tools
                </p>
                <ul className='flex flex-wrap gap-2'>
                  {project.services.map(service => (
                    <li key={service} className='border border-ink/15 px-2.5 py-1 text-sm'>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className='flex flex-col gap-3 bg-mist p-6'>
              <p className='font-display text-lg font-bold'>Want something like this?</p>
              <a href='#contact' className={buttonStyles('ink', 'self-start')}>
                Start a project
              </a>
            </div>
          </aside>
        </Container>

        {project.gallery && project.gallery.length > 0 && (
          <section className='bg-mist py-16 md:py-20'>
            <Container className='flex flex-col gap-8'>
              <h2 className='font-display text-3xl font-extrabold tracking-tight'>Screenshots</h2>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {project.gallery.map((image, i) => (
                  <div key={image} className='overflow-hidden border border-ink/10 bg-paper'>
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${i + 1}`}
                      loading='lazy'
                      className='h-auto w-full'
                    />
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {next && (
          <Link
            to='/projects/$slug'
            params={{ slug: next.slug }}
            className='group block border-t border-ink/10 bg-paper'
            aria-label={`Next project: ${next.title}`}
          >
            <Container className='flex items-center justify-between gap-6 py-12'>
              <div className='flex flex-col gap-2'>
                <span className='font-mono text-xs uppercase tracking-[0.2em] text-brand-strong'>
                  Next project
                </span>
                <span className='font-display text-3xl font-extrabold tracking-tight group-hover:text-brand-strong md:text-5xl'>
                  {next.title}
                </span>
              </div>
              <ArrowRight
                className='h-8 w-8 shrink-0 transition-transform group-hover:translate-x-2'
                aria-hidden
              />
            </Container>
          </Link>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
