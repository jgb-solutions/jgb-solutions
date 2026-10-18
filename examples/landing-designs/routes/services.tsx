import { Link, createFileRoute } from '@tanstack/react-router'
import { Asterisk, Check } from 'lucide-react'
import { LandingCta } from '@/components/landing/landing-cta'
import { LandingLayout } from '@/components/landing/landing-layout'
import { ServicesMarquee } from '@/components/landing/services-marquee'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/services')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services - JGB Solutions',
      description:
        'Web design, mobile apps, social media, photography, graphic design, and print services. Professional digital solutions for your business.',
      path: '/landing/services',
    }),
  component: ServicesOverviewLanding,
})

function ServicesOverviewLanding() {
  return (
    <LandingLayout>
      {/* Hero */}
      <section className='pt-32 pb-16 px-6 md:px-20'>
        <div className='max-w-7xl mx-auto'>
          <p className='text-sm md:text-base tracking-wider text-primary mb-4'>
            professional.digital.services.
          </p>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 max-w-4xl'>
            Everything your business needs to stand out online and in print
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mb-8'>
            We offer professional digital services — from websites and mobile apps to social media,
            photography, graphic design, and print.
          </p>
          <Button asChild className='rounded-xl'>
            <Link to='/' hash='contact'>
              Start a project
            </Link>
          </Button>
        </div>
      </section>

      <ServicesMarquee />

      {/* All services — alternating sections */}
      {SERVICES.map((service, index) => {
        const Icon = service.icon
        const isEven = index % 2 === 0

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`py-20 px-6 md:px-20 ${isEven ? 'bg-background' : 'bg-secondary dark:bg-card'}`}
          >
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div className={isEven ? 'order-1' : 'order-1 md:order-2'}>
                <div className='flex items-center gap-3 mb-4'>
                  <Icon className='w-8 h-8 text-primary' />
                  <span className='text-sm tracking-wider text-primary uppercase'>
                    Service {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className='text-3xl md:text-4xl font-light mb-4'>{service.title}</h2>
                <p className='text-muted-foreground mb-6'>{service.description}</p>
                <ul className='space-y-3'>
                  {service.offerings.map(offering => (
                    <li key={offering} className='flex items-start gap-3 text-muted-foreground'>
                      <Check className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                      {offering}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`${isEven ? 'order-2' : 'order-2 md:order-1'} flex items-center justify-center`}
              >
                <div className='w-full aspect-square max-w-md rounded-3xl bg-primary/5 dark:bg-primary/10 border border-border flex flex-col items-center justify-center p-12'>
                  <Icon className='w-24 h-24 text-primary mb-6' />
                  <p className='text-center text-muted-foreground'>{service.shortDescription}</p>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Compare note */}
      <section className='py-12 px-6 md:px-20 border-t border-border'>
        <div className='max-w-7xl mx-auto text-center text-sm text-muted-foreground'>
          <p className='flex items-center justify-center gap-2'>
            <Asterisk className='w-4 h-4 text-primary' />
            Landing page variant A — full services overview with scroll sections
          </p>
        </div>
      </section>

      <LandingCta />
    </LandingLayout>
  )
}
