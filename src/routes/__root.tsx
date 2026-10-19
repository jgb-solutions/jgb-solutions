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
import { OG_IMAGE, SEO, SITE, SOCIAL } from '@/lib/constants'
import { Container, buttonStyles } from '@/components/site/section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: `${SITE.name} - Web, Mobile & Social Media`,
      },

      // SEO Meta Tags
      {
        name: 'description',
        content: SEO.description,
      },
      { name: 'author', content: SITE.author },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'keywords',
        content: SEO.keywords.join(', '),
      },

      // Open Graph Tags
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: SITE.url },
      {
        property: 'og:title',
        content: `${SITE.name} - Software Engineer & Mentor`,
      },
      {
        property: 'og:description',
        content:
          'Full-stack software engineer specializing in React, TypeScript, and scalable web solutions. View my portfolio of 20+ successful projects.',
      },
      {
        property: 'og:image',
        content: OG_IMAGE.url,
      },
      { property: 'og:image:width', content: OG_IMAGE.width.toString() },
      { property: 'og:image:height', content: OG_IMAGE.height.toString() },
      {
        property: 'og:image:alt',
        content: OG_IMAGE.alt,
      },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: 'en_US' },

      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: SOCIAL.twitter },
      { name: 'twitter:creator', content: SOCIAL.twitter },
      {
        name: 'twitter:title',
        content: `${SITE.name} - Software Engineer & Mentor`,
      },
      {
        name: 'twitter:description',
        content:
          'Full-stack software engineer specializing in React, TypeScript, and scalable web solutions.',
      },
      {
        name: 'twitter:image',
        content: OG_IMAGE.url,
      },
      {
        name: 'twitter:image:alt',
        content: OG_IMAGE.alt,
      },
    ],
    links: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/assets/icons/apple-icon-180x180-dunplab-008.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/assets/icons/favicon-96x96-dunplab-008.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/assets/icons/favicon-32x32-dunplab-008.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/assets/icons/favicon-16x16-dunplab-008.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main className='flex-1'>
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
