"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Volume1, VolumeX } from "lucide-react";
import { cn } from "../lib/utils";

export default function OurExperiences() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (!newMuted && videoRef.current.volume === 0) {
        videoRef.current.volume = 0.5;
        setVolume(0.5);
      }
    }
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  }, []);

  const handleControlEnter = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setShowVolume(true);
  }, []);

  const handleControlLeave = useCallback(() => {
    hideTimerRef.current = setTimeout(() => setShowVolume(false), 800);
  }, []);

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <section id="experiences" className="pt-20 bg-black overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="max-w-[1200px] mx-auto px-8 w-full"
      >
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter">
            Our <span className="text-[#F97316]">Experiences</span>
          </h2>
          <p className="mt-4 text-white/50 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            We partner with corporate, government, and international organizations
            <br />
            supporting events up to <span className="text-white font-bold">100,000+</span> participants.
          </p>
        </div>

        {/* Large Video Frame */}
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-[2.5rem] overflow-hidden group shadow-[0_0_100px_rgba(249,115,22,0.1)] border border-white/10 bg-zinc-950">
          <video
            ref={videoRef}
            src="/videos/beyond_the_elephant.mov"
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            className="w-full h-full object-cover pointer-events-none will-change-auto"
          />

          {/* Overlay & Controls */}
          <div className="absolute inset-x-0 bottom-0 p-8 flex justify-end z-20 pointer-events-none">
            <div
              className="pointer-events-auto flex items-center gap-2"
              onMouseEnter={handleControlEnter}
              onMouseLeave={handleControlLeave}
            >
              {/* Volume Slider */}
              <AnimatePresence>
                {showVolume && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 120, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden flex items-center px-3 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-[#F97316] 
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F97316] [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(249,115,22,0.6)] [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#F97316] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mute/Unmute Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all shadow-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMuted ? "muted" : "unmuted"}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VolumeIcon className={cn("w-5 h-5", isMuted ? "text-zinc-400" : "text-[#F97316]")} />
                  </motion.div>
                </AnimatePresence>
                <span className="text-sm font-bold uppercase tracking-wider">
                  {isMuted ? "Sound Off" : "Sound On"}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* CTA Button */}
      <div className="w-full flex justify-center mt-12 mb-20 relative z-20">
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

      {/* ═══ IN2IT STYLE — Bottom Glowing Purple Border Divider ═══ */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[2px] shadow-[0_0_15px_rgba(168,85,247,0.6),0_0_30px_rgba(168,85,247,0.3)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40px] bg-purple-500/15 blur-[25px] rounded-full pointer-events-none" />
      </div>
    </section>
  );
}
