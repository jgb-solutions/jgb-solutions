import { createFileRoute, Link } from '@tanstack/react-router'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { allBlogPosts } from 'content-collections'

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
})


function BlogPage() {
  const blogPosts = allBlogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-light mb-4">Latest Posts</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Insights, tutorials, and thoughts on design, development, and creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="group">
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative overflow-hidden mb-4 rounded-xl">
                    <img
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
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-light group-hover:text-primary transition-colors">{post.title}</h2>
                  </Link>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="inline-block text-sm text-primary hover:underline">
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
