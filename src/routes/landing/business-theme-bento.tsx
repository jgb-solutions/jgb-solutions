import { Link, createFileRoute } from '@tanstack/react-router'
import { Asterisk, ArrowRight } from 'lucide-react'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/business-theme-bento')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services | JGB Solutions',
      description:
        'We offer professional digital services including Web Design, Mobile Apps, Social Media, and more.',
      path: '/landing/business-theme-bento',
    }),
  component: BusinessThemeBento,
})

function BusinessThemeBento() {
  return (
    <LandingLayout>
      <div className='bg-background text-foreground min-h-screen'>
        {/* Hero */}
        <section className='pt-32 pb-20 px-6 md:px-20'>
          <div className='max-w-5xl mx-auto text-center'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8'>
              <span className='w-2 h-2 rounded-full bg-primary animate-pulse'></span>
              Available for new projects
            </div>
            <h1 className='text-4xl sm:text-5xl md:text-7xl font-semibold mb-6 tracking-tight'>
              We offer <span className='text-primary'>professional</span> digital services
            </h1>
            <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10'>
              From Web Design & Development to Print, we provide everything your business needs to
              succeed online and offline.
            </p>
            <Button asChild size='lg' className='rounded-xl'>
              <Link to='/' hash='contact'>
                Get in touch <ArrowRight className='ml-2 w-4 h-4' />
              </Link>
            </Button>
          </div>
        </section>

        {/* Bento Grid */}
        <section className='py-16 px-6 md:px-20'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min'>
              {SERVICES.map((service, index) => {
                const Icon = service.icon
                // Make the 1st and 4th items span 2 columns to create a bento box effect
                const isLarge = index === 0 || index === 3

                return (
                  <div
                    key={service.slug}
                    className={`p-8 rounded-3xl bg-card border border-border flex flex-col justify-between hover:shadow-lg transition-all ${
                      isLarge ? 'md:col-span-2' : 'md:col-span-1'
                    }`}
                  >
                    <div>
                      <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6'>
                        <Icon className='w-6 h-6 text-primary' />
                      </div>
                      <h3 className='text-2xl font-semibold mb-3'>{service.title}</h3>
                      <p className='text-muted-foreground mb-6'>{service.description}</p>
                    </div>
                    <ul className='grid grid-cols-1 gap-2 mt-auto pt-6 border-t border-border'>
                      {service.offerings.slice(0, isLarge ? 4 : 3).map(offering => (
                        <li
                          key={offering}
                          className='text-sm text-muted-foreground flex items-center gap-2'
                        >
                          <Asterisk className='w-3 h-3 text-primary shrink-0' />
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
        <section className='py-24 px-6 md:px-20 mb-12'>
          <div className='max-w-5xl mx-auto bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full'></div>
            <div className='relative z-10'>
              <h2 className='text-3xl md:text-5xl font-bold mb-6'>Looking for something else?</h2>
              <p className='text-lg md:text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto'>
                If you don't see something you need listed, please reach out to us. And don't forget
                to visit our website at{' '}
                <a
                  href='https://jgb.solutions'
                  className='underline hover:text-white font-semibold'
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
          </div>
        </section>
      </div>
    </LandingLayout>
  )
}
