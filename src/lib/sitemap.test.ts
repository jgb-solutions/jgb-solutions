import { describe, expect, it, vi } from 'vitest'
import { buildSitemap, sitemapEntries } from '@/lib/sitemap'

vi.mock('content-collections', () => ({
  allProjects: [
    { slug: 'eneph', title: 'ENEPH', order: 50, updated: '2026-10-17' },
    { slug: 'secret', title: 'Draft', order: 1, updated: '2026-10-18', draft: true },
  ],
  allPosts: [{ slug: 'old-post', date: '2022-09-02' }],
}))

describe('sitemap', () => {
  it('lists every public page with a lastmod date', () => {
    const entries = sitemapEntries()
    const paths = entries.map(entry => entry.path)

    expect(paths).toEqual(
      expect.arrayContaining([
        '/',
        '/services',
        '/services/websites',
        '/services/mobile-apps',
        '/services/social-media',
        '/products',
        '/projects',
        '/projects/eneph',
        '/about',
        '/privacy',
      ])
    )
    for (const entry of entries) expect(entry.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(entries.find(entry => entry.path === '/projects/eneph')?.lastmod).toBe('2026-10-17')
  })

  it('leaves out drafts, planned services and the switched-off blog', () => {
    const paths = sitemapEntries().map(entry => entry.path)
    expect(paths).not.toContain('/projects/secret')
    expect(paths).not.toContain('/services/graphic-design')
    expect(paths.some(path => path.startsWith('/posts'))).toBe(false)
  })

  it('writes URLs that match the canonical links', () => {
    const xml = buildSitemap()
    expect(xml).toContain('<loc>https://jgb.solutions/</loc>')
    expect(xml).toContain('<loc>https://jgb.solutions/services/websites</loc>')
    expect(xml).toContain('<lastmod>2026-10-17</lastmod>')
    expect(xml).not.toContain('changefreq')
  })
})
