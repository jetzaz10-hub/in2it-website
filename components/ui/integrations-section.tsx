"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SphereImageGrid from "./img-sphere";
import type { ImageData } from "./img-sphere";

const allLogos = [
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
  { src: "/partners/Site_Thailand.png", alt: "Site Thailand" },
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

// Convert to the format required by SphereImageGrid
const SPHERE_IMAGES: ImageData[] = allLogos.map((logo, i) => ({
  id: `partner-${i}`,
  src: logo.src,
  alt: logo.alt,
}));

export default function IntegrationsSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0.3, 1, 1, 0.3]);

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32 bg-[#020202] text-white overflow-hidden relative">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col items-start max-w-xl">
            <motion.div
              style={{ scale, opacity }}
              className="flex flex-col items-start"
            >
              <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full bg-zinc-900/50 border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                <span className="flex h-1.5 w-1.5 mr-3">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
                </span>
                The future of event technology
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8">
                Global <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">
                  Ecosystem
                </span>
              </h1>
              
              <p className="text-xl text-zinc-500 leading-relaxed mb-12 max-w-md font-medium">
                Our massive library of integrations connects your events to leading brands and 
                government systems worldwide.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-black text-sm uppercase tracking-widest transition-all"
              >
                <span>Explore Network</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>

          {/* Right: 3D Image Sphere */}
          <div className="relative flex justify-center items-center h-[500px] md:h-[650px] w-full">
             <SphereImageGrid
                images={SPHERE_IMAGES}
                containerSize={600}
                sphereRadius={220}
                autoRotate={true}
                autoRotateSpeed={0.2}
                dragSensitivity={0.8}
                baseImageScale={0.18}
                className="z-20"
              />
              
              {/* Decorative radial glows behind the sphere */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-cyan-600/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}