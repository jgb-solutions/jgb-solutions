import Image from "next/image"
import Link from "next/link"

const recentPosts = [
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
]

export default function RecentBlog() {
  return (
    <section className="py-20 px-6 md:px-20 bg-secondary dark:bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-4">Latest Articles</h2>
            <p className="text-muted-foreground">Insights and thoughts on technology, design, and development.</p>
          </div>
          <Link href="/blog" className="text-primary hover:underline hidden md:block">
            View all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentPosts.map((post, index) => (
            <article key={index} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden mb-4 aspect-[4/3]">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-light group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="text-primary hover:underline">
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  )
}
