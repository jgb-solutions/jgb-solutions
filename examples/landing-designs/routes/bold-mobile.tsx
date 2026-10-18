import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check, Smartphone } from 'lucide-react'
import { BoldCta } from '@/components/landing/bold-cta'
import { BoldLandingLayout } from '@/components/landing/bold-layout'
import { BoldSection } from '@/components/landing/bold-theme'
import { Button } from '@/components/ui/button'
import { getServiceBySlug } from '@/lib/services'
import { createPageSEO } from '@/lib/seo'

const SERVICE_SLUG = 'mobile-app-design-development'

const highlights = [
  'Cross-platform iOS & Android',
  'UI/UX design from scratch',
  'MVP to production-ready',
  'App store launch support',
]

export const Route = createFileRoute('/landing/bold-mobile')({
  head: () => {
    const service = getServiceBySlug(SERVICE_SLUG)
    return createPageSEO({
      title: `${service?.title ?? 'Mobile Apps'} - JGB Solutions`,
      description:
        service?.description ??
        'Professional mobile app design and development for iOS and Android.',
      path: '/landing/bold-mobile',
    })
  },
  component: BoldMobileLanding,
})

function BoldMobileLanding() {
  const service = getServiceBySlug(SERVICE_SLUG)
  if (!service) return null

  return (
    <BoldLandingLayout>
      {/* Split black / orange hero */}
      <section className='pt-28 min-h-[85vh] grid grid-cols-1 lg:grid-cols-2'>
        <div className='bg-black px-6 md:px-16 py-20 flex flex-col justify-center'>
          <Smartphone className='w-20 h-20 text-orange-500 mb-8' />
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6'>
            MOBILE APPS
            <br />
            <span className='text-orange-500'>BUILT RIGHT</span>
          </h1>
          <p className='text-neutral-400 text-lg mb-8 max-w-md'>{service.description}</p>
          <div className='flex flex-wrap gap-3 mb-10'>
            {highlights.map(item => (
              <span
                key={item}
                className='text-xs uppercase tracking-wider border border-orange-500/50 text-orange-500 px-3 py-1.5'
              >
                {item}
              </span>
            ))}
          </div>
          <Button
            asChild
            className='rounded-none bg-orange-500 text-black hover:bg-orange-400 font-bold w-fit px-8 py-6'
          >
            <Link to='/' hash='contact'>
              Build your app <ArrowRight className='w-5 h-5 ml-2' />
            </Link>
          </Button>
        </div>
        <div className='bg-orange-500 px-6 md:px-16 py-20 flex flex-col justify-center text-black'>
          <p className='font-mono text-sm tracking-widest uppercase mb-8 opacity-70'>
            What we offer
          </p>
          <ul className='space-y-6'>
            {service.offerings.map((offering, i) => (
              <li key={offering} className='flex items-start gap-4 border-b border-black/20 pb-6'>
                <span className='text-3xl font-black opacity-30'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className='font-bold text-xl mb-1'>{offering}</h3>
                  <p className='text-black/60 text-sm'>
                    Professional {offering.toLowerCase()} for your mobile product.
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Black process */}
      <BoldSection variant='black'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-4xl font-black mb-4'>
            FROM IDEA TO <span className='text-orange-500'>APP STORE</span>
          </h2>
          <p className='text-neutral-400 mb-16 max-w-xl'>
            A clear path from concept to launch — design, build, test, and ship.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-0 border border-neutral-800'>
            {[
              { step: '01', title: 'Define', desc: 'Scope, users, and core features' },
              { step: '02', title: 'Design', desc: 'Wireframes and polished UI' },
              { step: '03', title: 'Build', desc: 'Development and testing' },
              { step: '04', title: 'Launch', desc: 'Deploy and iterate' },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`p-8 border-neutral-800 ${i < 3 ? 'md:border-r' : ''} ${i === 1 || i === 3 ? 'bg-neutral-950' : ''}`}
              >
                <div className='text-orange-500 font-black text-2xl mb-4'>{item.step}</div>
                <h3 className='font-bold text-xl mb-2'>{item.title}</h3>
                <p className='text-neutral-400 text-sm'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </BoldSection>

      {/* Orange feature strip */}
      <BoldSection variant='orange' className='py-16'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            {
              title: 'Native feel',
              desc: 'Apps that feel fast and intuitive on every device.',
            },
            {
              title: 'Scalable code',
              desc: 'Built to grow with your user base and feature set.',
            },
            {
              title: 'Ongoing support',
              desc: 'We stay available after launch for updates and fixes.',
            },
          ].map(feature => (
            <div key={feature.title} className='text-center md:text-left'>
              <Check className='w-8 h-8 mb-4 mx-auto md:mx-0' />
              <h3 className='font-black text-xl mb-2'>{feature.title}</h3>
              <p className='text-black/70'>{feature.desc}</p>
            </div>
          ))}
        </div>
      </BoldSection>

      <section className='py-8 px-6 bg-black text-neutral-500 text-center text-sm border-t border-orange-500/20'>
        Landing page variant F — bold orange & black, mobile app focused
      </section>

      <BoldCta
        variant='orange'
        title='Have an app idea?'
        description="Share your vision and we'll help you turn it into a product people love."
      />
    </BoldLandingLayout>
  )
}
