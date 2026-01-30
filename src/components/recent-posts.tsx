import { Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { PostCard } from '@/components/post-card'

const recentPosts = allPosts
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)

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

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {recentPosts.map(post => (
            <PostCard key={post.slug} post={post} />
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
