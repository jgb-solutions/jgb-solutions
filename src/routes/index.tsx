import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import MarqueeBar from '@/components/marquee-bar'
import FeaturedProjects from '@/components/featured-projects'
import About from '@/components/about'
import Services from '@/components/services'
import RecentPosts from '@/components/recent-posts'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import { createPageSEO } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () =>
    createPageSEO({
      title: 'JGB Solutions - Web & Mobile Development',
      description:
        'Portfolio showcasing 20+ web and mobile development projects. Expertise in React, TypeScript, Node.js, and scalable solutions. Available for freelance and consulting.',
      path: '/',
    }),
  component: Home,
})

function Home() {
  return (
    <main className='min-h-screen flex flex-col'>
      <div className='relative bg-background'>
        <Navbar />
        <Hero />
        <MarqueeBar />
      </div>
      <FeaturedProjects />
      <About />
      <Services />
      <RecentPosts />
      <ClientOnly
        fallback={
          <div className='py-20 text-center text-muted-foreground'>Loading contact form...</div>
        }
      >
        <Contact />
      </ClientOnly>
      <Footer />
    </main>
  )
}
