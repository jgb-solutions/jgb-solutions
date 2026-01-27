import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { z } from 'zod'

const blogPosts = defineCollection({
  name: 'blogPosts',
  directory: 'content/blog',
  include: '*.mdx',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    category: z.string(),
    image: z.string(),
    readTime: z.string(),
    author: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document)
    return {
      ...document,
      slug: document._meta.path,
      mdx,
    }
  },
})

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '*.mdx',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    image: z.string(),
    client: z.string().optional(),
    year: z.string().optional(),
    services: z.array(z.string()).optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document)
    return {
      ...document,
      slug: document._meta.path,
      mdx,
    }
  },
})

export default defineConfig({
  collections: [blogPosts, projects],
})
