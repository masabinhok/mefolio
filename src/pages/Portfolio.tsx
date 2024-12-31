import AboutMe from "@/components/AboutMe"
import Canvas from "@/components/Canvas"
import EduExp from "@/components/EduExp"
import Footer from "@/components/Footer"
import Projects from "@/components/Projects"
import VisitorsCount from "@/components/VisitorsCount"


const Portfolio = () => {
  return (
    <main className="min-h-screen bg-background p-5 flex flex-col items-center w-full">
      <AboutMe />
      <EduExp />
      <Projects />
      <Canvas />
      <Footer />
      <VisitorsCount />
    </main>
  )
}

export default Portfolio