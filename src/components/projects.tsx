import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { allProjects } from "content-collections"

const projects = allProjects
	.sort((a, b) => parseInt(b.year || "0") - parseInt(a.year || "0"))
	.slice(0, 4)

export default function Projects() {
	return (
		<section id="projects" className="py-20 px-6 md:px-20">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-end mb-12">
					<h2 className="text-3xl md:text-4xl font-light">Featured Projects</h2>
					<Link to="/projects">
						<Button variant="outline" className="rounded-xl bg-transparent">
							View All Projects
						</Button>
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{projects.map((project, index) => (
						<Link
							to={`/projects/${project.slug}`}
							key={index}
							className="group relative overflow-hidden block rounded-2xl"
						>
							<img
								src={project.image || "/placeholder.svg"}
								alt={project.title}
								width={800}
								height={600}
								className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
								<h3 className="text-white text-2xl mb-2">{project.title}</h3>
								<p className="text-white/70 mb-2">{project.category}</p>
								<p className="text-white/90 text-sm">{project.summary}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
