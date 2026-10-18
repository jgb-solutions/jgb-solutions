import { Link } from '@tanstack/react-router'
import { Asterisk } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/constants'

interface LandingCtaProps {
  title?: string
  description?: string
}

export function LandingCta({
  title = 'Ready to get started?',
  description = "If you don't see something you need listed, please reach out to us. We'd love to hear about your project.",
}: LandingCtaProps) {
  return (
    <section className='py-20 px-6 md:px-20 bg-secondary dark:bg-card'>
      <div className='max-w-3xl mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-light mb-6 flex items-center justify-center gap-3'>
          {title}
          <Asterisk className='w-6 h-6 text-primary shrink-0' />
        </h2>
        <p className='text-muted-foreground mb-4'>{description}</p>
        <p className='text-sm text-muted-foreground mb-8'>
          Visit{' '}
          <a href={SITE.url} className='text-primary hover:underline font-medium'>
            {SITE.url}
          </a>{' '}
          for the most up-to-date information.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild className='rounded-xl'>
            <Link to='/' hash='contact'>
              Get in touch
            </Link>
          </Button>
          <Button asChild variant='outline' className='rounded-xl bg-transparent'>
            <a href={`mailto:${SITE.email}`}>Email us directly</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
