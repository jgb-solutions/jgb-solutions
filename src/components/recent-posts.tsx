import { Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

const recentPosts = allPosts
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 4)

export default function RecentPosts() {
  return (
    <section className='py-20 px-6 md:px-20 bg-secondary dark:bg-card'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-end mb-12'>
          <div>
            <h2 className='text-3xl md:text-4xl font-light mb-4'>Recent Posts</h2>
            <p className='text-muted-foreground'>
              Insights and thoughts on technology, design, and development.
            </p>
          </div>
          <Link to='/posts' className='text-primary hover:underline hidden md:block'>
            View all posts →
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {recentPosts.map((post, index) => (
            <article key={index} className='group'>
              <Link to={`/posts/${post.slug}`}>
                <div className='relative overflow-hidden mb-4 aspect-[4/3] rounded-2xl'>
                  <img
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    className='object-cover transition-transform duration-500 group-hover:scale-105 absolute inset-0 w-full h-full'
                  />
                  {post.summary && (
                    <div className='absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                      {post.summary}
                    </div>
                  )}
                </div>
              </Link>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Link
                    to='/posts'
                    search={{ category: post.category }}
                    className='text-primary hover:underline'
                  >
                    {post.category}
                  </Link>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <Link to='/posts/$slug' params={{ slug: post.slug }}>
                  <h3 className='text-lg font-light group-hover:text-primary transition-colors line-clamp-2'>
                    {post.title}
                  </h3>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className='mt-8 text-center md:hidden'>
          <Link to='/posts' className='text-primary hover:underline'>
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  )
}
