import { Asterisk } from "lucide-react"

export default function MarqueeBar() {
	const services = [
		"FULL-STACK DEVELOPMENT",
		"AI INTEGRATION",
		"TECH LEADERSHIP",
		"SYSTEM ARCHITECTURE",
		"PERFORMANCE OPTIMIZATION",
		"MENTORING",
		"CODE REVIEW"
	]

	return (
		<div className="marquee py-4 bg-black dark:bg-primary -skew-y-1 transform">
			<div className="marquee-content skew-y-1">
				{[...services, ...services].map((service, index) => (
					<span key={index} className="mx-4 inline-flex items-center text-white">
						{service}
						<Asterisk className="w-4 h-4 text-white/70 mx-4" />
					</span>
				))}
			</div>
		</div>
	)
}
