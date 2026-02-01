import { describe, expect, it } from 'vitest'
import { contactSchema } from './contact'

describe('contact functions', () => {
  describe('contactSchema', () => {
    it('validates a correct form', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a valid message content.',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Subject',
        message: 'Message',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toBeDefined()
      }
    })

    it('rejects short message', () => {
      const result = contactSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Subject',
        message: 'Hi', // Too short
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.message).toBeDefined()
      }
    })
  })
})
