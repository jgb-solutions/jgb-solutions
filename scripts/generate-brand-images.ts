/**
 * Generates the site's brand images into public/ from the vector logo (src/lib/brand.ts) and the
 * self-hosted fonts. Run it after changing the logo, colors or headline:
 *
 *   bun scripts/generate-brand-images.ts
 *
 * Outputs: og-image.png (1200×630 share image), favicon.svg, favicon-16/32/48.png,
 * apple-touch-icon.png (180), icon-192.png, icon-512.png, logo.png (for structured data) and
 * logo-light.svg / logo-dark.svg (transparent, for the GitHub READMEs).
 *
 * It also writes the brand kit in branding/ (logos, icons, social profile pictures and covers for
 * LinkedIn and X); branding/README.md lists each file and where it goes.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import {
  BRAND_COLORS,
  JGB_LETTERS,
  JGB_LETTERS_BOX,
  SOLUTIONS_TRANSFORM,
  SOLUTIONS_WORD,
  VIEW_BOX,
} from '../src/lib/brand'

const root = fileURLToPath(new URL('..', import.meta.url))
const out = (file: string) => join(root, 'public', file)
const kit = (file: string) => {
  const path = join(root, 'branding', file)
  mkdirSync(join(path, '..'), { recursive: true })
  return path
}
const font = (path: string) => readFileSync(join(root, 'node_modules/@fontsource', path))

const { orange, ink } = BRAND_COLORS
const paper = '#FFFFFF'

/** The full logo (JGB + SOLUTIONS) as an SVG string. */
function logoSvg(letters: string, word: string) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}">` +
    `<path fill="${letters}" fill-rule="evenodd" d="${JGB_LETTERS}"/>` +
    `<path fill="${word}" transform="${SOLUTIONS_TRANSFORM}" d="${SOLUTIONS_WORD}"/></svg>`
  )
}

/**
 * The square icon: JGB letters on a colored tile (ink on orange by default). `padding` is the share
 * of the width left around them.
 */
function iconSvg(padding = 0.16, tile: string = orange, letters: string = ink) {
  const [x, y, w, h] = JGB_LETTERS_BOX
  const size = w / (1 - 2 * padding)
  const left = x - (size - w) / 2
  const top = y - (size - h) / 2
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${left} ${top} ${size} ${size}">` +
    `<rect x="${left}" y="${top}" width="${size}" height="${size}" fill="${tile}"/>` +
    `<path fill="${letters}" fill-rule="evenodd" d="${JGB_LETTERS}"/></svg>`
  )
}

/** The full logo on a solid background, with a margin around it. */
function logoOnColor(background: string, letters: string, word: string, margin = 0.08) {
  const [x, y, w, h] = VIEW_BOX.split(' ').map(Number)
  const m = w * margin
  const box = [x - m, y - m, w + 2 * m, h + 2 * m]
  return logoSvg(letters, word).replace(
    `viewBox="${VIEW_BOX}">`,
    `viewBox="${box.join(' ')}"><rect x="${box[0]}" y="${box[1]}" width="${box[2]}" height="${box[3]}" fill="${background}"/>`
  )
}

const logoOnWhite = () => logoOnColor(paper, ink, orange)

function png(svg: string, width: number) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng()
}

const dataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

// A tiny element helper so satori gets plain objects (no React needed in a script).
type Node = { type: string; props: Record<string, unknown> }
const h = (
  type: string,
  style: Record<string, unknown>,
  ...children: Array<Node | string>
): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
})

const HEADLINE = 'Websites, apps and social media for your business.'

const FONTS = [
  { name: 'Saira', data: font('saira/files/saira-latin-800-normal.woff'), weight: 800 as const },
  {
    name: 'JetBrains Mono',
    data: font('jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff'),
    weight: 400 as const,
  },
]

/**
 * A profile cover (LinkedIn page, X header): ink background, the headline on the right, since the
 * profile picture covers the lower left corner. Laid out at `width`×`height`, rendered at `scale`.
 */
async function coverImage(
  width: number,
  height: number,
  scale: number,
  headlineSize: number,
  headlineWidth = 0.6
) {
  const side = Math.round(width * 0.05)
  const svg = await satori(
    h(
      'div',
      { width: '100%', height: '100%', flexDirection: 'column', backgroundColor: ink },
      h(
        'div',
        {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: Math.round(headlineSize * 0.45),
          paddingLeft: side,
          paddingRight: side,
          color: paper,
        },
        h(
          'div',
          {
            width: Math.round(width * headlineWidth),
            justifyContent: 'flex-end',
            textAlign: 'right',
            fontFamily: 'Saira',
            fontWeight: 800,
            fontSize: headlineSize,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
          },
          HEADLINE
        ),
        h(
          'div',
          {
            fontFamily: 'JetBrains Mono',
            fontSize: Math.round(headlineSize * 0.36),
            letterSpacing: '0.12em',
            color: orange,
          },
          'WEB · MOBILE · SOCIAL MEDIA — JGB.SOLUTIONS'
        )
      ),
      h('div', { height: Math.max(4, Math.round(height * 0.03)), backgroundColor: orange })
    ) as unknown as Parameters<typeof satori>[0],
    { width, height, fonts: FONTS }
  )
  return png(svg, width * scale)
}

