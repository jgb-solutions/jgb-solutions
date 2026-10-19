import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export const DESIGNS = [
  { name: 'Current homepage', path: '/' },
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
] as const

// The switcher is a review tool: it shows locally and on Vercel previews, never on the live site.
const PRODUCTION_HOSTS = ['jgb.solutions', 'www.jgb.solutions']

export function DesignSwitcher() {
  const [visible, setVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = useRouterState({ select: s => s.location.pathname })

  useEffect(() => {
    setVisible(!PRODUCTION_HOSTS.includes(window.location.hostname))
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  if (!visible) return null

  const index = DESIGNS.findIndex(d => d.path === currentPath)
  const current = index >= 0 ? DESIGNS[index] : undefined
  const prev = DESIGNS[index > 0 ? index - 1 : DESIGNS.length - 1]
  const next = DESIGNS[(index + 1) % DESIGNS.length]

  return (
    <div className='fixed bottom-6 right-6 z-[60] text-foreground w-[300px] max-w-[calc(100vw-3rem)]'>
      <div className='bg-background border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col'>
        {isOpen && (
          <div
            id='design-switcher-list'
            className='max-h-[360px] overflow-y-auto p-2 border-b border-border'
          >
            <div className='flex flex-col gap-1'>
              {DESIGNS.map((d, i) => (
                <Link
                  key={d.path}
                  to={d.path}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-3',
                    d.path === currentPath
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                  aria-current={d.path === currentPath ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className='w-5 text-xs tabular-nums opacity-70'>{i + 1}</span>
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className='h-12 flex items-center bg-card'>
          <Link
            to={prev.path}
            className='h-full px-3 flex items-center hover:bg-secondary transition-colors'
            aria-label={`Previous design: ${prev.name}`}
          >
            <ChevronLeft className='w-4 h-4' />
          </Link>
          <button
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls='design-switcher-list'
            className='h-full flex-1 min-w-0 px-2 flex items-center justify-between gap-2 hover:bg-secondary text-sm font-medium cursor-pointer transition-colors border-x border-border'
          >
            <span className='truncate'>
              {current ? (
                <>
                  <span className='text-muted-foreground tabular-nums mr-2'>
                    {index + 1}/{DESIGNS.length}
                  </span>
                  {current.name}
                </>
              ) : (
                'Designs'
              )}
            </span>
            {isOpen ? (
              <ChevronDown className='w-4 h-4 shrink-0' />
            ) : (
              <ChevronUp className='w-4 h-4 shrink-0' />
            )}
          </button>
          <Link
            to={next.path}
            className='h-full px-3 flex items-center hover:bg-secondary transition-colors'
            aria-label={`Next design: ${next.name}`}
          >
            <ChevronRight className='w-4 h-4' />
          </Link>
        </div>
      </div>
    </div>
  )
}
