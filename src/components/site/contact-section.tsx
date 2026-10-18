import { Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import type { SectionTone } from '@/components/site/section'
import { Section, buttonStyles, mutedText } from '@/components/site/section'
import { WhatsAppIcon } from '@/components/site/whatsapp-icon'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'

/** The "Have a project in mind?" band: email and WhatsApp (no contact form, by choice). */
export function ContactSection({ tone }: { tone: SectionTone }) {
  return (
    <Section tone={tone} id='contact' containerClassName='flex flex-col items-start gap-8'>
      <h2 className='max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-balance md:text-6xl'>
        Have a project in mind?
      </h2>
      <p className={cn('max-w-xl text-lg leading-relaxed', mutedText[tone])}>
        Tell us what you need and we'll get back to you with a quote.
      </p>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent('New project')}`}
          className={buttonStyles(tone === 'brand' ? 'ink' : 'brand')}
        >
          <Mail className='h-5 w-5' aria-hidden /> Email us
        </a>
        <a
          href={SITE.whatsappHref}
          target='_blank'
          rel='noopener noreferrer'
          className={buttonStyles('outline')}
        >
          <WhatsAppIcon className='h-5 w-5' /> WhatsApp us
        </a>
      </div>
      <CopyEmail tone={tone} />
    </Section>
  )
}

/**
 * The address in plain text with a Copy button: "Email us" opens the visitor's mail app, which does
 * nothing on computers without one set up.
 */
function CopyEmail({ tone }: { tone: SectionTone }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the address stays visible and selectable.
    }
  }

  return (
    <p className={cn('flex flex-wrap items-center gap-3 text-sm', mutedText[tone])}>
      <span className='select-all font-medium'>{SITE.email}</span>
      <button
        type='button'
        onClick={copy}
        className='inline-flex items-center gap-1.5 border border-current/50 px-2.5 py-1 font-semibold transition-colors hover:border-current'
      >
        {copied ? (
          <Check className='h-3.5 w-3.5' aria-hidden />
        ) : (
          <Copy className='h-3.5 w-3.5' aria-hidden />
        )}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </p>
  )
}
