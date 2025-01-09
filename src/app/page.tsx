import Navbar from '@/components/Navbar'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Projects from '@/sections/Projects'
import Footer from '@/components/Footer'



export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section id="hero" className="h-screen">
        <Hero />
      </section>
      <section id="about" className="min-h-screen">
        <About />
      </section>
      <section id="projects" className="min-h-screen">
        <Projects />
      </section>
      <Footer />
    </main>
  );
}
