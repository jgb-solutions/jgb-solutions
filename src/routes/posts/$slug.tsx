import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { allPosts } from "content-collections"
import { MdxRenderer } from "@/components/mdx-provider"
import { createPageSEO } from "@/lib/seo"

import { createServerFn } from "@tanstack/react-start"
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions"

const getPost = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	.middleware([staticFunctionMiddleware])
	.handler(async ({ data: slug }) => {
		const post = allPosts.find((p) => p.slug === slug)
		if (!post) throw notFound()
		return { post }
	})

export const Route = createFileRoute("/posts/$slug")({
	head: ({ loaderData }) => {
		if (!loaderData) return {}
		const { post } = loaderData
		return createPageSEO({
			title: `${post.title} - JGB Solutions`,
			description: post.excerpt,
			image: post.image,
			type: "article",
			author: post.author,
			publishedTime: post.date,
			section: post.category,
			path: `/posts/${post.slug}`
		})
	},
	loader: async ({ params }) => await getPost({ data: params.slug }),
	notFoundComponent: () => {
		return (
			<main className="min-h-screen bg-background">
				<Navbar />
				<section className="py-20 px-6 md:px-20">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl md:text-6xl font-light mb-4">Article Not Found</h1>
						<Link to="/posts" className="text-primary hover:underline">
							← Back to Posts
						</Link>
					</div>
				</section>
				<Footer />
			</main>
		)
	},
	component: PostDetailPage
})

function PostDetailPage() {
	const { post } = Route.useLoaderData()

	return (
		<main className="min-h-screen bg-background">
			<Navbar />

			<article className="py-20 px-6 md:px-20">
				<div className="max-w-4xl mx-auto">
					<Link
						to="/posts"
						className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
					>
						← Back to Posts
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
						{post.author && (
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
									<span className="text-primary font-semibold">
										{post.author
											.split(" ")
											.map((n) => n[0])
											.join("")
											.toUpperCase()}
									</span>
								</div>
								<div>
									<p className="font-medium">{post.author}</p>
									<p className="text-sm text-muted-foreground">{post.date}</p>
								</div>
							</div>
						)}
					</div>

					{/* Featured Image */}
					<div className="mb-12">
						<img
							src={post.image || "/placeholder.svg"}
							alt={post.title}
							width={1200}
							height={600}
							className="w-full object-cover rounded-lg"
						/>
					</div>

					{/* Article Content */}
					<div className="prose prose-lg dark:prose-invert max-w-none">
						<MdxRenderer code={post.mdx} />
					</div>

					{/* Share Section */}
					<div className="mt-12 pt-8 border-t border-border">
						<p className="text-sm text-muted-foreground mb-4">Share this article</p>
						<div className="flex gap-4">
							<button className="text-sm px-4 py-2 border border-border rounded-xl hover:bg-accent transition-colors">
								Twitter
							</button>
							<button className="text-sm px-4 py-2 border border-border rounded-xl hover:bg-accent transition-colors">
								LinkedIn
							</button>
							<button className="text-sm px-4 py-2 border border-border rounded-xl hover:bg-accent transition-colors">
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
