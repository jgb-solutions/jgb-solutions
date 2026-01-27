import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "@/globals.css"
import "@fontsource/inter"

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
				title: "Jean Gérard Bousiquot - Software Engineer & Mentor"
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
	component: RootComponent
})

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
