import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { z } from 'zod'
import { overviewOf } from './src/lib/overview'

const postSchema = {
  directory: 'content/posts',
  include: '*.mdx',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    category: z.string(),
    image: z.string(),
    readTime: z.string(),
    author: z.string().optional(),
    summary: z.string().optional(),
    content: z.string(),
  }),
}

/**
 * Posts for lists (cards, the sitemap): no body. Their pages read `allPostPages`, which has the
 * compiled MDX, only on the server, so the browser never downloads every post.
 */
const posts = defineCollection({
  name: 'posts',
  ...postSchema,
  transform: ({ content: _content, ...document }) => ({ ...document, slug: document._meta.path }),
})

const postPages = defineCollection({
  name: 'postPages',
  ...postSchema,
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document)
    return { ...document, slug: document._meta.path, mdx }
  },
})

const projectSchema = {
  directory: 'content/projects',
  include: '*.mdx',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    image: z.string(),
    order: z.number(),
    client: z.string().optional(),
    year: z.string().optional(),
    services: z.array(z.string()).optional(),
    url: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    summary: z.string().optional(),
    /** Hidden from the site and sitemap until the write-up is finished. */
    draft: z.boolean().optional(),
    /** Last time the write-up or its images changed (YYYY-MM-DD), for the sitemap's lastmod. */
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    content: z.string(),
  }),
}

/**
 * Projects for lists and cards (home, products, services, work, sitemap): the frontmatter plus the
 * overview paragraph, no body. Project pages read `allProjectPages`, which has the compiled MDX,
 * only in their server function, so the browser never downloads every write-up.
 */
const projects = defineCollection({
  name: 'projects',
  ...projectSchema,
  transform: ({ content, ...document }) => ({
    ...document,
    slug: document._meta.path,
    overview: overviewOf({ content, description: document.description }),
  }),
})

const projectPages = defineCollection({
  name: 'projectPages',
  ...projectSchema,
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document)
    return { ...document, slug: document._meta.path, mdx }
  },
})

export default defineConfig({
  collections: [posts, postPages, projects, projectPages],
})
