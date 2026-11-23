import { describe, expect, it } from 'bun:test'
import { render, screen } from '@testing-library/react'
import fixture from '@/test/fixtures/app-stores-preview.json'
import { PlatformChips, StoreBadges } from '@/components/app-stores'

const filled = { googlePlay: fixture.musivo.googlePlay, appStore: fixture.musivo.appStore }
const androidOnly = { googlePlay: fixture.musivo.googlePlay, appStore: null }
const empty = { googlePlay: null, appStore: null }

describe('PlatformChips', () => {
  it('shows Web, Android and iOS when both store links are filled', () => {
    render(<PlatformChips links={filled} />)
    const list = screen.getByRole('list', { name: 'Available on' })
    expect(list.textContent).toBe('WebAndroidiOS')
  })

  it('leaves out the store without a link', () => {
    render(<PlatformChips links={androidOnly} />)
    expect(screen.getByRole('list', { name: 'Available on' }).textContent).toBe('WebAndroid')
  })

  it('renders nothing without a store link', () => {
    const { container } = render(<PlatformChips links={empty} />)
    expect(container.innerHTML).toBe('')
  })
})

describe('StoreBadges', () => {
  it('links the official badges to the store pages', () => {
    render(<StoreBadges links={filled} />)
    const play = screen.getByRole('img', { name: 'Get it on Google Play' })
    const apple = screen.getByRole('img', { name: 'Download on the App Store' })
    expect(play.getAttribute('src')).toBe('/assets/images/badges/google-play.png')
    expect(apple.getAttribute('src')).toBe('/assets/images/badges/app-store.svg')
    expect(play.closest('a')?.getAttribute('href')).toBe(filled.googlePlay)
    expect(apple.closest('a')?.getAttribute('href')).toBe(filled.appStore)
  })

  it('shows only the stores with a link', () => {
    render(<StoreBadges links={androidOnly} />)
    expect(screen.getByRole('img', { name: 'Get it on Google Play' })).toBeInTheDocument()
    expect(screen.queryByRole('img', { name: 'Download on the App Store' })).toBeNull()
  })

  it('renders nothing without a store link', () => {
    const { container } = render(<StoreBadges links={empty} />)
    expect(container.innerHTML).toBe('')
  })
})
