import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/business-orange-impact')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services | JGB Solutions',
      description:
        'We offer professional digital services including Web Design, Mobile Apps, Social Media, and more.',
      path: '/landing/business-orange-impact',
    }),
  component: BusinessOrangeImpact,
})

function BusinessOrangeImpact() {
  return (
    <LandingLayout>
      <div className='bg-zinc-950 text-zinc-50 min-h-screen'>
        {/* Hero */}
        <section className='pt-32 pb-24 px-6 md:px-20 bg-orange-600 text-white rounded-b-[3rem]'>
          <div className='max-w-6xl mx-auto'>
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold mb-8 max-w-4xl tracking-tighter leading-[1.1]'>
              We offer professional digital services
            </h1>
            <p className='text-xl md:text-2xl text-orange-100 max-w-2xl mb-10 font-medium'>
              Delivering high-quality solutions across Web, Mobile, Social Media, Photography,
              Graphic Design, and Print.
            </p>
            <Button
              asChild
              size='lg'
              className='rounded-xl bg-zinc-950 text-white hover:bg-zinc-900 border-0'
            >
              <Link to='/' hash='contact'>
                Start a project <ArrowRight className='ml-2 w-5 h-5' />
              </Link>
            </Button>
          </div>
        </section>

        {/* Alternating Sections */}
        <div className='py-12'>
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0

            return (
              <section
                key={service.slug}
                className={`py-20 px-6 md:px-20 ${isEven ? 'bg-zinc-950' : 'bg-zinc-900'}`}
              >
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
                  <div className={isEven ? 'order-1' : 'order-1 md:order-2'}>
                    <div className='flex items-center gap-4 mb-6'>
                      <div className='w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center'>
                        <Icon className='w-8 h-8 text-orange-500' />
                      </div>
                      <span className='text-orange-500 font-mono font-semibold tracking-wider'>
                        0{index + 1}
                      </span>
                    </div>
                    <h2 className='text-4xl md:text-5xl font-bold mb-6'>{service.title}</h2>
                    <p className='text-xl text-zinc-400 mb-8'>{service.description}</p>
                    <ul className='space-y-4'>
                      {service.offerings.map(offering => (
                        <li
                          key={offering}
                          className='flex items-center gap-4 text-zinc-300 text-lg'
                        >
                          <Check className='w-6 h-6 text-orange-500 shrink-0' />
                          {offering}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`${isEven ? 'order-2' : 'order-2 md:order-1'} flex items-center justify-center`}
                  >
                    <div className='w-full aspect-square max-w-md rounded-[3rem] bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center p-12 relative overflow-hidden'>
                      <div className='absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full'></div>
                      <div className='absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full'></div>
                      <Icon className='w-32 h-32 text-orange-500 mb-8 relative z-10' />
                      <p className='text-center text-zinc-300 text-xl font-medium relative z-10'>
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        {/* Custom CTA */}
        <section className='py-32 px-6 md:px-20 text-center border-t border-zinc-800 bg-zinc-950'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-4xl md:text-6xl font-bold mb-8'>Don't see what you need?</h2>
            <p className='text-xl text-zinc-400 mb-10'>
              If you don't see something you need listed, please reach out to us. And don't forget
              to visit our website at{' '}
              <a href='https://jgb.solutions' className='text-orange-500 hover:underline'>
                https://jgb.solutions
              </a>{' '}
              for more up to date information.
            </p>
            <Button
              asChild
              size='lg'
              className='rounded-xl bg-orange-600 hover:bg-orange-700 text-white border-0'
            >
              <Link to='/' hash='contact'>
                Reach Out <ArrowRight className='ml-2 w-5 h-5' />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </LandingLayout>
  )
}
