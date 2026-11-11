import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'bun:test'
import matter from 'gray-matter'
import manifest from '@/lib/image-manifest.json'

const images: Record<string, { base: string; widths: Array<number> } | undefined> = manifest
const root = fileURLToPath(new URL('../..', import.meta.url))
const projectsDir = join(root, 'content/projects')

/** Every featured image and screenshot named in a project's frontmatter. */
const projectImages = readdirSync(projectsDir)
  .filter(file => file.endsWith('.mdx'))
  .flatMap(file => {
    const { data } = matter(readFileSync(join(projectsDir, file), 'utf8'))
    const gallery: Array<string> = Array.isArray(data.gallery) ? data.gallery : []
    return [String(data.image), ...gallery]
  })
  .filter(src => src.startsWith('/assets/images/projects/'))

describe('image manifest', () => {
  it('has optimized copies of every project image (run bun scripts/optimize-images.ts)', () => {
    const missing = projectImages.filter(src => !images[src])
    expect(missing).toEqual([])
  })

  it('points at files that exist', () => {
    for (const src of projectImages) {
      const entry = images[src]
      if (!entry) continue
      for (const width of entry.widths) {
        for (const ext of ['avif', 'webp']) {
          expect(existsSync(join(root, 'public', `${entry.base}-${width}.${ext}`))).toBe(true)
        }
      }
    }
  })
})
