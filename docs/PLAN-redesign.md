# Plan: redesign jgb.solutions as a business

_Started 2026-10-17 on the `site-revamp` branch._

## Goal

Make jgb.solutions look and read like what it is: **JGB Solutions, a business that sells services and builds its own products**, run by its founder Jean Gérard Bousiquot. Today the site is a freelancer portfolio ("I'M JEAN BOUSIQUOT", "Hire me"). The new site should feel like a studio: confident, beautiful, easy to read, and clear about what you can buy.

**Design direction:** design 6, "Bold Digital" (`src/routes/landing/bold-digital.tsx`, live at `/landing/bold-digital` while we work). Orange, black and white, heavy type, square edges, solid color blocks. The other 14 designs are archived in `examples/landing-designs/`.

## Design system: keep the boldness, fix the reading

Design 6 is loud everywhere. The redesign keeps that energy in a few places and makes everything you read calm.

| Keep from design 6                          | Change                                                                                                                                  |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Full orange hero with black type            | Full orange only for the hero and the final call-to-action band. Everything else alternates white and black, with orange as the accent. |
| Black service tiles with orange icons       | Fewer tiles per screen, more space around them.                                                                                         |
| Square buttons, no rounded corners          | Square corners everywhere (buttons, cards, images), so the site has one shape language.                                                 |
| Heavy display type                          | Heavy type only for headings. Body text at 17–18px, about 65 characters per line, comfortable line height.                              |
| Mono uppercase labels ("DIGITAL SERVICES")  | Keep them as section labels only.                                                                                                       |
| Alternating orange/black blocks per service | Drop it: long text never sits on orange.                                                                                                |

### Color

One orange. The site currently uses three: the logo's `#F7961D`, the theme's `hsl(24 100% 50%)` (`#FF6600`) and Tailwind's `orange-500` (`#F97316`) in the landing pages. Use the logo orange.

| Token          | Value                         | Use                                                              |
| -------------- | ----------------------------- | ---------------------------------------------------------------- |
| `brand`        | `#F7961D` (logo orange)       | Backgrounds, large display text, icons, rules                    |
| `brand-strong` | about `#B45F06` (check it)    | Orange text on white (links, small labels); needs 4.5:1 contrast |
| `ink`          | `#050708` (logo black)        | Text, black sections, buttons on orange                          |
| `paper`        | white or a very light neutral | Page background                                                  |
| `muted`        | a neutral grey                | Secondary text                                                   |

Contrast rules (from the numbers, not taste): black on the logo orange is about 9:1, which is excellent. White on the logo orange is about 2.3:1, which fails, so **orange buttons get black text, never white**. Orange text on white also fails at small sizes, which is what `brand-strong` is for.

### Type

- **Display:** Saira, the typeface of "SOLUTIONS" in the logo, so headings and logo match. Bold or Black weights for headings.
- **Body:** Inter (already installed).
- **Labels:** a monospace for small uppercase section labels.

### Logo

Use the vector JGB Solutions logo (`JGB_MARK` + the `SOLUTIONS` word in `jgb-tools/packages/core/src/brand.ts`) instead of the two PNGs from public.jgb.solutions. It's sharp at every size and can be colored per section (black on orange, white on black). Copy it in for now; the shared brand kit can replace the copy later.

### Light and dark mode

**Decided: no dark-mode toggle.** Design 6 mixes black and white sections on purpose. But the user wants to **see a light version** too: in phase 2, build the home page in the bold look (orange hero, black bands) and a light variant (mostly white, orange as accent, black only in the footer), switchable on the preview, and let the user choose. The choice then applies to every page.

## Voice

- "We" for the business. **Your name, photo and story go on the About page only, never on the home page** (decided 2026-10-17). The About page is where you speak about what we do.
- Plain English and concrete offers: "We build websites, mobile apps and social media for businesses" instead of "innovate.lead.deliver."
- Calls to action name the next step: "Start a project", "See our work", "Try JGB Tools".
- Every claim must be true (AdSense also penalizes filler). Numbers, as confirmed: **10+ years (building since 2009), dozens of clients, dozens of projects**. Don't write more precise client or project counts.

## Services

**Offered now:** Websites, Mobile Apps, Social Media (the user shortened the names; descriptions cover design and development).

**Coming later, not shown yet:** Photography / Videography (sold as one service), Graphic Design, Print.

These three must not appear on the site until you offer them. AdSense rejects "coming soon" and placeholder pages, and a service you can't sell yet costs trust. The data already exists in `src/lib/services.ts` (design 5, "Bold Services", showed all six). The plan adds an `available: boolean` field so each service appears automatically, with its page, once you switch it on.

## Site map

