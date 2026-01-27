import { Link, useLocation } from '@tanstack/react-router'
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

// Logo URLs - will be updated when user provides them
const LIGHT_LOGO = "https://jgb.solutions/_next/image?url=%2Fassets%2Fimages%2FLogo-JGB-Solutions-500x110.png&w=256&q=75"
const DARK_LOGO = "https://jgb.solutions/_next/image?url=%2Fassets%2Fimages%2FLogo-JGB-Solutions-500x110.png&w=256&q=75"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    // If we're on the homepage, scroll immediately
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Navigate to homepage with hash
      window.location.href = `/#${sectionId}`
    }
  }

  return (
    <nav className="flex items-center justify-between p-6">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={mounted && theme === "dark" ? DARK_LOGO : LIGHT_LOGO}
          alt="JGB Solutions"
          width={120}
          height={26}
          className={!mounted ? "dark:invert" : ""}
        />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors cursor-pointer">
          About
        </button>
        <Link to="/blog" className="hover:text-primary transition-colors">
          Posts
        </Link>
        <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors cursor-pointer">
          Contact
        </button>
      </div>

      <div className="flex items-center gap-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors bg-transparent cursor-pointer hidden md:flex"
          onClick={() => scrollToSection("contact")}
        >
          Let&apos;s talk
        </Button>
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        )}
      </div>
      </div>

    </nav>
  )
}
