import { Link, createFileRoute } from '@tanstack/react-router'
import { Asterisk } from 'lucide-react'
import { LandingCta } from '@/components/landing/landing-cta'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { CREATIVE_SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/creative')({
  head: () =>
    createPageSEO({
      title: 'Creative Services - Photography, Design & Print | JGB Solutions',
      description:
        'Professional photography, videography, graphic design, and print services. Visual content that elevates your brand.',
      path: '/landing/creative',
    }),
  component: CreativeServicesLanding,
})

function CreativeServicesLanding() {
  return (
    <LandingLayout>
      {/* Centered hero — card-grid approach */}
      <section className='pt-32 pb-20 px-6 md:px-20 text-center'>
        <div className='max-w-3xl mx-auto'>
          <p className='text-sm md:text-base tracking-wider text-primary mb-4'>
            creative.visual.services.
          </p>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold mb-6'>
            Visual content that makes your brand unforgettable
          </h1>
          <p className='text-lg text-muted-foreground mb-8'>
            Photography, videography, graphic design, and print — everything you need to look
            professional across every channel.
          </p>
          <Button asChild className='rounded-xl'>
            <Link to='/' hash='contact'>
              Book a consultation
            </Link>
          </Button>
        </div>
      </section>

      {/* Service cards — similar to project cards grid */}
      <section className='py-12 px-6 md:px-20'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex justify-between items-end mb-12'>
            <h2 className='text-3xl md:text-4xl font-light'>Our creative services</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {CREATIVE_SERVICES.map(service => {
              const Icon = service.icon
              return (
                <article
                  key={service.slug}
                  className='group rounded-3xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 bg-background'
                >
                  <div className='aspect-[4/3] bg-secondary dark:bg-card flex items-center justify-center relative overflow-hidden'>
                    <Icon className='w-20 h-20 text-primary/40 group-hover:text-primary/60 group-hover:scale-110 transition-all duration-500' />
                    <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  </div>
                  <div className='p-6 md:p-8'>
                    <h3 className='text-2xl font-light mb-3 group-hover:text-primary transition-colors'>
                      {service.title}
                    </h3>
                    <p className='text-muted-foreground text-sm mb-4'>{service.shortDescription}</p>
                    <p className='text-muted-foreground text-sm mb-6'>{service.description}</p>
                    <ul className='space-y-2 mb-6'>
                      {service.offerings.slice(0, 3).map(offering => (
                        <li
                          key={offering}
                          className='text-sm text-muted-foreground flex items-center gap-2'
                        >
                          <Asterisk className='w-3 h-3 text-primary shrink-0' />
                          {offering}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant='outline' className='rounded-xl w-full bg-transparent'>
                      <Link to='/' hash='contact'>
                        Inquire about {service.title.split(' ')[0]}
                      </Link>
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Full offerings list */}
      <section className='py-20 px-6 md:px-20 bg-secondary dark:bg-card'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-light mb-12 text-center'>
            Everything in one place
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
            {CREATIVE_SERVICES.map(service => (
              <div key={service.slug}>
                <h3 className='text-xl mb-4 flex items-center gap-2'>
                  {service.title}
                  <Asterisk className='w-4 h-4 text-primary' />
                </h3>
                <ul className='space-y-2 text-muted-foreground text-sm'>
                  {service.offerings.map(offering => (
                    <li key={offering}>{offering}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare note */}
      <section className='py-12 px-6 md:px-20 border-t border-border'>
        <div className='max-w-7xl mx-auto text-center text-sm text-muted-foreground'>
          <p className='flex items-center justify-center gap-2'>
            <Asterisk className='w-4 h-4 text-primary' />
            Landing page variant C — category bundle with card grid (Photo, Design, Print)
          </p>
        </div>
      </section>

      <LandingCta
        title='Need something creative?'
        description="Whether it's a photo shoot, brand refresh, or print run — reach out and we'll figure out the right package for you."
      />
    </LandingLayout>
  )
}
