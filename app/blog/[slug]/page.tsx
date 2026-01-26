import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const blogData: Record<string, any> = {
  "future-of-web-design": {
    title: "The Future of Web Design",
    excerpt: "Exploring the latest trends and technologies shaping the future of web design in 2024.",
    date: "March 15, 2024",
    category: "Design",
    image: "/modern-web-design.png",
    readTime: "5 min read",
    author: "Tyler Reed",
    content: `
      <p>The landscape of web design is constantly evolving, driven by new technologies, changing user expectations, and innovative design patterns. As we look toward the future, several key trends are emerging that will shape how we design and build for the web.</p>

      <h2>AI-Powered Design Systems</h2>
      <p>Artificial intelligence is revolutionizing how we approach design systems. AI tools are now capable of generating design variations, optimizing layouts for different screen sizes, and even predicting user preferences based on behavior patterns. This doesn't replace human creativity but rather augments it, allowing designers to focus on higher-level strategic decisions.</p>

      <h2>Immersive 3D Experiences</h2>
      <p>With WebGL and WebGPU becoming more accessible, we're seeing a rise in immersive 3D web experiences. These aren't just flashy demos anymore – they're becoming practical tools for e-commerce, education, and entertainment. The key is balancing visual impact with performance and accessibility.</p>

      <h2>Sustainable Design Practices</h2>
      <p>As awareness of digital carbon footprints grows, sustainable web design is becoming a priority. This includes optimizing images and videos, reducing unnecessary JavaScript, and designing with energy efficiency in mind. The future of web design is not just beautiful – it's responsible.</p>

      <h2>Voice and Gesture Interfaces</h2>
      <p>As voice assistants and gesture controls become more prevalent, web designers need to think beyond traditional mouse and keyboard interactions. Designing for voice means considering conversational UI patterns, while gesture support opens up new possibilities for intuitive navigation.</p>

      <h2>Conclusion</h2>
      <p>The future of web design is exciting and full of possibilities. By embracing new technologies while keeping user needs at the center, we can create web experiences that are not only visually stunning but also accessible, performant, and sustainable.</p>
    `,
  },
  "building-better-user-experiences": {
    title: "Building Better User Experiences",
    excerpt: "A comprehensive guide to creating intuitive and engaging user experiences for digital products.",
    date: "March 10, 2024",
    category: "UX",
    image: "/user-experience-design.png",
    readTime: "8 min read",
    author: "Tyler Reed",
    content: `
      <p>User experience design is more than just making things look pretty. It's about understanding user needs, solving real problems, and creating seamless interactions that feel natural and intuitive.</p>

      <h2>Understanding Your Users</h2>
      <p>The foundation of great UX is understanding who your users are and what they need. This means conducting user research, creating personas, and mapping user journeys. Don't assume you know what users want – ask them, observe them, and test your assumptions.</p>

      <h2>The Importance of Information Architecture</h2>
      <p>Before diving into visual design, establish a solid information architecture. How is content organized? How do users navigate through it? A well-structured IA makes everything else easier and ensures users can find what they need quickly.</p>

      <h2>Designing for Accessibility</h2>
      <p>Accessibility isn't an add-on – it's a fundamental part of good UX. This means considering users with disabilities, designing for keyboard navigation, ensuring sufficient color contrast, and providing alternative text for images. When you design for accessibility, everyone benefits.</p>

      <h2>Iterative Design and Testing</h2>
      <p>Great UX doesn't happen on the first try. It requires iteration, testing, and refinement. Use prototypes to test ideas early, conduct usability testing with real users, and be willing to make changes based on feedback. The best designs evolve over time.</p>

      <h2>Micro-interactions Matter</h2>
      <p>Small details make a big difference. Thoughtful micro-interactions – like button animations, loading states, and hover effects – provide feedback and make interfaces feel responsive and alive. These details show users you care about their experience.</p>
    `,
  },
  // Add more blog post data as needed
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogData[params.slug]

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light mb-4">Article Not Found</h1>
            <Link href="/blog" className="text-primary hover:underline">
              ← Back to Blog
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

      <article className="py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
          >
            ← Back to Blog
          </Link>

          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="text-primary">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light mb-6">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">TR</span>
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Share this article</p>
            <div className="flex gap-4">
              <button className="text-sm px-4 py-2 border border-border rounded hover:bg-accent transition-colors">
                Twitter
              </button>
              <button className="text-sm px-4 py-2 border border-border rounded hover:bg-accent transition-colors">
                LinkedIn
              </button>
              <button className="text-sm px-4 py-2 border border-border rounded hover:bg-accent transition-colors">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
