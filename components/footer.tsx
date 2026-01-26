import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-20 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://jgb.solutions/_next/image?url=%2Fassets%2Fimages%2FLogo-JGB-Solutions-500x110.png&w=256&q=75"
              alt="JGB Solutions"
              width={120}
              height={26}
              className="dark:invert"
            />
          </Link>

          <div className="flex gap-8">
            <Link href="https://github.com/jgbousiquot" className="hover:text-primary transition-colors">
              GitHub
            </Link>
            <Link href="https://twitter.com/jgbousiquot" className="hover:text-primary transition-colors">
              Twitter
            </Link>
            <Link href="https://linkedin.com/in/jgbousiquot" className="hover:text-primary transition-colors">
              LinkedIn
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">© 2025 JGB Solutions. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
