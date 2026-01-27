import { Link, useLocation } from "@tanstack/react-router"
import { Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Logo URLs - will be updated when user provides them
// Logo URLs
const LIGHT_LOGO = "https://public.jgb.solutions/Logo-JGB-Solutions-02.png"
const DARK_LOGO = "https://public.jgb.solutions/Logo-JGB-Solutions-500x110.png"

export default function Navbar() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const location = useLocation()

	useEffect(() => {
		setMounted(true)
	}, [])

	const scrollToSection = (sectionId: string) => {
		setIsOpen(false)
		// If we're on the homepage, scroll immediately
		if (location.pathname === "/") {
			const element = document.getElementById(sectionId)
			if (element) {
				element.scrollIntoView({ behavior: "smooth" })
			}
		} else {
			// Navigate to homepage with hash
			window.location.href = `/#${sectionId}`
		}
	}

	const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
		<>
			<Link
				to="/"
				className={`hover:text-primary transition-colors ${mobile ? "text-lg py-2" : ""}`}
				onClick={() => setIsOpen(false)}
			>
				Home
			</Link>
			<button
				onClick={() => scrollToSection("about")}
				className={`hover:text-primary transition-colors cursor-pointer text-left ${mobile ? "text-lg py-2" : ""}`}
			>
				About
			</button>
			<Link
				to="/projects"
				className={`hover:text-primary transition-colors ${mobile ? "text-lg py-2" : ""}`}
				onClick={() => setIsOpen(false)}
			>
				Projects
			</Link>
			<Link
				to="/posts"
				className={`hover:text-primary transition-colors ${mobile ? "text-lg py-2" : ""}`}
				onClick={() => setIsOpen(false)}
			>
				Posts
			</Link>
		</>
	)

	return (
		<nav className="flex items-center justify-between p-6">
			<Link to="/" className="flex items-center gap-2">
				<img
					src={LIGHT_LOGO}
					alt="JGB Solutions"
					width={120}
					height={26}
					className="dark:hidden block"
				/>
				<img
					src={DARK_LOGO}
					alt="JGB Solutions"
					width={120}
					height={26}
					className="hidden dark:block"
				/>
			</Link>

			{/* Desktop Menu */}
			<div className="hidden md:flex items-center gap-8">
				<NavLinks />
			</div>

			<div className="flex items-center gap-4">
				<Button
					asChild
					variant="outline"
					className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors bg-transparent cursor-pointer flex rounded-xl"
				>
					<Link to="/" hash="contact">
						Let&apos;s talk
					</Link>
				</Button>
				{mounted && (
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="hover:text-primary transition-colors rounded-full"
						aria-label="Toggle theme"
					>
						{theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
					</Button>
				)}

				{/* Mobile Menu Trigger */}
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="w-6 h-6" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right">
						<SheetHeader>
							<SheetTitle>Menu</SheetTitle>
						</SheetHeader>
						<div className="flex flex-col gap-4 mt-8">
							<NavLinks mobile />
							<div className="mt-4 pt-4 border-t">
								<Button asChild className="w-full rounded-xl">
									<Link to="/" hash="contact">
										Let&apos;s talk
									</Link>
								</Button>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	)
}
