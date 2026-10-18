# Redesign to-do list

_Last updated 2026-10-18. Branch `site-revamp` (pushed to GitHub, not merged). The plan and the reasons behind each choice are in [PLAN-redesign.md](PLAN-redesign.md)._

**Done so far:** design 6 chosen and the other designs archived · brand foundation (logo orange, Saira, vector logo, header, footer) · new home page (bold look) · Services page and the three service pages · contact band at the bottom of every page · blog switched off · Ti Kwen Pam hidden.

Items marked **(you)** need a decision or content from you before I can finish them.

## 1. Decisions and content from you

- [ ] **(you)** Headline: keep "Websites, apps and social media for your business." or pick another.
- [ ] **(you)** Confirm the "How we work" steps (Discovery, Design, Build, Launch & support) match how you work.
- [ ] **(you)** Confirm the three selling points on each service page are things you actually do (for example the monthly social media report, handling App Store and Google Play submissions).
- [ ] **(you)** Is the JGB Tools mobile app live in the stores? If not, remove it as the example on the Mobile Apps page.
- [ ] **(you)** A social media client to show as an example on the Social Media page (the page has no examples yet).
- [ ] **(you)** About page: your story, what we do, and a photo you like (the current site uses `jgb-2022-800.jpg` and `JGB-Gwayavye-28-12-2020.jpg`).
- [ ] **(you)** Something to replace the removed client list on the home page, or leave it out.
- [ ] **(you)** Business LinkedIn / Instagram pages, when they're back up (the footer uses your personal ones for now).

## 2. New pages (phase 4)

- [ ] **Products** (`/products`): JGB Tools, Street Brawl, MP3PAM and Tech Talk with screenshots, a short description and a link to each live site. Add Products to the header and footer.
- [ ] **About** (`/about`): the company, your story (your name and photo go here, not on the home page), Laval, Québec, building since 2009. Add About to the header and footer.
- [ ] **Privacy** (`/privacy`): what the site collects (no forms; say whether there are analytics or ad cookies). AdSense expects one. Link it in the footer.
- [ ] Decide whether a separate `/contact` page is still needed now that every page ends with the contact band (probably not).

## 3. Restyle the remaining pages (phase 5)

- [ ] **Work list** (`/projects`): bring it into the new design (square cards, brand type, filter by category). It still uses the old rounded cards and "All Projects" heading.
- [ ] **Project page** (`/projects/$slug`): new header, details, gallery and "next project" link, in the new style.
- [ ] Split client work from our products on the Work page, or link products to `/products`.
- [ ] **404 page**: restyle in the brand (it now has the header, footer and contact band, but the middle is still the old design).
- [ ] Remove filler superlatives from project write-ups (AdSense rule): Tech Talk says "The leading tech platform", Ti Kwen Pam says "#1 Haitian Music Mag" (hidden for now).
- [ ] Take a new screenshot for the "JGB Solutions" project once the new site is live (the current one shows the old "I'M JEAN BOUSIQUOT" home page).
- [ ] Blog pages (`/posts`): restyle only when the blog is switched back on.

## 4. SEO, sharing and polish (phase 6)

- [ ] JSON-LD structured data for the business (`Organization` / `ProfessionalService`: name, logo, email, phone, Laval, Québec) instead of a person.
- [ ] New share image (`OG_IMAGE` points to `public.jgb.solutions/banner.jpg`, made for the old site) with the logo and the new headline.
- [ ] Fix `SOCIAL` in `src/lib/constants.ts`: it lists `@jgb_solutions`, `linkedin.com/in/jgbousiquot` and `github.com/jgbcode`, which don't match the footer. It's used in the page metadata.
- [ ] Favicon and app icon from the vector logo (the current ones are `*-dunplab-008.png`).
- [ ] Check every page's title and description.
- [ ] Accessibility pass: keyboard navigation, focus styles, contrast, image alt text, heading order.
- [ ] Performance pass: image sizes (project screenshots are large), font loading, Lighthouse on phone.
- [ ] Check every page on a phone, a tablet and a wide screen.

## 5. Clean-up

- [ ] Delete the design-6 reference page (`/landing/bold-digital`) and its `bold-*` components once nothing else needs them.
- [ ] Remove the leftovers from the old design in `src/globals.css` (dark-mode colors, marquee animation) and the `dark:` classes in the project and post pages.
- [ ] Remove unused components (`ui/input`, `ui/textarea`, old `ProjectCard` / `PostCard` styles once replaced).
- [ ] Update the README (it reads as a personal profile and says Laval/Montréal; add what this repo is and how to run it).
- [ ] Update AGENTS.md section 5 and the plan when the redesign ships.

## 6. Launch

- [ ] Open a pull request from `site-revamp` to `main` and check the Vercel preview on desktop and phone.
- [ ] Merge with a merge commit once checks and the preview are good (this deploys jgb.solutions).
- [ ] After launch: confirm `https://jgb.solutions/ads.txt` still serves, the sitemap lists the new pages, and nothing old 404s (for example links to `/posts`).
- [ ] Remove the unused `RESEND_API_KEY` from the Vercel project (the contact form that used it is gone).

## Later (not part of the redesign)

- [ ] Turn on Photography / Videography, Graphic Design and Print when you offer them (`available: true` in `src/lib/services.ts`, plus examples).
- [ ] Turn the blog back on when there are business posts to publish (`FEATURES.blog` in `src/lib/features.ts`).
- [ ] Add On Air, Fake Jobs, Top Everything and Okap Lakay when they're live (ask: product or client work?).
- [ ] Bring Ti Kwen Pam back if it gets a redesign.
- [ ] Shared JGB brand kit to replace the logo copied from JGB Tools.
