# JGB Solutions brand kit

Every file here is generated from the vector logo in `src/lib/brand.ts` by `bun scripts/generate-brand-images.ts` (the same script makes the site's favicons and share image in `public/`). Don't edit the images by hand: change the logo, colors or headline, then run the script.

## Colors and fonts

| Name   | Hex       | Use                                                          |
| ------ | --------- | ------------------------------------------------------------ |
| Orange | `#F7961D` | The brand color. Text on orange is always black, never white |
| Ink    | `#050708` | Black: text, dark backgrounds                                |
| Paper  | `#FFFFFF` | White backgrounds, text on ink                               |

Fonts (all free, Google Fonts): **Saira** ExtraBold for headings and the logo, **Inter** for text, **JetBrains Mono** for small uppercase labels. Corners are square.

## Files

| File                                  | Size        | Where it goes                                                           |
| ------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| `logo/logo-light.svg` / `.png`        | 2400 wide   | Full logo, transparent, for light backgrounds                           |
| `logo/logo-dark.svg` / `.png`         | 2400 wide   | Full logo, transparent, for dark backgrounds                            |
| `logo/logo-on-white.*`                | 2400 wide   | Full logo on white (documents, invoices, email signatures)              |
| `logo/logo-on-black.*`                | 2400 wide   | Full logo on black                                                      |
| `logo/logo-on-orange.*`               | 2400 wide   | Full logo in black on orange                                            |
| `icon/icon.svg`, `icon/icon-1024.png` | 1024 square | The JGB icon: black letters on orange (app icons, avatars)              |
| `icon/icon-dark.*`                    | 1024 square | Orange letters on black                                                 |
| `social/profile-400.png`              | 400 square  | Profile picture: LinkedIn page logo, X (padded for the round crop)      |
| `social/profile-1080.png`             | 1080 square | Profile picture: Instagram, Facebook, WhatsApp Business                 |
| `social/linkedin-cover.png`           | 2256×382    | LinkedIn page cover (LinkedIn's size is 1128×191; this is 2× for sharp) |
| `social/x-header.png`                 | 1500×500    | X (Twitter) header                                                      |
| `social/facebook-cover.png`           | 1640×624    | Facebook page cover                                                     |
| `social/youtube-banner.png`           | 2560×1440   | YouTube channel banner (text inside the 1546×423 safe area)             |
| `social/share-image.png`              | 1200×630    | Link share image (the site's `og-image.png`), also for posts            |

The LinkedIn and X covers keep the text on the right, since those sites put the profile picture over the lower left. The Facebook cover centers it, because phones show only the middle of it, and the YouTube banner centers it in the safe area that phones, computers and TVs all show.

## Rules

- JGB is always paired with the product or company name (JGB Solutions, JGB Tools…), beside or under it.
- Keep a clear space around the logo of at least the height of the "J".
- Don't stretch, recolor, outline or add effects to the logo.
