import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const projects = [
  {
    slug: "ai-code-generation",
    title: "AI-Powered Code Generation System",
    category: "AI Development",
    image: "/modern-tech-branding.jpg",
    description: "Led the development of an AI system that boosted developer productivity by 40%",
  },
  {
    slug: "legal-tech-platform",
    title: "High-Performance Legal Tech Platform",
    category: "Full-Stack Development",
    image: "/ecommerce-web-design.jpg",
    description: "Architected and built a Vue3 solution that increased user engagement by 60%",
  },
  {
    slug: "enterprise-saas",
    title: "Enterprise SaaS Platform",
    category: "System Architecture",
    image: "/fullstack-web-app.jpg",
    description: "Designed and implemented scalable infrastructure serving 100K+ users",
  },
  {
    slug: "real-time-analytics",
    title: "Real-Time Analytics Dashboard",
    category: "Performance Optimization",
    image: "/abstract-motion-graphics.png",
    description: "Built high-performance analytics system processing millions of events daily",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-light">Featured Projects</h2>
          <Link href="/projects">
            <Button variant="outline" className="rounded-full bg-transparent">
              View All Projects
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link href={`/projects/${project.slug}`} key={index} className="group relative overflow-hidden block">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={800}
                height={600}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-white text-2xl mb-2">{project.title}</h3>
                <p className="text-white/70 mb-2">{project.category}</p>
                <p className="text-white/90 text-sm">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
