import { Link } from '@tanstack/react-router'
import type { allPosts } from 'content-collections'

type Post = (typeof allPosts)[number]

interface PostCardProps {
  post: Post
  showExcerpt?: boolean
  showDate?: boolean
  className?: string
}

export function PostCard({
  post,
  showExcerpt = false,
  showDate = false,
  className = '',
}: PostCardProps) {
  return (
    <article className={`group ${className}`}>
      <Link to='/posts/$slug' params={{ slug: post.slug }}>
        <div className='relative overflow-hidden mb-6 aspect-[4/3] rounded-2xl'>
          <img
            src={post.image || '/placeholder.svg'}
            alt={post.title}
            className='object-cover transition-transform duration-500 group-hover:scale-105 absolute inset-0 w-full h-full'
          />
          {post.summary && (
            <div className='absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
              {post.summary}
            </div>
          )}
        </div>
      </Link>
      <div className='space-y-3'>
        <div className='flex items-center gap-2 text-base text-muted-foreground'>
          <Link
            to='/posts'
            search={{ category: post.category }}
            className='text-primary hover:underline'
          >
            {post.category}
          </Link>
          <span>•</span>
          <span>{post.readTime}</span>
          {showDate && (
            <>
              <span>•</span>
              <span>{post.date}</span>
            </>
          )}
        </div>
        <Link to='/posts/$slug' params={{ slug: post.slug }}>
          <h3 className='text-xl font-light group-hover:text-primary transition-colors line-clamp-2'>
            {post.title}
          </h3>
        </Link>
        {showExcerpt && <p className='text-muted-foreground'>{post.excerpt}</p>}
      </div>
    </article>
  )
}
