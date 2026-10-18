import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/business-minimal')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services | JGB Solutions',
      description:
        'We offer professional digital services including Web Design, Mobile Apps, Social Media, and more.',
      path: '/landing/business-minimal',
    }),
  component: BusinessMinimalLanding,
})

function BusinessMinimalLanding() {
  return (
    <LandingLayout>
      {/* Hero */}
      <section className='pt-40 pb-20 px-6 md:px-20'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-5xl md:text-7xl font-semibold tracking-tight mb-8'>
            We offer professional digital services.
          </h1>
          <div className='w-24 h-1 bg-primary mb-8'></div>
          <p className='text-xl md:text-2xl text-muted-foreground font-light'>
            A comprehensive suite of solutions ranging from Web and Mobile App Development to
            Graphic Design and Print.
          </p>
        </div>
      </section>

      {/* Minimal List */}
      <section className='py-12 px-6 md:px-20'>
        <div className='max-w-4xl mx-auto'>
          <div className='divide-y divide-border border-t border-border'>
            {SERVICES.map((service, i) => (
              <div key={service.slug} className='py-12 flex flex-col md:flex-row gap-8 md:gap-16'>
                <div className='w-full md:w-1/3 shrink-0'>
                  <span className='text-primary text-sm font-mono mb-2 block'>0{i + 1}</span>
                  <h3 className='text-2xl font-medium'>{service.title}</h3>
                </div>
                <div className='w-full md:w-2/3'>
                  <p className='text-lg mb-6'>{service.description}</p>
                  <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground'>
                    {service.offerings.map(offering => (
                      <li key={offering} className='flex items-center gap-2'>
                        <div className='w-1.5 h-1.5 rounded-full bg-primary/50' />
                        {offering}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section className='py-32 px-6 md:px-20 bg-secondary/50 dark:bg-card/50'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-5xl font-semibold mb-8'>Need something else?</h2>
          <p className='text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto'>
            If you don't see something you need listed, please reach out to us. And don't forget to
            visit our website at{' '}
            <a href='https://jgb.solutions' className='text-primary hover:underline'>
              https://jgb.solutions
            </a>{' '}
            for more up to date information.
          </p>
          <Button asChild size='lg' className='rounded-full px-8'>
            <Link to='/' hash='contact'>
              Contact Us <ArrowRight className='ml-2 w-4 h-4' />
            </Link>
          </Button>
        </div>
      </section>
    </LandingLayout>
  )
}
