"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const partnerLogos = [
  { src: "/partners/Abbott.png", alt: "Abbott" },
  { src: "/partners/AMATA.png", alt: "AMATA" },
  { src: "/partners/Amazing_Thailand.png", alt: "Amazing Thailand" },
  { src: "/partners/Blackitch.png", alt: "Blackitch Artisan Kitchen" },
  { src: "/partners/CMU.png", alt: "Chiang Mai University" },
  { src: "/partners/CRU.png", alt: "Chiang Rai Rajabhat University" },
  { src: "/partners/Child_Development_Foundation.png", alt: "Child Development Foundation" },
  { src: "/partners/Delta.png", alt: "Delta Electronics" },
  { src: "/partners/DON_Creative.png", alt: "DON Creative Agency" },
  { src: "/partners/IACIO.png", alt: "International Academy of CIO" },
  { src: "/partners/ICIRD.png", alt: "ICIRD" },
  { src: "/partners/idext.png", alt: "idext MICE" },
  { src: "/partners/iFEAT.png", alt: "iFEAT" },
  { src: "/partners/Indeed_Creation.png", alt: "Indeed Creation" },
  { src: "/partners/Indego_Idea.png", alt: "Indego Idea" },
  { src: "/partners/Thai_Norwegian_Chamber.png", alt: "Thai-Norwegian Chamber of Commerce" },
  { src: "/partners/Kenan.png", alt: "Kenan Foundation Asia" },
  { src: "/partners/KX.png", alt: "Knowledge Exchange" },
  { src: "/partners/MSDHS.png", alt: "MSDHS" },
  { src: "/partners/MOPH.png", alt: "Ministry of Public Health" },
  { src: "/partners/MedCMU.png", alt: "MedCMU" },
  { src: "/partners/Menarini.png", alt: "Menarini" },
  { src: "/partners/Meta.png", alt: "Meta" },
  { src: "/partners/MIMS.png", alt: "MIMS Thailand" },
  { src: "/partners/Motor_Expo.png", alt: "Motor Expo" },
  { src: "/partners/Otsuka.png", alt: "Otsuka" },
  { src: "/partners/PATA.png", alt: "PATA" },
  { src: "/partners/Proflex.png", alt: "Pro Flex Consult" },
  { src: "/partners/Sake_Merchant.png", alt: "The Sake Merchant" },
  { src: "/partners/Site_Thailand.png", alt: "site Thailand" },
  { src: "/partners/Swire_Coca_Cola.png", alt: "Swire Coca-Cola" },
  { src: "/partners/TAT.png", alt: "Tourism Authority of Thailand" },
  { src: "/partners/TCEB.png", alt: "TCEB" },
  { src: "/partners/TEA.png", alt: "Thai Exhibition Association" },
  { src: "/partners/Techsauce.png", alt: "Techsauce" },
  { src: "/partners/MICE_Youth_Challenge.png", alt: "MICE Youth Challenge" },
  { src: "/partners/Thai_IOD.png", alt: "Thai Institute of Directors" },
  { src: "/partners/Thammasat_University.png", alt: "Thammasat University" },
  { src: "/partners/TICA.png", alt: "TICA" },
  { src: "/partners/vnu.png", alt: "VNU Exhibitions" },
  { src: "/partners/WRG.png", alt: "World Robot Games" },
  { src: "/partners/Yindee.png", alt: "Yindee Agency" },
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
      setTrackWidth(trackRef.current.scrollWidth / 3);
    }
  }, []);

  useAnimationFrame(() => {
    if (isDragging.current || trackWidth === 0) return;

    let currentX = x.get();
    currentX -= baseVelocity;

    // Wrap-around logic for seamless infinity (leftwards)
    if (currentX <= -trackWidth) {
      currentX += trackWidth;
    } else if (currentX > 0) {
      currentX -= trackWidth;
    }

    x.set(currentX);
  });

  const fullLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className="relative w-full py-4 overflow-hidden bg-black">
      {/* Top Glowing Blue Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[2px] shadow-[0_0_15px_#3b82f6]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[30px] bg-purple-600/20 blur-[20px] rounded-[100%] pointer-events-none" />
      </div>

      {/* Center White Strip (Backdrop) */}
      <div className="bg-white py-6 shadow-2xl relative z-10 overflow-hidden">
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
            className="flex shrink-0 gap-8 md:gap-12 items-center"
          >
            {fullLogos.map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                className="shrink-0 w-[150px] md:w-[200px] h-20 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={64}
                  className="max-h-14 md:max-h-16 max-w-[90%] object-contain pointer-events-none select-none"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
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
