import { createServerFn } from '@tanstack/react-start'
import { zodValidator } from '@tanstack/zod-adapter'
import { Resend } from 'resend'
import { z } from 'zod'

// Shared validation schema for both client and server
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
})

export const sendContactEmail = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(contactSchema))
  .handler(async ({ data: validatedData }) => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    try {
      const result = await resend.emails.send({
        from: 'JGB Solutions Contact Form <services@jgb.solutions>',
        to: ['jgbneatdesign@gmail.com'],
        subject: `Contact Form: ${validatedData.subject}`,
        replyTo: validatedData.email,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        `,
      })
      return { success: true, data: result }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Resend error:', error)
      return { success: false, error: {} }
    }
  })
