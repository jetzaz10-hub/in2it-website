"use client";

import { motion } from "framer-motion";
import Counter from "./ui/Counter";

export default function MetricsSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.4, delay: 0.1, ease: "linear" }}
      className="w-full relative z-20 py-10" 
      style={{ background: "linear-gradient(to right, #4A32FF, #8A2BE2)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row items-center justify-around gap-12 text-center text-white">
        <div>
          <div className="text-5xl md:text-6xl font-extrabold mb-3">
            <Counter value={500} />+
          </div>
          <div className="text-xs tracking-[0.15em] uppercase font-semibold text-white/90">Events Delivered</div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-extrabold mb-3">
            <Counter value={50} />+
          </div>
          <div className="text-xs tracking-[0.15em] uppercase font-semibold text-white/90">Global Clients</div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-extrabold mb-3">
            <Counter value={15} />+
          </div>
          <div className="text-xs tracking-[0.15em] uppercase font-semibold text-white/90">Years Expertise</div>
        </div>
      </div>

      {/* Bottom Purple Glow Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[4px] shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80px] bg-purple-600/15 blur-[50px] rounded-[100%] pointer-events-none" />
      </div>
    </motion.div>
  );
}
