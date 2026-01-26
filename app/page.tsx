import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import MarqueeBar from "@/components/marquee-bar"
import Projects from "@/components/projects"
import About from "@/components/about"
import Services from "@/components/services"
import RecentBlog from "@/components/recent-blog"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="relative bg-background">
        <Navbar />
        <Hero />
        <MarqueeBar />
      </div>
      <Projects />
      <About />
      <Services />
      <RecentBlog />
      <Contact />
      <Footer />
    </main>
  )
}
