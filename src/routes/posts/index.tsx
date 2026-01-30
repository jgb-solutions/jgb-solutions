import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/post-card'
import { createPageSEO } from '@/lib/seo'

const postsSearchSchema = z.object({
  category: z.string().optional(),
})

const getPosts = createServerFn({ method: 'GET' }).handler(async () => {
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const categories = Array.from(new Set(sortedPosts.map(p => p.category)))
  return { posts: sortedPosts, categories }
})

export const Route = createFileRoute('/posts/')({
  validateSearch: postsSearchSchema,
  loader: async () => await getPosts(),
  component: PostsPage,
  head: () =>
    createPageSEO({
      title: 'Posts - JGB Solutions',
      description:
        'Articles and tutorials about web development, React, TypeScript, software engineering best practices, and technology insights.',
      path: '/posts',
    }),
})

function PostsPage() {
  const { category } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const { posts, categories } = Route.useLoaderData()

  const filteredPosts = category ? posts.filter(p => p.category === category) : posts

  return (
    <main className='min-h-screen bg-background'>
      <Navbar />

      <section className='py-20 px-6 md:px-20'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-12'>
            <Link
              to='/'
              className='text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block'
            >
              ← Back to Home
            </Link>
            <h1 className='text-4xl md:text-6xl font-light mb-4'>Latest Posts</h1>
            <p className='text-lg text-muted-foreground max-w-2xl mb-8'>
              Insights, tutorials, and thoughts on design, development, and creativity.
            </p>

            {/* Category Filter */}
            <div className='flex flex-wrap gap-2'>
              <Button
                variant={!category ? 'default' : 'outline'}
                onClick={() => navigate({ search: {} })}
                className='rounded-full'
              >
                All
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={category === cat ? 'default' : 'outline'}
                  onClick={() => navigate({ search: { category: cat } })}
                  className='rounded-full'
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredPosts.map(post => (
              <PostCard key={post.slug} post={post} showExcerpt showDate />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
