import { defineConfig } from "vite"
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

export default defineConfig({
	// TanStack Redact (smaller React): bundle server dependencies so their React imports are redirected too
	ssr: { noExternal: true },
	plugins: [
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
