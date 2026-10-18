import { Link, createFileRoute } from '@tanstack/react-router'
import { Asterisk, ArrowRight } from 'lucide-react'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/business-grid')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services | JGB Solutions',
      description:
        'We offer professional digital services including Web Design, Mobile Apps, Social Media, and more.',
      path: '/landing/business-grid',
    }),
  component: BusinessGridLanding,
})

function BusinessGridLanding() {
  return (
    <LandingLayout>
      {/* Hero */}
      <section className='pt-32 pb-20 px-6 md:px-20 text-center bg-background'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold mb-6'>
            We offer professional digital services
          </h1>
          <p className='text-lg text-muted-foreground mb-8'>
            From Web Design & Development to Print, we provide everything your business needs to
            succeed online and offline.
          </p>
          <Button asChild className='rounded-xl'>
            <Link to='/' hash='contact'>
              Get in touch
            </Link>
          </Button>
        </div>
      </section>

      {/* Grid */}
      <section className='py-12 px-6 md:px-20 bg-secondary/50 dark:bg-card/50'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {SERVICES.map(service => {
              const Icon = service.icon
              return (
                <div
                  key={service.slug}
                  className='p-8 rounded-3xl border border-border bg-background hover:border-primary/50 transition-colors'
                >
                  <Icon className='w-12 h-12 text-primary mb-6' />
                  <h3 className='text-2xl font-light mb-3'>{service.title}</h3>
                  <p className='text-muted-foreground mb-6'>{service.shortDescription}</p>
                  <ul className='space-y-2 mb-8'>
                    {service.offerings.slice(0, 4).map(offering => (
                      <li
                        key={offering}
                        className='text-sm text-muted-foreground flex items-start gap-2'
                      >
                        <Asterisk className='w-3 h-3 text-primary shrink-0 mt-1' />
                        {offering}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section className='py-24 px-6 md:px-20 bg-primary text-primary-foreground text-center'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-semibold mb-6'>Looking for something else?</h2>
          <p className='text-lg md:text-xl mb-8 opacity-90'>
            If you don't see something you need listed, please reach out to us. And don't forget to
            visit our website at{' '}
            <a
              href='https://jgb.solutions'
              className='underline hover:text-white transition-colors'
            >
              https://jgb.solutions
            </a>{' '}
            for more up to date information.
          </p>
          <Button asChild variant='secondary' size='lg' className='rounded-xl'>
            <Link to='/' hash='contact'>
              Contact Us <ArrowRight className='ml-2 w-4 h-4' />
            </Link>
          </Button>
        </div>
      </section>
    </LandingLayout>
  )
}
