import type { SectionTone } from '@/components/site/section'
import { Section, SectionHeading, mutedText } from '@/components/site/section'
import { cn } from '@/lib/utils'

const STEPS = [
  {
    title: 'Discovery',
    text: 'A call about your business, your customers and what you need. You get a clear proposal and a quote.',
  },
  {
    title: 'Design',
    text: 'We design the pages or screens and refine them with you before building anything.',
  },
  {
    title: 'Build',
    text: 'Fast, mobile-first and easy for your team to update.',
  },
  {
    title: 'Launch & support',
    text: 'We put it live, show you how it works and stay available for changes.',
  },
]

export function ProcessSection({ tone }: { tone: SectionTone }) {
  return (
    <Section tone={tone} id='process' containerClassName='flex flex-col gap-12'>
      <SectionHeading tone={tone} label='How we work' title='From first call to launch' />
      <ol className='grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4'>
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className={cn(
              'flex flex-col gap-4 p-8',
              tone === 'ink' ? 'bg-ink-soft' : tone === 'mist' ? 'bg-mist' : 'bg-paper'
            )}
          >
            <span className='font-display text-5xl font-extrabold text-brand'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className='font-display text-xl font-bold'>{step.title}</h3>
            <p className={cn('leading-relaxed', mutedText[tone])}>{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
