import { defineConfig } from "vite"
import viteReact from "@vitejs/plugin-react"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import contentCollections from "@content-collections/vite"
import { nitro } from "nitro/vite"
import tailwindcss from "@tailwindcss/vite"

const ReactCompilerConfig = {
	/* ... */
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		contentCollections(),
		tsconfigPaths(),
		tanstackStart({
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
			babel: {
				plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]
			}
		}),
		nitro({
			preset: process.env.BUILD_TARGET === "bun" ? "bun" : "vercel"
		})
	]
})
