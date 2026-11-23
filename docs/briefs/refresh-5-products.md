# Brief: refresh five product pages (draft for review)

You are working in `/Volumes/DevDrive/Code/Web/jgb-solutions-refresh`, a git worktree on the local branch `content/refresh-5-products`. **Commit locally when done. Never push, never open a PR, never touch `main` or any other repo.** Claude reviews your work before anything is published.

Read `AGENTS.md` first (section 5, "Projects page", has the rules). Use Bun only (`bun`, `bunx`), never npm, pnpm or yarn.

## The five pages

| Slug (content/projects/<slug>.mdx) | Live site | Source code (read only) |
| --- | --- | --- |
| `musivo` | https://musivo.app/ | /Volumes/DevDrive/Code/Web/musivo |
| `cinetta` | https://cinetta.app/ | /Volumes/DevDrive/Code/Web/cinetta |
| `on-air` | https://on-air.jgb.solutions/ | /Users/jgb/Code/Web/on-air |
| `top-facts` | https://top-facts.jgb.solutions/ | /Users/jgb/Code/Web/Top-Facts |
| `jgb-tools` | https://tools.jgb.solutions/ | /Users/jgb/Code/Web/jgb-tools |

Only read the source repos (their README, AGENTS.md/CLAUDE.md, docs/ and routes). Don't edit them or run their builds.

## 1. Write-ups

For each page, update the MDX body and the frontmatter `description` and `summary` so they match what the product does **today** (check the live site and its code).

- Keep the structure: `## Project Overview`, `## The Challenge`, `## The Solution` (bold-labelled bullet points, like the current files).
- Plain English, facts only, no filler superlatives ("cutting-edge", "seamless", "revolutionary"…), no invented numbers. Say "we" for JGB Solutions.
- Update `services` (the tech list) only from what the code really uses.
- Don't mention store links, prices or anything not live.
- Set `updated: '2026-11-23'` in each file you change.
- Keep every other frontmatter field as is (title, order, client, url, gallery paths).

## 2. Screenshots (six per product, plus the card image)

Replace `public/assets/images/projects/<slug>/featured.jpg` and `screenshot-1.jpg` … `screenshot-6.jpg` with fresh captures of the live site.

- **Size:** 1280×960 viewport at device scale 1.25 (so 1600×1200 pixels), JPEG at quality 82. `featured.jpg` is the home page at the top.
- **Six different pages or views** per product (for example: home, a detail page, search results, a list or chart, a player or tool in use, another section). No two screenshots of the same view.
- **Never** show an empty state, a loading spinner, a cookie banner covering content, an error page, or the visitor's own IP address or location. Wait for the page to finish loading (network idle plus a short pause) before each capture.
- Close or decline any consent banner before capturing (choose the most private option).
- Look at every image yourself after capturing: if anything is broken, blank or offensive, recapture or pick another view.

Use Playwright from an existing install (don't add it to this repo):

```ts
import { chromium } from '/Volumes/DevDrive/Code/Web/musivo/node_modules/playwright-core/index.mjs'
// run with: PLAYWRIGHT_BROWSERS_PATH=/Volumes/DevDrive/Caches/ms-playwright bun <script>.ts
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 960 }, deviceScaleFactor: 1.25 })
await page.goto(url, { waitUntil: 'networkidle' })
await page.screenshot({ path, type: 'jpeg', quality: 82 })
```

Put your capture script in `scripts/` only if it's reusable; otherwise keep it outside the repo. Run **one browser at a time** (this Mac has 16 GB of memory).

## 3. After the images

Run, in this order, and fix anything that fails:

1. `bun scripts/optimize-images.ts` (makes the AVIF/WebP copies and updates `src/lib/image-manifest.json`)
2. `bun run share-images` (the share cards use the featured images)
3. `bun run generate:collections`
4. `bun run lint:check`, `bun run type-check`, `bun run format:check`, `bun run test:run`

## 4. Also

Add this line to `AGENTS.md`, section 5, under "Not listed yet (the user's call)":

> **Never listed (the owner's decision, 2026-11-22):** Plan and Learn stay private (behind Cloudflare Access); Bolet Lab is left off. Don't propose them.

## 5. Finish

Commit everything on `content/refresh-5-products` with a clear message. Then write a short report to `docs/briefs/refresh-5-products-REPORT.md`: for each product, what changed in the write-up (one or two lines), and the six screenshots (file name → page URL and what it shows). List anything you couldn't do or weren't sure about.
