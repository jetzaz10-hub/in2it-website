"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  className?: string;
  stiffness?: number;
  damping?: number;
}

export default function Counter({
  value,
  direction = "up",
  className,
  stiffness = 80,
  damping = 40,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: damping,
    stiffness: stiffness,
    restDelta: 0.001,
  });
  
  const displayValue = useTransform(springValue, (latest) => 
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}
