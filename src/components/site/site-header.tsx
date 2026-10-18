import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '@/components/site/logo'
import { Container, buttonStyles } from '@/components/site/section'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'

// Pages join this list as the redesign builds them (Services, Products, About; see docs/PLAN-redesign.md).
const NAV_LINKS = [
  { label: 'Work', to: '/projects' },
  { label: 'Insights', to: '/posts' },
] as const

export const START_PROJECT_HREF = `mailto:${SITE.email}?subject=${encodeURIComponent('New project')}`

interface SiteHeaderProps {
  /** `ink` (black bar, default) or `paper` (white bar, for the light look). */
  tone?: 'ink' | 'paper'
}

export function SiteHeader({ tone = 'ink' }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isPaper = tone === 'paper'

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b',
        isPaper
          ? 'border-ink/10 bg-paper/95 text-ink backdrop-blur'
          : 'border-ink-line bg-ink text-paper'
      )}
    >
      <Container className='flex h-16 items-center justify-between gap-6 md:h-20'>
        <Link to='/' aria-label='JGB Solutions home' className='shrink-0'>
          <Logo className='h-6 md:h-7' wordClassName={isPaper ? 'fill-brand-strong' : undefined} />
        </Link>

        <nav aria-label='Main' className='hidden items-center gap-8 md:flex'>
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'font-display text-sm font-semibold uppercase tracking-wider transition-colors',
                isPaper ? 'text-ink/75 hover:text-brand-strong' : 'text-paper/80 hover:text-brand'
              )}
              activeProps={{ className: isPaper ? 'text-brand-strong' : 'text-brand' }}
            >
              {link.label}
            </Link>
          ))}
          <a href={START_PROJECT_HREF} className={buttonStyles(isPaper ? 'ink' : 'brand', 'py-3')}>
            Start a project
          </a>
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
              <Link
                to='/'
                className='py-2 font-display text-lg font-semibold uppercase tracking-wider hover:text-brand'
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className='py-2 font-display text-lg font-semibold uppercase tracking-wider hover:text-brand'
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a href={START_PROJECT_HREF} className={buttonStyles('brand', 'mt-6')}>
                Start a project
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
