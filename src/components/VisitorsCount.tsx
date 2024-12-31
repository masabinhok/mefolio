import { useVisitor } from "@/context/VisitorContext"



const VisitorsCount = () => {
  const { visitorCount } = useVisitor();

  return (
    <div className="fixed bottom-10 right-10 bg-gradient-to-r text-white px-6 py-2  text-sm from-pink-500 to-purple-500 cursor-grabbing rounded-full "> {visitorCount} visits</div>
  )
}

export default VisitorsCount