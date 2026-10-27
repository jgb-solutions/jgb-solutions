/**
 * Checks the server-rendered HTML of every page in the sitemap for the SEO basics: one h1, a unique
 * title and description, a canonical link, Open Graph and X tags, valid structured data
 * (business on every page, breadcrumbs on inner pages) and alt text on every image. Also checks
 * robots.txt and that unknown pages return a real 404.
 *
 *   bun scripts/check-seo.ts                         # the live site
 *   bun scripts/check-seo.ts http://localhost:3000   # a local production build (CI does this)
 *
 * Canonical and og:url must point at https://jgb.solutions even when checking another host.
 */
const SITE_URL = 'https://jgb.solutions'
const base = (process.argv[2] ?? SITE_URL).replace(/\/$/, '')

const problems: Array<string> = []
const fail = (page: string, message: string) => problems.push(`${page}: ${message}`)

async function get(path: string) {
  const response = await fetch(`${base}${path}`, { redirect: 'manual' })
  return { status: response.status, text: await response.text() }
}

const attr = (tag: string, name: string) =>
  new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1]?.replace(/&amp;/g, '&')

function metaContent(html: string, key: 'name' | 'property', value: string) {
  const tags = html.match(/<meta\b[^>]*>/g) ?? []
  return tags.filter(tag => attr(tag, key) === value).map(tag => attr(tag, 'content') ?? '')
}

function checkPage(
  path: string,
  html: string,
  seen: { titles: Set<string>; descriptions: Set<string> }
) {
  const url = `${SITE_URL}${path}`

  if (!/<html[^>]*\blang="en"/.test(html)) fail(path, 'missing <html lang="en">')

  const h1s = html.match(/<h1\b/g)?.length ?? 0
  if (h1s !== 1) fail(path, `expected one <h1>, found ${h1s}`)

  const titles = [...html.matchAll(/<title>([^<]*)<\/title>/g)].map(match => match[1].trim())
  if (titles.length !== 1 || !titles[0])
    fail(path, `expected one non-empty <title>, found ${titles.length}`)
  else if (seen.titles.has(titles[0])) fail(path, `title is used by another page: "${titles[0]}"`)
  else seen.titles.add(titles[0])

  const descriptions = metaContent(html, 'name', 'description')
  if (descriptions.length !== 1 || descriptions[0].length < 50)
    fail(path, 'expected one meta description of at least 50 characters')
  else if (seen.descriptions.has(descriptions[0])) fail(path, 'description is used by another page')
  else seen.descriptions.add(descriptions[0])

  const canonicals = (html.match(/<link\b[^>]*rel="canonical"[^>]*>/g) ?? []).map(tag =>
    attr(tag, 'href')
  )
  if (canonicals.length !== 1 || canonicals[0] !== url)
    fail(path, `canonical should be ${url}, found ${JSON.stringify(canonicals)}`)

  for (const property of ['og:title', 'og:description', 'og:image', 'og:type']) {
    if (metaContent(html, 'property', property).length !== 1) fail(path, `expected one ${property}`)
  }
  const ogUrl = metaContent(html, 'property', 'og:url')
  if (ogUrl.length !== 1 || ogUrl[0] !== url) fail(path, `og:url should be ${url}`)
  for (const name of ['twitter:card', 'twitter:site', 'twitter:title', 'twitter:image']) {
    if (metaContent(html, 'name', name).length !== 1) fail(path, `expected one ${name}`)
  }

  const types = new Set<string>()
  for (const match of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  )) {
    try {
      const data = JSON.parse(match[1]) as Record<string, unknown>
      if (data['@context'] !== 'https://schema.org') fail(path, 'structured data without @context')
      if (typeof data['@type'] === 'string') types.add(data['@type'])
    } catch {
      fail(path, 'structured data is not valid JSON')
    }
  }
  if (!types.has('ProfessionalService')) fail(path, 'missing the business structured data')
  if (path !== '/' && !types.has('BreadcrumbList')) fail(path, 'missing breadcrumbs')

  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    if (attr(tag, 'alt') === undefined) fail(path, `image without alt: ${tag.slice(0, 80)}`)
  }
}

async function main() {
  const robots = await get('/robots.txt')
  if (robots.status !== 200 || !robots.text.includes(`Sitemap: ${SITE_URL}/sitemap.xml`))
    fail('/robots.txt', 'missing or has no Sitemap line')

  const sitemap = await get('/sitemap.xml')
  const entries = [
    ...sitemap.text.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g),
  ]
  if (sitemap.status !== 200 || entries.length === 0) fail('/sitemap.xml', 'missing or empty')
  const urlCount = sitemap.text.match(/<url>/g)?.length ?? 0
  if (urlCount !== entries.length) fail('/sitemap.xml', 'every <url> needs a <loc> and a <lastmod>')

  const seen = { titles: new Set<string>(), descriptions: new Set<string>() }
  for (const [, loc, lastmod] of entries) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) fail(loc, `bad lastmod "${lastmod}"`)
    if (!loc.startsWith(SITE_URL)) {
      fail(loc, `sitemap URL is not on ${SITE_URL}`)
      continue
    }
    const path = loc.slice(SITE_URL.length) || '/'
    const page = await get(path)
    if (page.status !== 200) fail(path, `returned ${page.status}`)
    else checkPage(path, page.text, seen)
  }

  const missing = await get('/this-page-does-not-exist')
  if (missing.status !== 404)
    fail('/this-page-does-not-exist', `should return 404, got ${missing.status}`)

  /* eslint-disable no-console -- command-line report */
  if (problems.length > 0) {
    console.error(`SEO check failed on ${base}:\n${problems.map(p => `  - ${p}`).join('\n')}`)
    process.exit(1)
  }
  console.info(`SEO check passed: ${entries.length} pages on ${base}`)
  /* eslint-enable no-console */
}

await main()

export {}
