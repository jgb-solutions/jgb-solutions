/// <reference types="vitest" />
import { defineConfig } from "vite"
import viteReact from "@vitejs/plugin-react"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import contentCollections from "@content-collections/vite"
import { nitro } from "nitro/vite"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

const ReactCompilerConfig = {
	/* ... */
}

export default defineConfig(({ mode }) => {
	const isTest = mode === 'test'

	return {
		plugins: [
			tailwindcss(),
			// Only include contentCollections and tanstackStart in non-test environments
			!isTest && contentCollections(),
			!isTest && tsconfigPaths(), // Vitest handles aliases via tsconfig.json usually, but keeping it is fine. Actually, tsconfigPaths is good for build but might conflict. Let's keep it safe.
			!isTest && tanstackStart({
				// TODO: Enable prerendering when ready for production
				// prerender: {
				// 	// Enable static prerendering
				// 	enabled: true,
				// 	// Automatically discover and prerender all static routes
				// 	autoStaticPathsDiscovery: true,
				// 	// Crawl links from prerendered pages to discover more pages
				// 	crawlLinks: true,
				// 	// Run multiple prerender jobs in parallel
				// 	concurrency: 14,
				// 	// Output pages as /page/index.html for cleaner URLs
				// 	autoSubfolderIndex: true
				// }
			}),
			viteReact({
				// babel: {
				// 	plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]
				// }
			}),
			!isTest && nitro({
				preset: process.env.BUILD_TARGET === "bun" ? "bun" : "vercel"
			})
		],
		test: {
			globals: false,
			environment: 'jsdom',
			setupFiles: './vitest.setup.ts',
			alias: {
				'@': path.resolve(__dirname, './src'),
				'content-collections': path.resolve(__dirname, './src/mocks/content-collections.ts')
			}
		},
	}
})
