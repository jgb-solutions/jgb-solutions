import { Link } from "@tanstack/react-router"

import { useState, useEffect } from "react"
import { Github, Instagram, Linkedin, Send } from "lucide-react"

export default function Footer() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Logo URLs
	const lightLogo = "https://public.jgb.solutions/Logo-JGB-Solutions-02.png"
	const darkLogo = "https://public.jgb.solutions/Logo-JGB-Solutions-500x110.png"

	return (
		<footer className="py-12 px-6 md:px-20 border-t">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-center gap-8">
					<Link to="/" className="flex items-center gap-2">
						<img
							src={lightLogo}
							alt="JGB Solutions"
							width={120}
							height={26}
							className="dark:hidden block"
						/>
						<img
							src={darkLogo}
							alt="JGB Solutions"
							width={120}
							height={26}
							className="hidden dark:block"
						/>
					</Link>

					<div className="flex space-x-4">
						<a
							href="https://github.com/jgb-solutions"
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 bg-background border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
							aria-label="GitHub"
						>
							<Github className="h-5 w-5" />
						</a>
						<a
							href="https://www.linkedin.com/in/jgb-dev/"
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 bg-background border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
							aria-label="LinkedIn"
						>
							<Linkedin className="h-5 w-5" />
						</a>
						<a
							href="https://www.instagram.com/jgbgram/"
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 bg-background border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
							aria-label="Instagram"
						>
							<Instagram className="h-5 w-5" />
						</a>
						<a
							href="https://twitter.com/jgb_solutions"
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 bg-background border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
							aria-label="X (formerly Twitter)"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<path d="M4 4l11.733 16h4.267l-11.733 -16z" />
								<path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
							</svg>
						</a>
					</div>

					<div className="text-sm text-muted-foreground">
						© 2026 JGB Solutions. All rights reserved.
					</div>
				</div>
			</div>
		</footer>
	)
}
