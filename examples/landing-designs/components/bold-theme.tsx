import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const boldColors = {
  black: 'bg-black text-white',
  orange: 'bg-orange-500 text-black',
  orangeDark: 'bg-orange-600 text-white',
  blackMuted: 'bg-neutral-950 text-neutral-300',
  orangeMuted: 'bg-orange-500/10 text-white border-orange-500/30',
} as const

interface BoldSectionProps {
  children: ReactNode
  variant?: 'black' | 'orange' | 'orange-dark' | 'black-muted'
  className?: string
  id?: string
}

const variantClasses = {
  black: boldColors.black,
  orange: boldColors.orange,
  'orange-dark': boldColors.orangeDark,
  'black-muted': boldColors.blackMuted,
}

export function BoldSection({ children, variant = 'black', className, id }: BoldSectionProps) {
  return (
    <section id={id} className={cn(variantClasses[variant], 'px-6 md:px-20 py-20', className)}>
      {children}
    </section>
  )
}

interface BoldLayoutProps {
  children: ReactNode
}

export function BoldPageShell({ children }: BoldLayoutProps) {
  return (
    <main className='min-h-screen flex flex-col bg-black text-white [&_.text-muted-foreground]:text-neutral-400'>
      {children}
    </main>
  )
}
