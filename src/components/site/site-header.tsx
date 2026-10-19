import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '@/components/site/logo'
import { Container, buttonStyles } from '@/components/site/section'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { FEATURES } from '@/lib/features'

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
const mobileLinkClass =
  'py-2 font-display text-lg font-semibold uppercase tracking-wider hover:text-brand data-[status=active]:text-brand'

/** "Start a project" jumps to the contact band that ends every page (email and WhatsApp). */
function StartProjectLink({ className, onClick }: { className: string; onClick?: () => void }) {
  return (
    <a href='#contact' className={className} onClick={onClick}>
      Start a project
    </a>
  )
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 border-b border-ink-line bg-ink text-paper'>
      <Container className='flex h-16 items-center justify-between gap-6 md:h-20'>
        <Link to='/' aria-label='JGB Solutions home' className='shrink-0'>
          <Logo className='h-6 md:h-7' />
        </Link>

        <nav aria-label='Main' className='hidden items-center gap-8 md:flex'>
          {NAV_LINKS.map(link => (
            <Link key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
          <StartProjectLink className={buttonStyles('brand', 'py-3')} />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button type='button' className='-mr-2 p-2 md:hidden' aria-label='Open menu'>
              <Menu className='h-6 w-6' />
            </button>
          </SheetTrigger>
          <SheetContent side='right' className='border-ink-line bg-ink text-paper'>
            <SheetHeader>
              <SheetTitle className='text-paper'>Menu</SheetTitle>
            </SheetHeader>
            <nav aria-label='Mobile' className='mt-8 flex flex-col gap-2 px-4'>
              <Link to='/' className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                Home
              </Link>
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={mobileLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <StartProjectLink
                className={buttonStyles('brand', 'mt-6')}
                onClick={() => setIsOpen(false)}
              />
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
