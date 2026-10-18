import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/business-theme-stacked')({
  head: () =>
    createPageSEO({
      title: 'Professional Digital Services | JGB Solutions',
      description:
        'We offer professional digital services including Web Design, Mobile Apps, Social Media, and more.',
      path: '/landing/business-theme-stacked',
    }),
  component: BusinessThemeStacked,
})

function BusinessThemeStacked() {
  return (
    <LandingLayout>
      <div className='bg-background text-foreground min-h-screen'>
        {/* Boxed Hero */}
        <section className='pt-32 pb-12 px-4 md:px-8'>
          <div className='max-w-7xl mx-auto bg-card border border-border rounded-[2rem] p-8 md:p-16 text-center shadow-sm'>
            <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight'>
              We offer professional digital services
            </h1>
            <p className='text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10'>
              A comprehensive suite of solutions ranging from Web and Mobile App Development to
              Graphic Design and Print.
            </p>
            <Button asChild size='lg' className='rounded-xl'>
              <Link to='/' hash='contact'>
                Get Started <ArrowRight className='ml-2 w-4 h-4' />
              </Link>
            </Button>
          </div>
        </section>

        {/* Stacked Horizontal Cards */}
        <section className='py-12 px-4 md:px-8'>
          <div className='max-w-7xl mx-auto space-y-6'>
            {SERVICES.map(service => {
              const Icon = service.icon
              return (
                <div
                  key={service.slug}
                  className='bg-card border border-border rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16 hover:border-primary/50 transition-colors'
                >
                  <div className='md:w-1/3 flex flex-col justify-center'>
                    <div className='w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6'>
                      <Icon className='w-8 h-8 text-primary' />
                    </div>
                    <h3 className='text-3xl font-bold mb-4'>{service.title}</h3>
                    <p className='text-muted-foreground'>{service.shortDescription}</p>
                  </div>
                  <div className='md:w-2/3 flex flex-col justify-center'>
                    <p className='text-lg mb-8'>{service.description}</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      {service.offerings.map(offering => (
                        <div key={offering} className='flex items-start gap-3'>
                          <CheckCircle2 className='w-5 h-5 text-primary shrink-0' />
                          <span className='text-muted-foreground'>{offering}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Custom CTA */}
        <section className='py-20 px-4 md:px-8 mb-12'>
          <div className='max-w-7xl mx-auto bg-secondary rounded-[2rem] p-12 md:p-20 text-center border border-border'>
            <h2 className='text-3xl md:text-5xl font-bold mb-6'>Need something else?</h2>
            <p className='text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto'>
              If you don't see something you need listed, please reach out to us. And don't forget
              to visit our website at{' '}
              <a href='https://jgb.solutions' className='text-primary hover:underline'>
                https://jgb.solutions
              </a>{' '}
              for more up to date information.
            </p>
            <Button asChild size='lg' className='rounded-xl'>
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
