# Archived landing-page designs

Design explorations for the JGB Solutions revamp (October 2026), kept for reference. They are **not part of the app**: nothing imports them, and TypeScript, ESLint and Vitest skip this folder.

The user picked **Bold Digital** (design 6, `routes/bold-digital.tsx`); the new site in `src/` is built from it. They also liked **Bold Services** (design 5, `routes/bold-services.tsx`) for showing every service, including the creative ones.

- `routes/` — all 15 landing pages (each was `src/routes/landing/<name>.tsx`), design 6 included.
- `components/` — the layouts, CTAs and marquee these pages used (`bold-*` for designs 4–6, `landing-*` for the others), plus `design-switcher.tsx`, the floating "1/16 Current homepage" switcher that was mounted in `__root.tsx` to flip between designs.

To view one again, move it back into `src/routes/landing/` (and its components into `src/components/landing/`), then run `bun run dev` to regenerate the route tree. Expect small fixes: imports point at `@/components/landing/...`, and some pages used `DIGITAL_SERVICES` / `CREATIVE_SERVICES` and the old service slugs and names, which have since been removed or renamed in `src/lib/services.ts`. The marquee animation they used was also removed from `src/globals.css`.