| Page     | URL               | What's on it                                                                 |
| -------- | ----------------- | ---------------------------------------------------------------------------- |
| Home     | `/`               | See below                                                                    |
| Services | `/services`       | The three services, how we work, call to action                              |
| Service  | `/services/$slug` | What's included, process, related work, questions, call to action            |
| Products | `/products`       | Our own products: JGB Tools, Street Brawl, MP3PAM, Tech Talk, Ti Kwen Pam    |
| Work     | `/projects`       | Client work. Keep the URL (it's indexed); the menu can call it "Work"        |
| Project  | `/projects/$slug` | Restyled case study: challenge, solution, gallery, link                      |
| About    | `/about`          | The company, the founder, where we are, how we work                          |
| Contact  | `/contact`        | Email (services@jgb.solutions), WhatsApp, what happens next. No form         |
| Insights | `/posts`          | The blog, restyled. Keep the URL. **Switched off for now** (`FEATURES.blog`) |
| Privacy  | `/privacy`        | What the site collects (no form, so little). Expected by AdSense             |

Header: logo · Services · Products · Work · About · (Insights, when the blog is on) · **Start a project** (button, goes to the contact section).
Footer (black): services, products, company links, email, social links, location, ©.

## Home page, section by section

1. **Hero (orange).** Business headline, one sentence on who it's for, "Start a project" and "See our work". On the right, the three services as black tiles (straight from design 6).
2. ~~**Trusted by.**~~ Removed at the user's request (2026-10-17); something else may take its place later.
3. **Services (white).** Three cards linking to the service pages.
4. **Products (black).** JGB Tools (8 free tools, web and iOS/Android app), Street Brawl, MP3PAM, Tech Talk and Ti Kwen Pam, with links to their sites. This is what makes JGB Solutions look like a company and not a freelancer.
5. **Selected work (white).** Three or four projects with their screenshots.
6. **How we work.** The real sequence, for example Discovery → Design → Build → Launch & support. Numbered, because it is an order.
7. **Insights.** Built, but hidden while the blog is switched off (`FEATURES.blog`).
8. **Call to action (orange):** email and WhatsApp, then the footer.

## Technical plan

- **Full-width sections:** `__root.tsx` boxes every page in `max-w-7xl mx-auto shadow-xl`. Color bands need to run edge to edge, so the box moves inside each section.
- **Tokens:** define the colors and fonts in `src/globals.css` (`@theme`) and replace hard-coded `bg-orange-500` / `bg-black` with them.
- **Shared components:** `SiteHeader`, `SiteFooter`, `Logo`, `Section` (paper / ink / brand), `SectionLabel`, `ButtonLink`, `ServiceCard`, `ProductCard`, restyled `ProjectCard` and `PostCard`. They replace `bold-theme`, `bold-layout` and `bold-cta`.
- **Fonts:** add `@fontsource/saira` (and a mono face), self-hosted like Inter.
- **SEO:** a title and description per page; JSON-LD for an `Organization` / `ProfessionalService` instead of a person; add the new routes to the sitemap; update `SEO.description` and keywords in `src/lib/constants.ts`.
- **Tests:** a `renderWithRouter` test for each new route and component, as in AGENTS.md.
- **Unchanged rules:** `public/ads.txt` stays as is; `@tanstack/react-start` stays at 1.168.60 or later; no placeholder pages.
- **Cleanup at the end:** delete `/landing/bold-digital` and the `bold-*` components once the new home page replaces them.

## Phases

Each phase is a commit (or a few) on `site-revamp`. Once phase 1 is in, push the branch and open a **draft PR** so every phase gets a Vercel preview link to review. Merge into `main` only when the whole site is done and the preview looks right.

1. **Foundation.** Tokens, fonts, logo, full-width root layout, header, footer, `Section` and button components, `available` flag on services. **Done 2026-10-17** (uncommitted): brand tokens in `src/globals.css` (the theme's `primary` is now the logo orange with black text), Saira + JetBrains Mono, vector `Logo`, `SiteHeader` / `SiteFooter` / `Section` / `buttonStyles` in `src/components/site/`, root layout no longer boxed, dark mode and its toggle removed, Laval in the SEO copy. The header nav only lists pages that exist (Work, Insights); "Start a project" is a `mailto:` until `/contact` exists. WhatsApp/phone added to the footer.
2. **Home page.** All eight sections, replacing the current home page. **Built 2026-10-17, look not chosen yet:** `src/routes/index.tsx` with sections in `src/components/home/`; products vs client work from `src/lib/products.ts`. `?look=bold` (default) or `?look=light` switches the look, with a floating Bold/Light toggle (hidden on jgb.solutions). **The user chose the bold look**; the light look and its switcher are removed (recoverable from commit 451cded). The old contact form, its Resend server function and the old home sections are removed. Post excerpts are left off the home page (one mentions the founder by name).
3. **Services.** `/services` and the three service pages.
4. **Products, About, Contact, Privacy.**
5. **Work and Insights.** Restyle the projects and posts lists and detail pages.
6. **Finish.** SEO and JSON-LD, sitemap, accessibility and contrast pass, phone layouts, performance, remove the reference route, update AGENTS.md, mark the PR ready.

## Decisions (2026-10-17)

1. **Location:** Laval, Québec. Use it in the footer, About, SEO and JSON-LD. (Old blog posts that mention Port-au-Prince stay as written.)
2. **Products:** JGB Tools, Street Brawl, MP3PAM, Tech Talk and Ti Kwen Pam are JGB Solutions products. The user usually builds apps and media sites as products; clients mostly want static sites or landing pages. **Always ask the user whether a new project is a product or client work.**
3. **Numbers:** "10+ years" (since 2009), "dozens of clients", "dozens of projects".
4. **Theme:** no dark-mode toggle. Show a light variant of the home page next to the bold one in phase 2.
5. **Contact:** **no contact form** (spam). Business email services@jgb.solutions and the business WhatsApp/phone **+1 438 389 5465**, shown on the site (`SITE.phone` in `src/lib/constants.ts`). Remove the current form (`src/components/contact.tsx`, `src/lib/functions/contact.ts` and the Resend dependency) when the home page is replaced.
6. **Pricing:** no prices; "Contact us for a quote".
7. **Headline:** in use: "Websites, apps and social media for your business." Alternatives offered: "Your business, online and on every phone." / "We build the digital side of your business." The user can pick or rewrite.
8. **Founder:** your name, photo and story only on the About page, not the home page.
