import { useVisitor } from "@/context/VisitorContext"
import Socials from "./Socials";
import { ModeToggle } from "./ModeToggle";
import { Separator } from "./ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const AboutMe = () => {
  const { visitor } = useVisitor();
  return (
    <section className="section">
      <div className="flex justify-between mb-3 gap-10 max-md:gap-3 ">
        <div className="">
          <h2 className="text-xl font-bold max-md:text-base">hey_<span className="text-primary">{visitor?.name}</span> meet me, <span className="text-primary">I am Sabin Shrestha</span></h2>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Socials />
          <Separator />
          <ModeToggle />
        </div>
      </div>
      <Separator />
      <div className="p-3 flex flex-col  ">
        <p className="text-base text-center max-md:text-sm">
          <span className="text-primary">Full Stack Developer </span> | MERN | NEXTjs | TypeScript |
        </p>
        <p className="text-base text-center">
          based on
          <span className="text-primary"> Kathmandu, Nepal</span>
        </p>
      </div>
    </section>
  )
}

export default AboutMe