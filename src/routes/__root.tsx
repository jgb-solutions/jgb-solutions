import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
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

export const Route = createRootRoute({
  // Site-wide defaults; each page's own head() overrides the title, description, image and URL.
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'keywords', content: SEO.keywords.join(', ') },
      { name: 'theme-color', content: '#050708' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: 'en_US' },
      ...createSEOMeta({ title: `${SITE.name} - Websites, Mobile Apps & Social Media`, path: '/' }),
    ],
    links: [
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

function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main id='main' className='flex-1'>
        <section className='bg-ink py-20 text-paper md:py-28'>
          <Container className='flex flex-col items-start gap-6'>
            <p className='font-display text-7xl font-extrabold leading-none text-brand md:text-9xl'>
              404
            </p>
            <h1 className='font-display text-4xl font-extrabold tracking-tight md:text-6xl'>
              Page Not Found
            </h1>
            <p className='max-w-xl text-lg leading-relaxed text-muted-paper'>
              The page you're looking for doesn't exist or has moved. Try one of these instead.
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
          </Container>
        </section>
      </main>
      <SiteFooter />
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
      </body>
    </html>
  )
}
