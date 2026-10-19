import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Download } from 'lucide-react'
import {
  Container,
  Section,
  SectionHeading,
  SectionLabel,
  buttonStyles,
  mutedText,
} from '@/components/site/section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { SITE } from '@/lib/constants'
import { products } from '@/lib/products'
import { createPageSEO } from '@/lib/seo'

// Draft copy built from the founder's earlier About text, README and project write-ups. The user
// will rewrite it in their own words (docs/TODO-redesign.md). This is the only page that names
// the founder and shows their photo; the home page speaks as the business.
export const Route = createFileRoute('/about')({
  head: () =>
    createPageSEO({
      title: 'About | JGB Solutions',
      description:
        'JGB Solutions is a web and mobile studio in Laval, Québec, founded by Jean Gérard Bousiquot. Building for the web since 2009.',
      path: '/about',
    }),
  component: AboutPage,
})

const PRINCIPLES = [
  {
    title: 'Fast by default',
    text: 'Pages that load quickly and apps that respond right away, on any phone and any connection.',
  },
  {
    title: 'Simple over clever',
    text: 'Clear code and plain tools that are easy to maintain, so your project stays healthy after launch.',
  },
  {
    title: 'Ship, then improve',
    text: 'We get a working version in front of real people early, then make it better with what we learn.',
  },
  {
    title: 'Built to last',
    text: 'We run our own products every day, so we build the way we would want our own work built.',
  },
]

function AboutPage() {
  const stats = [
    { value: '10+', label: 'years building for the web' },
    { value: 'Dozens', label: 'of clients and projects' },
    { value: String(products.length), label: 'products of our own' },
  ]

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main id='main' className='flex-1'>
        <section className='bg-ink py-16 text-paper md:py-24'>
          <Container className='flex flex-col gap-6'>
            <SectionLabel className='text-brand opacity-100'>About</SectionLabel>
            <h1 className='max-w-4xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl'>
              Software that's fast, simple and <span className='text-brand'>made to last</span>.
            </h1>
            <p className='max-w-2xl text-lg leading-relaxed text-muted-paper md:text-xl'>
              JGB Solutions is a web and mobile studio in {SITE.location}. We design and build
              websites, mobile apps and social media for businesses, and we make products of our
              own.
            </p>
            <dl className='mt-6 grid grid-cols-1 gap-px bg-ink-line sm:grid-cols-3'>
              {stats.map(stat => (
                <div
                  key={stat.label}
                  className='flex flex-col gap-1 bg-ink py-5 sm:px-6 sm:first:pl-0'
                >
                  <dt className='order-2 text-sm text-muted-paper'>{stat.label}</dt>
                  <dd className='order-1 font-display text-4xl font-extrabold text-brand'>
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        <Section tone='paper'>
          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16'>
            <div className='aspect-[4/5] max-w-md overflow-hidden border border-ink/10'>
              <img
                src='https://public.jgb.solutions/jgb-2022-800.jpg'
                alt='Jean Gérard Bousiquot, founder of JGB Solutions'
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='flex flex-col items-start gap-6'>
              <SectionLabel className='text-brand-strong opacity-100'>The founder</SectionLabel>
              <h2 className='font-display text-4xl font-extrabold tracking-tight md:text-5xl'>
                Jean Gérard Bousiquot
              </h2>
              <div
                className={`flex max-w-xl flex-col gap-4 text-lg leading-relaxed ${mutedText.paper}`}
              >
                <p>
                  I've been building for the web since 2009. Over the years I've led teams and
                  delivered projects in legal tech, AI-powered systems and enterprise software, and
                  I've built websites for organizations, businesses and creators.
                </p>
                <p>
                  I started JGB Solutions to do that work as a studio: client projects on one side,
                  our own products on the other. I care about performance and simplicity, and I
                  enjoy mentoring developers along the way.
                </p>
              </div>
              <div className='flex flex-col gap-3 sm:flex-row'>
                <a
                  href='/assets/resumes/Resume-English.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={buttonStyles('outline')}
                >
                  <Download className='h-4 w-4' aria-hidden /> Resume (English)
                </a>
                <a
                  href='/assets/resumes/Resume-French.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={buttonStyles('outline')}
                  hrefLang='fr'
                >
                  <Download className='h-4 w-4' aria-hidden /> Resume (French)
                </a>
              </div>
            </div>
          </div>
        </Section>

        <Section tone='mist' containerClassName='flex flex-col gap-12'>
          <SectionHeading tone='mist' label='How we work' title='What we care about' />
          <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {PRINCIPLES.map(principle => (
              <li
                key={principle.title}
                className='flex flex-col gap-3 border-t-4 border-brand bg-paper p-7'
              >
                <h3 className='font-display text-xl font-bold'>{principle.title}</h3>
                <p className={`leading-relaxed ${mutedText.paper}`}>{principle.text}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section tone='paper' className='py-16 md:py-20'>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <Link to='/services' className={buttonStyles('ink')}>
              Our services <ArrowRight className='h-4 w-4' aria-hidden />
            </Link>
            <Link to='/products' className={buttonStyles('outline')}>
              Our products <ArrowRight className='h-4 w-4' aria-hidden />
            </Link>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  )
}
