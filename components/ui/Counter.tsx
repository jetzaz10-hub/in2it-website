"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform, animate, motion } from "framer-motion";

interface CounterProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function Counter({ value, duration = 0.4, delay = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const count = useMotionValue(0);
  
  const display = useTransform(count, (latest) => 
    Math.floor(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        animate(count, value, { duration, ease: "linear" });
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, count, duration, delay]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
