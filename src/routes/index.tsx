import { createFileRoute } from '@tanstack/react-router'
import { HomeHero } from '@/components/home/home-hero'
import { HomeInsights, HomeProducts, HomeServices, HomeWork } from '@/components/home/home-sections'
import { ContactSection } from '@/components/site/contact-section'
import { ProcessSection } from '@/components/site/process-section'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { FEATURES } from '@/lib/features'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () =>
    createPageSEO({
      title: 'JGB Solutions - Websites, Mobile Apps & Social Media',
      description:
        'JGB Solutions designs and builds websites, mobile apps and social media for businesses, and makes its own products like JGB Tools. Based in Laval, Québec. Contact us for a quote.',
      path: '/',
    }),
  component: Home,
})

function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main className='flex-1'>
        <HomeHero tone='brand' />
        <HomeServices tone='paper' />
        <HomeProducts tone='ink' />
        <HomeWork tone='paper' />
        <ProcessSection tone='mist' />
        {FEATURES.blog && <HomeInsights tone='paper' />}
        <ContactSection tone='brand' />
      </main>
      <SiteFooter />
    </div>
  )
}
