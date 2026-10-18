import { Link, createFileRoute } from '@tanstack/react-router'
import { Asterisk, Check, Globe } from 'lucide-react'
import { LandingCta } from '@/components/landing/landing-cta'
import { LandingLayout } from '@/components/landing/landing-layout'
import { Button } from '@/components/ui/button'
import { getServiceBySlug } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

const SERVICE_SLUG = 'web-design-development'

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We learn about your business, goals, audience, and what success looks like.',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Wireframes and visual designs that match your brand and convert visitors.',
  },
  {
    step: '03',
    title: 'Development',
    description: 'Clean, fast code built with modern tools — responsive on every screen size.',
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'We deploy, test, and stay available for updates and improvements.',
  },
]

export const Route = createFileRoute('/landing/web-design')({
  head: () => {
    const service = getServiceBySlug(SERVICE_SLUG)
    return createPageSEO({
      title: `${service?.title ?? 'Web Design'} - JGB Solutions`,
      description:
        service?.description ??
        'Professional web design and development services for businesses of all sizes.',
      path: '/landing/web-design',
    })
  },
  component: WebDesignLanding,
})

function WebDesignLanding() {
  const service = getServiceBySlug(SERVICE_SLUG)

  if (!service) return null

  return (
    <LandingLayout>
      {/* Split hero — mirrors homepage layout */}
      <section className='pt-28 pb-12 px-6 md:px-20'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12'>
          <div className='w-full md:w-1/2'>
            <div className='text-sm md:text-base tracking-wider text-primary mb-4'>
              web.design.development.
            </div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6'>
              Websites that work as hard as you do
            </h1>
            <p className='text-lg text-muted-foreground mb-8'>{service.description}</p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button asChild className='rounded-xl'>
                <Link to='/' hash='contact'>
                  Request a quote
                </Link>
              </Button>
              <Button asChild variant='secondary' className='rounded-xl'>
                <Link to='/projects'>See our work</Link>
              </Button>
            </div>
          </div>
          <div className='w-full md:w-1/2 h-[300px] md:h-[450px] relative rounded-[2rem] overflow-hidden bg-secondary dark:bg-card flex items-center justify-center'>
            <Globe className='w-32 h-32 text-primary/30' />
          </div>
        </div>
      </section>

      {/* Offerings grid */}
      <section className='py-20 px-6 md:px-20 bg-secondary dark:bg-card'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-light mb-4'>What we deliver</h2>
          <p className='text-muted-foreground mb-12 max-w-2xl'>
            End-to-end web design and development — from first sketch to live site.
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {service.offerings.map(offering => (
              <div
                key={offering}
                className='p-6 rounded-2xl bg-background border border-border group hover:border-primary/50 transition-colors'
              >
                <Check className='w-6 h-6 text-primary mb-4' />
                <h3 className='text-lg font-medium mb-2'>{offering}</h3>
                <p className='text-sm text-muted-foreground'>
                  Professional {offering.toLowerCase()} tailored to your business needs.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className='py-20 px-6 md:px-20'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-light mb-12 flex items-center gap-3'>
            How we work
            <Asterisk className='w-6 h-6 text-primary' />
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {processSteps.map(step => (
              <div key={step.step} className='group'>
                <span className='text-4xl font-light text-primary/30 group-hover:text-primary transition-colors'>
                  {step.step}
                </span>
                <h3 className='text-xl font-light mt-2 mb-3'>{step.title}</h3>
                <p className='text-muted-foreground text-sm'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us — uses existing services section style */}
      <section className='py-20 px-6 md:px-20 bg-secondary dark:bg-card'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div>
            <h2 className='text-3xl md:text-4xl font-light mb-6'>Built for performance</h2>
            <p className='text-muted-foreground mb-6'>
              We don&apos;t just make sites look good — we build them to load fast, rank well, and
              convert visitors into customers. Every project gets the same attention to detail,
              whether it&apos;s a simple landing page or a full web application.
            </p>
          </div>
          <div className='space-y-6'>
            {[
              'Mobile-first, responsive design',
              'Fast load times and SEO basics',
              'Modern, maintainable codebase',
              'Clear communication throughout',
            ].map(item => (
              <div key={item} className='flex items-start gap-4'>
                <Asterisk className='w-5 h-5 text-primary mt-1 shrink-0' />
                <p className='text-muted-foreground'>{item}</p>
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
            Landing page variant B — single-service focused (Web Design & Development)
          </p>
        </div>
      </section>

      <LandingCta
        title='Need a website?'
        description="Tell us about your project and we'll get back to you with next steps. Custom scopes welcome."
      />
    </LandingLayout>
  )
}
