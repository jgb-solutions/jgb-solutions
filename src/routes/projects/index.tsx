import { createFileRoute, Link } from "@tanstack/react-router"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { allProjects } from "content-collections"

export const Route = createFileRoute("/projects/")({
	component: ProjectsPage
})

function ProjectsPage() {
	// Sort projects: Assuming order in file is roughly chronological, but ideally we sort by date/year.
	// Since we only have 'year' as string in frontmatter, we can try to parse it.
	// For now, let's reverse them if they are in older-first order, or keep as is if they are newer-first.
	// The user asked for chronological order. Let's assume the migration script added them top-down which might be oldest first or random.
	// Let's implement a safe sort.

	const sortedProjects = [...allProjects].sort((a, b) => {
		// If year is present, compare years
		if (a.year && b.year) {
			return parseInt(b.year) - parseInt(a.year)
		}
		return 0 // maintain original order if no year
	})

	return (
		<main className="min-h-screen bg-background">
			<Navbar />

			<section className="py-12 sm:py-16 md:py-20 px-6 md:px-20">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8 md:mb-12">
						<Link
							to="/"
							className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block"
						>
							← Back to Home
						</Link>
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4">
							All Projects
						</h1>
						<p className="text-base md:text-lg text-muted-foreground max-w-2xl">
							A comprehensive portfolio showcasing expertise in full-stack development, AI
							integration, system architecture, and performance optimization.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
						{sortedProjects.map((project, index) => (
							<Link
								to={`/projects/${project.slug}`}
								key={index}
								className="group relative overflow-hidden block rounded-2xl"
							>
								<div className="aspect-[4/3] relative overflow-hidden">
									<img
										src={project.image || "/placeholder.svg"}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>
								<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
									<h3 className="text-white text-lg sm:text-xl mb-2">{project.title}</h3>
									<p className="text-white/90 text-sm mb-1">{project.category}</p>
									<p className="text-white/70 text-xs sm:text-sm">{project.summary}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</main>
	)
}
