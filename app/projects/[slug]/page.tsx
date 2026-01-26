import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const projectsData: Record<string, any> = {
  "ai-code-generation": {
    title: "AI-Powered Code Generation System",
    category: "AI Development",
    description: "Led the development of an AI system that boosted developer productivity by 40%",
    image: "/modern-tech-branding.jpg",
    client: "Enterprise Tech Company",
    year: "2024",
    services: ["AI Integration", "Full-Stack Development", "System Architecture", "Performance Optimization"],
    overview:
      "Spearheaded the development of an advanced AI-powered code generation system that revolutionized the development workflow for a major enterprise client. The system leverages state-of-the-art language models to generate high-quality, context-aware code snippets and complete functions.",
    challenge:
      "The development team was facing significant productivity bottlenecks due to repetitive coding tasks and inconsistent code quality across different team members. The challenge was to create an AI system that could understand complex requirements and generate production-ready code.",
    solution:
      "Architected and implemented a comprehensive AI system using modern machine learning frameworks. The solution includes intelligent code analysis, context-aware generation, and seamless integration with existing development tools. Implemented rigorous testing and validation mechanisms to ensure code quality.",
    results: [
      "40% increase in developer productivity",
      "Reduced code review time by 50%",
      "Improved code quality metrics by 35%",
      "Successfully deployed to 500+ developers",
    ],
    gallery: ["/tech-branding-mockup-1.jpg", "/tech-branding-mockup-2.jpg", "/tech-branding-mockup-3.jpg"],
  },
  "legal-tech-platform": {
    title: "High-Performance Legal Tech Platform",
    category: "Full-Stack Development",
    description: "Architected and built a Vue3 solution that increased user engagement by 60%",
    image: "/ecommerce-web-design.jpg",
    client: "Legal Services Provider",
    year: "2023",
    services: ["Vue.js Development", "Backend Architecture", "UX Design", "Performance Optimization"],
    overview:
      "Architected and developed a comprehensive legal technology platform from the ground up using Vue.js 3, providing lawyers and legal professionals with powerful tools for case management, document processing, and client communication.",
    challenge:
      "The client needed a modern, high-performance platform to replace their legacy system. The platform had to handle complex legal workflows, large document volumes, and provide an intuitive user experience for legal professionals with varying technical skills.",
    solution:
      "Built a scalable Vue.js 3 application with a modern component architecture. Implemented advanced state management, real-time collaboration features, and optimized document processing pipelines. Created an intuitive interface tailored to legal professionals' workflow.",
    results: [
      "60% increase in user engagement",
      "Processing time reduced by 70%",
      "User satisfaction score of 4.8/5",
      "Successfully onboarded 200+ law firms",
    ],
    gallery: ["/ecommerce-design-mockup-1.jpg", "/ecommerce-design-mockup-2.jpg", "/ecommerce-design-mockup-3.jpg"],
  },
  "enterprise-saas": {
    title: "Enterprise SaaS Platform",
    category: "System Architecture",
    description: "Designed and implemented scalable infrastructure serving 100K+ users",
    image: "/fullstack-web-app.jpg",
    client: "SaaS Startup",
    year: "2023",
    services: ["System Architecture", "Cloud Infrastructure", "Microservices", "DevOps"],
    overview:
      "Designed and implemented a comprehensive enterprise SaaS platform capable of serving over 100,000 concurrent users. The platform provides a suite of business tools with robust security, scalability, and performance.",
    challenge:
      "The startup needed to rapidly scale their infrastructure to meet growing demand while maintaining high performance and reliability. The system had to handle complex multi-tenancy requirements and integrate with various third-party services.",
    solution:
      "Architected a modern microservices-based infrastructure using cloud-native technologies. Implemented auto-scaling, load balancing, and robust monitoring systems. Created a comprehensive CI/CD pipeline for rapid, reliable deployments.",
    results: [
      "Successfully scaled to 100K+ active users",
      "99.9% uptime achieved",
      "Response time under 200ms",
      "Reduced infrastructure costs by 40%",
    ],
    gallery: ["/ecommerce-design-mockup-1.jpg", "/ecommerce-design-mockup-2.jpg", "/ecommerce-design-mockup-3.jpg"],
  },
  "real-time-analytics": {
    title: "Real-Time Analytics Dashboard",
    category: "Performance Optimization",
    description: "Built high-performance analytics system processing millions of events daily",
    image: "/abstract-motion-graphics.png",
    client: "Analytics Company",
    year: "2024",
    services: ["Real-Time Processing", "Data Visualization", "Performance Engineering", "Backend Development"],
    overview:
      "Developed a sophisticated real-time analytics dashboard that processes and visualizes millions of events per day. The system provides instant insights and actionable intelligence for business decision-makers.",
    challenge:
      "The client needed to process massive volumes of real-time data from multiple sources and present meaningful insights with minimal latency. The system had to maintain performance under high load while providing an intuitive user experience.",
    solution:
      "Built a high-performance data processing pipeline using modern streaming technologies. Implemented efficient data aggregation, real-time visualization, and intelligent caching strategies. Created an interactive dashboard with responsive design.",
    results: [
      "Processing 5M+ events daily",
      "Sub-second query response time",
      "95% reduction in data latency",
      "Scaled to support 50+ enterprise clients",
    ],
    gallery: ["/tech-branding-mockup-1.jpg", "/tech-branding-mockup-2.jpg", "/tech-branding-mockup-3.jpg"],
  },
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projectsData[params.slug]

  if (!project) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light mb-4">Project Not Found</h1>
            <Link href="/projects" className="text-primary hover:underline">
              ← Back to Projects
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-12 sm:py-16 md:py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
          >
            ← Back to Projects
          </Link>

          {/* Hero Image */}
          <div className="mb-8 md:mb-12 rounded-lg overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={1200}
              height={800}
              className="w-full object-cover"
            />
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="md:col-span-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4">{project.title}</h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8">{project.description}</p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Client</h3>
                <p>{project.client}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Year</h3>
                <p>{project.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Services</h3>
                <ul className="space-y-1">
                  {project.services.map((service: string, index: number) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-8 md:space-y-12 mb-12 md:mb-16">
            <div>
              <h2 className="text-xl md:text-2xl font-light mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-light mb-4">Challenge</h2>
              <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-light mb-4">Solution</h2>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-light mb-4">Results</h2>
              <ul className="space-y-2">
                {project.results.map((result: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-muted-foreground">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h2 className="text-xl md:text-2xl font-light mb-6 md:mb-8">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {project.gallery.map((image: string, index: number) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <Image
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
        </div>
      </section>

      <Footer />
    </main>
  )
}
