import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { HomeHero } from '@/components/home/home-hero'
import {
  HomeClients,
  HomeCta,
  HomeInsights,
  HomeProcess,
  HomeProducts,
  HomeServices,
  HomeWork,
} from '@/components/home/home-sections'
import { HOME_LOOKS, HOME_TONES } from '@/components/home/look'
import { LookSwitcher } from '@/components/home/look-switcher'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { createPageSEO } from '@/lib/seo'

const homeSearchSchema = z.object({
  look: z.enum(HOME_LOOKS).optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: homeSearchSchema,
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
  const { look = 'bold' } = Route.useSearch()
  const tones = HOME_TONES[look]

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader tone={tones.header} />
      <main className='flex-1'>
        <HomeHero tone={tones.hero} />
        <HomeClients tone={tones.clients} />
        <HomeServices tone={tones.services} />
        <HomeProducts tone={tones.products} />
        <HomeWork tone={tones.work} />
        <HomeProcess tone={tones.process} />
        <HomeInsights tone={tones.insights} />
        <HomeCta tone={tones.cta} />
      </main>
      <SiteFooter />
      <LookSwitcher look={look} />
    </div>
  )
}
