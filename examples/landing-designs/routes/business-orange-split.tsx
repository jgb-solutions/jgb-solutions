import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/business-orange-split')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services | JGB Solutions',
      description:
        'We offer professional digital services including Web Design, Mobile Apps, Social Media, and more.',
      path: '/landing/business-orange-split',
    }),
  component: BusinessOrangeSplit,
})

function BusinessOrangeSplit() {
  return (
    <LandingLayout>
      <div className='bg-zinc-950 min-h-screen text-zinc-50 font-sans selection:bg-orange-500 selection:text-white'>
        {/* Split Hero */}
        <section className='flex flex-col lg:flex-row min-h-[80vh]'>
          <div className='w-full lg:w-1/2 bg-orange-600 text-white p-10 md:p-20 flex flex-col justify-center'>
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8'>
              Pro
              <br />
              Digital
              <br />
              Services.
            </h1>
            <p className='text-2xl font-medium max-w-md text-orange-100'>
              We offer professional digital services to scale your brand.
            </p>
          </div>
          <div className='w-full lg:w-1/2 bg-zinc-950 p-10 md:p-20 flex flex-col justify-center border-l border-zinc-900'>
            <p className='text-2xl text-zinc-400 font-light mb-10 leading-relaxed max-w-lg'>
              A comprehensive suite of solutions ranging from{' '}
              <strong className='text-white font-semibold'>Web and Mobile App Development</strong>{' '}
              to <strong className='text-white font-semibold'>Graphic Design and Print</strong>.
            </p>
            <div>
              <Button
                asChild
                size='lg'
                className='rounded-none bg-white text-zinc-950 hover:bg-zinc-200 border-0 h-14 px-8 text-lg'
              >
                <Link to='/' hash='contact'>
                  Get Started <ArrowRight className='ml-3 w-5 h-5' />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Minimal List */}
        <section className='py-20 px-6 md:px-20 bg-zinc-950'>
          <div className='max-w-6xl mx-auto'>
            <div className='divide-y divide-zinc-900'>
              {SERVICES.map((service, i) => (
                <div
                  key={service.slug}
                  className='py-16 flex flex-col md:flex-row gap-8 md:gap-16 hover:bg-zinc-900/50 transition-colors px-8 -mx-8 rounded-2xl'
                >
                  <div className='w-full md:w-1/3 shrink-0 flex items-start gap-6'>
                    <span className='text-orange-500 text-4xl md:text-6xl font-black block tracking-tighter'>
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className='text-3xl font-bold mt-2'>{service.title}</h3>
                    </div>
                  </div>
                  <div className='w-full md:w-2/3'>
                    <p className='text-xl text-zinc-400 mb-8 leading-relaxed'>
                      {service.description}
                    </p>
                    <div className='flex flex-wrap gap-3'>
                      {service.offerings.map(offering => (
                        <div
                          key={offering}
                          className='px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium'
                        >
                          {offering}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom CTA */}
        <section className='py-32 px-6 md:px-20 bg-orange-600 text-black'>
          <div className='max-w-5xl mx-auto text-center'>
            <h2 className='text-5xl md:text-7xl font-black mb-10 tracking-tight uppercase'>
              Need something else?
            </h2>
            <p className='text-2xl font-medium mb-12 max-w-3xl mx-auto opacity-90'>
              If you don't see something you need listed, please reach out to us. And don't forget
              to visit our website at{' '}
              <a href='https://jgb.solutions' className='underline hover:text-white'>
                https://jgb.solutions
              </a>{' '}
              for more up to date information.
            </p>
            <Button
              asChild
              size='lg'
              className='rounded-none bg-black text-white hover:bg-zinc-900 border-0 h-16 px-12 text-xl font-bold uppercase tracking-widest'
            >
              <Link to='/' hash='contact'>
                Contact Us
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </LandingLayout>
  )
}
