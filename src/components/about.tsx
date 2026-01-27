import { Asterisk, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <section id='about' className='py-20 px-6 md:px-20 bg-secondary dark:bg-card'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div>
            <div className='h-full w-full grayscale hover:grayscale-0 transition-all duration-500 rounded-3xl overflow-hidden'>
              <img
                src='https://public.jgb.solutions/JGB-Gwayavye-28-12-2020.jpg'
                alt='Jean Gérard Bousiquot Working'
                className='object-cover w-full h-full min-h-[400px]'
              />
            </div>
          </div>
          <div className='flex flex-col justify-center'>
            <h2 className='text-3xl md:text-4xl font-light mb-6'>About Me</h2>
            <div className='space-y-6 text-muted-foreground'>
              <p>
                Hi! I'm Jean Bousiquot, a Senior Software Engineer with over 8 years of experience
                in building scalable, high-performance applications. I specialize in full-stack
                development and AI integration.
              </p>
              <p>
                Throughout my career, I've led teams and delivered successful projects across
                various domains, including legal tech, AI-powered systems, and enterprise solutions.
                I'm passionate about mentoring developers and solving complex technical challenges.
              </p>
            </div>

            <div className='mt-8 flex flex-wrap gap-4'>
              <a
                href='/assets/resumes/Resume-English.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='outline' className='gap-2 rounded-xl'>
                  <Download className='w-4 h-4' /> Resume (English)
                </Button>
              </a>
              <a href='/assets/resumes/Resume-French.pdf' target='_blank' rel='noopener noreferrer'>
                <Button variant='outline' className='gap-2 rounded-xl'>
                  <Download className='w-4 h-4' /> Resume (French)
                </Button>
              </a>
            </div>

            <div className='mt-12 grid grid-cols-2 gap-8'>
              <div>
                <h3 className='text-xl mb-4 flex items-center gap-2'>
                  Skills <Asterisk className='w-4 h-4 text-primary' />
                </h3>
                <ul className='space-y-2 text-muted-foreground'>
                  <li>Full-Stack Development</li>
                  <li>AI Integration</li>
                  <li>System Architecture</li>
                  <li>Tech Leadership</li>
                </ul>
              </div>
              <div>
                <h3 className='text-xl mb-4 flex items-center gap-2'>
                  Experience <Asterisk className='w-4 h-4 text-primary' />
                </h3>
                <ul className='space-y-2 text-muted-foreground'>
                  <li>8+ Years</li>
                  <li>50+ Projects</li>
                  <li>20+ Clients</li>
                  <li>Team Leader</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
