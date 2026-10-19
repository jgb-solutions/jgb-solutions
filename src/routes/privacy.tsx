import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Container, SectionLabel } from '@/components/site/section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { SITE } from '@/lib/constants'
import { createPageSEO } from '@/lib/seo'

// Update this date whenever the policy text changes.
const LAST_UPDATED = 'October 19, 2026'

export const Route = createFileRoute('/privacy')({
  head: () =>
    createPageSEO({
      title: 'Privacy Policy | JGB Solutions',
      description:
        'How JGB Solutions handles your information: no cookies, no analytics and no forms on jgb.solutions. What we keep when you email or message us, and your rights.',
      path: '/privacy',
    }),
  component: PrivacyPage,
})

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className='flex flex-col gap-4'>
      <h2 className='font-display text-2xl font-bold'>{title}</h2>
      <div className='flex flex-col gap-4 leading-relaxed text-muted-ink'>{children}</div>
    </section>
  )
}

const linkClass = 'font-medium text-brand-strong underline underline-offset-2 hover:text-ink'

function PrivacyPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main id='main' className='flex-1'>
        <section className='bg-ink py-16 text-paper md:py-20'>
          <Container className='flex flex-col gap-5'>
            <SectionLabel className='text-brand opacity-100'>Privacy</SectionLabel>
            <h1 className='font-display text-5xl font-extrabold tracking-tight md:text-6xl'>
              Privacy Policy
            </h1>
            <p className='font-mono text-xs uppercase tracking-[0.15em] text-muted-paper'>
              Last updated {LAST_UPDATED}
            </p>
          </Container>
        </section>

        <Container className='py-16 md:py-20'>
          <div className='flex max-w-3xl flex-col gap-12 text-lg'>
            <p className='text-xl leading-relaxed'>
              The short version: jgb.solutions doesn't use cookies, analytics or any tracking, and
              it has no forms. We only receive information about you when you contact us yourself.
            </p>

            <PolicySection title='Who we are'>
              <p>
                JGB Solutions is a web and mobile studio based in {SITE.location}. This policy
                covers this website, jgb.solutions. Our products (such as JGB Tools) have their own
                privacy policies on their own sites.
              </p>
            </PolicySection>

            <PolicySection title='What we collect'>
              <p>
                <strong className='text-ink'>When you browse the site:</strong> nothing that
                identifies you. We don't set cookies, we don't use analytics or advertising tools,
                and we don't load trackers from other companies. Our fonts and images are served
                from our own domains.
              </p>
              <p>
                <strong className='text-ink'>When you contact us</strong> by email or WhatsApp, we
                receive what you send: usually your name, your email address or phone number, and
                your message. We use it only to reply, to prepare a quote and to work on your
                project. We keep it for as long as we work together and for our business records,
                and we never sell it or share it for marketing.
              </p>
            </PolicySection>

            <PolicySection title='Services we rely on'>
              <p>
                <strong className='text-ink'>Hosting:</strong> the site runs on Vercel. Like any web
                server, Vercel processes technical information such as your IP address and browser
                type to deliver pages and protect the site from abuse. See{' '}
                <a
                  href='https://vercel.com/legal/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={linkClass}
                >
                  Vercel's privacy policy
                </a>
                .
              </p>
              <p>
                <strong className='text-ink'>WhatsApp:</strong> if you message us on WhatsApp, your
                conversation goes through WhatsApp (Meta), and{' '}
                <a
                  href='https://www.whatsapp.com/legal/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={linkClass}
                >
                  WhatsApp's privacy policy
                </a>{' '}
                applies.
              </p>
              <p>
                <strong className='text-ink'>Email:</strong> messages to {SITE.email} are stored by
                our email provider so we can read and answer them.
              </p>
            </PolicySection>

            <PolicySection title='Advertising'>
              <p>
                We don't show ads on jgb.solutions. If that changes, we'll update this page before
                any ads appear.
              </p>
            </PolicySection>

            <PolicySection title='Your rights'>
              <p>
                You can ask us what information we have about you, ask us to correct it, or ask us
                to delete it. Write to{' '}
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  {SITE.email}
                </a>{' '}
                and we'll answer within 30 days. The same address reaches the person in charge of
                protecting personal information at JGB Solutions.
              </p>
            </PolicySection>

            <PolicySection title='Changes to this policy'>
              <p>
                If we change how we handle information, we'll update this page and the date at the
                top.
              </p>
            </PolicySection>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  )
}
