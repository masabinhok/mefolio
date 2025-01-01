import AboutMe from "@/components/AboutMe"
import { Link } from "react-router-dom"

const MoreProjects = () => {
  return (
    <main className="min-h-screen bg-background p-5 flex flex-col items-center w-full">
      <AboutMe />
      <section className="section text-center ">
        Maybe later
        <button>
          <Link className="text-green-500" to="/">
            Go back to Portfolio
          </Link>
        </button>
      </section>
    </main >
  )
}

export default MoreProjects