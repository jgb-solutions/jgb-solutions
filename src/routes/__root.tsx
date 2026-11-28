import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
// The fonts the first screen needs (headings, body text): preloaded so text doesn't reflow
import interRegular from '@fontsource/inter/files/inter-latin-400-normal.woff2?url'
import sairaExtraBold from '@fontsource/saira/files/saira-latin-800-normal.woff2?url'
import type { ReactNode } from 'react'
import '@/globals.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/saira/600.css'
import '@fontsource/saira/700.css'
import '@fontsource/saira/800.css'
import '@fontsource/jetbrains-mono/400.css'
import { SEO, SITE } from '@/lib/constants'
import { createOrganizationJsonLd, createSEOMeta } from '@/lib/seo'
import { Container, buttonStyles } from '@/components/site/section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { VisitorMetrics } from '@/components/site/visitor-metrics'

export const Route = createRootRoute({
  // Site-wide defaults; each page's own head() overrides the title, description, image and URL.
  head: ({ matches }) => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // A missing page (the 404 below) is never indexed.
      { name: 'robots', content: isNotFound(matches) ? 'noindex, follow' : 'index, follow' },
      { name: 'keywords', content: SEO.keywords.join(', ') },
      { name: 'theme-color', content: '#050708' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: 'en_US' },
      ...createSEOMeta({
        title: `${SITE.name} - Websites, E-commerce, Mobile Apps & Social Media`,
        path: '/',
      }),
    ],
    links: [
      ...[sairaExtraBold, interRegular].map(href => ({
        rel: 'preload',
        as: 'font',
        type: 'font/woff2',
        href,
        crossOrigin: 'anonymous' as const,
      })),
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
    scripts: [createOrganizationJsonLd()],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

/** Whether the page being rendered is the 404 (no route matched, or a route's loader said so). */
function isNotFound(matches: ReadonlyArray<{ status: string; _notFound?: boolean }>) {
  return matches.some(match => match.status === 'notFound' || match._notFound)
}

/** The site's sections, as the folders `ls` prints in the 404 page's terminal. */
const SECTIONS = [
  { to: '/', name: 'home' },
  { to: '/services', name: 'services' },
  { to: '/projects', name: 'projects' },
  { to: '/products', name: 'products' },
  { to: '/about', name: 'about' },
] as const

/**
 * The 404 page: the big 404 and its buttons, beside a terminal that tries to open the page, fails,
 * and lists the folders that do exist (real links). Text and CSS only.
 */
function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main id='main' className='flex-1'>
        <section className='bg-ink py-20 text-paper md:py-28'>
          <Container className='grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,30rem)]'>
            <div className='flex flex-col items-start gap-6'>
              <p className='font-display text-7xl font-extrabold leading-none text-brand md:text-9xl'>
                404
              </p>
              <h1 className='font-display text-4xl font-extrabold tracking-tight md:text-6xl'>
                Page Not Found
              </h1>
              <p className='max-w-xl text-lg leading-relaxed text-muted-paper'>
                We build a lot of things. This page isn't one of them: it doesn't exist or has
                moved. Try one of these instead.
              </p>
              <div className='flex flex-col gap-3 pt-2 sm:flex-row'>
                <Link to='/' className={buttonStyles('brand')}>
                  Home
                </Link>
                <Link to='/services' className={buttonStyles('paper')}>
                  Services
                </Link>
                <Link to='/projects' className={buttonStyles('outline')}>
                  Our work
                </Link>
              </div>
            </div>
            <div className='overflow-hidden border border-ink-line bg-ink-soft font-mono text-sm shadow-2xl shadow-brand/10'>
              <p
                aria-hidden='true'
                className='flex items-center gap-2 border-b border-ink-line px-4 py-3 text-xs text-muted-paper'
              >
                <span className='size-3 rounded-full bg-[#ff5f57]' />
                <span className='size-3 rounded-full bg-[#febc2e]' />
                <span className='size-3 rounded-full bg-[#28c840]' />
                <span className='ml-2'>jgb.solutions</span>
              </p>
              <div className='space-y-2 p-5 leading-relaxed'>
                <p>
                  <span className='text-brand'>$</span> cd ./this-page
                </p>
                <p className='text-[#ff8a80]'>cd: no such file or directory (404)</p>
                <p>
                  <span className='text-brand'>$</span> git log --oneline -- this-page
                </p>
                <p className='text-muted-paper'># nothing: we never shipped it</p>
                <p>
                  <span className='text-brand'>$</span> ls
                </p>
                <nav aria-label='Sections' className='flex flex-wrap gap-x-5 gap-y-2'>
                  {SECTIONS.map(section => (
                    <Link
                      key={section.to}
                      to={section.to}
                      className='font-semibold text-[#7dd3fc] underline-offset-4 hover:underline'
                    >
                      {section.name}/
                    </Link>
                  ))}
                </nav>
                <p aria-hidden='true'>
                  <span className='text-brand'>$</span>{' '}
                  <span className='inline-block h-4 w-2 translate-y-0.5 bg-paper motion-safe:animate-pulse' />
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter share={false} />
    </div>
  )
}
function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className='bg-paper font-sans text-ink antialiased'>
        {children}
        <Scripts />
        <VisitorMetrics />
      </body>
    </html>
  )
}
