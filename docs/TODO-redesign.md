# Redesign to-do list

_Last updated 2026-10-19. Branch `site-revamp` (on GitHub, not merged, no PR yet). The plan and the reasons behind each choice are in [PLAN-redesign.md](PLAN-redesign.md)._

**Done:** every page is in the new design: home, Services and the three service pages, Products, Work list and project pages, About (draft copy), Privacy, 404 · contact band at the bottom of every page · share image, favicons, web manifest and structured data for the business · blog switched off · Ti Kwen Pam hidden · superlatives removed from write-ups · screenshots 60% lighter · skip link and keyboard focus · checked at phone, tablet and wide-screen sizes.

Items marked **(you)** need a decision or content from you.

## 1. Decisions and content from you

- [ ] **(you)** Headline: keep "Websites, apps and social media for your business." (also on the share image) or pick another.
- [ ] **(you)** Confirm the "How we work" steps (Discovery, Design, Build, Launch & support) match how you work.
- [ ] **(you)** Confirm the selling points on each service page are things you do (for example the monthly social media report, App Store and Google Play submissions).
- [ ] **(you)** About page: rewrite the draft in your own words and pick the photo (it uses `jgb-2022-800.jpg` from the old home page). The draft mentions legal tech, AI-powered systems, enterprise software and mentoring, from your old About text.
- [ ] **(you)** Review the Privacy page (it promises an answer within 30 days and says email is stored by "our email provider").
- [ ] **(you)** A social media client to show on the Social Media page (no examples yet).
- [ ] **(you)** When the JGB Tools app is in the stores, say so: it goes back on the Mobile Apps page as an example.
- [ ] **(you)** Something to replace the removed client list on the home page, or leave it out.
- [x] X account: **@jgb_solutions** is the business's account (confirmed 2026-10-27); it's back in the page metadata and the structured data.
- [ ] **(you)** Business LinkedIn / Instagram pages when they're back (the footer uses your personal ones).
- [ ] **(you)** A separate `/contact` page: my recommendation is no, since every page ends with the contact band. Confirm.

## 2. Before launch

- [ ] Open a pull request from `site-revamp` to `main`; check the Vercel preview on desktop and phone.
- [ ] Merge with a merge commit once checks and the preview are good (this deploys jgb.solutions).
- [ ] After launch: `https://jgb.solutions/ads.txt` still serves; the sitemap lists the new pages; a shared link shows the new share image (test in a WhatsApp or LinkedIn message).
- [ ] Remove `RESEND_API_KEY` from the Vercel project (the contact form that used it is gone).
- [ ] Optional: delete the old `/posts` URLs from Google Search Console if they were indexed (they now return 404 while the blog is off).

## Done after launch

- [x] README rewritten as a showcase for JGB Solutions (it's also what github.com/jgb-solutions shows, since that's a personal account whose same-named repo is this one).
- [x] Repo About box: website https://jgb.solutions and a description.
- [x] SEO: sitemap `lastmod`, structured data per page, X account, and `bun run seo:check` in CI.

## Later (not part of the redesign)

- [ ] Turn on Photography / Videography, Graphic Design and Print when you offer them (`available: true` in `src/lib/services.ts`, plus examples).
- [ ] Turn the blog back on when there are business posts (`FEATURES.blog` in `src/lib/features.ts`), and restyle the post pages then.
- [ ] Add On Air, Fake Jobs, Top Everything and Okap Lakay when they're live (product or client work: you decide).
- [ ] Bring Ti Kwen Pam back if it gets a redesign.
- [ ] Shared JGB brand kit to replace the logo copied from JGB Tools.
- [ ] Is the `Dockerfile` still needed? The site deploys on Vercel.
