import { useEffect, useState } from 'react'
import { Check, Link2, Mail, Share2 } from 'lucide-react'
import type { ComponentType } from 'react'
import type { ShareNetwork } from '@/lib/share'
import { Facebook, Linkedin } from '@/components/site/brand-icons'
import { GlyphIcon } from '@/components/site/share-icons'
import { WhatsAppIcon } from '@/components/site/whatsapp-icon'
import { SITE } from '@/lib/constants'
import { normalizePath, shareLinks } from '@/lib/share'
import { cn } from '@/lib/utils'

const ICONS: Record<ShareNetwork, ComponentType<{ className?: string }>> = {
  whatsapp: WhatsAppIcon,
  facebook: Facebook,
  x: props => <GlyphIcon name='x' {...props} />,
  telegram: props => <GlyphIcon name='telegram' {...props} />,
  pinterest: props => <GlyphIcon name='pinterest' {...props} />,
  linkedin: Linkedin,
  email: Mail,
}

const buttonClass =
  'inline-flex h-10 w-10 items-center justify-center border border-current/30 transition-colors hover:border-brand hover:bg-brand hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current'

/**
 * Share buttons for a page: plain links to each network's share page (no third-party scripts),
 * Copy link, and the phone's own share sheet where the browser has one.
 */
export function ShareButtons({
  path,
  title,
  className,
}: {
  path: string
  title: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  // The share sheet only exists in some browsers: shown after load, so the static HTML stays the same.
  const [canShare, setCanShare] = useState(false)
  useEffect(() => setCanShare(typeof navigator.share === 'function'), [])

  const url = `${SITE.url}${normalizePath(path)}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the network links still work.
    }
  }

  async function share() {
    try {
      await navigator.share({ title, url })
    } catch {
      // Closed by the visitor.
    }
  }

  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)} aria-label='Share this page'>
      {canShare && (
        <li>
          <button type='button' onClick={share} className={buttonClass} aria-label='Share'>
            <Share2 className='h-4 w-4' aria-hidden />
          </button>
        </li>
      )}
      {shareLinks(path, title).map(({ network, label, href }) => {
        const Icon = ICONS[network]
        return (
          <li key={network}>
            <a
              href={href}
              target={network === 'email' ? undefined : '_blank'}
              rel='noopener noreferrer'
              className={buttonClass}
              aria-label={`Share on ${label}`}
              title={label}
            >
              <Icon className='h-4 w-4' />
            </a>
          </li>
        )
      })}
      <li>
        <button
          type='button'
          onClick={copy}
          className={buttonClass}
          aria-label={copied ? 'Link copied' : 'Copy link'}
          title='Copy link'
        >
          {copied ? (
            <Check className='h-4 w-4' aria-hidden />
          ) : (
            <Link2 className='h-4 w-4' aria-hidden />
          )}
        </button>
      </li>
    </ul>
  )
}
