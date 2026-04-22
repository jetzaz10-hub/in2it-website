"use client";
import { motion } from "framer-motion";

interface ShinyTextProps {
  text: string;
  className?: string;
}

export default function ShinyText({ text, className = "" }: ShinyTextProps) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, #FF6600 0%, #FFFFFF 25%, #4634F8 50%, #FFFFFF 75%, #FF6600 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      animate={{
        backgroundPosition: ["100% 0", "-100% 0"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}
