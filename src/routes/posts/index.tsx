import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { allPosts } from "content-collections"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { createPageSEO } from "@/lib/seo"

const postsSearchSchema = z.object({
	category: z.string().optional()
})

import { createServerFn } from "@tanstack/react-start"
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions"

const getPosts = createServerFn({ method: "GET" })
	// .middleware([staticFunctionMiddleware])
	.handler(async () => {
		const sortedPosts = allPosts.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		)
		const categories = Array.from(new Set(sortedPosts.map((p) => p.category)))
		return { posts: sortedPosts, categories }
	})

export const Route = createFileRoute("/posts/")({
	loader: async () => await getPosts(),
	head: () =>
		createPageSEO({
			title: "Posts - JGB Solutions",
			description:
				"Articles and tutorials about web development, React, TypeScript, software engineering best practices, and technology insights.",
			path: "/posts"
		}),
	component: PostsPage,
	validateSearch: postsSearchSchema
})

function PostsPage() {
	const { category } = Route.useSearch()
	const navigate = useNavigate({ from: Route.fullPath })
	const { posts, categories } = Route.useLoaderData()

	const filteredPosts = category ? posts.filter((p) => p.category === category) : posts

	return (
		<main className="min-h-screen bg-background">
			<Navbar />

			<section className="py-20 px-6 md:px-20">
				<div className="max-w-7xl mx-auto">
					<div className="mb-12">
						<Link
							to="/"
							className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block"
						>
							← Back to Home
						</Link>
						<h1 className="text-4xl md:text-6xl font-light mb-4">Latest Posts</h1>
						<p className="text-lg text-muted-foreground max-w-2xl mb-8">
							Insights, tutorials, and thoughts on design, development, and creativity.
						</p>

						{/* Category Filter */}
						<div className="flex flex-wrap gap-2">
							<Button
								variant={!category ? "default" : "outline"}
								onClick={() => navigate({ search: {} })}
								className="rounded-full"
							>
								All
							</Button>
							{categories.map((cat) => (
								<Button
									key={cat}
									variant={category === cat ? "default" : "outline"}
									onClick={() => navigate({ search: { category: cat } })}
									className="rounded-full"
								>
									{cat}
								</Button>
							))}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredPosts.map((post, index) => (
							<article key={index} className="group">
								<Link to={`/posts/${post.slug}`}>
									<div className="relative overflow-hidden mb-4 rounded-xl">
										<img
											src={post.image || "/placeholder.svg"}
											alt={post.title}
											width={600}
											height={400}
											className="w-full object-cover transition-transform duration-500 group-hover:scale-105 aspect-[3/2]"
										/>
										{post.summary && (
											<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
												{post.summary}
											</div>
										)}
									</div>
								</Link>
								<div className="space-y-2">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<button
											onClick={(e) => {
												e.preventDefault()
												navigate({ search: { category: post.category } })
											}}
											className="text-primary hover:underline cursor-pointer"
										>
											{post.category}
										</button>
										<span>•</span>
										<span>{post.date}</span>
										<span>•</span>
										<span>{post.readTime}</span>
									</div>
									<Link to={`/posts/${post.slug}`}>
										<h2 className="text-2xl font-light group-hover:text-primary transition-colors">
											{post.title}
										</h2>
									</Link>
									<p className="text-muted-foreground">{post.excerpt}</p>
									<Link
										to={`/posts/${post.slug}`}
										className="inline-block text-sm text-primary hover:underline"
									>
										Read more →
									</Link>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</main>
	)
}
