import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './input'
import { Textarea } from './textarea'

describe('Form Components', () => {
  describe('Input', () => {
    it('renders and accepts input', () => {
      render(<Input placeholder='Enter name' />)
      const input = screen.getByPlaceholderText('Enter name')
      expect(input).toBeInTheDocument()

      fireEvent.change(input, { target: { value: 'John Doe' } })
      expect(input).toHaveValue('John Doe')
    })

    it('renders disabled state', () => {
      render(<Input disabled placeholder='Disabled' />)
      expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
    })
  })

  describe('Textarea', () => {
    it('renders and accepts text', () => {
      render(<Textarea placeholder='Enter message' />)
      const textarea = screen.getByPlaceholderText('Enter message')
      expect(textarea).toBeInTheDocument()

      fireEvent.change(textarea, { target: { value: 'Hello world' } })
      expect(textarea).toHaveValue('Hello world')
    })
  })
})
