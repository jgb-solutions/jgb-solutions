import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { BoldCta } from '@/components/landing/bold-cta'
import { BoldLandingLayout } from '@/components/landing/bold-layout'
import { BoldSection } from '@/components/landing/bold-theme'
import { Button } from '@/components/ui/button'
import { DIGITAL_SERVICES } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/landing/bold-digital')({
  head: () =>
    createPageSEO({
      title: 'Digital Services - Web, Mobile & Social | JGB Solutions',
      description:
        'Web design, mobile app development, and social media management. Professional digital services with bold results.',
      path: '/landing/bold-digital',
    }),
  component: BoldDigitalLanding,
})

function BoldDigitalLanding() {
  return (
    <BoldLandingLayout>
      {/* Full orange hero */}
      <section className='pt-32 pb-20 bg-orange-500 text-black min-h-[70vh] flex items-center'>
        <div className='px-6 md:px-20 max-w-7xl mx-auto w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <p className='font-mono text-sm tracking-widest uppercase mb-4 opacity-70'>
                Digital Services
              </p>
              <h1 className='text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6'>
                Your business,
                <br />
                online & mobile
              </h1>
              <p className='text-black/70 text-lg max-w-md mb-8'>
                Web design, mobile apps, and social media — everything you need to grow your digital
                presence.
              </p>
              <Button
                asChild
                className='rounded-none bg-black text-white hover:bg-neutral-900 font-bold px-8 py-6'
              >
                <a href='#contact'>
                  Let&apos;s talk <ArrowRight className='w-5 h-5 ml-2' />
                </a>
              </Button>
            </div>
            <div className='grid grid-cols-1 gap-4'>
              {DIGITAL_SERVICES.map((service, i) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.slug}
                    className={`flex items-center gap-4 p-6 ${i % 2 === 0 ? 'bg-black text-white' : 'bg-black/80 text-white'}`}
                  >
                    <Icon className='w-10 h-10 text-orange-500 shrink-0' />
                    <div>
                      <h3 className='font-bold text-lg'>{service.title}</h3>
                      <p className='text-neutral-400 text-sm'>{service.shortDescription}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Black — detailed service blocks */}
      {DIGITAL_SERVICES.map((service, index) => {
        const Icon = service.icon
        const isOrange = index % 2 === 1

        return (
          <BoldSection key={service.slug} variant={isOrange ? 'orange' : 'black'} id={service.slug}>
            <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <Icon className={`w-16 h-16 mb-6 ${isOrange ? 'text-black' : 'text-orange-500'}`} />
                <h2 className='text-3xl md:text-4xl font-black mb-4'>{service.title}</h2>
                <p className={`text-lg mb-8 ${isOrange ? 'text-black/70' : 'text-neutral-400'}`}>
                  {service.description}
                </p>
                <Button
                  asChild
                  className={`rounded-none font-bold ${isOrange ? 'bg-black text-white hover:bg-neutral-900' : 'bg-orange-500 text-black hover:bg-orange-400'}`}
                >
                  <a href='#contact'>Inquire about this service</a>
                </Button>
              </div>
              <ul className={`space-y-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {service.offerings.map(offering => (
                  <li
                    key={offering}
                    className={`flex items-center gap-3 p-4 border ${isOrange ? 'border-black/20 bg-black/5' : 'border-neutral-800 bg-neutral-950'}`}
                  >
                    <Check
                      className={`w-5 h-5 shrink-0 ${isOrange ? 'text-black' : 'text-orange-500'}`}
                    />
                    <span className={isOrange ? 'text-black font-medium' : 'text-neutral-300'}>
                      {offering}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </BoldSection>
        )
      })}

      <BoldCta
        variant='black'
        title='Need digital services?'
        description="Web, mobile, or social — tell us what you're building and we'll help you get there."
      />
    </BoldLandingLayout>
  )
}
