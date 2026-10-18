import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { ContactSection } from '@/components/site/contact-section'
import { ProcessSection } from '@/components/site/process-section'
import {
  Container,
  Section,
  SectionLabel,
  buttonStyles,
  mutedText,
} from '@/components/site/section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { createPageSEO } from '@/lib/seo'
import { OFFERED_SERVICES } from '@/lib/services'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/services/')({
  head: () =>
    createPageSEO({
      title: 'Services - Websites, Mobile Apps & Social Media | JGB Solutions',
      description:
        'JGB Solutions designs and builds websites and mobile apps and manages social media for businesses. See what each service includes. Contact us for a quote.',
      path: '/services',
    }),
  component: ServicesPage,
})

function ServicesPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main className='flex-1'>
        <section className='bg-ink py-16 text-paper md:py-24'>
          <Container className='flex max-w-7xl flex-col gap-6'>
            <SectionLabel className='text-brand opacity-100'>Services</SectionLabel>
            <h1 className='max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl'>
              Everything your business needs <span className='text-brand'>online</span>.
            </h1>
            <p className='max-w-2xl text-lg leading-relaxed text-muted-paper md:text-xl'>
              A website people trust, an app they keep, and social media that stays active. One team
              handles it from the first call to the updates after launch.
            </p>
          </Container>
        </section>

        {OFFERED_SERVICES.map((service, index) => {
          const Icon = service.icon
          const tone = index % 2 === 0 ? 'paper' : 'mist'
          return (
            <Section key={service.slug} tone={tone} id={service.slug}>
              <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16'>
                <div className='flex flex-col items-start gap-6'>
                  <span className='flex h-14 w-14 items-center justify-center bg-brand text-ink'>
                    <Icon className='h-7 w-7' aria-hidden />
                  </span>
                  <h2 className='font-display text-4xl font-extrabold tracking-tight md:text-5xl'>
                    {service.title}
                  </h2>
                  <p className={cn('max-w-xl text-lg leading-relaxed', mutedText[tone])}>
                    {service.description}
                  </p>
                  <Link
                    to='/services/$slug'
                    params={{ slug: service.slug }}
                    className={buttonStyles('ink')}
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn more <ArrowRight className='h-4 w-4' />
                  </Link>
                </div>
                <ul className='flex flex-col self-center border-t border-ink/10'>
                  {service.offerings.map(offering => (
                    <li
                      key={offering}
                      className='flex items-center gap-4 border-b border-ink/10 py-4 text-lg'
                    >
                      <Check className='h-5 w-5 shrink-0 text-brand-strong' aria-hidden />
                      {offering}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          )
        })}

        <ProcessSection tone='ink' />
        <ContactSection tone='brand' />
      </main>
      <SiteFooter />
    </div>
  )
}
