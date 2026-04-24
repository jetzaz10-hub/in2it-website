"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ShinyText from "./ShinyText";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Re-implement the 8-second loop logic for a smoother cinematic feel
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 8) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <section id="hero" className="relative h-screen min-h-[600px] w-full bg-black overflow-hidden flex flex-col justify-center">
      {/* 1. Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay Gradient - Stronger bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent via-70% to-black" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20">

        {/* Top Tag (Positioned just below Nav) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-white/80 text-[14px] lg:text-s font-bold tracking-[0.5em] uppercase mb-6 text-center"
        >
          IN2IT Company
        </motion.p>

        {/* Hero Centerpiece */}
        <div className="flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <h1 className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 leading-[1.5] tracking-tighter mb-8 w-full">
              <span className="text-white font-medium text-4xl md:text-5xl lg:text-6xl xl:text-[6.8rem]">
                Your One-Stop
              </span>
              <ShinyText
                text="Event Tech Solution."
                className="text-4xl md:text-5xl lg:text-6xl xl:text-[6.9rem] font-black"
              />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/60 text-xs lg:text-base leading-relaxed max-w-1xl mx-auto mb-6"
            >
              We deliver end-to-end event technology solutions for the MICE industry with cutting-edge expertise.
            </motion.p>
          </motion.div>

          {/* Dual CTA Buttons (Restored) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 lg:gap-9 mt-10"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-10 lg:px-12 py-5 rounded-full font-bold text-white text-base transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-xl hover:shadow-[0_10px_30px_rgba(74,50,255,0.4)]"
              style={{ background: "linear-gradient(to right, #4A32FF, #9933FF)" }}
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://www.canva.com/design/DAG9n3Xa6_Y/XvXea3m4LcLRZkM4ozQWkg/view#1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 lg:px-12 py-5 rounded-full font-bold text-white text-base border border-white/30 hover:bg-white/10 transition-all duration-300 hover:border-white/60"
            >
              View Portfolio
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[150px] bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
