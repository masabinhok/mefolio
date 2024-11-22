import AboutMe from "@/components/AboutMe"
import EduExp from "@/components/EduExp"
import Footer from "@/components/Footer"
import Projects from "@/components/Projects"

const Portfolio = () => {
  return (
    <main className="min-h-screen bg-background p-5 flex flex-col items-center w-full">
      <AboutMe />
      <EduExp />
      <Projects />
      <Footer />
    </main>
  )
}

export default Portfolio