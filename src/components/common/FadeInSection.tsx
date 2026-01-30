import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
}

const FadeInSection = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
