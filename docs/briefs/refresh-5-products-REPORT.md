# Refresh five product pages report

## Write-ups

- **Musivo:** Updated the description and summary for its current charts, music discovery, concerts and platform-supplied previews. Reworked the challenge and solution to cover the current pages and no-hosted-audio approach.
- **Cinetta:** Updated the copy for current discovery features, release calendar, streaming and cinema availability, and My List. Revised the challenge and solution around its current catalog and viewing options.
- **OnAir:** Updated the copy for the live TV, radio and podcast catalog, browse options and provider-based playback. Removed unsupported claims about account requirements and hourly stream checks.
- **Top Facts:** Updated the copy for current categories, ranked lists, changes, RSS and list following. Replaced blanket freshness claims with source-based rankings and scheduled updates.
- **JGB Tools:** Updated the copy to describe the eight tools shown on the live home page and their current data handling. Removed claims about an upcoming mobile app and unsubstantiated performance and test metrics.

## Screenshots

No screenshots were recaptured. Playwright is installed, but Chromium cannot launch in this environment (macOS denied its Mach port rendezvous); the connected browser host is also unavailable. The existing JPEGs were left untouched, so the mappings below are intended capture targets, not completed captures. Image optimization and share-card generation were skipped to avoid treating stale images as fresh.

### Musivo — https://musivo.app/

- `featured.jpg` → `/` — home page, top.
- `screenshot-1.jpg` → `/new` — new releases.
- `screenshot-2.jpg` → `/genres` — genre directory.
- `screenshot-3.jpg` → `/artists` — trending artists.
- `screenshot-4.jpg` → `/videos` — music videos.
- `screenshot-5.jpg` → `/concerts` — upcoming concerts.
- `screenshot-6.jpg` → `/search?q=Taylor%20Swift` — populated music search.

### Cinetta — https://cinetta.app/

- `featured.jpg` → `/` — home page, top.
- `screenshot-1.jpg` → `/trending` — trending titles.
- `screenshot-2.jpg` → `/charts` — top charts.
- `screenshot-3.jpg` → `/new` — new releases.
- `screenshot-4.jpg` → `/coming-soon` — upcoming titles.
- `screenshot-5.jpg` → `/calendar` — release calendar.
- `screenshot-6.jpg` → `/genres` — genre directory.

### OnAir — https://on-air.jgb.solutions/

- `featured.jpg` → `/` — home page, top.
- `screenshot-1.jpg` → `/tv` — live TV directory.
- `screenshot-2.jpg` → `/tv/country/fr` — TV by country.
- `screenshot-3.jpg` → `/radio` — radio directory.
- `screenshot-4.jpg` → `/podcasts` — podcast directory.
- `screenshot-5.jpg` → `/search?q=news` — populated search results.
- `screenshot-6.jpg` → `/tv/France24.fr` — France 24 channel detail.

### Top Facts — https://top-facts.jgb.solutions/

- `featured.jpg` → `/` — home page, top.
- `screenshot-1.jpg` → `/c` — category directory.
- `screenshot-2.jpg` → `/c/tech` — technology lists.
- `screenshot-3.jpg` → `/whats-new` — recent ranking changes.
- `screenshot-4.jpg` → `/how-it-works` — ranking and source explanation.
- `screenshot-5.jpg` → `/search?q=mountains` — populated list search.
- `screenshot-6.jpg` → `/top/highest-mountains` — ranked list detail.

### JGB Tools — https://tools.jgb.solutions/

- `featured.jpg` → `/` — home page, top.
- `screenshot-1.jpg` → `/text` — Text Anyone tool.
- `screenshot-2.jpg` → `/is-it-down` — website availability checker.
- `screenshot-3.jpg` → `/qr` — QR code generator.
- `screenshot-4.jpg` → `/image-compressor` — image compressor.
- `screenshot-5.jpg` → `/link-preview` — link preview checker.
- `screenshot-6.jpg` → `/guides` — tool guides.

## Checks and limitations

- `bun run generate:collections` completed.
- `bun run lint:check`, `bun run type-check` and `bun run test:run` passed. Tests reported existing React HTML nesting and script-rendering warnings.
- `bun run format:check` flagged only the provided, unmodified `docs/briefs/refresh-5-products.md`; checks on changed files are run separately.
- `bun scripts/optimize-images.ts` and `bun run share-images` were not run because no images were replaced.
