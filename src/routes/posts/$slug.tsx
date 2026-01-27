import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'
import { Facebook, Linkedin } from 'lucide-react'
import { createServerFn } from '@tanstack/react-start'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MdxRenderer } from '@/components/mdx-provider'
import { createPageSEO } from '@/lib/seo'
import { SITE } from '@/lib/constants'

const getPost = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)

  .handler(async ({ data: slug }) => {
    const post = allPosts.find(p => p.slug === slug)
    if (!post) throw notFound()
    return { post }
  })

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => await getPost({ data: params.slug }),
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
        <Navbar />
        <section className='py-20 px-6 md:px-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl font-light mb-4'>Article Not Found</h1>
            <Link to='/posts' className='text-primary hover:underline'>
              ← Back to Posts
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  },
  component: PostDetailPage,
})

function PostDetailPage() {
  const { post } = Route.useLoaderData()
  const postUrl = `${SITE.url}/posts/${post.slug}`

  return (
    <main className='min-h-screen bg-background'>
      <Navbar />

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
          <div className='prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:mb-2 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-img:rounded-2xl prose-img:shadow-lg'>
            <MdxRenderer code={post.mdx} />
          </div>

          {/* Share Section */}
          <div className='mt-12 pt-8 border-t border-border'>
            <p className='text-sm text-muted-foreground mb-4'>Share This Post</p>
            <div className='flex gap-4'>
              <TwitterShareButton url={postUrl} title={post.title}>
                <div className='h-10 w-10 flex items-center justify-center bg-black text-white rounded-xl hover:opacity-90 transition-opacity dark:bg-white dark:text-black'>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-5 w-5'
                  >
                    <path d='M4 4l11.733 16h4.267l-11.733 -16z' />
                    <path d='M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772' />
                  </svg>
                </div>
              </TwitterShareButton>

              <LinkedinShareButton
                url={postUrl}
                title={post.title}
                summary={post.excerpt}
                source='JGB Solutions'
              >
                <div className='h-10 w-10 flex items-center justify-center bg-[#0077b5] text-white rounded-xl hover:opacity-90 transition-opacity'>
                  <Linkedin className='h-5 w-5' />
                </div>
              </LinkedinShareButton>

              <FacebookShareButton url={postUrl} hashtag='#WebDev'>
                <div className='h-10 w-10 flex items-center justify-center bg-[#1877f2] text-white rounded-xl hover:opacity-90 transition-opacity'>
                  <Facebook className='h-5 w-5' />
                </div>
              </FacebookShareButton>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