async function shareImage() {
  const [, , vw, vh] = VIEW_BOX.split(' ').map(Number)
  const logoWidth = 340
  const svg = await satori(
    h(
      'div',
      {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: orange,
        color: ink,
      },
      h(
        'div',
        { flex: 1, flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px' },
        {
          type: 'img',
          props: {
            src: dataUri(logoSvg(ink, ink)),
            width: logoWidth,
            height: Math.round((logoWidth * vh) / vw),
            style: { display: 'flex' },
          },
        },
        h(
          'div',
          {
            fontFamily: 'Saira',
            fontWeight: 800,
            fontSize: 84,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            maxWidth: 1000,
          },
          HEADLINE
        )
      ),
      h(
        'div',
        {
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: ink,
          color: paper,
          padding: '26px 72px',
          fontFamily: 'JetBrains Mono',
          fontSize: 24,
          letterSpacing: '0.12em',
        },
        h('div', {}, 'WEB · MOBILE · SOCIAL MEDIA'),
        h('div', { color: orange }, 'jgb.solutions')
      )
    ) as unknown as Parameters<typeof satori>[0],
    { width: 1200, height: 630, fonts: FONTS }
  )
  return png(svg, 1200)
}

async function main() {
  writeFileSync(out('og-image.png'), await shareImage())

  const icon = iconSvg()
  writeFileSync(out('favicon.svg'), icon)
  for (const size of [16, 32, 48]) writeFileSync(out(`favicon-${size}.png`), png(icon, size))
  writeFileSync(out('apple-touch-icon.png'), png(icon, 180))
  writeFileSync(out('icon-192.png'), png(icon, 192))
  writeFileSync(out('icon-512.png'), png(icon, 512))

  // Logo on white with some margin, for structured data (search engines want a raster logo)
  writeFileSync(out('logo.png'), png(logoOnWhite(), 1200))

  // Transparent logos for the GitHub READMEs: black letters for light themes, white for dark
  writeFileSync(out('logo-light.svg'), logoSvg(ink, orange))
  writeFileSync(out('logo-dark.svg'), logoSvg(paper, orange))

  await brandKit()

  // eslint-disable-next-line no-console -- command-line script output
  console.info('Brand images written to public/ and branding/')
}

/** The brand kit in branding/ (see branding/README.md). */
async function brandKit() {
  const logos: Array<[string, string, string, string]> = [
    // name, background, letters, word
    ['on-white', paper, ink, orange],
    ['on-black', ink, paper, orange],
    ['on-orange', orange, ink, ink],
  ]
  writeFileSync(kit('logo/logo-light.svg'), logoSvg(ink, orange))
  writeFileSync(kit('logo/logo-dark.svg'), logoSvg(paper, orange))
  for (const [name, background, letters, word] of logos) {
    const svg = logoOnColor(background, letters, word)
    writeFileSync(kit(`logo/logo-${name}.svg`), svg)
    writeFileSync(kit(`logo/logo-${name}.png`), png(svg, 2400))
  }
  writeFileSync(kit('logo/logo-light.png'), png(logoSvg(ink, orange), 2400))
  writeFileSync(kit('logo/logo-dark.png'), png(logoSvg(paper, orange), 2400))

  const icon = iconSvg()
  const iconDark = iconSvg(0.16, ink, orange)
  writeFileSync(kit('icon/icon.svg'), icon)
  writeFileSync(kit('icon/icon-1024.png'), png(icon, 1024))
  writeFileSync(kit('icon/icon-dark.svg'), iconDark)
  writeFileSync(kit('icon/icon-dark-1024.png'), png(iconDark, 1024))

  // Profile pictures get more padding: LinkedIn, X and Instagram crop them to a circle
  const profile = iconSvg(0.2)
  writeFileSync(kit('social/profile-400.png'), png(profile, 400))
  writeFileSync(kit('social/profile-1080.png'), png(profile, 1080))

  // LinkedIn page cover: 1128×191 (uploaded at 2×). X header: 1500×500.
  writeFileSync(kit('social/linkedin-cover.png'), await coverImage(1128, 191, 2, 34, 0.7))
  writeFileSync(kit('social/x-header.png'), await coverImage(1500, 500, 1, 62))
  writeFileSync(kit('social/share-image.png'), await shareImage())
}

await main()
