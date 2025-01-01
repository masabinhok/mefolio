import { useVisitor } from "@/context/VisitorContext"


const VisitorData = () => {
  const { visitor, visitorCount } = useVisitor();
  return (
    <section className="section">
      <div className="text-center text-green-500 text-sm">
        {visitor.name} is visiting from {visitor.device.os} using a browser based on {' '}
        {visitor.device.browser} from {" "}{visitor.location.city}, {visitor.location.country}.
        | {visitor.location.latitude} | {visitor.location.longitude} |
        <span>{" "} {visitorCount} visitors have visited this site.</span>
      </div>
      <div>
        
      </div>
    </section>
  )
}

export default VisitorData