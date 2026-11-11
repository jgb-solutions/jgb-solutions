import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { Suspense, lazy, useState } from 'react'
import { Logo } from '@/components/site/logo'
import { Container, buttonStyles } from '@/components/site/section'
import { FEATURES } from '@/lib/features'

// The menu's dialog code loads the first time it's opened (or when the button is pressed or hovered)
const loadMobileMenu = () => import('@/components/site/mobile-menu')
const MobileMenu = lazy(() => loadMobileMenu().then(m => ({ default: m.MobileMenu })))

// Pages join this list as the redesign builds them (see docs/PLAN-redesign.md).
export const NAV_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Work', to: '/projects' },
  { label: 'About', to: '/about' },
  ...(FEATURES.blog ? [{ label: 'Insights', to: '/posts' }] : []),
] as const

const navLinkClass =
  'font-display text-sm font-semibold uppercase tracking-wider text-paper/80 transition-colors hover:text-brand data-[status=active]:text-brand'

/** "Start a project" jumps to the contact band that ends every page (email and WhatsApp). */
export function StartProjectLink({
  className,
  onClick,
}: {
  className: string
  onClick?: () => void
}) {
  return (
    <a href='#contact' className={className} onClick={onClick}>
      Start a project
    </a>
  )
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  // Mounted once opened, so closing keeps the dialog's closing animation
  const [menuLoaded, setMenuLoaded] = useState(false)

  return (
    <>
      {/* For keyboard and screen-reader users: jump past the navigation */}
      <a
        href='#main'
        className='sr-only z-[60] bg-brand px-4 py-3 font-display text-sm font-bold uppercase tracking-wider text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4'
      >
        Skip to content
      </a>
      <header className='sticky top-0 z-50 border-b border-ink-line bg-ink text-paper'>
        <Container className='flex h-16 items-center justify-between gap-6 md:h-20'>
          <Link to='/' aria-label='JGB Solutions home' className='shrink-0'>
            <Logo className='h-6 md:h-7' />
          </Link>

          <nav aria-label='Main' className='hidden items-center gap-8 lg:flex'>
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
            <StartProjectLink className={buttonStyles('brand', 'py-3')} />
          </nav>

          <button
            type='button'
            className='-mr-2 p-2 lg:hidden'
            aria-label='Open menu'
            aria-haspopup='dialog'
            aria-expanded={isOpen}
            onPointerEnter={loadMobileMenu}
            onPointerDown={loadMobileMenu}
            onClick={() => {
              setMenuLoaded(true)
              setIsOpen(true)
            }}
          >
            <Menu className='h-6 w-6' />
          </button>
          {menuLoaded && (
            <Suspense fallback={null}>
              <MobileMenu open={isOpen} onOpenChange={setIsOpen} />
            </Suspense>
          )}
        </Container>
      </header>
    </>
  )
}
