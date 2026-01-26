import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const blogPosts = [
  {
    slug: "future-of-web-design",
    title: "The Future of Web Design",
    excerpt: "Exploring the latest trends and technologies shaping the future of web design in 2024.",
    date: "March 15, 2024",
    category: "Design",
    image: "/modern-web-design.png",
    readTime: "5 min read",
  },
  {
    slug: "building-better-user-experiences",
    title: "Building Better User Experiences",
    excerpt: "A comprehensive guide to creating intuitive and engaging user experiences for digital products.",
    date: "March 10, 2024",
    category: "UX",
    image: "/user-experience-design.png",
    readTime: "8 min read",
  },
  {
    slug: "motion-design-principles",
    title: "Motion Design Principles",
    excerpt: "Learn the fundamental principles of motion design and how to apply them to your projects.",
    date: "March 5, 2024",
    category: "Motion",
    image: "/abstract-motion-graphics.png",
    readTime: "6 min read",
  },
  {
    slug: "art-of-branding",
    title: "The Art of Branding",
    excerpt: "Discover the essential elements that make a brand memorable and impactful in today's market.",
    date: "February 28, 2024",
    category: "Branding",
    image: "/brand-identity-concept.png",
    readTime: "7 min read",
  },
  {
    slug: "responsive-design-best-practices",
    title: "Responsive Design Best Practices",
    excerpt: "Essential techniques for creating websites that look great on any device.",
    date: "February 20, 2024",
    category: "Development",
    image: "/responsive-web-design.png",
    readTime: "10 min read",
  },
  {
    slug: "color-theory-in-digital-design",
    title: "Color Theory in Digital Design",
    excerpt: "Understanding how to use color effectively to create compelling digital experiences.",
    date: "February 15, 2024",
    category: "Design",
    image: "/color-theory-wheel.png",
    readTime: "5 min read",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-light mb-4">Latest Articles</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Insights, tutorials, and thoughts on design, development, and creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative overflow-hidden mb-4">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-light group-hover:text-primary transition-colors">{post.title}</h2>
                  </Link>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-block text-sm text-primary hover:underline">
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
