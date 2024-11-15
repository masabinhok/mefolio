import { useVisitor } from "@/context/VisitorContext"
import Socials from "./Socials";


const AboutMe = () => {
  const { visitor, setVisitor } = useVisitor();
  return (
    <section className="text-secondary rounded-xl max-w-[768px] w-full h-[1000px] p-5 flex flex-col">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">hey_<span className="text-primary">{visitor}..</span>  It's <span className="text-primary">Sabin</span> here</h2>
          <p>
            Full Stack Developer | MERN | NEXTjs | TypeScript |
          </p>
        </div>
        <Socials />
      </div>




    </section>
  )
}

export default AboutMe