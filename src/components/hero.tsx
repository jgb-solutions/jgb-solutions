import { Link } from "@tanstack/react-router"
import { Asterisk } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
	return (
		<div className="flex flex-col md:flex-row items-center justify-between px-6 py-12 md:px-20 md:py-24">
			<div className="w-full md:w-1/2 mb-12 md:mb-0">
				<div className="text-sm md:text-base tracking-wider text-primary mb-4">
					innovate.lead.deliver.
				</div>
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold space-y-2 mb-8 text-foreground">
					<div>I&apos;M JEAN BOUSIQUOT</div>
				</h1>

				<p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6">
					Senior Software Engineer with 8+ years of expertise
				</p>

				<p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8">
					I transform complex challenges into elegant, scalable solutions
				</p>

				<div className="flex flex-wrap gap-2 md:gap-4 text-xs sm:text-sm md:text-base text-muted-foreground mb-8">
					<span>FULL-STACK</span>
					<Asterisk className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
					<span>AI INTEGRATION</span>
					<Asterisk className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
					<span>TECH LEADERSHIP</span>
				</div>

				<div className="flex flex-col sm:flex-row gap-0">
					<Link to="#contact" className="w-full sm:w-auto">
						<Button variant="default" className="rounded-xl w-full sm:w-auto">
							Hire me
						</Button>
					</Link>
					<Link to="#projects" className="w-full sm:w-auto">
						<Button variant="secondary" className="rounded-xl w-full sm:w-auto">
							View projects
						</Button>
					</Link>
				</div>
			</div>
			<div className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-[2rem] overflow-hidden">
				<img
					src="https://public.jgb.solutions/jgb-2022-800.jpg"
					alt="Jean Bousiquot"
					className="object-cover object-center absolute inset-0 w-full h-full"
					sizes="(max-width: 768px) 100vw, 50vw"
				/>
			</div>
		</div>
	)
}
