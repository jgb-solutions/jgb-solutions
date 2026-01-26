"use client"

import Link from "next/link"
import Image from "next/image"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="flex items-center justify-between p-6">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="https://jgb.solutions/_next/image?url=%2Fassets%2Fimages%2FLogo-JGB-Solutions-500x110.png&w=256&q=75"
          alt="JGB Solutions"
          width={120}
          height={26}
          className="dark:invert"
        />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">
          About
        </button>
        <Link href="/blog" className="hover:text-primary transition-colors">
          Blog
        </Link>
        <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">
          Contact
        </button>
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

      <Button
        variant="outline"
        className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors bg-transparent"
        onClick={() => scrollToSection("contact")}
      >
        Let&apos;s talk
      </Button>
    </nav>
  )
}
