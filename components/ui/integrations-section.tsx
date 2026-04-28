"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const allLogos = [
  // ... existing logos ...
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

export default function IntegrationsSection() {
  const [trackWidth, setTrackWidth] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const baseVelocity = 0.5;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Scale and fade effect: It shrinks to 70% and fades slightly when out of center,
  // then smoothly expands to 100% when exactly in the middle of the screen.
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.7, 1, 1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0.2, 1, 1, 0.2]);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 3);
    }
  }, []);

  useAnimationFrame(() => {
    if (isDragging.current || trackWidth === 0) return;
    let currentX = x.get();
    currentX -= baseVelocity;
    if (currentX <= -trackWidth) currentX += trackWidth;
    else if (currentX > 0) currentX -= trackWidth;
    x.set(currentX);
  });

  const marqueeLogos = [...allLogos, ...allLogos, ...allLogos];

  return (
    <section ref={sectionRef} className="w-full py-20 relative overflow-hidden bg-black flex justify-center">
      <motion.div
        style={{
          scale,
          opacity,
          willChange: "transform, opacity",
          transform: "translateZ(0)"
        }}
        className="w-[calc(100%-2rem)] max-w-[1440px] bg-zinc-950 shadow-[0_0_80px_rgba(255,102,0,0.15)] border border-white/5 rounded-[2rem] md:rounded-[3rem]"
      >
        <div className="w-full px-8 py-16 md:py-24 grid lg:grid-cols-[1fr_2fr] gap-10 items-center">
          {/* Left Side — Text */}
          <div className="text-center lg:text-left z-20 lg:pl-10">
            <p className="uppercase text-sm font-semibold text-[#FF6600] tracking-widest mb-2">
              Trusted Partners
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-tight mb-4">
              Powering Events{" "}
              <br className="hidden lg:block" />
              <span className="text-[#FF3366]">Worldwide</span>
            </h2>
            <p className="text-white/40 text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              We partner with leading global brands, government agencies, and
              international organizations — delivering cutting-edge event technology
              across <span className="text-white font-bold">500+</span> events.
            </p>
          </div>

          {/* Right Side — Draggable Auto-scrolling Grid */}
          <div className="w-full overflow-hidden cursor-grab active:cursor-grabbing relative">
            {/* Dark Mask Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

            <motion.div
              ref={trackRef}
              drag="x"
              dragMomentum={false}
              style={{
                x,
                willChange: "transform",
                transform: "translateZ(0)"
              }}
              onDragStart={() => { isDragging.current = true; }}
              onDragEnd={() => { isDragging.current = false; }}
              onDrag={() => {
                let currentX = x.get();
                if (currentX < -trackWidth) x.set(currentX + trackWidth);
                else if (currentX > 0) x.set(currentX - trackWidth);
              }}
              whileTap={{ cursor: "grabbing" }}
              className="flex w-max"
            >
              <div className="grid grid-rows-4 grid-flow-col gap-x-12 gap-y-8 px-4">
                {marqueeLogos.map((logo, idx) => (
                  <div
                    key={`${logo.alt}-${idx}`}
                    className="relative w-24 h-16 md:w-32 md:h-20 flex items-center justify-center transition-transform duration-300 hover:scale-105 bg-white rounded-xl p-3 md:p-4 shadow-sm"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain p-2 pointer-events-none select-none"
                      sizes="128px"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
