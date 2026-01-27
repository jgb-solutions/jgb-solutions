import { Asterisk } from "lucide-react"

const services = [
	{
		title: "Full-Stack Excellence",
		description:
			"I deliver end-to-end solutions with my expertise in both frontend and backend technologies."
	},
	{
		title: "AI Integration",
		description:
			"Leverage my experience in implementing AI models to enhance your software capabilities."
	},
	{
		title: "Tech Leadership",
		description:
			"Benefit from my proven track record in leading teams and delivering successful projects."
	},
	{
		title: "Performance Optimization",
		description: "Boost your application's speed and efficiency with my optimization expertise."
	}
]

export default function Services() {
	return (
		<section id="services" className="py-20 px-6 md:px-20">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl md:text-4xl font-light mb-12">How I Can Elevate Your Project</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{services.map((service, index) => (
						<div key={index} className="group">
							<div className="flex items-start gap-4 mb-4">
								<Asterisk className="w-6 h-6 text-primary mt-1" />
								<h3 className="text-2xl font-light">{service.title}</h3>
							</div>
							<p className="text-muted-foreground ml-10">{service.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
