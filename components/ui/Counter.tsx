"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, motion, animate } from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  className?: string;
  duration?: number;
  // kept for backwards compatibility
  stiffness?: number;
  damping?: number;
}

export default function Counter({
  value,
  direction = "up",
  className,
  duration = 1.2,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const motionValue = useMotionValue(direction === "down" ? value : 0);
  
  const displayValue = useTransform(motionValue, (latest) => 
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      animate(motionValue, direction === "down" ? 0 : value, {
        duration: duration,
        ease: "easeOut",
      });
    }
  }, [motionValue, isInView, value, direction, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}
