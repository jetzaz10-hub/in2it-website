"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const logos = [
  "/partners/AMATA.png",
  "/partners/Abbott.png",
  "/partners/Amazing TH.jpg",
  "/partners/Blackitch.png",
  "/partners/CMU.png",
  "/partners/CRU.jpeg",
  "/partners/DBP.png",
  "/partners/DELTA.jpg",
  "/partners/Don Creative Agency.png",
  "/partners/IACIO.png",
  "/partners/ICIRD7.png",
  "/partners/IFEAT.png",
  "/partners/Idext.png",
  "/partners/Indeed.jpg",
  "/partners/Indego Idea.jpg",
  "/partners/KX.png",
  "/partners/Kenan.png",
  "/partners/Logo1.png",
  "/partners/Logo2.png",
  "/partners/MIMS.png",
  "/partners/Med CMU.png",
  "/partners/Menarini.jpeg",
  "/partners/Meta.png",
  "/partners/Motor Expo.png",
  "/partners/Otsuka.png",
  "/partners/PATA.png",
  "/partners/Proflex.png",
  "/partners/SAKE Merchant.png",
  "/partners/SWIRE.png",
  "/partners/Site.png",
  "/partners/TAT.png",
  "/partners/TCEB.png",
  "/partners/TEA.png",
  "/partners/TH MICE.png",
  "/partners/TICA.webp",
  "/partners/TechSauce.png",
  "/partners/Thai Directors.png",
  "/partners/Thammasat_University.svg",
  "/partners/WRG.png",
  "/partners/Yindee.png",
  "/partners/iNorway.png",
  "/partners/vnu.png",
];

export default function Partners() {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);

  // Base speed for auto-scroll
  const baseVelocity = -1.5; // Negative to scroll left

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  useAnimationFrame(() => {
    if (isDragging.current || trackWidth === 0) return;

    let currentX = x.get();
    currentX += baseVelocity;

    // Wrap-around logic for infinity
    if (currentX < -trackWidth) {
      currentX += trackWidth;
    } else if (currentX > 0) {
      currentX -= trackWidth;
    }

    x.set(currentX);
  });

  // Double logos for seamlessness
  const fullLogos = [...logos, ...logos];

  return (
    <section className="bg-white py-14 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        <div className="max-w-[1280px] mx-auto px-8 mb-10">
          <h2 className="text-center text-sm font-bold tracking-[0.4em] text-gray-400 uppercase">
            TRUSTED PARTNERS
          </h2>
        </div>

        {/* Fade edges */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white, transparent)" }} />

          {/* Draggable & Constant Auto-scrolling Track */}
          <div className="flex overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div
              ref={trackRef}
              drag="x"
              dragMomentum={false}
              style={{ x }}
              onDragStart={() => { isDragging.current = true; }}
              onDragEnd={() => { isDragging.current = false; }}
              onDrag={(event, info) => {
                // Manual wrap-around check during drag
                let currentX = x.get();
                if (currentX < -trackWidth) {
                  x.set(currentX + trackWidth);
                } else if (currentX > 0) {
                  x.set(currentX - trackWidth);
                }
              }}
              whileTap={{ cursor: "grabbing" }}
              className="flex shrink-0 gap-16 items-center"
            >
              {fullLogos.map((src, i) => (
                <div
                  key={i}
                  className="shrink-0 h-24 flex items-center justify-center px-4 transition-all duration-300 hover:scale-110"
                >
                  <img src={src} alt={`Partner ${i}`} className="h-14 md:h-18 w-auto object-contain pointer-events-none" loading="lazy" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
