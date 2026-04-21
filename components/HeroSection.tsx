"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const imageSets = [
  // SET 1 (Original)
  [
    { src: "/hero_section/set1/hero5.png" },
    { src: "/hero_section/set1/hero2.png" },
    { src: "/hero_section/set1/hero3.png" },
    { src: "/hero_section/set1/hero4.png" },
    { src: "/hero_section/set1/hero1.png" },
    { src: "/hero_section/set1/hero6.png" },
  ],
  // SET 2
  [
    { src: "/hero_section/set2/hero1.png" },
    { src: "/hero_section/set2/hero2.png" },
    { src: "/hero_section/set2/hero3.png" },
    { src: "/hero_section/set2/hero4.png" },
    { src: "/hero_section/set2/hero5.png" },
    { src: "/hero_section/set2/hero6.png" },
  ],
  // SET 3
  [
    { src: "/hero_section/set3/hero1.png" },
    { src: "/hero_section/set3/hero2.png" },
    { src: "/hero_section/set3/hero3.png" },
    { src: "/hero_section/set3/hero4.png" },
    { src: "/hero_section/set3/hero5.png" },
    { src: "/hero_section/set3/hero6.png" },
  ]
];

const gridCells = [
  { className: "col-span-1", priority: true },
  { className: "col-span-2", priority: true },
  { className: "col-span-2", priority: false },
  { className: "col-span-1", priority: false },
  { className: "col-span-1", priority: false },
  { className: "col-span-2", priority: false },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imageSets.length);
    }, 4500); // 4.5 second delay
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-dvh pt-28 pb-16 overflow-hidden">
      {/* Subtle Animated Background */}
      <style>{`
        @keyframes heroGradientPan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-bg-animated {
          background: linear-gradient(
            -45deg, 
            #000000, 
            #11092b, 
            #1e0d59, 
            #2d1a7a, 
            #0d061f, 
            #000000
          );
          background-size: 400% 400%;
          animation: heroGradientPan 10s ease-in-out infinite;
        }
      `}</style>

      {/* Layered Background Elements */}
      <div className="absolute inset-0 hero-bg-animated opacity-90" />
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

      {/* Bottom round clip */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-black rounded-tl-[4.375rem] rounded-tr-[4.375rem] -mb-1" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
        {/* Left text column */}
        <div className="flex-[1.2] flex flex-col gap-6 text-white lg:max-w-[560px]">
          <div className="mb-2 select-none">
            <Image
              src="/logo/logo-white.png"
              alt="IN2IT COMPANY Logo"
              width={120}
              height={30}
              className="w-auto h-6 lg:h-7 object-contain"
              priority
            />
          </div>
          <h1 className="text-5xl lg:text-6xl xl:text-[4rem] font-extrabold leading-[1.08] tracking-tight">
            Your{" "}
            <span className="text-[#FF6600]">One-Stop</span>
            <br />
            Event Tech Solution
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-[420px]">
            IN2IT is an event technology company delivering end-to-end solutions
            for the MICE industry.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            {/* Figma: Contact Us = magenta-to-purple gradient #FF3366 → #9933FF, pill shape, padding 18/32 */}
            <a href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm transition-all duration-300 hover:scale-[1.05] active:scale-95 animate-glow-pulse"
              style={{ background: "linear-gradient(to right, #FF3366, #9933FF)" }}
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            {/* Figma: View Portfolio = transparent fill, gray border #acadad 30%, pill shape */}
            <a href="https://www.canva.com/design/DAG9n3Xa6_Y/XvXea3m4LcLRZkM4ozQWkg/view#1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-sm border border-white/60 hover:bg-white/10 transition-all duration-300"
            >
              View Portfolio
            </a>
          </div>
        </div>

        {/* Right photo mosaic */}
        <div className="flex-[1.2] grid grid-cols-3 grid-rows-3 gap-4 max-w-[560px] w-full aspect-square lg:aspect-auto lg:h-[560px]">
          {gridCells.map((cell, cellIdx) => (
            <div 
              key={cellIdx} 
              className={`${cell.className} rounded-[24px] overflow-hidden relative group transition-transform duration-500 hover:scale-[1.02] shadow-2xl`} 
              style={{ perspective: '1200px' }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={`${activeIndex}-${cellIdx}`}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ 
                    duration: 0.85, 
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  className="absolute inset-0 w-full h-full"
                  style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                >
                  <Image
                    src={imageSets[activeIndex][cellIdx].src}
                    alt={`Hero image ${cellIdx}`}
                    fill
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 group-hover:brightness-110"
                    priority={cell.priority && activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
