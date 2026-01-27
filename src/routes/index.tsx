import { createFileRoute } from "@tanstack/react-router"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import MarqueeBar from "@/components/marquee-bar"
import Projects from "@/components/projects"
import About from "@/components/about"
import Services from "@/components/services"
import RecentPosts from "@/components/recent-posts"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { createPageSEO } from "@/lib/seo"

export const Route = createFileRoute("/")({
	head: () =>
		createPageSEO({
			title: "JGB Solutions - Web & Mobile Development",
			description:
				"Portfolio showcasing 20+ web and mobile development projects. Expertise in React, TypeScript, Node.js, and scalable solutions. Available for freelance and consulting.",
			path: "/"
		}),
	component: Home
})

function Home() {
	return (
		<main className="min-h-screen flex flex-col">
			<div className="relative bg-background">
				<Navbar />
				<Hero />
				<MarqueeBar />
			</div>
			<Projects />
			<About />
			<Services />
			<RecentPosts />
			<Contact />
			<Footer />
		</main>
	)
}
