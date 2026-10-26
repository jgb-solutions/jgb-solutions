<p align="center">
  <a href="https://jgb.solutions">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/logo-dark.svg" />
      <img src="public/logo-light.svg" alt="JGB Solutions" width="360" />
    </picture>
  </a>
</p>

<p align="center">
  <strong>Websites, mobile apps and social media for your business.</strong><br />
  The code behind <a href="https://jgb.solutions">jgb.solutions</a>, the website of a web and mobile studio in Laval, Québec.
</p>

<p align="center">
  <a href="https://jgb.solutions"><img src="https://img.shields.io/badge/live-jgb.solutions-F7961D?style=flat-square&labelColor=050708" alt="Live site: jgb.solutions" /></a>
  <a href="https://github.com/jgb-solutions/jgb-solutions/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/jgb-solutions/jgb-solutions/ci.yml?branch=main&style=flat-square&label=CI&labelColor=050708" alt="CI status" /></a>
  <img src="https://img.shields.io/badge/TanStack_Start-React_19-F7961D?style=flat-square&labelColor=050708" alt="TanStack Start with React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-F7961D?style=flat-square&labelColor=050708" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/TypeScript-strict-F7961D?style=flat-square&labelColor=050708" alt="TypeScript" />
  <img src="https://img.shields.io/badge/hosted_on-Vercel-F7961D?style=flat-square&labelColor=050708" alt="Hosted on Vercel" />
</p>

<p align="center">
  <a href="https://jgb.solutions/services">Services</a> ·
  <a href="https://jgb.solutions/products">Products</a> ·
  <a href="https://jgb.solutions/projects">Work</a> ·
  <a href="https://jgb.solutions/about">About</a> ·
  <a href="https://jgb.solutions/#contact">Start a project</a>
</p>

<p align="center">
  <a href="https://jgb.solutions">
    <img src="public/assets/images/projects/jgb-solutions/featured.jpg" alt="The jgb.solutions home page" width="820" />
  </a>
</p>

## What JGB Solutions does

We design, build and run the digital side of businesses, and we make products of our own.

