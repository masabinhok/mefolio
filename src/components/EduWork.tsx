import { useState } from "react";
import Experience from "./Experience";
import Education from "./Education";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";


type SectionType = string;

const EduWork = () => {
  const [sections, setSections] = useState(["education", "experience"]);
  const [section, setSection] = useState<SectionType>("education");
  const handleSwap = (item: string) => {
    const newSections = [...sections];
    [newSections[0], newSections[1]] = [newSections[1], newSections[0]];
    setSections(newSections);
    setSection(item);
  }
  return (
    <section className="section">

      <div className="flex justify-between w-full">
        {sections.map((item) => (
          <button key={item} disabled={item === section} onClick={() => {
            handleSwap(item)
          }} className={cn("flexbox",
            section === item ? 'bg-primary  !text-background' : '',
          )}>{item}</button>
        ))}
      </div>
      <Separator className="" />
      {
        section === 'education' ? (
          <Education />
        ) : (
          <Experience />
        )
      }
      <Separator className="mt-2" />
    </section >
  )
}

export default EduWork