import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { SectionTone } from '@/components/site/section'
import { START_PROJECT_HREF } from '@/components/site/site-header'
import { Container, SectionLabel, buttonStyles, mutedText } from '@/components/site/section'
import { SITE } from '@/lib/constants'
import { OFFERED_SERVICES } from '@/lib/services'
import { cn } from '@/lib/utils'

export function HomeHero({ tone }: { tone: SectionTone }) {
  const isBrand = tone === 'brand'

  return (
    <section
      className={cn(
        'py-16 md:py-24',
        isBrand ? 'bg-brand text-ink' : 'bg-paper text-ink border-b border-ink/10'
      )}
    >
      <Container className='grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16'>
        <div className='flex flex-col gap-7'>
          <SectionLabel className={isBrand ? '' : 'text-brand-strong opacity-100'}>
            Web · Mobile · Social media
          </SectionLabel>
          <h1 className='font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl'>
            Websites, apps and social media for{' '}
            <span
              className={cn(
                'box-decoration-clone',
                isBrand
                  ? 'underline decoration-ink decoration-[0.12em] underline-offset-[0.12em]'
                  : 'bg-[linear-gradient(transparent_58%,var(--color-brand)_58%)] px-1'
              )}
            >
              your business
            </span>
            .
          </h1>
          <p className={cn('max-w-xl text-lg leading-relaxed md:text-xl', mutedText[tone])}>
            We design, build and run the digital side of your business: a website people trust, an
            app they keep, and social media that stays active.
          </p>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <a href={START_PROJECT_HREF} className={buttonStyles(isBrand ? 'ink' : 'brand')}>
              Start a project <ArrowRight className='h-4 w-4' />
            </a>
            <Link to='/projects' className={buttonStyles('outline')}>
              See our work
            </Link>
          </div>
          <p className={cn('font-mono text-xs uppercase tracking-[0.15em]', mutedText[tone])}>
            10+ years · Dozens of clients · {SITE.location}
          </p>
        </div>

        <ul className='flex flex-col gap-3'>
          {OFFERED_SERVICES.map(service => {
            const Icon = service.icon
            return (
              <li
                key={service.slug}
                className={cn(
                  'flex items-start gap-5 p-6',
                  isBrand ? 'bg-ink text-paper' : 'border border-ink/10 bg-mist'
                )}
              >
                <span className='flex h-12 w-12 shrink-0 items-center justify-center bg-brand text-ink'>
                  <Icon className='h-6 w-6' aria-hidden />
                </span>
                <div className='flex flex-col gap-1'>
                  <h2 className='font-display text-lg font-bold'>{service.title}</h2>
                  <p className={cn('text-sm', isBrand ? 'text-muted-paper' : 'text-muted-ink')}>
                    {service.shortDescription}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
