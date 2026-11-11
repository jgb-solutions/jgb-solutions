/**
 * Makes AVIF and WebP copies of every project image (public/assets/images/projects/**) at a few
 * widths, under content-hashed names in public/img/, and writes src/lib/image-manifest.json, which
 * ResponsiveImage reads to build each <picture>'s srcset. Run it after adding or replacing a
 * screenshot (CI fails if an image is missing from the manifest):
 *
 *   bun scripts/optimize-images.ts
 *
 * The hashed names can be cached forever (vite.config.ts routeRules): a replaced screenshot gets a
 * new name, so nobody keeps an old copy. Unchanged images are skipped, and copies of images that
 * no longer exist are deleted.
 */
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const SOURCE = 'public/assets/images/projects'
const OUT = 'public/img/projects'
const WIDTHS = [640, 1024, 1600]
const FORMATS = [
  { ext: 'avif', options: { quality: 55, effort: 4 } },
  { ext: 'webp', options: { quality: 74 } },
] as const

type Entry = { width: number; height: number; base: string; widths: Array<number> }
const manifest: Record<string, Entry> = {}
const keep = new Set<string>()

const sources = (await readdir(join(root, SOURCE), { recursive: true }))
  .filter(name => name.endsWith('.jpg'))
  .map(name => `${SOURCE}/${name}`)
  .sort()

for (const file of sources) {
  const bytes = await readFile(join(root, file))
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10)
  const meta = await sharp(bytes).metadata()
  const width = meta.width ?? 0
  const height = meta.height ?? 0
  const rel = relative(SOURCE, file).replace(/\.jpg$/, '')
  const base = `${OUT}/${rel}-${hash}`
  const widths = WIDTHS.filter(w => w <= width)
  await mkdir(join(root, dirname(base)), { recursive: true })
  for (const w of widths) {
    for (const { ext, options } of FORMATS) {
      const target = `${base}-${w}.${ext}`
      keep.add(target)
      if (existsSync(join(root, target))) continue
      const image = sharp(bytes).resize({ width: w })
      const out = ext === 'avif' ? image.avif(options) : image.webp(options)
      await writeFile(join(root, target), await out.toBuffer())
    }
  }
  manifest[`/${file.replace(/^public\//, '')}`] = {
    width,
    height,
    base: `/${base.replace(/^public\//, '')}`,
    widths,
  }
}

// Delete copies of images that were replaced or removed
async function prune(dir: string) {
  for (const entry of await readdir(join(root, dir), { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`
    if (entry.isDirectory()) await prune(path)
    else if (!keep.has(path)) await rm(join(root, path))
  }
}
await prune(OUT)

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
await writeFile(join(root, 'src/lib/image-manifest.json'), `${JSON.stringify(sorted, null, 2)}\n`)
// eslint-disable-next-line no-console -- command-line script output
console.info(`${Object.keys(sorted).length} images, ${keep.size} optimized copies in ${OUT}`)
