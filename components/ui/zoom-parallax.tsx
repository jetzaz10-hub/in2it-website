'use client';

import { useScroll, useTransform, motion, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaItem {
  src: string;
  alt?: string;
  type?: 'image' | 'video';
}

interface ZoomParallaxProps {
  /** Array of media items to be displayed in the parallax effect (max 7) */
  items: MediaItem[];
}

export function ZoomParallax({ items }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [zoomComplete, setZoomComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  // Track when zoom is near completion to auto-play video
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.85 && !zoomComplete) {
      setZoomComplete(true);
    } else if (latest <= 0.85 && zoomComplete) {
      setZoomComplete(false);
    }
  });

  // Auto-play/pause video based on zoom state
  useEffect(() => {
    if (!videoRef.current) return;
    if (zoomComplete) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [zoomComplete]);

  // Volume controls
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
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {items.map((item, index) => {
          const scale = scales[index % scales.length];
          const isCenter = index === 0;

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 1
                  ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]'
                  : ''
              } ${
                index === 2
                  ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]'
                  : ''
              } ${
                index === 3
                  ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]'
                  : ''
              } ${
                index === 4
                  ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]'
                  : ''
              } ${
                index === 5
                  ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]'
                  : ''
              } ${
                index === 6
                  ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]'
                  : ''
              }`}
            >
              <div className="relative h-[25vh] w-[25vw]">
                {isCenter && item.type === 'video' ? (
                  /* ── Center Video Frame (styled like the old video player) ── */
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(249,115,22,0.15)] border border-white/10 bg-zinc-950">
                    <video
                      ref={videoRef}
                      src={item.src}
                      loop
                      muted={isMuted}
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover pointer-events-none will-change-auto"
                    />

                    {/* Overlay & Volume Controls */}
                    <div className="absolute inset-x-0 bottom-0 p-4 flex justify-end z-20 pointer-events-none">
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
                              animate={{ width: 100, opacity: 1 }}
                              exit={{ width: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden flex items-center px-2 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
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
                          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-all shadow-2xl"
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={isMuted ? 'muted' : 'unmuted'}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <VolumeIcon className={cn('w-4 h-4', isMuted ? 'text-zinc-400' : 'text-[#F97316]')} />
                            </motion.div>
                          </AnimatePresence>
                          <span className="text-xs font-bold uppercase tracking-wider">
                            {isMuted ? 'Sound Off' : 'Sound On'}
                          </span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <img
                    src={item.src || '/placeholder.svg'}
                    alt={item.alt || `Parallax image ${index + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                  />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
      </div>
    </div>
  );
}
