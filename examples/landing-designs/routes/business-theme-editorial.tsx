import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/business-theme-editorial')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services | JGB Solutions',
      description:
        'We offer professional digital services including Web Design, Mobile Apps, Social Media, and more.',
      path: '/landing/business-theme-editorial',
    }),
  component: BusinessThemeEditorial,
})

function BusinessThemeEditorial() {
  return (
    <LandingLayout>
      <div className='bg-background text-foreground min-h-screen'>
        {/* Editorial Hero */}
        <section className='pt-32 pb-16 px-6 md:px-20 border-b border-border'>
          <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end'>
            <div className='md:col-span-8'>
              <h1 className='text-5xl sm:text-6xl md:text-8xl font-light tracking-tighter leading-[1.1] mb-6 md:mb-0'>
                Professional <br />
                <span className='font-semibold'>Digital Services.</span>
              </h1>
            </div>
            <div className='md:col-span-4 pb-2'>
              <p className='text-lg md:text-xl text-muted-foreground mb-6'>
                Delivering high-quality solutions across Web, Mobile, Social Media, Photography,
                Graphic Design, and Print.
              </p>
              <Button asChild size='lg' className='rounded-none w-full md:w-auto'>
                <Link to='/' hash='contact'>
                  Start a project <ArrowRight className='ml-2 w-4 h-4' />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* List Sections */}
        <div className='max-w-7xl mx-auto'>
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <section
                key={service.slug}
                className='py-16 px-6 md:px-20 border-b border-border hover:bg-muted/30 transition-colors'
              >
                <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
                  {/* Icon & Index */}
                  <div className='md:col-span-2 flex flex-col justify-between'>
                    <span className='text-sm font-mono text-muted-foreground mb-4'>
                      No. 0{index + 1}
                    </span>
                    <Icon className='w-12 h-12 text-primary' />
                  </div>
                  {/* Title */}
                  <div className='md:col-span-4'>
                    <h2 className='text-3xl md:text-4xl font-medium tracking-tight'>
                      {service.title}
                    </h2>
                  </div>
                  {/* Content */}
                  <div className='md:col-span-6'>
                    <p className='text-xl text-muted-foreground mb-8'>{service.description}</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      {service.offerings.map(offering => (
                        <div key={offering} className='flex items-start gap-3'>
                          <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0'></div>
                          <span className='text-foreground'>{offering}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        {/* Custom CTA */}
        <section className='py-32 px-6 md:px-20 bg-secondary text-secondary-foreground'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl md:text-6xl font-light mb-8 tracking-tight'>
              Don't see what you need?
            </h2>
            <p className='text-xl text-muted-foreground mb-10'>
              If you don't see something you need listed, please reach out to us. And don't forget
              to visit our website at{' '}
              <a href='https://jgb.solutions' className='text-primary hover:underline'>
                https://jgb.solutions
              </a>{' '}
              for more up to date information.
            </p>
            <Button asChild size='lg' className='rounded-none px-12'>
              <Link to='/' hash='contact'>
                Reach Out <ArrowRight className='ml-2 w-4 h-4' />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </LandingLayout>
  )
}
