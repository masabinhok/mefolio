import { education } from "@/data/education"
import { Link } from "react-router-dom"

const Education = () => {
  return (
    <div className="mt-5 flex max-md:flex-col">
      <div className="flex-1">
        {education.map((item) => (
          <div className="flex mb-5 flex-col" key={item.institution}>
            <p className="text-sm">{item.timeline}</p>
            <h2 className="font-bold  text-primary">{item.institution}</h2>
            <h2 className="text-sm">{item.course}</h2>
            <p className="text-xs italic text-primary">{item.rank} stds.</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center w-full flex-1">
        <Link to="/hire-me"> <h2 className="text-4xl text-primary">
          HIRE ME
        </h2>
        </Link>
        <p>Give me some <span className=" font-bold">experience
        </span> </p>
      </div>


    </div>
  )
}

export default Education