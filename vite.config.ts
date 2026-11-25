import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import type { Plugin } from "vite"
import viteReact from "@vitejs/plugin-react"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import contentCollections from "@content-collections/vite"
import { nitro } from "nitro/vite"
import tailwindcss from "@tailwindcss/vite"
import { redact } from "@tanstack/redact/vite"

const ReactCompilerConfig = {
	/* ... */
}

/**
 * Preview only (APP_STORES_PREVIEW=1): gives the bundled copy of public/products.json the fake store
 * links in src/test/fixtures/app-stores-preview.json, so the platform chips and store badges can be
 * seen before any app is live. The served /products.json file is never changed.
 */
function appStoresPreview(): Plugin | undefined {
	if (process.env.APP_STORES_PREVIEW !== "1") return undefined
	const fixture: Record<string, { googlePlay: string; appStore: string }> = JSON.parse(
		readFileSync(new URL("./src/test/fixtures/app-stores-preview.json", import.meta.url), "utf8")
	)
	return {
		name: "app-stores-preview",
		enforce: "pre",
		transform(code, id) {
			if (!id.endsWith("/public/products.json")) return undefined
			const feed = JSON.parse(code)
			for (const product of feed.products) {
				const links = fixture[product.id]
				if (links && product.app) Object.assign(product.app, links)
			}
			return { code: JSON.stringify(feed), map: null }
		}
	}
}

export default defineConfig({
	// TanStack Redact (smaller React): bundle server dependencies so their React imports are redirected too
	ssr: {
		noExternal: true,
		// The dev server's SSR runner can't run CommonJS. @content-collections/mdx/react imports
		// mdx-bundler/client, which ships only CommonJS, so dev pre-bundles the pair to ESM
		// (listing mdx-bundler/client alone isn't enough: its importer kept the raw file).
		// Production builds convert CommonJS themselves and don't use this.
		optimizeDeps: { include: ["@content-collections/mdx/react"] }
	},
	resolve: {
		alias: [
			// lucide-react's exports list "node" (CommonJS) before "import", so the dev server's SSR
			// runner loaded the CommonJS build and every page failed with "require is not defined".
			// Point it at the ES module build, which the browser and production builds use anyway.
			{
				find: /^lucide-react$/,
				replacement: fileURLToPath(new URL("./node_modules/lucide-react/dist/esm/lucide-react.mjs", import.meta.url))
			}
		]
	},
	plugins: [
		appStoresPreview(),
		tailwindcss(),
		contentCollections(),
		tsconfigPaths(),
		tanstackStart({
			// Every page is prerendered to static HTML at build time and served from Vercel's CDN
			// (the owner's choice, 2026-11-11). Pages are found by crawling links from the home
			// page; the switched-off blog and ?query variants are skipped. Server functions stay on
			// Vercel for client-side navigation, and unknown URLs still get the 404 page from it.
			prerender: {
				enabled: true,
				crawlLinks: true,
				autoStaticPathsDiscovery: true,
				failOnError: true,
				filter: page =>
					!page.path.startsWith("/posts") && !page.path.includes("?") && !/\.(pdf|png|jpe?g|svg)$/.test(page.path)
			},
			pages: [{ path: "/sitemap.xml", prerender: { enabled: true, outputPath: "/sitemap.xml" } }]
		}),
		viteReact({
			// babel: {
			// 	plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]
			// }
		}),
		// TanStack Redact replaces React; it must come after the Start and React plugins
		redact(),
		nitro({
			preset: process.env.BUILD_TARGET === "bun" ? "bun" : "vercel",
			routeRules: {
				// Security headers on every response (pages, assets, server functions). No CSP yet: the
				// site has inline scripts and a strict policy needs nonces, so it is a separate change.
				"/**": {
					headers: {
						"x-content-type-options": "nosniff",
						"x-frame-options": "DENY",
						"referrer-policy": "strict-origin-when-cross-origin",
						"permissions-policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()"
					}
				},
				// Optimized images have content-hashed names (scripts/optimize-images.ts): cache forever
				"/img/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
				// The original JPEGs keep their names when a screenshot is replaced: cache for a day
				"/assets/images/**": {
					headers: { "cache-control": "public, max-age=86400, stale-while-revalidate=604800" }
				}
			}
		})
	]
})
