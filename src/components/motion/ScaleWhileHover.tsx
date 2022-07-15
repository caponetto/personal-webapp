import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScaleWhileHoverProps {
  scale: number;
  children: ReactNode;
}

export function ScaleWhileHover(props: ScaleWhileHoverProps) {
  return <motion.div whileHover={{ scale: props.scale }}>{props.children}</motion.div>;
}
