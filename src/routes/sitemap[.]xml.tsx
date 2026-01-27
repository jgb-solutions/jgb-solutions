import { createFileRoute } from "@tanstack/react-router"
import { allPosts, allProjects } from "content-collections"
import { SITE } from "@/lib/constants"

export const Route = createFileRoute("/sitemap.xml")({
	// Define server-side GET handler for sitemap XML
	server: {
		handlers: {
			GET: async () => {
				const baseUrl = SITE.url

				// Static routes
				const staticRoutes = ["", "/projects", "/posts"]

				// Dynamic routes
				const projectRoutes = allProjects.map((project) => `/projects/${project.slug}`)
				const postRoutes = allPosts.map((post) => `/posts/${post.slug}`)

				const allRoutes = [...staticRoutes, ...projectRoutes, ...postRoutes]

				const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
		.map((route) => {
			return `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : route.split("/").length > 2 ? "0.6" : "0.8"}</priority>
  </url>`
		})
		.join("")}
</urlset>`

				return new Response(sitemap, {
					headers: {
						"Content-Type": "application/xml"
					}
				})
			}
		}
	}
})
