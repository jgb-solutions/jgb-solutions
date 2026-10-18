import { Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import type { SectionTone } from '@/components/site/section'
import { Section, SectionHeading, buttonStyles, isDark, mutedText } from '@/components/site/section'
import { clientProjects, products } from '@/lib/products'
import { OFFERED_SERVICES } from '@/lib/services'
import { cn } from '@/lib/utils'

export function HomeServices({ tone }: { tone: SectionTone }) {
  return (
    <Section tone={tone} id='services' containerClassName='flex flex-col gap-12'>
      <SectionHeading
        tone={tone}
        label='What we do'
        title='Three services, one team'
        intro='Every project gets the same care, from the first call to the updates after launch. Contact us for a quote.'
      />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {OFFERED_SERVICES.map(service => {
          const Icon = service.icon
          return (
            <article
              key={service.slug}
              className={cn(
                'flex flex-col gap-5 border p-8',
                isDark(tone) ? 'border-ink-line bg-ink-soft' : 'border-ink/10 bg-paper'
              )}
            >
              <span className='flex h-12 w-12 items-center justify-center bg-brand text-ink'>
                <Icon className='h-6 w-6' aria-hidden />
              </span>
              <h3 className='font-display text-2xl font-bold leading-snug'>
                <Link
                  to='/services/$slug'
                  params={{ slug: service.slug }}
                  className='hover:text-brand-strong'
                >
                  {service.title}
                </Link>
              </h3>
              <p className={cn('leading-relaxed', mutedText[tone])}>{service.description}</p>
              <ul className='mt-auto flex flex-col gap-2.5 border-t border-current/10 pt-5 text-sm'>
                {service.offerings.map(offering => (
                  <li key={offering} className='flex items-start gap-2.5'>
                    <Check className='mt-0.5 h-4 w-4 shrink-0 text-brand-strong' aria-hidden />
                    {offering}
                  </li>
                ))}
              </ul>
              <Link
                to='/services/$slug'
                params={{ slug: service.slug }}
                className='inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong'
                aria-label={`Learn more about ${service.title}`}
              >
                Learn more <ArrowRight className='h-4 w-4' aria-hidden />
              </Link>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

export function HomeProducts({ tone }: { tone: SectionTone }) {
  if (products.length === 0) return null
  const [featured, ...rest] = products

  return (
    <Section tone={tone} id='products' containerClassName='flex flex-col gap-12'>
      <SectionHeading
        tone={tone}
        label='Our products'
        title='Apps and media we build and run'
        intro='Alongside client work, we make our own products. Building them keeps our skills sharp and gives clients proof that our work holds up in the real world.'
      />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <ProductCard product={featured} tone={tone} featured />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {rest.map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              tone={tone}
              // An odd last card spans both columns so the grid has no hole
              wide={rest.length % 2 === 1 && i === rest.length - 1}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}

function ProductCard({
  product,
  tone,
  featured = false,
  wide = false,
}: {
  product: (typeof products)[number]
  tone: SectionTone
  featured?: boolean
  wide?: boolean
}) {
  return (
    <article
      className={cn(
        'group flex flex-col border',
        wide && 'sm:col-span-2',
        isDark(tone) ? 'border-ink-line bg-ink-soft' : 'border-ink/10 bg-paper'
      )}
    >
      <Link
        to='/projects/$slug'
        params={{ slug: product.slug }}
        className={cn(
          'block overflow-hidden',
          wide ? 'aspect-[4/3] sm:aspect-[2/1]' : 'aspect-[4/3]'
        )}
        tabIndex={-1}
        aria-hidden
      >
        <img
          src={product.image}
          alt=''
          loading='lazy'
          className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
        />
      </Link>
      <div className={cn('flex flex-1 flex-col gap-3', featured ? 'p-8' : 'p-5')}>
        <p className={cn('font-mono text-[11px] uppercase tracking-[0.2em]', mutedText[tone])}>
          {product.category}
        </p>
        <h3 className={cn('font-display font-bold', featured ? 'text-3xl' : 'text-xl')}>
          <Link
            to='/projects/$slug'
            params={{ slug: product.slug }}
            className='hover:text-brand-strong'
          >
            {product.title}
          </Link>
        </h3>
        {featured && (
          <p className={cn('leading-relaxed', mutedText[tone])}>{product.description}</p>
        )}
        {product.url && (
          <a
            href={product.url}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold',
              isDark(tone) ? 'text-brand' : 'text-brand-strong'
            )}
          >
            Visit {product.title} <ArrowUpRight className='h-4 w-4' aria-hidden />
          </a>
        )}
      </div>
    </article>
  )
}

export function HomeWork({ tone }: { tone: SectionTone }) {
  const work = clientProjects.slice(0, 4)
  if (work.length === 0) return null

  return (
    <Section tone={tone} id='work' containerClassName='flex flex-col gap-12'>
      <div className='flex flex-col justify-between gap-6 md:flex-row md:items-end'>
        <SectionHeading
          tone={tone}
          label='Client work'
          title='Recent projects'
          intro='Websites for businesses, organizations and creators.'
        />
        <Link
          to='/projects'
          className={buttonStyles('outline', 'shrink-0 self-start md:self-auto')}
        >
          See all work <ArrowRight className='h-4 w-4' />
        </Link>
      </div>
      <div className='grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2'>
        {work.map(project => (
          <Link
            key={project.slug}
            to='/projects/$slug'
            params={{ slug: project.slug }}
            className='group flex flex-col gap-4'
          >
            <div className='aspect-[4/3] overflow-hidden border border-ink/10'>
              <img
                src={project.image}
                alt={`${project.title} website`}
                loading='lazy'
                className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
              />
            </div>
            <div className='flex items-baseline justify-between gap-4'>
              <h3 className='font-display text-2xl font-bold group-hover:text-brand-strong'>
                {project.title}
              </h3>
              <p className={cn('shrink-0 font-mono text-xs', mutedText[tone])}>
                {[project.category, project.year].filter(Boolean).join(' · ')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}

export function HomeInsights({ tone }: { tone: SectionTone }) {
  const posts = [...allPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
  if (posts.length === 0) return null

  return (
    <Section tone={tone} id='insights' containerClassName='flex flex-col gap-12'>
      <div className='flex flex-col justify-between gap-6 md:flex-row md:items-end'>
        <SectionHeading tone={tone} label='Insights' title='From our notebook' />
        <Link to='/posts' className={buttonStyles('outline', 'shrink-0 self-start md:self-auto')}>
          All posts <ArrowRight className='h-4 w-4' />
        </Link>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {posts.map(post => (
          <Link
            key={post.slug}
            to='/posts/$slug'
            params={{ slug: post.slug }}
            className='group flex flex-col gap-3 border-t-4 border-brand pt-5'
          >
            <p className={cn('font-mono text-xs uppercase tracking-[0.15em]', mutedText[tone])}>
              {post.category} · {post.readTime}
            </p>
            <h3 className='font-display text-2xl font-bold leading-snug group-hover:text-brand-strong'>
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </Section>
  )
}
