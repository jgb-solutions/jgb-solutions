import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const VARIANTS = [
  { name: 'Services Overview', path: '/landing/services' },
  { name: 'Creative Focus', path: '/landing/creative' },
  { name: 'Web Design', path: '/landing/web-design' },
  { name: 'Bold Services', path: '/landing/bold-services' },
  { name: 'Bold Digital', path: '/landing/bold-digital' },
  { name: 'Bold Mobile', path: '/landing/bold-mobile' },
  { name: 'Business Grid', path: '/landing/business-grid' },
  { name: 'Business Scroll', path: '/landing/business-scroll' },
  { name: 'Business Minimal', path: '/landing/business-minimal' },
  { name: 'Orange Dark', path: '/landing/business-orange-dark' },
  { name: 'Orange Impact', path: '/landing/business-orange-impact' },
  { name: 'Orange Split', path: '/landing/business-orange-split' },
  { name: 'Theme Bento', path: '/landing/business-theme-bento' },
  { name: 'Theme Editorial', path: '/landing/business-theme-editorial' },
  { name: 'Theme Stacked', path: '/landing/business-theme-stacked' },
]

export function LandingVariantsNav() {
  const [isOpen, setIsOpen] = useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  if (!currentPath.startsWith('/landing')) return null

  return (
    <div className='fixed bottom-6 right-6 z-50 text-foreground'>
      <div
        className={cn(
          'bg-background border border-border shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col',
          isOpen ? 'h-[400px] w-[300px]' : 'h-12 w-[180px]'
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='h-12 px-4 w-full flex items-center justify-between bg-card hover:bg-secondary text-sm font-medium z-10 shrink-0 border-b border-border cursor-pointer transition-colors'
        >
          <span>Landing Variants</span>
          {isOpen ? <ChevronDown className='w-4 h-4' /> : <ChevronUp className='w-4 h-4' />}
        </button>

        <div className='overflow-y-auto p-2 flex-1'>
          <div className='flex flex-col gap-1'>
            {VARIANTS.map(v => {
              const isActive = currentPath === v.path
              return (
                <Link
                  key={v.path}
                  to={v.path}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm transition-colors text-left',
                    isActive
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {v.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
