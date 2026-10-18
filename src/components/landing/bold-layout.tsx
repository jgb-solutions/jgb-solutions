import type { ReactNode } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { BoldPageShell } from '@/components/landing/bold-theme'
import { LandingVariantsNav } from '@/components/landing/landing-variants-nav'

interface BoldLandingLayoutProps {
  children: ReactNode
}

export function BoldLandingLayout({ children }: BoldLandingLayoutProps) {
  return (
    <BoldPageShell>
      <div className='[&_nav]:bg-black/90 [&_nav]:backdrop-blur-md [&_nav]:border-b [&_nav]:border-orange-500/20'>
        <Navbar />
      </div>
      {children}
      <div className='bg-black border-t border-orange-500/20 [&_footer]:border-orange-500/20'>
        <Footer />
      </div>
      <LandingVariantsNav />
    </BoldPageShell>
  )
}
