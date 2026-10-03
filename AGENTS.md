# Agent Guidelines for JGB Solutions

This document provides essential information for AI agents operating within this codebase.

## 1. Project Overview

- **Framework:** TanStack Start (React 19)
- **Routing:** TanStack Router (File-based routing)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Package Manager:** Bun
- **Content:** @content-collections/mdx

## 2. Key Commands

| Action             | Command                | Description                           |
| ------------------ | ---------------------- | ------------------------------------- |
| **Build**          | `bun run build`        | Builds the application for production |
| **Dev Server**     | `bun run dev`          | Starts local development server       |
| **Lint (Check)**   | `bun run lint:check`   | Checks for linting errors             |
| **Lint (Fix)**     | `bun run lint`         | Auto-fixes linting errors             |
| **Format (Check)** | `bun run format:check` | Checks code formatting                |
| **Format (Fix)**   | `bun run format`       | Auto-formats code using Prettier      |
| **Type Check**     | `bun run type-check`   | Runs TypeScript compiler check        |
| **Test (Run)**     | `bun run test:run`     | Runs all tests once (CI mode)         |
| **Test (Watch)**   | `bun run test`         | Runs tests in watch mode              |

### Running Specific Tests

To run a specific test file:

```bash
bun x vitest run src/components/ui/button.test.tsx
```

## 3. Code Style & Conventions

### Imports

- **Absolute Paths:** Always use the `@/` alias for internal imports (e.g., `import { Button } from '@/components/ui/button'`).
- **Grouping:** Group imports by:
  1. Built-in/External libraries (React, TanStack, etc.)
  2. Internal absolute imports (`@/lib/...`, `@/components/...`)
  3. Relative imports (`./utils`)

### Component Structure

- **Functional Components:** Use function declarations.
- **Co-location:** Place test files (`*.test.tsx`) next to their source files.
- **Exports:** Prefer named exports for components.

### Routing (TanStack Router)

- **File-Based:** Routes are defined in `src/routes/`.
- **Loaders:** Use `createServerFn` for data fetching. Remove `async` from loader functions if they don't await anything internally.
- **Server routes** (`server: { handlers: { GET } }`, e.g. `sitemap[.]xml.tsx`) already run on the server: build the response with plain functions. Calling a `createServerFn` from inside a server route handler fails since TanStack Start 1.168 ("Server function info not found").
- **Search Params:** Use Zod for validating search parameters.

### Testing (Vitest + React Testing Library)

- **Environment:** Tests run in `jsdom`.
- **Router Testing:**
  - DO NOT extract `Route.component` to test in isolation.
  - USE `renderWithRouter` from `@/test/router-utils` to test components within a real router context.
  - Mock data sources (like `content-collections`) using `vi.mock` to simulate empty/filled states.
- **Mocks:**
  - Mock strict types: use `Record<string, unknown>` instead of `any`.
  - Use `vi.mocked()` for type-safe mocking.

### Styling

- **Tailwind CSS:** Use utility classes.
- **Conditional Classes:** Use `cn()` utility (clsx + tailwind-merge) for conditional styling.

### Error Handling

- **Console:** Avoid `console.log` in production code. Use `console.error` for caught exceptions but suppress linter warnings if intentional.

## 4. Project Structure

```
src/
├── components/        # UI components
│   ├── ui/            # Reusable primitives (buttons, inputs)
│   └── ...            # Feature-specific components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and constants
├── routes/            # File-based routes (TanStack Router)
├── test/              # Test configuration and utilities
│   ├── mocks/         # Global mocks
│   ├── router-utils.tsx # Router testing helpers
│   └── setup.ts       # Vitest setup
├── router.tsx         # Router configuration
└── routeTree.gen.ts   # Generated route definitions
```

## 5. Deployment & Project Notes

_Last updated: 2026-10-03._

### Deployment

- Hosted on **Vercel**, project `jgb-solutions` (team `jgb-solutions`), serving https://jgb.solutions. Pushing to `main` deploys to production; pull requests get preview deploys.
- The old Vercel project `jgb-solutions-next` (repo `jgb.solutions-next`) is the previous site and hasn't deployed since 2022.
- **Keep `@tanstack/react-start` at 1.168.60 or later.** Older versions have a critical XSS (CVE-2026-102989 / GHSA-qx66-fv34-fjm8), and Vercel refuses to build them ("Vulnerable TanStack Start package detected"). Don't work around it with `DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS`. Upgraded in PR #1 (with `react-router` 1.170.41 and `zod-adapter` 1.167.0).

### Google AdSense

- `public/ads.txt` authorizes publisher `pub-1452812638164042` (`google.com, pub-1452812638164042, DIRECT, f08c47fec0942fa0`). **Don't remove or change it.** AdSense only accepts top-level domains, so jgb.solutions is the site Google reviews, and its approval covers subdomains such as https://tools.jgb.solutions (JGB Tools, which has the same `ads.txt`).
- If AdSense asks for the meta-tag method instead: `<meta name="google-adsense-account" content="ca-pub-1452812638164042">` in the root route's `head`.

### Work in progress: site revamp (landing pages)

- As of 2026-10-03, a revamp is **uncommitted** in the working tree of `main`: `src/components/landing/`, `src/routes/landing/` (pages such as `services`, `web-design`, `creative`, `business-theme-stacked`, `business-theme-editorial`) and `src/lib/services.ts`.
- Before deploying it, move it to its own branch and open a PR. Don't commit it straight to `main`, which deploys to production.
- `src/routeTree.gen.ts` is generated: after pulling or switching branches, let `bun run dev` or `bun run build` regenerate it instead of resolving conflicts by hand.

### Related

- JGB Solutions' products are named "JGB <Product>". The logo is the JGB letters plus the product name (Saira, orange `#F7961D`). The logo code lives in the JGB Tools repo (`jgb-solutions/jgb-tools`, `packages/core/src/brand.ts`); a shared brand kit is planned.