| Service                                                         | What's included                                                              |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **[Websites](https://jgb.solutions/services/websites)**         | Custom design, mobile-first development, e-commerce and booking, maintenance |
| **[Mobile Apps](https://jgb.solutions/services/mobile-apps)**   | App design, iOS and Android from one codebase, prototypes, app store launch  |
| **[Social Media](https://jgb.solutions/services/social-media)** | Content calendar, post creation and scheduling, community, monthly reporting |

## Our products

<table>
  <tr>
    <td width="50%" valign="top">
      <a href="https://tools.jgb.solutions"><img src="public/assets/images/projects/jgb-tools/featured.jpg" alt="JGB Tools" /></a>
      <h3><a href="https://tools.jgb.solutions">JGB Tools</a></h3>
      Free online tools for everyday tasks: no sign-up, no personal tracking.
    </td>
    <td width="50%" valign="top">
      <a href="https://streetbrawl.jgb.solutions"><img src="public/assets/images/projects/street-brawl/featured.jpg" alt="Street Brawl" /></a>
      <h3><a href="https://streetbrawl.jgb.solutions">Street Brawl</a></h3>
      A free 2D fighting game in your browser, with story, training and online modes.
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <a href="https://mp3pam.top"><img src="public/assets/images/projects/mp3pam/featured.jpg" alt="MP3PAM" /></a>
      <h3><a href="https://mp3pam.top">MP3PAM</a></h3>
      A free platform for sharing music, podcasts and audio.
    </td>
    <td width="50%" valign="top">
      <a href="https://techtalk.jgb.solutions"><img src="public/assets/images/projects/techtalk/featured.jpg" alt="Tech Talk" /></a>
      <h3><a href="https://techtalk.jgb.solutions">Tech Talk</a></h3>
      A tech podcast in Haitian Creole, with episodes, articles and discussions.
    </td>
  </tr>
</table>

The list of products is shared with every product site through [`public/products.json`](public/products.json), served at [jgb.solutions/products.json](https://jgb.solutions/products.json).

## Built with

| Layer     | Tools                                                                                      |
| --------- | ------------------------------------------------------------------------------------------ |
| Framework | [TanStack Start](https://tanstack.com/start) (React 19), server-rendered on every request  |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com) with brand tokens, Saira, Inter, JetBrains Mono |
| Content   | MDX write-ups with [content-collections](https://www.content-collections.dev)              |
| Language  | TypeScript (strict)                                                                        |
| Tooling   | [Bun](https://bun.sh), Vitest + Testing Library, ESLint, Prettier                          |
| Hosting   | [Vercel](https://vercel.com), deployed from `main`                                         |

## Getting started

You need [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

The site runs at http://localhost:3000.

| Command                                | What it does                                                     |
| -------------------------------------- | ---------------------------------------------------------------- |
| `bun run dev`                          | Development server                                               |
| `bun run build`                        | Production build                                                 |
| `bun run test:run`                     | All tests, once                                                  |
| `bun run lint:check`                   | ESLint                                                           |
| `bun run type-check`                   | TypeScript                                                       |
| `bun run format:check`                 | Prettier                                                         |
| `bun run generate:collections`         | Rebuild the content collections from `content/`                  |
| `bun scripts/generate-brand-images.ts` | Rebuild the share image, favicons and logos from the vector logo |

## How the code is organized

```
content/projects/     One MDX write-up per project (client work and our products)
public/               Static files: images, products.json, ads.txt, brand images
scripts/              generate-brand-images.ts
src/
  routes/             Pages: home, services, products, work (projects), about, privacy
  components/site/    Header, footer, contact band, sections, buttons, logo
  components/home/    Home page sections
  lib/                Services, products, SEO and structured data, site constants
  globals.css         Brand tokens (colors and fonts)
docs/                 The redesign plan and to-do list
```

## Editing content

- **A project:** add `content/projects/<slug>.mdx` (Project Overview, The Challenge, The Solution) and its screenshots in `public/assets/images/projects/<slug>/`. Use `draft: true` to keep an unfinished write-up off the site.
- **A service:** services live in `src/lib/services.ts`. Only services with `available: true` appear anywhere on the site, so a new one stays hidden until it's ready.
- **A product:** add it to `public/products.json` and give it a project write-up. Every product site picks it up on its next build.

## Brand

| Token          | Color                                                                                        | Use                                |
| -------------- | -------------------------------------------------------------------------------------------- | ---------------------------------- |
| `brand`        | ![#F7961D](https://img.shields.io/badge/%20-F7961D?style=flat-square&color=F7961D) `#F7961D` | Logo orange, with black text on it |
| `brand-strong` | ![#A9580A](https://img.shields.io/badge/%20-A9580A?style=flat-square&color=A9580A) `#A9580A` | Orange text on white               |
| `ink`          | ![#050708](https://img.shields.io/badge/%20-050708?style=flat-square&color=050708) `#050708` | Text and black sections            |
| `paper`        | ![#FFFFFF](https://img.shields.io/badge/%20-FFFFFF?style=flat-square&color=FFFFFF) `#FFFFFF` | Page background                    |
| `mist`         | ![#F4F4F3](https://img.shields.io/badge/%20-F4F4F3?style=flat-square&color=F4F4F3) `#F4F4F3` | Light grey sections                |

Headings use **Saira** (the typeface of the logo), text uses **Inter**, and small labels use **JetBrains Mono**. Corners are square.

## Shipping

Every change goes through a pull request. Before it can be merged, it must pass:

- **CI:** formatting, lint, type check, tests and a production build
- **GitGuardian:** secret scan
- **Vercel:** a preview deployment to check by eye

Merging into `main` deploys to [jgb.solutions](https://jgb.solutions).

More detail for contributors and AI agents is in [AGENTS.md](AGENTS.md). The redesign plan is in [docs/PLAN-redesign.md](docs/PLAN-redesign.md) and what's left in [docs/TODO-redesign.md](docs/TODO-redesign.md).

## Contact

Have a project in mind? Email **[services@jgb.solutions](mailto:services@jgb.solutions)** or message us on **[WhatsApp](https://wa.me/14383895465)**.

<p align="center"><sub>© JGB Solutions · Laval, Québec</sub></p>
