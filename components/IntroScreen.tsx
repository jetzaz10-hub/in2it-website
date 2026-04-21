"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BgGrid from "./BgGrid";

interface IntroScreenProps {
  onDone: () => void;
}

const C = {
  black: "#000000",
  p1: "#4A32FF", // Electric Indigo
};

const IntroScreen = ({ onDone }: IntroScreenProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Stage the animation phases - Accelerated for a snappier feel
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => onDone(), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 50% 50%, #0d061f 0%, #000000 100%)`
        }}
      >
        {/* Pulsing & Expanding Brand Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${C.p1}40 0%, transparent 70%)`,
          }}
          animate={{
            scale: phase === 0 ? 0.8 : phase === 1 ? 1.5 : 4,
            opacity: phase === 2 ? 0 : [0.4, 0.6, 0.4]
          }}
          transition={{
            scale: { duration: 1.5, ease: [0.23, 1, 0.32, 1] },
            opacity: { duration: 2, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* Central Logo Animation - Clean & Powerful */}
        <motion.div
          className="relative z-10 p-8"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{
            scale: phase === 0 ? 1 : phase === 1 ? 1.02 : 1.5,
            opacity: phase === 2 ? 0 : 1,
            y: phase === 0 ? 0 : phase === 1 ? 0 : -20,
            filter: phase === 2 ? "blur(40px)" : "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="relative w-56 h-24 md:w-72 md:h-32">
            <Image
              src="/logo.svg"
              alt="IN2IT Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Loading Indicator - Minimalist */}
        <div className="absolute bottom-16 flex flex-col items-center gap-4">
          <motion.div
            className="w-12 h-[1px] bg-white/20 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 0 ? 1 : 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#4A32FF]"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <motion.div
            className="text-[10px] tracking-[0.8em] text-white/30 uppercase font-light select-none ml-[0.8em]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: phase === 0 ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            Loading
          </motion.div>
        </div>

        {/* Final Phase Liquid Flash */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black pointer-events-none z-[110]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroScreen;
