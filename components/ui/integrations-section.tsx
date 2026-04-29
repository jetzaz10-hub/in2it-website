"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { ImageData } from "./img-sphere";

// Dynamically import the sphere (uses refs and pointer events — SSR-unsafe)
const SphereImageGrid = dynamic(() => import("./img-sphere"), { ssr: false });

const sphereLogos: ImageData[] = Array.from({ length: 42 }, (_, i) => ({
  id: `partner-${i + 1}`,
  src: `/partners/partner logo/${i + 1}.png?v=2`,
  alt: `Partner ${i + 1}`,
}));

export default function IntegrationsSection() {
  return (
    <section
      id="partners-section"
      className="w-full relative overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle radial glow behind sphere */}
      <div
        className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.04) 0%, rgba(59,130,246,0.02) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Inner content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          
          {/* ═══ LEFT COLUMN — Text & Stats ═══ */}
          <div className="text-center lg:text-left">
            
            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-[3.8rem] font-bold text-white tracking-tight leading-[1.1] mb-14"
            >
              Trusted{" "}
              <span className="text-[#FF3366]">
                Partners
              </span>
            </motion.h2>

            {/* Stats moved directly beneath Headline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex gap-8 md:gap-12 mb-10 justify-center lg:justify-start"
            >
              <div>
                <div className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                  500+
                </div>
                <div className="text-base md:text-lg text-white/70 uppercase tracking-wider font-medium mt-1">
                  Events
                </div>
              </div>
              <div className="w-px bg-white/30" />
              <div>
                <div className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                  40+
                </div>
                <div className="text-base md:text-lg text-white/70 uppercase tracking-wider font-medium mt-1">
                  Partners
                </div>
              </div>
              <div className="w-px bg-white/30" />
              <div>
                <div className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                  10+
                </div>
                <div className="text-base md:text-lg text-white/70 uppercase tracking-wider font-medium mt-1">
                  Years
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-zinc-300 text-lg md:text-lg leading-relaxed max-w-[800px] mx-auto lg:mx-0"
            >
              <span className="block lg:whitespace-nowrap">Connect to the largest ecosystem of event technology partners.</span>
              <span className="block lg:whitespace-nowrap">We collaborate with leading brands, government agencies, and international organizations.</span>
            </motion.div>

          </div>

          {/* ═══ RIGHT COLUMN — 3D Logo Sphere ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <SphereImageGrid
              images={sphereLogos}
              containerSize={560}
              sphereRadius={240}
              autoRotate={true}
              autoRotateSpeed={0.2} // Reverted to original speed
              dragSensitivity={0.4}
            />
          </motion.div>
        </div>
      </div>

      {/* Top Glowing Purple Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[2px] shadow-[0_0_15px_rgba(168,85,247,0.6),0_0_30px_rgba(168,85,247,0.3)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40px] bg-purple-500/15 blur-[25px] rounded-full pointer-events-none" />
      </div>

      {/* Bottom Glowing Purple Border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[2px] shadow-[0_0_15px_rgba(168,85,247,0.6),0_0_30px_rgba(168,85,247,0.3)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40px] bg-purple-500/15 blur-[25px] rounded-full pointer-events-none" />
      </div>

      {/* Side Accent Glows */}
      <div className="absolute top-0 left-0 w-[2px] h-full z-30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-[2px] h-full z-30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />
      </div>

    </section>
  );
}
