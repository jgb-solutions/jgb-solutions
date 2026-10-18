import { Camera, Globe, Palette, Printer, Share2, Smartphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  slug: string
  title: string
  shortDescription: string
  description: string
  offerings: Array<string>
  icon: LucideIcon
  /**
   * Whether we sell this service today. Unavailable services stay off the site entirely (no
   * "coming soon" pages: AdSense rejects them). Flip to true when the service launches.
   */
  available: boolean
  /** Three short selling points for the service page. */
  highlights?: Array<{ title: string; text: string }>
  /** Project slugs (content/projects) to show as examples on the service page. */
  relatedProjects?: Array<string>
}

export const SERVICES: Array<Service> = [
  {
    slug: 'websites',
    available: true,
    title: 'Websites',
    shortDescription: 'Custom websites built for speed, clarity, and conversion.',
    description:
      'We design and build professional websites that look great on every device and load fast. From landing pages to full web applications, we handle design, development, and launch.',
    offerings: [
      'Custom website design',
      'Responsive, mobile-first development',
      'E-commerce and booking systems',
      'Performance optimization',
      'Ongoing maintenance and updates',
    ],
    icon: Globe,
    highlights: [
      {
        title: 'Built for phones first',
        text: 'Most visitors arrive on a phone, so every page is designed for small screens first and scales up from there.',
      },
      {
        title: 'Fast to load',
        text: "Light pages and optimized images, so people don't leave before your site appears.",
      },
      {
        title: 'Easy to keep current',
        text: 'Update your text, photos and offers yourself, or let us handle the updates for you.',
      },
    ],
    relatedProjects: ['experience-exquise', 'jc-cantave', 'eneph', 'simone-fievre'],
  },
  {
    slug: 'mobile-apps',
    available: true,
    title: 'Mobile Apps',
    shortDescription: 'Native-feeling apps for iOS and Android.',
    description:
      'We help you bring your app idea to life with thoughtful UX, polished UI, and reliable development — whether you need an MVP or a production-ready product.',
    offerings: [
      'App UI/UX design',
      'Cross-platform development',
      'Prototyping and user testing',
      'App store launch support',
      'Post-launch improvements',
    ],
    icon: Smartphone,
    highlights: [
      {
        title: 'iOS and Android',
        text: 'One codebase for both platforms keeps the cost down and both apps in step.',
      },
      {
        title: 'Tested before it is built',
        text: 'Clickable prototypes let you try the idea with real users before development starts.',
      },
      {
        title: 'Into the app stores',
        text: 'We prepare the listings and screenshots and handle the review process for the App Store and Google Play.',
      },
    ],
    relatedProjects: ['jgb-tools'],
  },
  {
    slug: 'social-media',
    available: true,
    title: 'Social Media',
    shortDescription: 'Consistent content and community growth.',
    description:
      'We manage your social presence so you can focus on running your business. From content planning to posting and engagement, we keep your brand active and professional.',
    offerings: [
      'Content strategy and calendar',
      'Post creation and scheduling',
      'Community engagement',
      'Brand voice development',
      'Performance reporting',
    ],
    icon: Share2,
    highlights: [
      {
        title: 'A plan, not random posts',
        text: 'A monthly content calendar built around your offers, events and busy seasons.',
      },
      {
        title: 'One voice everywhere',
        text: 'Posts, captions and replies that sound like your business on every platform.',
      },
      {
        title: 'Clear reporting',
        text: 'A simple monthly report on what worked, so the next month does better.',
      },
    ],
  },
  {
    slug: 'photography-videography',
    available: false,
    title: 'Photography / Videography',
    shortDescription: 'Visual content that tells your story.',
    description:
      'Professional photo and video for brands, events, products, and campaigns. We capture high-quality visuals ready for web, social, and print.',
    offerings: [
      'Brand and product photography',
      'Event coverage',
      'Promotional video production',
      'Social media content shoots',
      'Editing and post-production',
    ],
    icon: Camera,
  },
  {
    slug: 'graphic-design',
    available: false,
    title: 'Graphic Design',
    shortDescription: 'Logos, branding, and marketing visuals.',
    description:
      'We create cohesive visual identities and marketing materials that make your business look polished and memorable across every touchpoint.',
    offerings: [
      'Logo and brand identity',
      'Marketing collateral',
      'Social media graphics',
      'Presentation design',
      'Brand guidelines',
    ],
    icon: Palette,
  },
  {
    slug: 'print',
    available: false,
    title: 'Print',
    shortDescription: 'Business cards, flyers, banners, and more.',
    description:
      'From business cards to large-format banners, we design print-ready materials and help you get professional results for events, promotions, and everyday business needs.',
    offerings: [
      'Business cards and stationery',
      'Flyers and brochures',
      'Posters and banners',
      'Packaging design',
      'Print-ready file preparation',
    ],
    icon: Printer,
  },
]

/** The services we sell today, in display order. */
export const OFFERED_SERVICES = SERVICES.filter(service => service.available)

export const DIGITAL_SERVICES = SERVICES.filter(service =>
  ['websites', 'mobile-apps', 'social-media'].includes(service.slug)
)

export const CREATIVE_SERVICES = SERVICES.filter(service =>
  ['photography-videography', 'graphic-design', 'print'].includes(service.slug)
)

/** Finds an offered service; unavailable services are treated as not found. */
export function getServiceBySlug(slug: string): Service | undefined {
  return OFFERED_SERVICES.find(service => service.slug === slug)
}
