import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { SectionTone } from '@/components/site/section'
import {
  Container,
  Section,
  SectionLabel,
  buttonStyles,
  mutedText,
} from '@/components/site/section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { overviewOf, products } from '@/lib/products'
import { createPageSEO } from '@/lib/seo'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/products')({
  head: () =>
    createPageSEO({
      title: 'Products | JGB Solutions',
      description:
        'Apps, games and media sites built and run by JGB Solutions: JGB Tools, Street Brawl, MP3PAM and Tech Talk.',
      path: '/products',
    }),
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main className='flex-1'>
        <section className='bg-ink py-16 text-paper md:py-24'>
          <Container className='flex flex-col gap-6'>
            <SectionLabel className='text-brand opacity-100'>Products</SectionLabel>
            <h1 className='max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl'>
              We build our own products <span className='text-brand'>too</span>.
            </h1>
            <p className='max-w-2xl text-lg leading-relaxed text-muted-paper md:text-xl'>
              Alongside client work, we design, build and run our own apps, games and media sites.
              They're live, they're free to use, and they show what we can build for you.
            </p>
          </Container>
        </section>

        {products.map((product, index) => {
          const tone: SectionTone = index % 2 === 0 ? 'paper' : 'mist'
          const imageFirst = index % 2 === 0
          return (
            <Section key={product.slug} tone={tone} id={product.slug}>
              <article className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16'>
                <a
                  href={product.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={cn(
                    'group block aspect-[4/3] overflow-hidden border border-ink/10',
                    !imageFirst && 'lg:order-2'
                  )}
                  tabIndex={-1}
                  aria-hidden
                >
                  <img
                    src={product.image}
                    alt=''
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className='h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105'
                  />
                </a>
                <div className='flex flex-col items-start gap-5'>
                  <p className='font-mono text-xs uppercase tracking-[0.2em] text-brand-strong'>
                    {product.category}
                  </p>
                  <h2 className='font-display text-4xl font-extrabold tracking-tight md:text-5xl'>
                    {product.title}
                  </h2>
                  <p className={cn('max-w-xl text-lg leading-relaxed', mutedText[tone])}>
                    {overviewOf(product)}
                  </p>
                  {product.services && product.services.length > 0 && (
                    <div className='flex flex-col gap-2'>
                      <p
                        className={cn(
                          'font-mono text-xs uppercase tracking-[0.2em]',
                          mutedText[tone]
                        )}
                      >
                        Built with
                      </p>
                      <ul className='flex flex-wrap gap-2'>
                        {product.services.map(tech => (
                          <li key={tech} className='border border-ink/15 px-2.5 py-1 text-sm'>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className='flex flex-col gap-3 pt-2 sm:flex-row'>
                    {product.url && (
                      <a
                        href={product.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={buttonStyles('ink')}
                      >
                        Visit {product.title} <ArrowUpRight className='h-4 w-4' aria-hidden />
                      </a>
                    )}
                    <Link
                      to='/projects/$slug'
                      params={{ slug: product.slug }}
                      className={buttonStyles('outline')}
                      aria-label={`How we built ${product.title}`}
                    >
                      How we built it <ArrowRight className='h-4 w-4' aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            </Section>
          )
        })}
      </main>
      <SiteFooter />
    </div>
  )
}
