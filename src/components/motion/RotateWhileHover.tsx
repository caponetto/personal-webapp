import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RotateWhileHoverProps {
  degrees: number;
  children: ReactNode;
}

export function RotateWhileHover(props: RotateWhileHoverProps) {
  return (
    <motion.div
      initial={{
        rotate: 0,
      }}
      whileHover={{
        rotate: props.degrees,
      }}
    >
      {props.children}
    </motion.div>
  );
}
