/**
 * Site-wide constants for metadata, SEO, and branding
 */

export const SITE = {
	name: "JGB Solutions",
	url: "https://jgb.solutions",
	author: "Jean Gérard Bousiquot",
	email: "services@jgb.solutions",
	contactEmail: "jgbneatdesign@gmail.com"
} as const

export const SEO = {
	defaultTitle: "JGB Solutions",
	titleTemplate: "%s - JGB Solutions",
	description:
		"Full-stack software engineer specializing in React, TypeScript, Node.js, and scalable web solutions. Portfolio of 20+ projects. Based in Haiti.",
	keywords: [
		"software engineer",
		"web developer",
		"React",
		"TypeScript",
		"Node.js",
		"full-stack developer",
		"Haiti",
		"mentor",
		"tech consultant"
	]
} as const

export const SOCIAL = {
	twitter: "@jgb_solutions",
	linkedin: "https://linkedin.com/in/jgbousiquot",
	github: "https://github.com/jgbcode"
} as const

export const OG_IMAGE = {
	url: "https://public.jgb.solutions/banner.jpg",
	width: 1200,
	height: 630,
	alt: "Jean Gérard Bousiquot - Software Engineer Portfolio"
} as const
