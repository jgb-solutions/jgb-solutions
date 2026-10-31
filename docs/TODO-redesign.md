# To-do list

_Last updated 2026-10-27. The redesign is live on https://jgb.solutions (merged 2026-10-19). The plan and the reasons behind each choice are in [PLAN-redesign.md](PLAN-redesign.md)._

Items marked **(you)** need a decision, content or an action from you.

## 1. Content and decisions from you

- [ ] **(you)** Headline: keep "Websites, apps and social media for your business." (also on the share image) or pick another.
- [ ] **(you)** Confirm the "How we work" steps (Discovery, Design, Build, Launch & support) match how you work.
- [ ] **(you)** Confirm the selling points on each service page are things you do (for example the monthly social media report, App Store and Google Play submissions), and the contract-work wording ("Need an extra engineer?") on the Services page and in the README.
- [ ] **(you)** About page: rewrite the draft in your own words and pick the photo (it uses `jgb-2022-800.jpg` from the old home page). The draft mentions legal tech, AI-powered systems, enterprise software and mentoring, from your old About text.
- [ ] **(you)** Review the Privacy page (it promises an answer within 30 days and says email is stored by "our email provider").
- [ ] **(you)** Review the write-ups of the new and rewritten products: Cinetta (formerly AllFlix), Domino Club, API Playground, MP3Pam and Tech Talk (built from their code, docs and live sites on 2026-10-27).
- [ ] **(you)** A social media client to show on the Social Media page (no examples yet).
- [ ] **(you)** Something to replace the removed client list on the home page, or leave it out.
- [ ] **(you)** A separate `/contact` page: my recommendation is no, since every page ends with the contact band. Confirm.

## 2. Accounts and settings (you)

- [ ] **(you)** Remove `RESEND_API_KEY` from the Vercel project (the contact form that used it is gone).
- [ ] **(you)** Submit `https://jgb.solutions/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Optional: remove the old `/posts` URLs there (they return 404 while the blog is off).
- [ ] **(you)** Share a jgb.solutions link in WhatsApp or LinkedIn to check the new share image.
- [ ] **(you)** GitHub profile settings (github.com/settings/profile): bio "Founder of JGB Solutions: websites, mobile apps and social media. Also available for freelance and contract work.", company JGB Solutions, location Laval, Québec, Canada, website https://jgb.solutions.
- [ ] **(you)** Old public GitHub repos: which to pin (suggested: `jgb-solutions`, `pick-object`) and which to archive or make private.
- [ ] **(you)** Business LinkedIn / Instagram pages when they're back (the footer uses your personal ones).

## 3. Follow-ups

- [ ] Redeploy the other product sites so their "More from JGB Solutions" footers pick up the new products list (`products.json`: AllFlix, Domino Club, API Playground, and "MP3Pam" with its new tagline).
- [ ] Simone Fievre: new card image once the empty Amazon banners are removed or her new site is live (her new site is planned in `~/Code/Web/simone-fievre-site`).
- [ ] When the JGB Tools app is in the stores: add it back as an example on the Mobile Apps page.

## Done

- [x] Redesign merged and live (2026-10-19); `ads.txt` and the sitemap checked on the live site.
- [x] AdSense approved (2026-10-19); no ads on jgb.solutions, ads go on the products.
- [x] README rewritten as a showcase for JGB Solutions (also the github.com/jgb-solutions profile page); repo About box updated.
- [x] SEO: sitemap `lastmod`, structured data per page, X account `@jgb_solutions`, `<` escaped in structured data, and `bun run seo:check` in CI (24 pages pass on the live site).
- [x] Contract work offered: "Need an extra engineer?" on the Services page and in the README.
- [x] Projects refreshed from the live sites (2026-10-27): new screenshots, MP3Pam and Tech Talk rewritten, AllFlix, Domino Club and API Playground added; seven products.
- [x] jgb-starter: sitemap dates, optional X handle, `seo:live` check and lessons brought back (jgb-starter PR #2).

## Later

- [ ] Turn on Photography / Videography, Graphic Design and Print when you offer them (`available: true` in `src/lib/services.ts`, plus examples).
- [ ] Turn the blog back on when there are business posts (`FEATURES.blog` in `src/lib/features.ts`), and restyle the post pages then.
- [ ] Add On Air, Fake Jobs, Top Everything and Okap Lakay when they're live (product or client work: you decide).
- [ ] Bring Ti Kwen Pam back if it gets a redesign.
- [ ] Shared JGB brand kit to replace the logo copied from JGB Tools.
- [ ] Is the `Dockerfile` still needed? The site deploys on Vercel.
