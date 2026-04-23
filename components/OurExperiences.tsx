"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "../lib/utils";

export default function OurExperiences() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                console.log("Autoplay blocked - remaining muted");
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section id="experiences" className="py-20 lg:min-h-screen lg:flex lg:items-center bg-transparent overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="max-w-[1440px] mx-auto px-6 sm:px-12 w-full"
      >
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter">
            Our <span className="text-[#F97316]">Experiences</span>
          </h2>
          <p className="mt-2 text-white/50 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We partner with corporate, government, and international organizations,
            supporting events up to <span className="text-white font-bold">100,000+</span> participants.
          </p>
        </div>

        {/* Large Video Frame */}
        <div className="relative w-full aspect-video lg:aspect-[21/7] rounded-[2.5rem] overflow-hidden group shadow-[0_0_100px_rgba(249,115,22,0.1)] border border-white/10 bg-zinc-950">
          <video
            ref={videoRef}
            src="/videos/beyond_the_elephant.mp4"
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Overlay & Controls */}
          <div className="absolute inset-x-0 bottom-0 p-8 flex justify-end z-20 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMuted ? "muted" : "unmuted"}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-zinc-400" /> : <Volume2 className="w-5 h-5 text-[#F97316]" />}
                </motion.div>
              </AnimatePresence>
              <span className="text-sm font-bold uppercase tracking-wider">
                {isMuted ? "Sound Off" : "Sound On"}
              </span>
            </motion.button>
          </div>

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.canva.com/design/DAG9n3Xa6_Y/XvXea3m4LcLRZkM4ozQWkg/view#1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-white text-base tracking-tight transition-all hover:scale-[1.05]"
          >
            {/* Glossy Button Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6600] to-[#FF9900] rounded-full shadow-[0_0_30px_rgba(255,102,0,0.3)] transition-all group-hover:shadow-[0_0_50px_rgba(255,102,0,0.5)]" />

            <span className="relative z-10">VIEW FULL PORTFOLIO</span>
            <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
