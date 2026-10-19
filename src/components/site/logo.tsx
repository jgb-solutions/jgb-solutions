import { JGB_LETTERS, SOLUTIONS_TRANSFORM, SOLUTIONS_WORD, VIEW_BOX } from '@/lib/brand'
import { cn } from '@/lib/utils'

// The JGB Solutions logo (vector data in src/lib/brand.ts).

interface LogoProps {
  className?: string
  /** Color of the JGB letters (defaults to the current text color). */
  lettersClassName?: string
  /** Color of the word SOLUTIONS (defaults to the brand orange). */
  wordClassName?: string
}

/** Size it with a height class (for example `h-7`); the width follows. */
export function Logo({ className, lettersClassName, wordClassName }: LogoProps) {
  return (
    <svg
      viewBox={VIEW_BOX}
      className={cn('h-7 w-auto', className)}
      role='img'
      aria-label='JGB Solutions'
    >
      <path className={cn('fill-current', lettersClassName)} fillRule='evenodd' d={JGB_LETTERS} />
      <path
        className={cn('fill-brand', wordClassName)}
        transform={SOLUTIONS_TRANSFORM}
        d={SOLUTIONS_WORD}
      />
    </svg>
  )
}
