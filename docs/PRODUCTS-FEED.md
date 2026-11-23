# The products feed (https://jgb.solutions/products.json)

`public/products.json` is the one list of JGB Solutions' own products. Every product's website reads it at build time for its "More from JGB Solutions" footer (each repo's `apps/web/scripts/sync-products.ts` saves a copy, and `packages/core/src/jgb-products.ts` parses it). Its shape is checked by `src/lib/products.test.ts`.

**Compatibility rule:** `version` stays `1` as long as changes only _add_ optional fields. Readers pick the fields they know and ignore the rest, so a new field never breaks an older footer. Removing or renaming a field, or changing its meaning, needs `version: 2` and an update to every reader first.

## Fields

| Field            | Since      | What it is                                                                                                                                                                                                                                                 |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `version`        | 1          | Always `1`.                                                                                                                                                                                                                                                |
| `products[]`     | 1          | `id`, `name`, `tagline`, `url`, `kind` (`web-app`, `game`, `media`), `category` (the footer column), `icon` (a square icon on jgb.solutions).                                                                                                              |
| `products[].app` | 2026-11    | Optional. The mobile app: `scheme` (`musivo` → `musivo://`), `ios` bundle id, `android` package, and the store pages `appStore` and `googlePlay`. **Both stay `null` until the app is live in that store** (the owner's rule: no store links before then). |
| `badges`         | 2026-11-22 | Optional. The official store badges, hosted on jgb.solutions: `badges.googlePlay` and `badges.appStore`, each with `image` (URL), `alt`, `width` and `height` (the image's own size).                                                                      |

## Showing the store badges in a product's footer

The owner's choice (2026-11-22): every product footer shows the store badges next to a product once its app is live, so our apps are promoted everywhere our products are used.

1. **Parse the new field.** In `packages/core/src/jgb-products.ts`, read `badges` like `app`: optional, and anything malformed counts as missing. Keep `parseProductsFeed` returning the products, and add a small `parseBadges(feed)` (or return both).
2. **Copy the badge images at build time**, like the icons: `sync-products.ts` downloads `badges.*.image` into `public/jgb-products/` so the footer serves them from its own domain (no request to jgb.solutions when a page loads).
3. **Render.** For each product in the footer list, when `product.app?.googlePlay` or `product.app?.appStore` is a string, show that store's badge as a link to it (`target="_blank" rel="noopener noreferrer"`), with the feed's `alt` text, at about 24–28 px high in a footer (both badges at the same height). Show nothing when both are `null`.
4. **Don't show a store link for a `null` value**, and never fill one in by hand: the links come only from the feed.

This site does the same on its own pages: `src/lib/app-stores.ts` reads the links, and `src/components/app-stores.tsx` has `PlatformChips` (Web · Android · iOS on /products and each product page) and `StoreBadges` (the badges on each product page). Each product page also gets one schema.org `MobileApplication` per store (`mobileAppJsonLd` in `src/lib/seo.ts`).

## Badge artwork

`public/assets/images/badges/`:

- `app-store.svg`: Apple's official "Download on the App Store" badge (black, US English), from Apple's marketing toolbox, unchanged.
- `google-play.png`: Google's official "Get it on Google Play" badge (US English), from Google's badge page, with its transparent padding trimmed so it lines up with Apple's badge at the same height.

Follow each store's guidelines: use the art as is (no recoloring, no edits to the badge itself), show both at the same height, keep clear space around them, and link only to the app's real store page.

## Previewing before an app is live

`APP_STORES_PREVIEW=1 bun run build` gives the bundled copy of the feed the **fake** store links in `src/test/fixtures/app-stores-preview.json` (Musivo only), so the chips and badges can be checked on a local build. The served `/products.json` is unchanged, and the fixture's links must never be copied into `public/products.json`.
