import { Link } from '@tanstack/react-router'
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Github, Instagram, Linkedin, Send } from 'lucide-react'

export default function Footer() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Logo URLs - will be updated when user provides them
  const lightLogo = "https://jgb.solutions/_next/image?url=%2Fassets%2Fimages%2FLogo-JGB-Solutions-500x110.png&w=256&q=75"
  const darkLogo = "https://jgb.solutions/_next/image?url=%2Fassets%2Fimages%2FLogo-JGB-Solutions-500x110.png&w=256&q=75"

  return (
    <footer className="py-12 px-6 md:px-20 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={mounted && theme === "dark" ? darkLogo : lightLogo}
              alt="JGB Solutions"
              width={120}
              height={26}
              className={!mounted ? "dark:invert" : ""}
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

          <div className="text-sm text-muted-foreground">© 2025 JGB Solutions. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
