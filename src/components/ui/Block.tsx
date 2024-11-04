import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Block ({ className, ...rest }:{
  className?: string;
  [key: string]: any;
}) {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={cn(
        "col-span-4 rounded-lg border bg-card p-6 relative",
        className
      )}
      {...rest}
    />
  );
};