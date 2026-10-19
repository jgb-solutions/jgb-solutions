# Agent Guidelines for JGB Solutions

This document provides essential information for AI agents operating within this codebase.

## 1. Project Overview

- **Framework:** TanStack Start (React 19)
- **Routing:** TanStack Router (File-based routing)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Package Manager:** Bun
- **Content:** @content-collections/mdx

## 2. Key Commands

| Action             | Command                                | Description                                                                    |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------ |
| **Build**          | `bun run build`                        | Builds the application for production                                          |
| **Dev Server**     | `bun run dev`                          | Starts local development server                                                |
| **Lint (Check)**   | `bun run lint:check`                   | Checks for linting errors                                                      |
| **Lint (Fix)**     | `bun run lint`                         | Auto-fixes linting errors                                                      |
| **Format (Check)** | `bun run format:check`                 | Checks code formatting                                                         |
| **Format (Fix)**   | `bun run format`                       | Auto-formats code using Prettier                                               |
| **Type Check**     | `bun run type-check`                   | Runs TypeScript compiler check                                                 |
| **Test (Run)**     | `bun run test:run`                     | Runs all tests once (CI mode)                                                  |
| **Test (Watch)**   | `bun run test`                         | Runs tests in watch mode                                                       |
| **Content**        | `bun run generate:collections`         | Regenerates content-collections from `content/` (CI runs it before type-check) |
| **Brand images**   | `bun scripts/generate-brand-images.ts` | Rebuilds the share image, favicons and `logo.png` in `public/`                 |

### Running Specific Tests

To run a specific test file:

```bash
bun x vitest run src/components/ui/button.test.tsx
```

## 3. Code Style & Conventions

### Imports

- **Absolute Paths:** Always use the `@/` alias for internal imports (e.g., `import { Button } from '@/components/ui/button'`).
- **Grouping:** Group imports by:
  1. Built-in/External libraries (React, TanStack, etc.)
  2. Internal absolute imports (`@/lib/...`, `@/components/...`)
  3. Relative imports (`./utils`)

### Component Structure

- **Functional Components:** Use function declarations.
- **Co-location:** Place test files (`*.test.tsx`) next to their source files.
- **Exports:** Prefer named exports for components.

### Routing (TanStack Router)

- **File-Based:** Routes are defined in `src/routes/`.
- **Loaders:** Use `createServerFn` for data fetching. Remove `async` from loader functions if they don't await anything internally.
- **Server routes** (`server: { handlers: { GET } }`, e.g. `sitemap[.]xml.tsx`) already run on the server: build the response with plain functions. Calling a `createServerFn` from inside a server route handler fails since TanStack Start 1.168 ("Server function info not found").
- **Search Params:** Use Zod for validating search parameters.

### Testing (Vitest + React Testing Library)

- **Environment:** Tests run in `jsdom`.
- **Router Testing:**
  - DO NOT extract `Route.component` to test in isolation.
  - USE `renderWithRouter` from `@/test/router-utils` to test components within a real router context.
  - Mock data sources (like `content-collections`) using `vi.mock` to simulate empty/filled states.
- **Mocks:**
  - Mock strict types: use `Record<string, unknown>` instead of `any`.
  - Use `vi.mocked()` for type-safe mocking.

### Styling

- **Tailwind CSS:** Use utility classes.
- **Conditional Classes:** Use `cn()` utility (clsx + tailwind-merge) for conditional styling.

### Error Handling

- **Console:** Avoid `console.log` in production code. Use `console.error` for caught exceptions but suppress linter warnings if intentional.

## 4. Project Structure

```
src/
├── components/
│   ├── site/          # Site-wide pieces: SiteHeader, SiteFooter (with the contact band),
│   │                  # Section/SectionHeading/buttonStyles, Logo, ProcessSection, ContactSection
│   ├── home/          # Home page sections
│   ├── ui/            # Primitives (button, sheet)
│   └── project-card.tsx, post-card.tsx, mdx-provider.tsx
├── lib/
│   ├── constants.ts   # SITE (email, phone, Laval), SEO, SOCIAL, OG_IMAGE
│   ├── services.ts    # Services, with `available` (only offered ones appear anywhere)
│   ├── products.ts    # Which projects are our products (PRODUCT_SLUGS) vs client work
│   ├── projects.ts    # Published projects (drafts left out)
│   ├── features.ts    # Switched-off parts of the site (blog)
│   ├── brand.ts       # Logo vectors and brand colors
│   └── seo.ts         # Page meta, canonical links, business structured data
├── routes/            # index, services/, products, projects/, about, privacy, posts/ (off), sitemap
├── test/              # router-utils (renderWithRouter), content-collections mock, setup
├── globals.css        # Brand tokens (Tailwind @theme): brand, brand-strong, ink, paper, mist…
└── routeTree.gen.ts   # Generated route definitions
content/               # projects/ and posts/ (MDX)
scripts/               # generate-brand-images.ts
examples/              # Archived landing-page designs (not part of the app)
docs/                  # PLAN-redesign.md, TODO-redesign.md
```

