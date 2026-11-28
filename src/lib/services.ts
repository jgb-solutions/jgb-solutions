import { Camera, Globe, Palette, Printer, Share2, ShoppingBag, Smartphone } from 'lucide-react'
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
  /** A short line under the hero buttons, e.g. a partner status. */
  badge?: string
  /** Who the service is for, shown as a row of short cards. */
  audience?: Array<{ title: string; text: string }>
  /** One project shown large as a case study, with what we did on it. */
  caseStudy?: { slug: string; points: Array<string> }
  /** Questions and answers, shown on the page and as FAQPage structured data. */
  faq?: Array<{ question: string; answer: string }>
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
    // No examples yet: the JGB Tools app is still coming to the stores. Add it once it's live.
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
    slug: 'shopify',
    available: true,
    title: 'Shopify E-commerce Stores',
    shortDescription: 'Online stores on Shopify, ready to sell from day one.',
    description:
      'We build online stores for small businesses on Shopify, our preferred e-commerce platform. We set up your products, payments, taxes and shipping, in French and English, and teach you to run the store yourself.',
    offerings: [
      'A new store on a free Shopify theme, customized to your brand',
      'Products and collections, organized so customers find them',
      'Payments, taxes and shipping set up for Canada',
      'Your store in French and English',
      'SEO basics, so search engines can find your products',
      'An email signup with a welcome discount',
      'The apps your store needs, installed and set up',
      'Training, so you can add products and handle orders yourself',
      '30 days of support after launch',
      'Moving your shop from Wix, Square or WooCommerce',
      'A monthly care plan, on request',
    ],
    icon: ShoppingBag,
    badge: 'We are a Shopify Partner',
    highlights: [
      {
        title: 'Ready to take orders',
        text: 'Payments, taxes, shipping rates and policies are set up and tested before launch, so the first order goes through.',
      },
      {
        title: 'Bilingual from the start',
        text: 'Your store, products and emails in French and English, for customers across Quebec and the rest of Canada.',
      },
      {
        title: 'Yours to run',
        text: 'The store is in your name and your account. We show you how to add products and handle orders, and stay available after.',
      },
    ],
    audience: [
      {
        title: 'Makers and small brands',
        text: 'You make or source your products and want a store that shows them well.',
      },
      {
        title: 'Shops starting online',
        text: 'You sell in person or on social media and want orders and payments in one place.',
      },
      {
        title: 'Stores on another platform',
        text: 'Your shop runs on Wix, Square or WooCommerce and you want to move it to Shopify.',
      },
    ],
    caseStudy: {
      slug: 'anboudou-creations',
      points: [
        'Six collections: handbags, clutches, wallets, necklaces, bracelets and sandals',
        'The store in French and English',
        'Card, PayPal, Shop Pay, Apple Pay and Google Pay at checkout',
        'Shipping across Canada and to the United States',
        'A newsletter signup with 10% off the first order',
      ],
    },
    relatedProjects: ['anboudou-creations'],
    faq: [
      {
        question: 'How much does a store cost?',
        answer:
          'Every store is different, so we quote each project. Tell us what you sell and what you need, and we send you a clear quote after a short call.',
      },
      {
        question: 'Do I pay Shopify separately?',
        answer:
          'Yes. Shopify charges its monthly plan and payment fees directly to you. Our work is billed separately, and we help you choose the right plan.',
      },
      {
        question: 'Who owns the store?',
        answer:
          'You do. The store is created in your name, and you keep full access to it, your products and your customers.',
      },
      {
        question: 'How long does it take?',
        answer:
          'It depends on the number of products and what needs to be set up. We give you a timeline with the quote, before any work starts.',
      },
      {
        question: 'Can you move my store from Wix, Square or WooCommerce?',
        answer:
          'Yes. We move your products, collections and content to Shopify and set up redirects, so links to your old pages keep working.',
      },
      {
        question: 'Will my store be in French and English?',
        answer:
          'Yes, if you want it. We set up both languages, so each customer can shop in theirs.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'You get 30 days of support for questions and fixes. After that, a monthly care plan can cover updates, new products and small changes.',
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

/** Finds an offered service; unavailable services are treated as not found. */
export function getServiceBySlug(slug: string): Service | undefined {
  return OFFERED_SERVICES.find(service => service.slug === slug)
}
