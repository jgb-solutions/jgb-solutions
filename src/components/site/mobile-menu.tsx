import { Link } from '@tanstack/react-router'
import { buttonStyles } from '@/components/site/section'
import { NAV_LINKS, StartProjectLink } from '@/components/site/site-header'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const mobileLinkClass =
  'py-2 font-display text-lg font-semibold uppercase tracking-wider hover:text-brand data-[status=active]:text-brand'

/**
 * The phone and tablet menu. It's loaded the first time someone opens it (SiteHeader), so the
 * dialog code isn't part of every page.
 */
export function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const close = () => onOpenChange(false)
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='right' className='border-ink-line bg-ink text-paper'>
        <SheetHeader>
          <SheetTitle className='text-paper'>Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label='Mobile' className='mt-8 flex flex-col gap-2 px-4'>
          <Link to='/' className={mobileLinkClass} onClick={close}>
            Home
          </Link>
          {NAV_LINKS.map(link => (
            <Link key={link.to} to={link.to} className={mobileLinkClass} onClick={close}>
              {link.label}
            </Link>
          ))}
          <StartProjectLink className={buttonStyles('brand', 'mt-6')} onClick={close} />
        </nav>
      </SheetContent>
    </Sheet>
  )
}
