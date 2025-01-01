import { useVisitor } from "@/context/VisitorContext";
import { motion } from "framer-motion";

const VisitorData = () => {
  const { visitor, visitorCount } = useVisitor();

  // Animation Variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="section">
      <motion.div
        className="text-center text-green-500 text-sm"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Start animation every time it's in view
        viewport={{ amount: 0.5 }} // Triggers when 50% of the section is in view
      >
        <motion.p variants={textVariants}>
          {visitor.name} is visiting from {visitor.device.os} using a browser
          based on {visitor.device.browser} from{" "}
          {visitor.location.city}, {visitor.location.country}.
        </motion.p>
        <motion.p variants={textVariants}>
          Latitude: {visitor.location.latitude} | Longitude:{" "}
          {visitor.location.longitude}
        </motion.p>
        <motion.span variants={textVariants}>
          You are the {visitor.visitorRank}th person to visit this site out of{" "}
          {visitorCount} total visitors.
        </motion.span>
      </motion.div>
    </section>
  );
};

export default VisitorData;
