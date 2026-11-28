import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Plus } from 'lucide-react'
import { ProcessSection } from '@/components/site/process-section'
import {
  Container,
  Section,
  SectionHeading,
  SectionLabel,
  buttonStyles,
  mutedText,
} from '@/components/site/section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { PRODUCT_SLUGS } from '@/lib/products'
import { publishedProjects } from '@/lib/projects'
import { createPageSEO, faqJsonLd, serviceJsonLd } from '@/lib/seo'
import { OFFERED_SERVICES, getServiceBySlug } from '@/lib/services'
import { ResponsiveImage } from '@/components/responsive-image'

// Services are plain data in src/lib/services.ts (their icons are components), so the loader
// only checks the slug; the component looks the service up.
export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => {
    if (!getServiceBySlug(params.slug)) throw notFound()
    return { slug: params.slug }
  },
  head: ({ params }) => {
    const service = getServiceBySlug(params.slug)
    if (!service) return {}
    return createPageSEO({
      title: `${service.title} | JGB Solutions`,
      description: `${service.description} Contact us for a quote.`,
      path: `/services/${service.slug}`,
      breadcrumbs: [
        { name: 'Services', path: '/services' },
        { name: service.title, path: `/services/${service.slug}` },
      ],
      jsonLd: [serviceJsonLd(service), ...(service.faq ? [faqJsonLd(service.faq)] : [])],
    })
  },
  component: ServicePage,
})

