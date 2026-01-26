import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const allProjects = [
  {
    slug: "ai-code-generation",
    title: "AI-Powered Code Generation",
    category: "AI Development",
    description: "Led the development of an AI system that boosted developer productivity by 40%",
    image: "/modern-tech-branding.jpg",
  },
  {
    slug: "legal-tech-platform",
    title: "Legal Tech Platform",
    category: "Full-Stack Development",
    description: "Architected and built a Vue3 solution that increased user engagement by 60%",
    image: "/ecommerce-web-design.jpg",
  },
  {
    slug: "enterprise-saas",
    title: "Enterprise SaaS Platform",
    category: "System Architecture",
    description: "Designed and implemented scalable infrastructure serving 100K+ users",
    image: "/fullstack-web-app.jpg",
  },
  {
    slug: "real-time-analytics",
    title: "Real-Time Analytics Dashboard",
    category: "Performance Optimization",
    description: "Built high-performance analytics system processing millions of events daily",
    image: "/abstract-motion-graphics.png",
  },
  {
    slug: "mobile-app-ui-design",
    title: "Mobile Banking App",
    category: "UI/UX Design",
    description: "Designed intuitive mobile banking experience with enhanced security",
    image: "/mobile-app-ui-design.png",
  },
  {
    slug: "fashion-brand-identity",
    title: "E-Commerce Platform",
    category: "Full-Stack",
    description: "Built scalable e-commerce solution with advanced inventory management",
    image: "/fashion-brand-identity.png",
  },
  {
    slug: "creative-agency-portfolio",
    title: "Healthcare Portal",
    category: "Healthcare Tech",
    description: "Developed HIPAA-compliant patient portal with telemedicine features",
    image: "/creative-agency-portfolio.png",
  },
  {
    slug: "saas-data-visualization",
    title: "Business Intelligence Dashboard",
    category: "Data Visualization",
    description: "Created interactive dashboards for complex business metrics",
    image: "/saas-data-visualization.jpg",
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 sm:py-16 md:py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4">All Projects</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              A comprehensive portfolio showcasing expertise in full-stack development, AI integration, system
              architecture, and performance optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allProjects.map((project, index) => (
              <Link
                href={`/projects/${project.slug}`}
                key={index}
                className="group relative overflow-hidden block rounded-lg"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                  <h3 className="text-white text-lg sm:text-xl mb-2">{project.title}</h3>
                  <p className="text-white/90 text-sm mb-1">{project.category}</p>
                  <p className="text-white/70 text-xs sm:text-sm">{project.description}</p>
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
