import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type SectionTone = 'paper' | 'mist' | 'ink' | 'brand'

const toneClasses: Record<SectionTone, string> = {
  paper: 'bg-paper text-ink',
  mist: 'bg-mist text-ink',
  ink: 'bg-ink text-paper',
  brand: 'bg-brand text-ink',
}

/** Secondary text color that stays readable on each tone. */
export const mutedText: Record<SectionTone, string> = {
  paper: 'text-muted-ink',
  mist: 'text-muted-ink',
  ink: 'text-muted-paper',
  brand: 'text-ink/75',
}

interface SectionProps {
  children: ReactNode
  tone?: SectionTone
  id?: string
  className?: string
  /** Classes for the inner, width-limited container. */
  containerClassName?: string
}

/** A full-width color band with the content centered in the site's container. */
export function Section({
  children,
  tone = 'paper',
  id,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn(toneClasses[tone], 'py-20 md:py-28', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-6 md:px-10', className)}>{children}</div>
}

/** Small mono uppercase label above a section heading ("Our services"). */
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('font-mono text-xs uppercase tracking-[0.2em] opacity-80', className)}>
      {children}
    </p>
  )
}

export type ButtonTone = 'brand' | 'ink' | 'paper' | 'outline'

const buttonToneClasses: Record<ButtonTone, string> = {
  brand: 'bg-brand text-ink hover:bg-ink hover:text-paper',
  ink: 'bg-ink text-paper hover:bg-paper hover:text-ink',
  paper: 'bg-paper text-ink hover:bg-brand',
  outline: 'border-2 border-current hover:bg-current/10',
}

/** Square, bold button styles for links and buttons. */
export function buttonStyles(tone: ButtonTone = 'brand', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
    buttonToneClasses[tone],
    className
  )
}
