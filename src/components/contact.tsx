import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { contactSchema, sendContactEmail as sendContactEmailServer } from '@/lib/functions/contact'

// Generate a random math challenge
function generateMathChallenge() {
  const operations = [
    { type: 'multiply', symbol: '×' },
    { type: 'divide', symbol: '÷' },
  ]
  const operation = operations[Math.floor(Math.random() * operations.length)]

  if (operation.type === 'multiply') {
    const num1 = Math.floor(Math.random() * 10) + 2 // 2-11
    const num2 = Math.floor(Math.random() * 10) + 2 // 2-11
    return {
      question: `${num1} ${operation.symbol} ${num2}`,
      answer: num1 * num2,
    }
  } else {
    // Division - ensure clean division
    const divisor = Math.floor(Math.random() * 9) + 2 // 2-10
    const result = Math.floor(Math.random() * 10) + 2 // 2-11
    const dividend = divisor * result
    return {
      question: `${dividend} ${operation.symbol} ${divisor}`,
      answer: result,
    }
  }
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Generate math challenge
  const [mathChallenge, setMathChallenge] = useState(generateMathChallenge())

  // Extended schema with math challenge
  const formSchema = useMemo(
    () =>
      contactSchema.extend({
        mathAnswer: z
          .string()
          .min(1, 'Please solve the math problem')
          .refine(
            val => {
              const num = parseInt(val)
              return !isNaN(num) && num === mathChallenge.answer
            },
            { message: 'Incorrect answer. Please try again.' }
          ),
      }),
    [mathChallenge.answer]
  )

  type FormData = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  // Watch math answer for real-time feedback
  const mathAnswerValue = watch('mathAnswer')
  const isMathCorrect =
    mathAnswerValue &&
    !isNaN(parseInt(mathAnswerValue)) &&
    parseInt(mathAnswerValue) === mathChallenge.answer
  const isMathIncorrect = mathAnswerValue && mathAnswerValue.length > 0 && !isMathCorrect

  // Refresh math challenge
  const handleRefreshChallenge = () => {
    setMathChallenge(generateMathChallenge())
    reset({ mathAnswer: '' }, { keepValues: true, keepErrors: false })
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Extract contact data (without mathAnswer)
      const { mathAnswer, ...contactData } = data
      const response = await sendContactEmailServer({ data: contactData } as any)

      if (response.success) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('[Contact Form] Submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id='contact' className='py-20 px-6 md:px-20 bg-secondary dark:bg-card'>
      <div className='max-w-3xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-light mb-6 text-center'>Let's Work Together</h2>
        <p className='text-muted-foreground text-center mb-12'>
          Have a challenging project? Let's transform it into an elegant, scalable solution
          together.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <Input placeholder='Name' {...register('name')} aria-invalid={!!errors.name} />
              {errors.name && (
                <p className='text-sm text-red-600 dark:text-red-400 mt-1'>{errors.name.message}</p>
              )}
            </div>
            <div>
              <Input
                type='email'
                placeholder='Email'
                {...register('email')}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Input placeholder='Subject' {...register('subject')} aria-invalid={!!errors.subject} />
            {errors.subject && (
              <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
                {errors.subject.message}
              </p>
            )}
          </div>
          <div>
            <Textarea
              placeholder='Message'
              className='min-h-[150px]'
              {...register('message')}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Math Challenge - Bot Prevention */}
          <div className='bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/20'>
            <label htmlFor='mathAnswer' className='block text-sm font-medium mb-2'>
              🤖 Quick math to verify you're human
            </label>
            <div className='flex items-center gap-3'>
              {/* Refresh button */}
              <button
                type='button'
                onClick={handleRefreshChallenge}
                className='text-muted-foreground hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10'
                title='Get a different question'
                aria-label='Refresh math challenge'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2' />
                </svg>
              </button>
              <span className='text-lg font-mono font-semibold'>{mathChallenge.question} =</span>
              <Input
                id='mathAnswer'
                type='number'
                placeholder='?'
                {...register('mathAnswer')}
                className='w-24'
                aria-invalid={!!errors.mathAnswer}
                autoComplete='off'
              />
              {/* Real-time feedback icons - after the input */}
              <div className='w-6 flex items-center justify-center'>
                {isMathCorrect && (
                  <span className='text-green-600 dark:text-green-400 text-2xl font-bold'>✓</span>
                )}
                {isMathIncorrect && (
                  <span className='text-red-600 dark:text-red-400 text-2xl font-bold'>✗</span>
                )}
              </div>
            </div>
            {errors.mathAnswer && (
              <p className='text-sm text-red-600 dark:text-red-400 mt-2 font-medium'>
                {errors.mathAnswer.message}
              </p>
            )}
          </div>

          <Button type='submit' className='w-full rounded-xl' disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
          {submitStatus === 'success' && (
            <p className='text-green-600 dark:text-green-400 text-center font-medium'>
              ✓ Message sent successfully! We'll get back to you soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className='text-red-600 dark:text-red-400 text-center font-medium'>
              ✗ Failed to send message. Please try again or email us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
