import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'bun:test'

const root = fileURLToPath(new URL('../..', import.meta.url))
const robots = readFileSync(join(root, 'public/robots.txt'), 'utf8')

interface Group {
  agents: Array<string>
  rules: Array<{ allow: boolean; path: string }>
}

/** robots.txt groups: consecutive User-agent lines share the rules that follow them. */
function parse(text: string): Array<Group> {
  const groups: Array<Group> = []
  let current: Group | undefined
  for (const raw of text.split('\n')) {
    const line = raw.replace(/#.*/, '').trim()
    const match = /^([A-Za-z-]+):\s*(.*)$/.exec(line)
    if (!match) continue
    const [, key, value] = match
    const field = key.toLowerCase()
    if (field === 'user-agent') {
      if (!current || current.rules.length > 0) {
        current = { agents: [], rules: [] }
        groups.push(current)
      }
      current.agents.push(value.toLowerCase())
    } else if ((field === 'allow' || field === 'disallow') && current) {
      current.rules.push({ allow: field === 'allow', path: value })
    }
  }
  return groups
}

/** The group a crawler follows: the one naming it, else `*` (RFC 9309). */
function groupFor(agent: string) {
  const groups = parse(robots)
  return (
    groups.find(group => group.agents.includes(agent.toLowerCase())) ??
    groups.find(group => group.agents.includes('*'))
  )
}

const blocksSite = (agent: string) =>
  groupFor(agent)?.rules.some(rule => !rule.allow && rule.path === '/') ?? false

const SEO_TOOLS = [
  'AhrefsBot',
  'AhrefsSiteAudit',
  'SemrushBot',
  'SiteAuditBot',
  'MJ12bot',
  'DotBot',
  'BLEXBot',
  'DataForSeoBot',
  'Barkrowler',
  'serpstatbot',
]

describe('robots.txt', () => {
  it('blocks SEO tools, which send no visitors', () => {
    for (const agent of SEO_TOOLS) expect(blocksSite(agent)).toBe(true)
  })

  it('keeps search engines and AI search bots allowed', () => {
    for (const agent of ['Googlebot', 'Bingbot', 'DuckDuckBot', 'OAI-SearchBot', 'PerplexityBot']) {
      expect(blocksSite(agent)).toBe(false)
      expect(groupFor(agent)?.rules).toContainEqual({ allow: true, path: '/' })
    }
  })

  it('lists the sitemap', () => {
    expect(robots).toContain('Sitemap: https://jgb.solutions/sitemap.xml')
  })
})
