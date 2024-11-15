import { useVisitor } from "@/context/VisitorContext"
import Socials from "./Socials";
import { ModeToggle } from "./ModeToggle";
import { Separator } from "./ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const AboutMe = () => {
  const { visitor } = useVisitor();
  return (
    <section className="section">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">hey_<span className="text-primary">{visitor}..</span>  It's <span className="text-primary">Sabin</span> here</h2>
          <p>
            Full Stack Developer | MERN | NEXTjs | TypeScript |
          </p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <Socials />
          <Separator />
          <ModeToggle />
        </div>
      </div>
    </section>
  )
}

export default AboutMe