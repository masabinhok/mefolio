import { useVisitor } from "@/context/VisitorContext"


const VisitorData = () => {
  const { visitor } = useVisitor();
  return (
    <section className="section">
      <div className="text-center text-green-500 text-sm">
        {visitor.name} is visiting from {visitor.device.os} using a browser based on {' '}
        {visitor.device.browser} from {" "}{visitor.location.city}, {visitor.location.country}.
        | {visitor.location.latitude} | {visitor.location.longitude} |

      </div>


    </section>
  )
}

export default VisitorData