import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'bun:test'
import matter from 'gray-matter'
import { OFFERED_SERVICES } from '@/lib/services'
import { isShareable, normalizePath, shareImagePath, shareLinks } from '@/lib/share'

const root = fileURLToPath(new URL('../..', import.meta.url))
const projectsDir = join(root, 'content/projects')

/** Every page in the sitemap, read from the real content (tests mock content-collections). */
const pages = [
  '/',
  '/services',
  '/products',
  '/projects',
  '/about',
  '/privacy',
  ...OFFERED_SERVICES.map(service => `/services/${service.slug}`),
  ...readdirSync(projectsDir)
    .filter(file => file.endsWith('.mdx'))
    .filter(file => !matter(readFileSync(join(projectsDir, file), 'utf8')).data.draft)
    .map(file => `/projects/${file.replace(/\.mdx$/, '')}`),
]

describe('share images', () => {
  it('exist for every page (run bun scripts/generate-share-images.ts)', () => {
    const missing = pages.filter(path => !existsSync(join(root, 'public', shareImagePath(path))))
    expect(missing).toEqual([])
  })

  it('are named after the page path', () => {
    expect(shareImagePath('/')).toBe('/og-image.png')
    expect(shareImagePath('/projects/musivo')).toBe('/og/projects-musivo.jpg')
    expect(shareImagePath('/services/')).toBe('/og/services.jpg')
  })
})

describe('share links', () => {
  const links = shareLinks('/projects/musivo', 'Musivo - Work | JGB Solutions')

  it('cover every network, as plain links', () => {
    expect(links.map(link => link.network)).toEqual([
      'whatsapp',
      'facebook',
      'x',
      'telegram',
      'pinterest',
      'linkedin',
      'email',
    ])
    for (const { href } of links) expect(href).toMatch(/^(https:\/\/|mailto:)/)
  })

  it('share the page URL, its title and its image', () => {
    const url = encodeURIComponent('https://jgb.solutions/projects/musivo')
    for (const { href } of links) expect(href).toContain(url)
    expect(links.find(link => link.network === 'x')?.href).toContain(
      encodeURIComponent('Musivo - Work | JGB Solutions')
    )
    expect(links.find(link => link.network === 'pinterest')?.href).toContain(
      encodeURIComponent('https://jgb.solutions/og/projects-musivo.jpg')
    )
  })

  it('leave out the privacy policy', () => {
    expect(isShareable('/privacy')).toBe(false)
    expect(isShareable('/projects/musivo')).toBe(true)
    expect(normalizePath('/projects/')).toBe('/projects')
  })
})
