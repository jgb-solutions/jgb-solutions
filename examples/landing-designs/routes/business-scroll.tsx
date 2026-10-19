import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/business-scroll')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services | JGB Solutions',
      description:
        'We offer professional digital services including Web Design, Mobile Apps, Social Media, and more.',
      path: '/landing/business-scroll',
    }),
  component: BusinessScrollLanding,
})

function BusinessScrollLanding() {
  return (
    <LandingLayout>
      {/* Hero */}
      <section className='pt-32 pb-16 px-6 md:px-20 bg-background'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 max-w-4xl'>
            We offer professional digital services
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mb-8'>
            Delivering high-quality solutions across Web, Mobile, Social Media, Photography, Graphic
            Design, and Print.
          </p>
          <Button asChild size='lg' className='rounded-xl'>
            <Link to='/' hash='contact'>
              Start a project
            </Link>
          </Button>
        </div>
      </section>

      {/* Alternating Sections */}
      {SERVICES.map((service, index) => {
        const Icon = service.icon
        const isEven = index % 2 === 0

        return (
          <section
            key={service.slug}
            className={`py-20 px-6 md:px-20 ${isEven ? 'bg-secondary/30 dark:bg-card/30' : 'bg-background'}`}
          >
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div className={isEven ? 'order-1' : 'order-1 md:order-2'}>
                <div className='flex items-center gap-3 mb-4'>
                  <Icon className='w-8 h-8 text-primary' />
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
                <div className='w-full aspect-square max-w-md rounded-3xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center p-12'>
                  <Icon className='w-24 h-24 text-primary mb-6' />
                  <p className='text-center text-muted-foreground'>{service.shortDescription}</p>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Custom CTA */}
      <section className='py-24 px-6 md:px-20 bg-primary text-primary-foreground text-center'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-semibold mb-6'>Don't see what you need?</h2>
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
              Reach Out <ArrowRight className='ml-2 w-4 h-4' />
            </Link>
          </Button>
        </div>
      </section>
    </LandingLayout>
  )
}
