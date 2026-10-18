import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Asterisk } from 'lucide-react'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/business-orange-dark')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services | JGB Solutions',
      description:
        'We offer professional digital services including Web Design, Mobile Apps, Social Media, and more.',
      path: '/landing/business-orange-dark',
    }),
  component: BusinessOrangeDark,
})

function BusinessOrangeDark() {
  return (
    <LandingLayout>
      <div className='bg-zinc-950 min-h-screen text-zinc-50 selection:bg-orange-500 selection:text-white'>
        {/* Hero */}
        <section className='pt-32 pb-24 px-6 md:px-20 text-center'>
          <div className='max-w-3xl mx-auto'>
            <div className='inline-block px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-orange-500 text-sm font-medium mb-6'>
              Digital Agency Services
            </div>
            <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight'>
              We offer <span className='text-orange-500'>professional</span> digital services
            </h1>
            <p className='text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto'>
              From Web Design & Development to Print, we provide everything your business needs to
              succeed online and offline.
            </p>
            <Button
              asChild
              size='lg'
              className='rounded-full bg-orange-600 hover:bg-orange-700 text-white border-0'
            >
              <Link to='/' hash='contact'>
                Get in touch <ArrowRight className='ml-2 w-4 h-4' />
              </Link>
            </Button>
          </div>
        </section>

        {/* Grid */}
        <section className='py-16 px-6 md:px-20'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {SERVICES.map(service => {
                const Icon = service.icon
                return (
                  <div
                    key={service.slug}
                    className='p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 transition-colors group'
                  >
                    <div className='w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                      <Icon className='w-7 h-7 text-orange-500' />
                    </div>
                    <h3 className='text-2xl font-semibold mb-3 text-zinc-100'>{service.title}</h3>
                    <p className='text-zinc-400 mb-6'>{service.shortDescription}</p>
                    <ul className='space-y-3 mb-8'>
                      {service.offerings.slice(0, 4).map(offering => (
                        <li key={offering} className='text-sm text-zinc-400 flex items-start gap-3'>
                          <Asterisk className='w-4 h-4 text-orange-500 shrink-0 mt-0.5' />
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
        <section className='py-32 px-6 md:px-20 bg-orange-600 text-white text-center rounded-t-[3rem]'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>Looking for something else?</h2>
            <p className='text-xl mb-10 text-orange-100'>
              If you don't see something you need listed, please reach out to us. And don't forget
              to visit our website at{' '}
              <a href='https://jgb.solutions' className='underline hover:text-white font-semibold'>
                https://jgb.solutions
              </a>{' '}
              for more up to date information.
            </p>
            <Button
              asChild
              variant='secondary'
              size='lg'
              className='rounded-full bg-zinc-950 text-white hover:bg-zinc-900 hover:text-white border-0'
            >
              <Link to='/' hash='contact'>
                Contact Us <ArrowRight className='ml-2 w-4 h-4' />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </LandingLayout>
  )
}
