import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { BoldPageShell } from '@/components/landing/bold-theme'

interface BoldLandingLayoutProps {
  children: ReactNode
}

export function BoldLandingLayout({ children }: BoldLandingLayoutProps) {
  return (
    <BoldPageShell>
      <div className='[&_nav]:bg-black/90 [&_nav]:backdrop-blur-md [&_nav]:border-b [&_nav]:border-orange-500/20'>
        <SiteHeader />
      </div>
      {children}
      <div className='bg-black border-t border-orange-500/20 [&_footer]:border-orange-500/20'>
        <SiteFooter />
      </div>
    </BoldPageShell>
  )
}
