import type { ReactNode } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface LandingLayoutProps {
  children: ReactNode
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <main className='min-h-screen flex flex-col bg-background'>
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}
