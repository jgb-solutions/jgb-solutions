import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "@/globals.css"
import "@fontsource/inter"
import { SITE, SEO, SOCIAL, OG_IMAGE } from "@/lib/constants"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8"
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				title: `${SITE.name} - Software Engineer & Mentor`
			},

			// SEO Meta Tags
			{
				name: "description",
				content: SEO.description
			},
			{ name: "author", content: SITE.author },
			{ name: "robots", content: "index, follow" },
			{
				name: "keywords",
				content: SEO.keywords.join(", ")
			},

			// Open Graph Tags
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: SITE.url },
			{
				property: "og:title",
				content: `${SITE.name} - Software Engineer & Mentor`
			},
			{
				property: "og:description",
				content:
					"Full-stack software engineer specializing in React, TypeScript, and scalable web solutions. View my portfolio of 20+ successful projects."
			},
			{
				property: "og:image",
				content: OG_IMAGE.url
			},
			{ property: "og:image:width", content: OG_IMAGE.width.toString() },
			{ property: "og:image:height", content: OG_IMAGE.height.toString() },
			{
				property: "og:image:alt",
				content: OG_IMAGE.alt
			},
			{ property: "og:site_name", content: SITE.name },
			{ property: "og:locale", content: "en_US" },

			// Twitter Card Tags
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:site", content: SOCIAL.twitter },
			{ name: "twitter:creator", content: SOCIAL.twitter },
			{
				name: "twitter:title",
				content: `${SITE.name} - Software Engineer & Mentor`
			},
			{
				name: "twitter:description",
				content:
					"Full-stack software engineer specializing in React, TypeScript, and scalable web solutions."
			},
			{
				name: "twitter:image",
				content: OG_IMAGE.url
			},
			{
				name: "twitter:image:alt",
				content: OG_IMAGE.alt
			}
		],
		links: [
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/assets/icons/apple-icon-180x180-dunplab-008.png"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "96x96",
				href: "/assets/icons/favicon-96x96-dunplab-008.png"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/assets/icons/favicon-32x32-dunplab-008.png"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/assets/icons/favicon-16x16-dunplab-008.png"
			},
			{ rel: "manifest", href: "/site.webmanifest" }
		]
	}),
	component: RootComponent,
	notFoundComponent: NotFoundPage
}

)

function NotFoundPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-6">
			<div className="max-w-2xl w-full text-center space-y-8">
				{/* 404 Animation */}
				<div className="relative">
					<h1 className="text-[150px] md:text-[200px] font-bold text-primary/10 select-none">
						404
					</h1>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-border">
							<h2 className="text-3xl md:text-4xl font-bold mb-3">
								Page Not Found
							</h2>
							<p className="text-muted-foreground text-lg">
								Oops! The page you're looking for doesn't exist.
							</p>
						</div>
					</div>
				</div>

				{/* Helpful Message */}
				<div className="space-y-4 pt-8">
					<p className="text-muted-foreground">
						The page may have been moved, deleted, or the URL might be incorrect.
					</p>

					{/* Navigation Options */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
						<a
							href="/"
							className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 group-hover:-translate-x-1 transition-transform"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
									clipRule="evenodd"
								/>
							</svg>
							Back to Home
						</a>

						<a
							href="/projects"
							className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-accent transition-all duration-200"
						>
							View Projects
						</a>

						<a
							href="/posts"
							className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-accent transition-all duration-200"
						>
							Read Blog
						</a>
					</div>
				</div>

				{/* Search Suggestion */}
				<div className="pt-8 text-sm text-muted-foreground">
					<p>
						Or{" "}
						<a href="/#contact" className="text-primary hover:underline font-medium">
							get in touch
						</a>{" "}
						if you need help finding something.
					</p>
				</div>
			</div>
		</div>
	)
}
function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
					<div className="max-w-7xl mx-auto bg-background shadow-xl min-h-screen">{children}</div>
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	)
}
