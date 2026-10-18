/**
 * Site-wide constants for metadata, SEO, and branding
 */

export const SITE = {
  name: 'JGB Solutions',
  url: 'https://jgb.solutions',
  author: 'Jean Gérard Bousiquot',
  email: 'services@jgb.solutions',
  contactEmail: 'jgbneatdesign@gmail.com',
  location: 'Laval, Québec',
  /** Business phone, also on WhatsApp. */
  phone: '+1 438 389 5465',
  phoneHref: 'tel:+14383895465',
  whatsappHref: 'https://wa.me/14383895465',
} as const

export const SEO = {
  defaultTitle: 'JGB Solutions',
  titleTemplate: '%s - JGB Solutions',
  description:
    'JGB Solutions designs and builds websites, mobile apps and social media for businesses, and makes its own apps and media sites. Based in Laval, Québec.',
  keywords: [
    'web design',
    'web development',
    'mobile app development',
    'social media management',
    'JGB Solutions',
    'JGB Tools',
    'Laval',
    'Québec',
  ],
} as const

export const SOCIAL = {
  twitter: '@jgb_solutions',
  linkedin: 'https://linkedin.com/in/jgbousiquot',
  github: 'https://github.com/jgbcode',
} as const

export const OG_IMAGE = {
  url: 'https://public.jgb.solutions/banner.jpg' as string,
  width: 1200,
  height: 630,
  alt: 'Jean Gérard Bousiquot - Software Engineer Portfolio',
}
