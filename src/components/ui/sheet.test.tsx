import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './sheet'

describe('Sheet (Mobile Menu)', () => {
  it('renders trigger correctly', () => {
    render(
      <Sheet>
        <SheetTrigger>Open Menu</SheetTrigger>
        <SheetContent>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Menu content</SheetDescription>
        </SheetContent>
      </Sheet>
    )

    expect(screen.getByText('Open Menu')).toBeInTheDocument()
  })

  // Note: Full interaction testing for Sheet (Dialog) often requires
  // more complex setup with Radix primitives in jsdom.
  // For now, we verify it renders without crashing.
})
