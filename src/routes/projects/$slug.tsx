import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { MdxRenderer } from "@/components/mdx-provider"
import { allProjects } from "content-collections"
import { createPageSEO } from "@/lib/seo"

import { createServerFn } from "@tanstack/react-start"
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions"

const getProject = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	// .middleware([staticFunctionMiddleware])
	.handler(async ({ data: slug }) => {
		const project = allProjects.find((p) => p.slug === slug)
		if (!project) throw notFound()
		return { project }
	})

export const Route = createFileRoute("/projects/$slug")({
	head: ({ loaderData }) => {
		if (!loaderData) return {}
		const { project } = loaderData
		return createPageSEO({
			title: `${project.title} - Project | JGB Solutions`,
			description: project.description,
			image: project.image,
			type: "article",
			path: `/projects/${project.slug}`
		})
	},
	loader: async ({ params }) => await getProject({ data: params.slug }),
	notFoundComponent: () => {
		return (
			<main className="min-h-screen bg-background">
				<Navbar />
				<section className="py-20 px-6 md:px-20">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl md:text-6xl font-light mb-4">Project Not Found</h1>
						<Link to="/projects" className="text-primary hover:underline">
							← Back to Projects
						</Link>
					</div>
				</section>
				<Footer />
			</main>
		)
	},
	component: ProjectDetailPage
})

function ProjectDetailPage() {
	const { project } = Route.useLoaderData()

	return (
		<main className="min-h-screen bg-background">
			<Navbar />

			<section className="py-12 sm:py-16 md:py-20 px-6 md:px-20">
				<div className="max-w-6xl mx-auto">
					<Link
						to="/projects"
						className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
					>
						← Back to Projects
					</Link>

					{/* Hero Image */}
					<div className="mb-8 md:mb-12 rounded-lg overflow-hidden">
						<img
							src={project.image || "/placeholder.svg"}
							alt={project.title}
							className="w-full object-cover"
							style={{ maxHeight: "800px" }}
						/>
					</div>

					{/* Project Info */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
						<div className="md:col-span-2">
							<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4">
								{project.title}
							</h1>
							<p className="text-base md:text-lg text-muted-foreground mb-8">
								{project.description}
							</p>
						</div>
						{(project.client || project.year || project.services) && (
							<div className="space-y-4 md:space-y-6">
								{project.client && (
									<div>
										<h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">
											Client
										</h3>
										<p>{project.client}</p>
									</div>
								)}
								{project.year && (
									<div>
										<h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">
											Year
										</h3>
										<p>{project.year}</p>
									</div>
								)}
								{project.services && project.services.length > 0 && (
									<div>
										<h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">
											Services
										</h3>
										<ul className="space-y-1">
											{project.services.map((service: string, index: number) => (
												<li key={index}>{service}</li>
											))}
										</ul>
									</div>
								)}
							</div>
						)}
					</div>

					{/* Project Details (MDX) */}
					<div className="prose prose-lg dark:prose-invert max-w-none mb-12 md:mb-16">
						<MdxRenderer code={project.mdx} />
					</div>

					{/* Gallery */}
					{project.gallery && project.gallery.length > 0 && (
						<div>
							<h2 className="text-xl md:text-2xl font-light mb-6 md:mb-8">Gallery</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
								{project.gallery.map((image: string, index: number) => (
									<div key={index} className="rounded-lg overflow-hidden">
										<img
											src={image || "/placeholder.svg"}
											alt={`${project.title} gallery ${index + 1}`}
											width={800}
											height={600}
											className="w-full object-cover"
										/>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</section>

			<Footer />
		</main>
	)
}
