import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { allPostPages } from 'content-collections'
import { createServerFn } from '@tanstack/react-start'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { MdxRenderer } from '@/components/mdx-provider'
import { createPageSEO } from '@/lib/seo'
import { FEATURES } from '@/lib/features'

const getPost = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)

  .handler(({ data: slug }) => {
    const post = allPostPages.find(p => p.slug === slug)
    if (!post) throw notFound()
    return { post }
  })

export const Route = createFileRoute('/posts/$slug')({
  // The blog is switched off for now (src/lib/features.ts)
  beforeLoad: () => {
    if (!FEATURES.blog) throw notFound()
  },
  loader: ({ params }) => getPost({ data: params.slug }),
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { post } = loaderData
    return createPageSEO({
      title: `${post.title} - JGB Solutions`,
      description: post.excerpt,
      image: post.image,
      type: 'article',
      author: post.author,
      publishedTime: post.date,
      section: post.category,
      path: `/posts/${post.slug}`,
    })
  },
  notFoundComponent: () => {
    return (
      <main className='min-h-screen bg-background'>
        <SiteHeader />
        <section className='py-20 px-6 md:px-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl font-light mb-4'>Article Not Found</h1>
            <Link to='/posts' className='text-primary hover:underline'>
              ← Back to Posts
            </Link>
          </div>
        </section>
        <SiteFooter />
      </main>
    )
  },
  component: PostDetailPage,
})

function PostDetailPage() {
  const { post } = Route.useLoaderData()

  return (
    <main className='min-h-screen bg-background'>
      <SiteHeader />

      <article className='py-20 px-6 md:px-20'>
        <div className='max-w-4xl mx-auto'>
          <Link
            to='/posts'
            className='text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block'
          >
            ← Back to Posts
          </Link>

          {/* Article Header */}
          <div className='mb-12'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground mb-4'>
              <span className='text-primary'>{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className='text-4xl md:text-6xl font-light mb-6'>{post.title}</h1>
            <p className='text-xl text-muted-foreground mb-8'>{post.excerpt}</p>
            {post.author && (
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center'>
                  <span className='text-primary font-semibold'>
                    {post.author
                      .split(' ')
                      .map(n => n[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className='font-medium'>{post.author}</p>
                  <p className='text-sm text-muted-foreground'>{post.date}</p>
                </div>
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className='mb-12'>
            <img
              src={post.image || '/placeholder.svg'}
              alt={post.title}
              width={1200}
              height={600}
              className='w-full object-cover rounded-lg'
            />
          </div>

          {/* Article Content */}
          <div className='prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:mb-2 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-img:rounded-2xl prose-img:shadow-lg'>
            <MdxRenderer code={post.mdx} />
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