## 5. Deployment & Project Notes

_Last updated: 2026-10-19._

### Deployment

- Hosted on **Vercel**, project `jgb-solutions` (team `jgb-solutions`), serving https://jgb.solutions. Pushing to `main` deploys to production; pull requests get preview deploys.
- The old Vercel project `jgb-solutions-next` (repo `jgb.solutions-next`) is the previous site and hasn't deployed since 2022.
- **Keep `@tanstack/react-start` at 1.168.60 or later.** Older versions have a critical XSS (CVE-2026-102989 / GHSA-qx66-fv34-fjm8), and Vercel refuses to build them ("Vulnerable TanStack Start package detected"). Don't work around it with `DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS`. Upgraded in PR #1 (with `react-router` 1.170.41 and `zod-adapter` 1.167.0).

### Google AdSense

- `public/ads.txt` authorizes publisher `pub-1452812638164042` (`google.com, pub-1452812638164042, DIRECT, f08c47fec0942fa0`). **Don't remove or change it.** AdSense only accepts top-level domains, so jgb.solutions is the site Google reviews, and its approval covers subdomains such as https://tools.jgb.solutions (JGB Tools, which has the same `ads.txt`).
- If AdSense asks for the meta-tag method instead: `<meta name="google-adsense-account" content="ca-pub-1452812638164042">` in the root route's `head`.
- **Review history:** the first review was rejected with "Unsupported language", although the site is English (`lang="en"`, crawlers get full pages). Likely cause: too little text, placeholder project pages and French/Creole names. Fixed in PR #2 (2026-10-17): every project has a real write-up from its live site, filler wording removed, English translations next to French names, JGB Tools described as "supported by ads". The user then requested a new review. The ads.txt column in AdSense showed "Not found" for a while even though the file was served correctly (AdSense re-checks on its own schedule).
- **Approved 2026-10-19:** AdSense is ready to show ads for jgb.solutions (the approval covers its subdomains).
- **Decision (2026-10-19): no ads on jgb.solutions itself.** It's the business site that sells services; ads would look unprofessional and could show competitors. Its Privacy page says so; if that ever changes, update the page and add a Google-certified consent banner first. Keep `ads.txt` anyway.
- **Plan:** ads go on the user's `*.jgb.solutions` products, starting with JGB Tools (its `LAUNCH.md` item 3 has the steps). A serious violation on one site can disable ads on the whole account, so keep ads off sites hosting content we don't own (MP3PAM's current downloads; see `~/Code/Web/mp3pam-kit/docs/PLAN-music-search.md`) and be careful with IPTV streams (On Air) and look-alike characters (Street Brawl).
- **To keep approval:** no placeholder or "coming soon" pages; every project page needs real English text.

### Projects page

- Projects are MDX files in `content/projects/` (frontmatter + "Project Overview / The Challenge / The Solution"). Write from facts (the project's code and live site), plain English, no filler superlatives; translate French names in brackets.
- `draft: true` in a project's frontmatter hides it from listings, its page and the sitemap (`src/lib/projects.ts`). Use it for unfinished write-ups instead of publishing placeholders.
- Card images: `public/assets/images/projects/<slug>/featured.jpg`, a 4:3 desktop capture (1280×960 at 1.25×, JPEG) of the live site, plus `screenshot-N.jpg` gallery images (JPEG, about quality 82; PNG screenshots were 3× larger, converted 2026-10-19). Check every capture by eye: blur or hide user-uploaded content that's offensive, and crop out broken embeds.
- 13 projects as of 2026-10-17. Added in PR #3: **Street Brawl** (game, https://streetbrawl.jgb.solutions; the game's folder `~/Code/Web/street-brawl` is not a git repo yet) and **L'Expérience Exquise** (https://www.experienceexquise.ca).
- **Not listed yet (the user's call):** On Air, Fake Jobs and Top Everything (not deployed / no working domain), and Okap Lakay (not official yet). Add them when they're live.

### JGB products list

- `public/products.json` is the single list of JGB Solutions' own products (not client work), served as-is at https://jgb.solutions/products.json. This site's Products page reads its ids from it (`src/lib/products.ts`), and every product reads it when it builds to show "More from JGB Solutions" links (JGB Tools: `scripts/sync-products.ts` and `@jgb/core/jgb-products`). `src/lib/products.test.ts` checks its shape. Keep the shape (`version: 1`); bump the version if it changes incompatibly. The user decides what is a product: ask before adding one.
- Products as of 2026-10-19: JGB Tools, Street Brawl, MP3PAM, Tech Talk. Ti Kwen Pam is ours but hidden (old WordPress site); leave it out.

### Redesign (site-revamp branch)

- **Merged into `main` on 2026-10-19** at the user's request, with the open questions in `docs/TODO-redesign.md` (section 1) still to be answered. Further redesign work: new branch off `main`, PR, merge.
- **Design: design 6, "Bold Digital"** (orange, black and white), now built into every page: home, `/services` and `/services/$slug`, `/products`, `/projects` and `/projects/$slug`, `/about`, `/privacy` and the 404 page. The original reference page is archived in `examples/landing-designs/routes/bold-digital.tsx`.
- **The plan is `docs/PLAN-redesign.md`** and what's left is in **`docs/TODO-redesign.md`**: present JGB Solutions as a business with services and products, not a freelancer. Follow them and keep them current.
- **Design system:** colors and fonts are Tailwind tokens in `src/globals.css` (`brand` = logo orange `#F7961D` with black text, never white; `brand-strong` for orange text on white; `ink`, `paper`, `mist`, `muted-ink`, `muted-paper`); Saira for headings, Inter for text, JetBrains Mono for labels; square corners. Build pages from `Section`, `SectionHeading`, `SectionLabel` and `buttonStyles` in `src/components/site/section.tsx`.
- **About page copy is a draft** built from the founder's earlier texts; the user will rewrite it.
- **Archived designs:** the other 14 landing pages, their components and the page switcher used to compare them are in `examples/landing-designs/` (see its README). Nothing imports them; TypeScript, ESLint (`examples/**` ignored) and Vitest (`include: src/**`) skip the folder. Reference them if we need an idea later. The user also liked design 5, "Bold Services", for listing every service.
- **Services:** offered now are **Websites, Mobile Apps and Social Media** (short names chosen by the user; the descriptions say design and development). **Planned, not offered yet:** Photography / Videography (one service, sold together), Graphic Design and Print. Their data is in `src/lib/services.ts`; keep them off the site until the user is ready (no "coming soon" pages, see AdSense). Each service page shows examples from `relatedProjects`; Mobile Apps has none until the JGB Tools app is in the stores, Social Media has none until the user names a client.
- **Products vs client work:** JGB Tools, Street Brawl, MP3PAM, Tech Talk and Ti Kwen Pam are the user's own products (listed in `src/lib/products.ts`). **Ti Kwen Pam is hidden** (`draft: true`): the user doesn't find it nice enough to show; keep the file. The user usually builds apps and media sites as products, while clients mostly want static sites or landing pages, but **always ask the user** whether a new project is a product or client work.
- **Business facts for copy:** based in Laval, Québec; "10+ years" (building since 2009), "dozens of clients", "dozens of projects" (no more precise client or project counts); no prices ("contact us for a quote"); no contact form (spam): use services@jgb.solutions and WhatsApp/phone +1 438 389 5465 (`SITE.phone`). The founder's name, photo and story belong on the About page, not the home page; the home page speaks as the business ("we").
- **Switched off until the user asks** (`src/lib/features.ts`): the **blog** (`FEATURES.blog`). `/posts` pages return not found, and the header, footer, home page, 404 page and sitemap hide it. The two old posts came from the founder's personal blog. To turn it back on, set the flag and write business posts.
- **Home page:** bold look only. A light look was built and dropped (in git history, commit 451cded) — the user may ask for it again. No client list for now. **Every page ends with the contact band** (`ContactSection`, `id="contact"`), rendered by `SiteFooter`, so "Start a project" and other contact links are plain `#contact` anchors that work on any page. The band has "Email us" (mailto, with the address and a Copy button beside it, since mailto does nothing without a mail app) and "WhatsApp us". Footer contact: email and phone only; socials are the founder's personal LinkedIn and Instagram for now (business pages may come later), no GitHub.
- `src/routeTree.gen.ts` is generated: after pulling or switching branches, let `bun run dev` or `bun run build` regenerate it instead of resolving conflicts by hand.

### Related

- JGB Solutions' products are named "JGB <Product>". The logo is the JGB letters plus the product name (Saira, orange `#F7961D`). The logo code lives in the JGB Tools repo (`jgb-solutions/jgb-tools`, `packages/core/src/brand.ts`); a shared brand kit is planned.
