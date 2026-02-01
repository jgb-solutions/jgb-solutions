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
