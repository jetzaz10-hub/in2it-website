"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const partnerLogos = [
  { src: "/partners/AMATA.png", alt: "AMATA" },
  { src: "/partners/Abbott.png", alt: "Abbott" },
  { src: "/partners/Amazing TH.jpg", alt: "Amazing TH" },
  { src: "/partners/Blackitch.png", alt: "Blackitch" },
  { src: "/partners/CMU.png", alt: "CMU" },
  { src: "/partners/CRU.jpeg", alt: "CRU" },
  { src: "/partners/DBP.png", alt: "DBP" },
  { src: "/partners/DELTA.jpg", alt: "DELTA" },
  { src: "/partners/Don Creative Agency.png", alt: "Don Creative Agency" },
  { src: "/partners/IACIO.png", alt: "IACIO" },
  { src: "/partners/ICIRD7.png", alt: "ICIRD7" },
  { src: "/partners/IFEAT.png", alt: "IFEAT" },
  { src: "/partners/Idext.png", alt: "Idext" },
  { src: "/partners/Indeed.jpg", alt: "Indeed" },
  { src: "/partners/Indego Idea.jpg", alt: "Indego Idea" },
  { src: "/partners/KX.png", alt: "KX" },
  { src: "/partners/Kenan.png", alt: "Kenan" },
  { src: "/partners/Logo1.png", alt: "Logo1" },
  { src: "/partners/Logo2.png", alt: "Logo2" },
  { src: "/partners/MIMS.png", alt: "MIMS" },
  { src: "/partners/Med CMU.png", alt: "Med CMU" },
  { src: "/partners/Menarini.jpeg", alt: "Menarini" },
  { src: "/partners/Meta.png", alt: "Meta" },
  { src: "/partners/Motor Expo.png", alt: "Motor Expo" },
  { src: "/partners/Otsuka.png", alt: "Otsuka" },
  { src: "/partners/PATA.png", alt: "PATA" },
  { src: "/partners/Proflex.png", alt: "Proflex" },
  { src: "/partners/SAKE Merchant.png", alt: "SAKE Merchant" },
  { src: "/partners/SWIRE.png", alt: "SWIRE" },
  { src: "/partners/Site.png", alt: "Site" },
  { src: "/partners/TAT.png", alt: "TAT" },
  { src: "/partners/TCEB.png", alt: "TCEB" },
  { src: "/partners/TEA.png", alt: "TEA" },
  { src: "/partners/TH MICE.png", alt: "TH MICE" },
  { src: "/partners/TICA.webp", alt: "TICA" },
  { src: "/partners/TechSauce.png", alt: "TechSauce" },
  { src: "/partners/Thai Directors.png", alt: "Thai Directors" },
  { src: "/partners/Thammasat_University.svg", alt: "Thammasat University" },
  { src: "/partners/WRG.png", alt: "WRG" },
  { src: "/partners/Yindee.png", alt: "Yindee" },
  { src: "/partners/iNorway.png", alt: "iNorway" },
  { src: "/partners/vnu.png", alt: "vnu" },
];

export default function Partners() {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);

  // Base speed for auto-scroll
  const baseVelocity = 1; // Slower for smoother cinematic look

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

  const fullLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="relative w-full py-4 overflow-hidden bg-black">
      {/* Top Glowing Blue Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[2px] shadow-[0_0_15px_#3b82f6]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[30px] bg-purple-600/20 blur-[20px] rounded-[100%] pointer-events-none" />
      </div>

      {/* Center White Strip (Backdrop) */}
      <div className="bg-white/100 py-5 shadow-2xl relative z-10 overflow-hidden">


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
              let currentX = x.get();
              if (currentX < -trackWidth) {
                x.set(currentX + trackWidth);
              } else if (currentX > 0) {
                x.set(currentX - trackWidth);
              }
            }}
            whileTap={{ cursor: "grabbing" }}
            className="flex shrink-0 gap-20 items-center"
          >
            {fullLogos.map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                className="shrink-0 h-16 flex items-center justify-center px-4 transition-all duration-300 hover:scale-110"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 md:h-14 w-auto object-contain pointer-events-none select-none"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Glowing Blue Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[2px] shadow-[0_0_15px_#3b82f6]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[30px] bg-purple-600/20 blur-[20px] rounded-[100%] pointer-events-none" />
      </div>
    </section>
  );
}
