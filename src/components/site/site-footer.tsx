import { Link } from '@tanstack/react-router'
import { Instagram, Linkedin } from 'lucide-react'
import { ContactSection } from '@/components/site/contact-section'
import { Logo } from '@/components/site/logo'
import { Container } from '@/components/site/section'
import { SITE } from '@/lib/constants'
import { FEATURES } from '@/lib/features'
import { OFFERED_SERVICES } from '@/lib/services'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jgb-dev/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/jgbgram/', icon: Instagram },
]

const headingClass = 'font-mono text-xs uppercase tracking-[0.2em] text-brand'
const linkClass = 'text-muted-paper transition-colors hover:text-paper'

/**
 * The bottom of every page: the contact band (`#contact`, which every "Start a project" link
 * targets) and the footer itself.
 */
export function SiteFooter() {
  return (
    <>
      <ContactSection tone='brand' />
      <footer className='bg-ink text-paper'>
        <Container className='grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='flex flex-col gap-5'>
            <Link to='/' aria-label='JGB Solutions home'>
              <Logo className='h-7' />
            </Link>
            <p className='max-w-xs text-sm leading-relaxed text-muted-paper'>
              Websites, mobile apps and social media for businesses, and products of our own.
            </p>
          </div>

          <div className='flex flex-col gap-4'>
            <h2 className={headingClass}>Services</h2>
            <ul className='flex flex-col gap-2 text-sm'>
              {OFFERED_SERVICES.map(service => (
                <li key={service.slug}>
                  <Link to='/services/$slug' params={{ slug: service.slug }} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-4'>
            <h2 className={headingClass}>Company</h2>
            <ul className='flex flex-col gap-2 text-sm'>
              <li>
                <Link to='/about' className={linkClass}>
                  About
                </Link>
              </li>
              <li>
                <Link to='/products' className={linkClass}>
                  Products
                </Link>
              </li>
              <li>
                <Link to='/projects' className={linkClass}>
                  Work
                </Link>
              </li>
              {FEATURES.blog && (
                <li>
                  <Link to='/posts' className={linkClass}>
                    Insights
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className='flex flex-col gap-4'>
            <h2 className={headingClass}>Contact</h2>
            <ul className='flex flex-col gap-2 text-sm'>
              <li>
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsappHref}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={linkClass}
                >
                  {SITE.phone}
                </a>
              </li>
            </ul>
            <div className='flex gap-2'>
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='border border-ink-line p-2.5 text-muted-paper transition-colors hover:border-brand hover:text-brand'
                >
                  <Icon className='h-4 w-4' />
                </a>
              ))}
            </div>
          </div>
        </Container>

        <div className='border-t border-ink-line'>
          <Container className='flex flex-col gap-2 py-6 text-xs text-muted-paper sm:flex-row sm:justify-between'>
            <p>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <p className='flex gap-4'>
              <Link to='/privacy' className='hover:text-paper'>
                Privacy
              </Link>
              <span>Made in {SITE.location}.</span>
            </p>
          </Container>
        </div>
      </footer>
    </>
  )
}
