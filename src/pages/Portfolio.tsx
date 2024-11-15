import AboutMe from "@/components/AboutMe"
import EduWork from "@/components/EduWork"

const Portfolio = () => {
  return (
    <main className="min-h-screen bg-background p-5 flex flex-col items-center w-full">
      <AboutMe />
      <EduWork />
    </main>
  )
}

export default Portfolio