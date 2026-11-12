import { SITE } from '@/lib/constants'

/** Pages without share buttons: the privacy policy isn't something people pass around. */
const NOT_SHAREABLE = new Set(['/privacy'])

/** A path without its trailing slash (`/services/` and `/services` are the same page). */
export function normalizePath(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export function isShareable(path: string) {
  return !NOT_SHAREABLE.has(normalizePath(path))
}

/**
 * The page's 1200×630 share image, made by scripts/generate-share-images.ts: `/og/<path>.jpg`
 * (`/projects/musivo` → `/og/projects-musivo.jpg`). The home page uses the brand share image.
 */
export function shareImagePath(path: string) {
  const clean = normalizePath(path)
  if (clean === '/') return '/og-image.png'
  return `/og/${clean.slice(1).replaceAll('/', '-')}.jpg`
}

export type ShareNetwork =
  'whatsapp' | 'facebook' | 'x' | 'telegram' | 'pinterest' | 'linkedin' | 'email'

export interface ShareLink {
  network: ShareNetwork
  label: string
  href: string
}

/**
 * Plain share links (no third-party scripts): each network's own share URL, opened in a new tab.
 * `title` is the text that goes with the link.
 */
export function shareLinks(path: string, title: string): Array<ShareLink> {
  const url = `${SITE.url}${normalizePath(path)}`
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const image = encodeURIComponent(`${SITE.url}${shareImagePath(path)}`)
  return [
    { network: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    {
      network: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
    { network: 'x', label: 'X', href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { network: 'telegram', label: 'Telegram', href: `https://t.me/share/url?url=${u}&text=${t}` },
    {
      network: 'pinterest',
      label: 'Pinterest',
      href: `https://www.pinterest.com/pin/create/button/?url=${u}&media=${image}&description=${t}`,
    },
    {
      network: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    { network: 'email', label: 'Email', href: `mailto:?subject=${t}&body=${t}%0A%0A${u}` },
  ]
}
