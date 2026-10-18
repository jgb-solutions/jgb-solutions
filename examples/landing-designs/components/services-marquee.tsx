import { Asterisk } from 'lucide-react'
import { SERVICES } from '@/lib/services'

export function ServicesMarquee() {
  const labels = SERVICES.map(service => service.title.toUpperCase())

  return (
    <div className='marquee py-4 bg-black dark:bg-primary -skew-y-1 transform'>
      <div className='marquee-content skew-y-1'>
        {[...labels, ...labels].map((label, index) => (
          <span key={index} className='mx-4 inline-flex items-center text-white'>
            {label}
            <Asterisk className='w-4 h-4 text-white/70 mx-4' />
          </span>
        ))}
      </div>
    </div>
  )
}
