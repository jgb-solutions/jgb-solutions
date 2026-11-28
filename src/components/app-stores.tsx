import type { StoreLinks } from '@/lib/app-stores'
import { platforms } from '@/lib/app-stores'
import { cn } from '@/lib/utils'

/**
 * Where a product runs (Web · Android · iOS), shown once it has an app in a store. Renders nothing
 * for web-only products.
 */
export function PlatformChips({ links, className }: { links: StoreLinks; className?: string }) {
  const list = platforms(links)
  if (list.length === 0) return null
  return (
    <ul className={cn('flex flex-wrap gap-2', className)} aria-label='Available on'>
      {list.map(platform => (
        <li
          key={platform}
          className='border border-current/30 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.15em]'
        >
          {platform === 'iOS' ? <span className='normal-case'>iOS</span> : platform}
        </li>
      ))}
    </ul>
  )
}

/**
 * The official store badges (Google's and Apple's own artwork, in public/assets/images/badges/),
 * shown at the same height as the guidelines ask: 64 px, as wide and taller than the button above
 * them (owner, 2026-11-28: "make it bigger everywhere"). Renders nothing until a store link is in.
 */
export function StoreBadges({ links, className }: { links: StoreLinks; className?: string }) {
  if (!links.googlePlay && !links.appStore) return null
  return (
    <ul className={cn('flex flex-wrap items-center gap-3', className)} aria-label='Get the app'>
      {links.googlePlay && (
        <li>
          <a href={links.googlePlay} target='_blank' rel='noopener noreferrer' className='block'>
            <img
              src='/assets/images/badges/google-play.png'
              alt='Get it on Google Play'
              width={564}
              height={168}
              className='h-16 w-auto'
            />
          </a>
        </li>
      )}
      {links.appStore && (
        <li>
          <a href={links.appStore} target='_blank' rel='noopener noreferrer' className='block'>
            <img
              src='/assets/images/badges/app-store.svg'
              alt='Download on the App Store'
              width={120}
              height={40}
              className='h-16 w-auto'
            />
          </a>
        </li>
      )}
    </ul>
  )
}
