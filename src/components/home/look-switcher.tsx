import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { HomeLook } from '@/components/home/look'
import { HOME_LOOKS } from '@/components/home/look'
import { cn } from '@/lib/utils'

// A review tool while the user picks a look: shown locally and on Vercel previews, never on the live site.
const PRODUCTION_HOSTS = ['jgb.solutions', 'www.jgb.solutions']

const LABELS: Record<HomeLook, string> = { bold: 'Bold', light: 'Light' }

export function LookSwitcher({ look }: { look: HomeLook }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!PRODUCTION_HOSTS.includes(window.location.hostname))
  }, [])

  if (!visible) return null

  return (
    <div
      role='group'
      aria-label='Home page look'
      className='fixed bottom-5 right-5 z-[60] flex items-center gap-1 border border-ink/20 bg-paper p-1 font-display text-xs font-bold uppercase tracking-wider text-ink shadow-2xl'
    >
      <span className='px-2 text-muted-ink'>Look</span>
      {HOME_LOOKS.map(option => (
        <Link
          key={option}
          to='/'
          search={{ look: option }}
          className={cn(
            'px-3 py-2 transition-colors',
            option === look ? 'bg-ink text-paper' : 'hover:bg-mist'
          )}
        >
          {LABELS[option]}
        </Link>
      ))}
    </div>
  )
}
