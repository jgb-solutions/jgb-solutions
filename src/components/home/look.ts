import type { SectionTone } from '@/components/site/section'

/**
 * The two home-page looks the user is choosing between (docs/PLAN-redesign.md, phase 2).
 * - bold: design 6, orange hero and black bands.
 * - light: mostly white, orange as the accent, black only in the footer.
 */
export const HOME_LOOKS = ['bold', 'light'] as const
export type HomeLook = (typeof HOME_LOOKS)[number]

export interface HomeTones {
  header: 'ink' | 'paper'
  hero: SectionTone
  clients: SectionTone
  services: SectionTone
  products: SectionTone
  work: SectionTone
  process: SectionTone
  insights: SectionTone
  cta: SectionTone
}

export const HOME_TONES: Record<HomeLook, HomeTones> = {
  bold: {
    header: 'ink',
    hero: 'brand',
    clients: 'ink',
    services: 'paper',
    products: 'ink',
    work: 'paper',
    process: 'mist',
    insights: 'paper',
    cta: 'brand',
  },
  light: {
    header: 'paper',
    hero: 'paper',
    clients: 'mist',
    services: 'paper',
    products: 'mist',
    work: 'paper',
    process: 'mist',
    insights: 'paper',
    cta: 'brand',
  },
}
