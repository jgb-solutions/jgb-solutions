# Archived landing-page designs

Design explorations for the JGB Solutions revamp (October 2026), kept for reference. They are **not part of the app**: nothing imports them, and TypeScript, ESLint and Vitest skip this folder.

The user picked **Bold Digital** (design 6), which stays live at `src/routes/landing/bold-digital.tsx` as the reference for the redesign. They also liked **Bold Services** (design 5, `routes/bold-services.tsx`) for showing every service, including the creative ones.

- `routes/` — the other 14 landing pages (each was `src/routes/landing/<name>.tsx`).
- `components/` — the layout, CTA and marquee only these pages used, plus `design-switcher.tsx`, the floating "1/16 Current homepage" switcher that was mounted in `__root.tsx` to flip between designs.

To view one again, move it back into `src/routes/landing/` (and its components into `src/components/landing/`), then run `bun run dev` to regenerate the route tree. Imports still point at `@/components/landing/...`.
