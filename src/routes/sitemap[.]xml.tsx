import { createFileRoute } from '@tanstack/react-router'
import { buildSitemap } from '@/lib/sitemap'

// buildSitemap is a plain function: this GET handler already runs on the server. (Calling a
// createServerFn from a server route fails since TanStack Start 1.168.)
export const Route = createFileRoute('/sitemap.xml')({
  // Define server-side GET handler for sitemap XML
  server: {
    handlers: {
      GET: () => {
        const sitemap = buildSitemap()
        return new Response(sitemap, {
          headers: { 'Content-Type': 'application/xml' },
        })
      },
    },
  },
})
