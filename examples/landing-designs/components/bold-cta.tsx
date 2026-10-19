import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BoldSection } from '@/components/landing/bold-theme'
import { SITE } from '@/lib/constants'

interface BoldCtaProps {
  title?: string
  description?: string
  variant?: 'orange' | 'black'
}

export function BoldCta({
  title = 'Ready to get started?',
  description = "If you don't see something you need listed, please reach out to us.",
  variant = 'orange',
}: BoldCtaProps) {
  const isOrange = variant === 'orange'

  return (
    <BoldSection variant={isOrange ? 'orange' : 'black'}>
      <div className='max-w-3xl mx-auto text-center'>
        <h2 className='text-3xl md:text-5xl font-bold mb-6'>{title}</h2>
        <p className={cnMuted(isOrange)}>{description}</p>
        <p className={cnMuted(isOrange, 'text-sm mt-4 mb-10')}>
          Visit{' '}
          <a
            href={SITE.url}
            className={
              isOrange
                ? 'text-black font-semibold underline'
                : 'text-orange-500 font-semibold underline'
            }
          >
            {SITE.url}
          </a>{' '}
          for the most up-to-date information.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild className={cnButton(isOrange, 'primary')}>
            <a href='#contact'>
              Get in touch <ArrowRight className='w-4 h-4 ml-2' />
            </a>
          </Button>
          <Button asChild variant='outline' className={cnButton(isOrange, 'outline')}>
            <a href={`mailto:${SITE.email}`}>Email us</a>
          </Button>
        </div>
      </div>
    </BoldSection>
  )
}

function cnMuted(isOrange: boolean, extra?: string) {
  return `${isOrange ? 'text-black/70' : 'text-neutral-400'} ${extra ?? 'mb-4'}`.trim()
}

function cnButton(isOrange: boolean, type: 'primary' | 'outline') {
  if (type === 'primary') {
    return isOrange
      ? 'rounded-xl bg-black text-white hover:bg-neutral-900'
      : 'rounded-xl bg-orange-500 text-black hover:bg-orange-400'
  }
  return isOrange
    ? 'rounded-xl border-black text-black hover:bg-black/10 bg-transparent'
    : 'rounded-xl border-orange-500 text-orange-500 hover:bg-orange-500/10 bg-transparent'
}
