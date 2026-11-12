/**
 * Writes a 1200×630 share image for every page in the sitemap (except the home page, which uses
 * public/og-image.png from generate-brand-images.ts) to public/og/<path>.jpg, the file
 * `shareImagePath()` in src/lib/share.ts points to. Project pages show the project's screenshot.
 *
 * Run it after adding a page or a project, or changing a title or a featured image:
 *   bun run generate:collections && bun scripts/generate-share-images.ts
 * A test (src/lib/share.test.ts) fails when a sitemap page has no image.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import sharp from 'sharp'
import {
  BRAND_COLORS,
  JGB_LETTERS,
  SOLUTIONS_TRANSFORM,
  SOLUTIONS_WORD,
  VIEW_BOX,
} from '../src/lib/brand'
import { PRODUCT_SLUGS } from '../src/lib/products'
import { publishedProjects } from '../src/lib/projects'
import { OFFERED_SERVICES } from '../src/lib/services'
import { shareImagePath } from '../src/lib/share'
import { sitemapEntries } from '../src/lib/sitemap'

const root = fileURLToPath(new URL('..', import.meta.url))
const font = (path: string) => readFileSync(join(root, 'node_modules/@fontsource', path))

const { orange, ink } = BRAND_COLORS
const paper = '#FFFFFF'
const mutedPaper = '#B8BCC2'

const FONTS = [
  { name: 'Saira', data: font('saira/files/saira-latin-800-normal.woff'), weight: 800 as const },
  { name: 'Inter', data: font('inter/files/inter-latin-400-normal.woff'), weight: 400 as const },
  {
    name: 'JetBrains Mono',
    data: font('jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff'),
    weight: 400 as const,
  },
]

type Node = { type: string; props: Record<string, unknown> }
const h = (
  type: string,
  style: Record<string, unknown>,
  ...children: Array<Node | string>
): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
})
const img = (
  src: string,
  width: number,
  height: number,
  style: Record<string, unknown> = {}
): Node => ({
  type: 'img',
  props: { src, width, height, style: { display: 'flex', ...style } },
})

const svgUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
const logo = svgUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}">` +
    `<path fill="${orange}" fill-rule="evenodd" d="${JGB_LETTERS}"/>` +
    `<path fill="${paper}" transform="${SOLUTIONS_TRANSFORM}" d="${SOLUTIONS_WORD}"/></svg>`
)
const [, , logoW, logoH] = VIEW_BOX.split(' ').map(Number)

interface Card {
  path: string
  label: string
  title: string
  text?: string
  /** A screenshot under public/ (4:3), shown on the right. */
  image?: string
}

const STATIC_CARDS: Record<string, Omit<Card, 'path'>> = {
  '/services': {
    label: 'Services',
    title: 'Websites, apps and social media.',
    text: 'Designed, built and run for your business by one team.',
  },
  '/products': {
    label: 'Products',
    title: 'We build our own products too.',
    text: 'Free web apps and media sites, live and used every day.',
  },
  '/projects': {
    label: 'Work',
    title: "Websites and apps we've built.",
    text: 'Sites for businesses, organizations and creators, and our own products.',
  },
  '/about': {
    label: 'About',
    title: "Software that's fast, simple and made to last.",
    text: 'A web and mobile studio in Laval, Québec, building since 2009.',
  },
  '/privacy': {
    label: 'Privacy',
    title: 'Privacy Policy',
    text: 'How JGB Solutions handles your information.',
  },
}

function cards(): Array<Card> {
  return sitemapEntries()
    .map(({ path }): Card | undefined => {
      if (path === '/') return undefined
      if (STATIC_CARDS[path]) return { path, ...STATIC_CARDS[path] }
      const service = OFFERED_SERVICES.find(s => path === `/services/${s.slug}`)
      if (service) {
        return { path, label: 'Services', title: service.title, text: service.shortDescription }
      }
      const project = publishedProjects.find(p => path === `/projects/${p.slug}`)
      if (project) {
        const kind = PRODUCT_SLUGS.includes(project.slug) ? 'Our product' : 'Client work'
        return {
          path,
          label: `${kind} · ${project.category}`,
          title: project.title,
          text: project.summary ?? project.description,
          image: project.image,
        }
      }
      throw new Error(`No share card for ${path}: add it to STATIC_CARDS`)
    })
    .filter((card): card is Card => card !== undefined)
}

/** Cut at a word boundary, with an ellipsis, so the text fits in two lines. */
function clip(text: string, max: number) {
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(' ', max)).replace(/[,.;:]$/, '')}…`
}

const titleSize = (title: string, wide: boolean) => {
  const n = title.length
  if (wide) return n <= 20 ? 104 : n <= 34 ? 84 : 68
  return n <= 12 ? 84 : n <= 22 ? 66 : 54
}

async function render(card: Card) {
  const shot = card.image
    ? `data:image/jpeg;base64,${(
        await sharp(join(root, 'public', card.image))
          .resize(900)
          .jpeg({ quality: 85 })
          .toBuffer()
      ).toString('base64')}`
    : undefined
  const wide = !shot

  const svg = await satori(
    h(
      'div',
      {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: ink,
        color: paper,
      },
      h(
        'div',
        { flex: 1, padding: '56px 64px 48px', gap: 48, alignItems: 'stretch' },
        h(
          'div',
          { flex: 1, flexDirection: 'column', justifyContent: 'space-between' },
          img(logo, 220, Math.round((220 * logoH) / logoW)),
          h(
            'div',
            { flexDirection: 'column', gap: 18 },
            h(
              'div',
              {
                fontFamily: 'JetBrains Mono',
                fontSize: 22,
                letterSpacing: '0.14em',
                color: orange,
                textTransform: 'uppercase',
              },
              card.label
            ),
            h(
              'div',
              {
                fontFamily: 'Saira',
                fontWeight: 800,
                fontSize: titleSize(card.title, wide),
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
              },
              card.title
            ),
            ...(card.text
              ? [
                  h(
                    'div',
                    {
                      fontFamily: 'Inter',
                      fontSize: 26,
                      lineHeight: 1.35,
                      color: mutedPaper,
                      maxWidth: wide ? 900 : 560,
                      // Two lines at most
                      maxHeight: 70,
                      overflow: 'hidden',
                    },
                    clip(card.text, wide ? 120 : 76)
                  ),
                ]
              : [])
          )
        ),
        ...(shot
          ? [
              h(
                'div',
                { alignItems: 'center' },
                img(shot, 456, 342, { border: `6px solid ${orange}`, objectFit: 'cover' })
              ),
            ]
          : [])
      ),
      h(
        'div',
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: orange,
          color: ink,
          padding: '18px 64px',
          fontFamily: 'JetBrains Mono',
          fontSize: 22,
          letterSpacing: '0.12em',
        },
        h('div', {}, 'WEB · MOBILE · SOCIAL MEDIA'),
        h('div', {}, 'jgb.solutions')
      )
    ) as unknown as Parameters<typeof satori>[0],
    { width: 1200, height: 630, fonts: FONTS }
  )
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
  return sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
}

async function main() {
  mkdirSync(join(root, 'public', 'og'), { recursive: true })
  for (const card of cards()) {
    const file = join(root, 'public', shareImagePath(card.path))
    writeFileSync(file, await render(card))
    // eslint-disable-next-line no-console -- command-line script output
    console.info(`${card.path} → ${shareImagePath(card.path)}`)
  }
}

await main()
