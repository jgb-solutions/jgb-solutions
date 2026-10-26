/**
 * Generates the site's brand images into public/ from the vector logo (src/lib/brand.ts) and the
 * self-hosted fonts. Run it after changing the logo, colors or headline:
 *
 *   bun scripts/generate-brand-images.ts
 *
 * Outputs: og-image.png (1200×630 share image), favicon.svg, favicon-16/32/48.png,
 * apple-touch-icon.png (180), icon-192.png, icon-512.png, logo.png (for structured data) and
 * logo-light.svg / logo-dark.svg (transparent, for the GitHub READMEs).
 */
import { readFileSync, writeFileSync } from 'node:fs'
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

/** The square icon: JGB letters in ink on an orange tile. `padding` is the share of the width left around them. */
function iconSvg(padding = 0.16) {
  const [x, y, w, h] = JGB_LETTERS_BOX
  const size = w / (1 - 2 * padding)
  const left = x - (size - w) / 2
  const top = y - (size - h) / 2
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${left} ${top} ${size} ${size}">` +
    `<rect x="${left}" y="${top}" width="${size}" height="${size}" fill="${orange}"/>` +
    `<path fill="${ink}" fill-rule="evenodd" d="${JGB_LETTERS}"/></svg>`
  )
}

function logoOnWhite(margin = 0.08) {
  const [x, y, w, h] = VIEW_BOX.split(' ').map(Number)
  const m = w * margin
  const box = [x - m, y - m, w + 2 * m, h + 2 * m]
  return logoSvg(ink, orange).replace(
    `viewBox="${VIEW_BOX}">`,
    `viewBox="${box.join(' ')}"><rect x="${box[0]}" y="${box[1]}" width="${box[2]}" height="${box[3]}" fill="${paper}"/>`
  )
}

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
          'Websites, apps and social media for your business.'
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
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Saira', data: font('saira/files/saira-latin-800-normal.woff'), weight: 800 },
        {
          name: 'JetBrains Mono',
          data: font('jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff'),
          weight: 400,
        },
      ],
    }
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

  // eslint-disable-next-line no-console -- command-line script output
  console.info('Brand images written to public/')
}

await main()
