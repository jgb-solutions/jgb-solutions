import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { BoldCta } from '@/components/landing/bold-cta'
import { BoldLandingLayout } from '@/components/landing/bold-layout'
import { BoldSection } from '@/components/landing/bold-theme'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/bold-services')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services - JGB Solutions',
      description:
        'Web design, mobile apps, social media, photography, graphic design, and print. Bold professional services for your business.',
      path: '/landing/bold-services',
    }),
  component: BoldServicesLanding,
})

function BoldServicesLanding() {
  return (
    <BoldLandingLayout>
      {/* Black hero with orange accent bar */}
      <section className='pt-32 pb-0 bg-black'>
        <div className='h-2 bg-orange-500' />
        <div className='px-6 md:px-20 py-20 max-w-7xl mx-auto'>
          <p className='text-orange-500 font-mono text-sm tracking-widest uppercase mb-6'>
            JGB Solutions
          </p>
          <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8'>
            WE BUILD
            <br />
            <span className='text-orange-500'>DIGITAL</span>
            <br />
            THAT DELIVERS
          </h1>
          <p className='text-neutral-400 text-lg md:text-xl max-w-xl mb-10'>
            Professional digital services — web, mobile, social, photo, design, and print.
          </p>
          <Button
            asChild
            className='rounded-none bg-orange-500 text-black hover:bg-orange-400 font-bold px-8 py-6 text-base'
          >
            <Link to='/' hash='contact'>
              Start a project <ArrowRight className='w-5 h-5 ml-2' />
            </Link>
          </Button>
        </div>
      </section>

      {/* Orange band — service list */}
      <BoldSection variant='orange' className='py-12'>
        <div className='max-w-7xl mx-auto flex flex-wrap gap-x-8 gap-y-3 justify-center'>
          {SERVICES.map(service => (
            <span
              key={service.slug}
              className='font-bold text-sm md:text-base uppercase tracking-wide'
            >
              {service.title}
            </span>
          ))}
        </div>
      </BoldSection>

      {/* Services grid — black */}
      <BoldSection variant='black'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-4xl md:text-5xl font-black mb-16'>
            OUR <span className='text-orange-500'>SERVICES</span>
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {SERVICES.map(service => {
              const Icon = service.icon
              return (
                <article
                  key={service.slug}
                  className='group border border-neutral-800 hover:border-orange-500 p-8 transition-colors'
                >
                  <div className='flex items-start gap-4 mb-4'>
                    <div className='p-3 bg-orange-500 text-black'>
                      <Icon className='w-6 h-6' />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors'>
                        {service.title}
                      </h3>
                      <p className='text-neutral-400 text-sm'>{service.shortDescription}</p>
                    </div>
                  </div>
                  <ul className='space-y-2 mt-6'>
                    {service.offerings.slice(0, 3).map(offering => (
                      <li
                        key={offering}
                        className='flex items-center gap-2 text-sm text-neutral-400'
                      >
                        <Check className='w-4 h-4 text-orange-500 shrink-0' />
                        {offering}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </BoldSection>

      {/* Orange stats strip */}
      <BoldSection variant='orange' className='py-16'>
        <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
          {[
            { value: '6', label: 'Service areas' },
            { value: '20+', label: 'Projects delivered' },
            { value: '8+', label: 'Years experience' },
            { value: '100%', label: 'Client focused' },
          ].map(stat => (
            <div key={stat.label}>
              <div className='text-4xl md:text-5xl font-black'>{stat.value}</div>
              <div className='text-black/70 text-sm uppercase tracking-wider mt-1'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </BoldSection>

      <section className='py-8 px-6 bg-neutral-950 text-neutral-500 text-center text-sm border-t border-orange-500/20'>
        Landing page variant D — bold orange & black, full services overview
      </section>

      <BoldCta variant='orange' />
    </BoldLandingLayout>
  )
}
