import { projects } from "@/data/projects"
import { ArrowRightAltSharp, GitHub, Language } from "@mui/icons-material"
import { ArrowBigUpDashIcon } from "lucide-react"
import { useState } from "react"

import { Link } from "react-router-dom"


const Projects = () => {
  const [index, setIndex] = useState(0);


  return (
    <main className="section">
      <div className="flex justify-between items-center mb-5">
        <h2 className="sec-head cursor-no-drop">Recent Projects <ArrowRightAltSharp className="inline" /></h2>
        <Link to="/projects">
          <h2 className="sec-head text-primary">More Projects <ArrowBigUpDashIcon className="inline" /></h2>
        </Link>
      </div>

      <section className=" grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {projects.map((project) => (
          <div key={project.title} className=" flex flex-col p-3 shadow-sm shadow-primary rounded-xl">
            <div onMouseEnter={() => {
              console.log(index)
              if (index < 3) {
                setIndex(index + 1)
                console.log(index)
              }
              else setIndex(0);
            }}>
              <img className="h-[300px] w-full tranimate " src={project.imageURL[index]} alt={project.title} />
            </div>
            <h2 className="font-bold text-primary">{project.title}</h2>
            <h3 className="text-sm line-clamp-1 ">{project.subtitle}</h3>
            <div className="flex  gap-2 flex-wrap text-primary mt-5">
              {project.techStack.map((tech) => (
                <h2 key={tech}>
                  {tech}
                </h2>
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <Link to={project.githubLink}>
                <GitHub className="icon-rotate " /></Link>
              <Link to={project.demoAt}>
                <Language className="icon-rotate" />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>

  )
}

export default Projects