function ServicePage() {
  const { slug } = Route.useLoaderData()
  const service = getServiceBySlug(slug)
  if (!service) return null

  const Icon = service.icon
  const caseStudy = service.caseStudy
    ? publishedProjects.find(p => p.slug === service.caseStudy?.slug)
    : undefined
  // The case study is shown on its own, so it isn't repeated in the examples grid
  const related = (service.relatedProjects ?? []).flatMap(projectSlug => {
    const project = publishedProjects.find(p => p.slug === projectSlug)
    return project && project.slug !== caseStudy?.slug ? [project] : []
  })
  const otherServices = OFFERED_SERVICES.filter(s => s.slug !== service.slug)

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main id='main' className='flex-1'>
        <section className='bg-ink py-16 text-paper md:py-24'>
          <Container className='flex flex-col items-start gap-7'>
            <Link
              to='/services'
              className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-paper hover:text-brand'
            >
              <ArrowLeft className='h-3.5 w-3.5' aria-hidden /> All services
            </Link>
            <span className='flex h-16 w-16 items-center justify-center bg-brand text-ink'>
              <Icon className='h-8 w-8' aria-hidden />
            </span>
            <h1 className='font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl'>
              {/* Each word stays whole, so "E-commerce" doesn't break at its hyphen on phones */}
              {service.title.split(' ').map((word, index) => (
                <span key={word}>
                  {index > 0 && ' '}
                  <span className='whitespace-nowrap'>{word}</span>
                </span>
              ))}
            </h1>
            <p className='max-w-2xl text-lg leading-relaxed text-muted-paper md:text-xl'>
              {service.description}
            </p>
            <div className='flex flex-wrap gap-3'>
              <a href='#contact' className={buttonStyles('brand')}>
                Get a quote <ArrowRight className='h-4 w-4' />
              </a>
              {caseStudy && (
                <a href='#case-study' className={buttonStyles('outline')}>
                  See a store we built
                </a>
              )}
            </div>
            {service.badge && (
              <p className='flex items-center gap-2 text-sm font-semibold text-paper'>
                <Check className='h-4 w-4 text-brand' aria-hidden />
                {service.badge}
              </p>
            )}
          </Container>
        </section>

        {service.audience && (
          <Section tone='mist' className='py-14 md:py-16' containerClassName='flex flex-col gap-8'>
            <h2 className='font-display text-3xl font-bold md:text-4xl'>Who it's for</h2>
            <ul className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {service.audience.map(item => (
                <li key={item.title} className='flex flex-col gap-2 bg-paper p-7'>
                  <h3 className='font-display text-xl font-bold'>{item.title}</h3>
                  <p className={`leading-relaxed ${mutedText.paper}`}>{item.text}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section tone='paper'>
          <div className='grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16'>
            <SectionHeading
              tone='paper'
              label="What's included"
              title='Everything handled for you'
              intro='Pick what you need. Every project starts with a call and a clear quote.'
            />
            <ul className='flex flex-col border-t border-ink/10'>
              {service.offerings.map(offering => (
                <li
                  key={offering}
                  className='flex items-center gap-4 border-b border-ink/10 py-5 text-lg font-medium'
                >
                  <Check className='h-5 w-5 shrink-0 text-brand-strong' aria-hidden />
                  {offering}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {service.highlights && (
          <Section tone='mist'>
            <ul className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {service.highlights.map(highlight => (
                <li
                  key={highlight.title}
                  className='flex flex-col gap-3 border-t-4 border-brand bg-paper p-8'
                >
                  <h2 className='font-display text-2xl font-bold'>{highlight.title}</h2>
                  <p className={`leading-relaxed ${mutedText.paper}`}>{highlight.text}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {caseStudy && service.caseStudy && (
          <Section tone='ink' id='case-study'>
            <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14'>
              <Link
                to='/projects/$slug'
                params={{ slug: caseStudy.slug }}
                className='group block aspect-[4/3] overflow-hidden border border-ink-line'
              >
                <ResponsiveImage
                  src={caseStudy.image}
                  sizes='(min-width: 1024px) 55vw, 100vw'
                  alt={`${caseStudy.title} online store`}
                  loading='lazy'
                  className='h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105'
                />
              </Link>
              <div className='flex flex-col gap-6'>
                <SectionHeading
                  tone='ink'
                  label='Case study'
                  title={caseStudy.title}
                  intro={caseStudy.summary}
                />
                <ul className='flex flex-col gap-3'>
                  {service.caseStudy.points.map(point => (
                    <li key={point} className='flex items-start gap-3'>
                      <Check className='mt-1 h-4 w-4 shrink-0 text-brand' aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className='flex flex-wrap gap-3'>
                  <Link
                    to='/projects/$slug'
                    params={{ slug: caseStudy.slug }}
                    className={buttonStyles('brand')}
                  >
                    Read the case study <ArrowRight className='h-4 w-4' />
                  </Link>
                  {caseStudy.url && (
                    <a
                      href={caseStudy.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={buttonStyles('outline')}
                    >
                      Visit the store <ArrowUpRight className='h-4 w-4' />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Section>
        )}

        {related.length > 0 && (
          <Section tone='paper' containerClassName='flex flex-col gap-12'>
            <SectionHeading tone='paper' label='Examples' title='Work we have done' />
            <div className='grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2'>
              {related.map(project => (
                <Link
                  key={project.slug}
                  to='/projects/$slug'
                  params={{ slug: project.slug }}
                  className='group flex flex-col gap-4'
                >
                  <div className='aspect-[4/3] overflow-hidden border border-ink/10'>
                    <ResponsiveImage
                      src={project.image}
                      sizes='(min-width: 768px) 50vw, 100vw'
                      alt={`${project.title} screenshot`}
                      loading='lazy'
                      className='h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105'
                    />
                  </div>
                  <div className='flex items-baseline justify-between gap-4'>
                    <h3 className='font-display text-2xl font-bold group-hover:text-brand-strong'>
                      {project.title}
                    </h3>
                    <p className={`shrink-0 font-mono text-xs ${mutedText.paper}`}>
                      {PRODUCT_SLUGS.includes(project.slug) ? 'Our product' : project.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        )}

        <ProcessSection tone={caseStudy ? 'mist' : 'ink'} />

        {service.faq && (
          <Section tone='paper'>
            <div className='grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16'>
              <SectionHeading
                tone='paper'
                label='FAQ'
                title='Questions we often get'
                intro='Anything else? Ask us when you request your quote.'
              />
              <div className='flex flex-col border-t border-ink/10'>
                {service.faq.map(item => (
                  <details key={item.question} className='group border-b border-ink/10'>
                    <summary className='flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden'>
                      {item.question}
                      <Plus
                        className='h-5 w-5 shrink-0 text-brand-strong transition-transform group-open:rotate-45'
                        aria-hidden
                      />
                    </summary>
                    <p className={`pb-6 leading-relaxed ${mutedText.paper}`}>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </Section>
        )}

        <Section tone='paper' className='py-14 md:py-16' containerClassName='flex flex-col gap-6'>
          <SectionLabel className='text-brand-strong opacity-100'>Other services</SectionLabel>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {otherServices.map(other => {
              const OtherIcon = other.icon
              return (
                <Link
                  key={other.slug}
                  to='/services/$slug'
                  params={{ slug: other.slug }}
                  className='group flex items-center gap-5 border border-ink/10 p-6 transition-colors hover:border-ink'
                >
                  <span className='flex h-12 w-12 shrink-0 items-center justify-center bg-brand text-ink'>
                    <OtherIcon className='h-6 w-6' aria-hidden />
                  </span>
                  <span className='flex flex-col'>
                    <span className='font-display text-xl font-bold'>{other.title}</span>
                    <span className={`text-sm ${mutedText.paper}`}>{other.shortDescription}</span>
                  </span>
                  <ArrowRight
                    className='ml-auto h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1'
                    aria-hidden
                  />
                </Link>
              )
            })}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  )
}
