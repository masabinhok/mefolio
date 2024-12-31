import { useVisitor } from "@/context/VisitorContext"
import Draggable from 'react-draggable';


const VisitorsCount = () => {
  const { visitorCount } = useVisitor();

  return (
    <Draggable>
      <div className="fixed bottom-10 shadow-inner shadow-pink-100 right-10 bg-gradient-to-r text-white px-6 py-2  text-sm from-pink-500 to-purple-500 cursor-grabbing rounded-full "> {visitorCount} visits</div>
    </Draggable>
  )
}

export default VisitorsCount