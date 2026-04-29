"use client";

import { motion } from "framer-motion";

const row1 = [
  { src: "/partners/Abbott.png", alt: "Abbott" },
  { src: "/partners/AMATA.png", alt: "AMATA" },
  { src: "/partners/Amazing TH.jpg", alt: "Amazing TH" },
  { src: "/partners/Amazing_Thailand.png", alt: "Amazing Thailand" },
  { src: "/partners/Blackitch.png", alt: "Blackitch" },
  { src: "/partners/Child_Development_Foundation.png", alt: "Child Development Foundation" },
  { src: "/partners/CMU.png", alt: "CMU" },
  { src: "/partners/CRU.jpeg", alt: "CRU" },
  { src: "/partners/CRU.png", alt: "CRU" },
  { src: "/partners/DBP.png", alt: "DBP" },
  { src: "/partners/DELTA.jpg", alt: "DELTA" },
  { src: "/partners/Delta.png", alt: "Delta" },
  { src: "/partners/Don Creative Agency.png", alt: "Don Creative Agency" },
  { src: "/partners/DON_Creative.png", alt: "DON Creative" },
  { src: "/partners/IACIO.png", alt: "IACIO" },
  { src: "/partners/ICIRD.png", alt: "ICIRD" },
  { src: "/partners/ICIRD7.png", alt: "ICIRD7" },
  { src: "/partners/Idext.png", alt: "Idext" },
  { src: "/partners/IFEAT.png", alt: "IFEAT" },
  { src: "/partners/Indeed.jpg", alt: "Indeed" },
  { src: "/partners/Indeed_Creation.png", alt: "Indeed Creation" },
  { src: "/partners/Indego Idea.jpg", alt: "Indego Idea" },
  { src: "/partners/Indego_Idea.png", alt: "Indego Idea" },
  { src: "/partners/iNorway.png", alt: "iNorway" },
  { src: "/partners/Kenan.png", alt: "Kenan" },
  { src: "/partners/KX.png", alt: "KX" },
  { src: "/partners/Logo1.png", alt: "Logo1" },
  { src: "/partners/Logo2.png", alt: "Logo2" },
  { src: "/partners/Med CMU.png", alt: "Med CMU" },
  { src: "/partners/MedCMU.png", alt: "MedCMU" },
  { src: "/partners/Menarini.jpeg", alt: "Menarini" },
  { src: "/partners/Menarini.png", alt: "Menarini" },
];

const row2 = [
  { src: "/partners/Meta.png", alt: "Meta" },
  { src: "/partners/MICE_Youth_Challenge.png", alt: "MICE Youth Challenge" },
  { src: "/partners/MIMS.png", alt: "MIMS" },
  { src: "/partners/MOPH.png", alt: "MOPH" },
  { src: "/partners/Motor Expo.png", alt: "Motor Expo" },
  { src: "/partners/Motor_Expo.png", alt: "Motor Expo" },
  { src: "/partners/MSDHS.png", alt: "MSDHS" },
  { src: "/partners/Otsuka.png", alt: "Otsuka" },
  { src: "/partners/PATA.png", alt: "PATA" },
  { src: "/partners/Proflex.png", alt: "Proflex" },
  { src: "/partners/SAKE Merchant.png", alt: "SAKE Merchant" },
  { src: "/partners/Sake_Merchant.png", alt: "Sake Merchant" },
  { src: "/partners/Site.png", alt: "Site" },
  { src: "/partners/Site_Thailand.png", alt: "Site Thailand" },
  { src: "/partners/SWIRE.png", alt: "SWIRE" },
  { src: "/partners/Swire_Coca_Cola.png", alt: "Swire Coca Cola" },
  { src: "/partners/TAT.png", alt: "TAT" },
  { src: "/partners/TCEB.png", alt: "TCEB" },
  { src: "/partners/TEA.png", alt: "TEA" },
  { src: "/partners/TechSauce.png", alt: "TechSauce" },
  { src: "/partners/TH MICE.png", alt: "TH MICE" },
  { src: "/partners/Thai Directors.png", alt: "Thai Directors" },
  { src: "/partners/Thai_IOD.png", alt: "Thai IOD" },
  { src: "/partners/Thai_Norwegian_Chamber.png", alt: "Thai Norwegian Chamber" },
  { src: "/partners/Thammasat_main_logo.png", alt: "Thammasat main logo" },
  { src: "/partners/Thammasat_University.png", alt: "Thammasat University" },
  { src: "/partners/Thammasat_University.svg", alt: "Thammasat University" },
  { src: "/partners/TICA.png", alt: "TICA" },
  { src: "/partners/TICA.webp", alt: "TICA" },
  { src: "/partners/vnu.png", alt: "vnu" },
  { src: "/partners/WRG.png", alt: "WRG" },
  { src: "/partners/Yindee.png", alt: "Yindee" },
];

const InfiniteRow = ({ logos, duration = 60, reverse = false }: { logos: typeof row1, duration?: number, reverse?: boolean }) => {
  return (
    <div className="flex overflow-hidden relative w-full py-4">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />
      
      <motion.div 
        className="flex gap-6 md:gap-8 shrink-0 items-center"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"]
        }}
        transition={{
          ease: "linear",
          duration: duration,
          repeat: Infinity
        }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="shrink-0 w-[140px] md:w-[180px] h-16 md:h-20 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 p-3 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group select-none"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-10 md:max-h-12 max-w-[85%] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-100"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Partners() {
  return (
    <section className="relative w-full py-16 bg-black overflow-hidden">
      {/* Top Glowing Purple Line to match main theme */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4634F8] to-transparent h-[2px] shadow-[0_0_15px_#4634F8]" />
      </div>

      <div className="container max-w-[1440px] mx-auto px-6 relative z-10 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight uppercase">
          Trusted <span className="text-[#FF6600]">Partners</span>
        </h2>
      </div>

      <div className="flex flex-col gap-2 relative z-10">
        <InfiniteRow logos={row1} duration={50} />
        <InfiniteRow logos={row2} duration={55} reverse={true} />
      </div>

      {/* Bottom Glowing Purple Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4634F8] to-transparent h-[2px] shadow-[0_0_15px_#4634F8]" />
      </div>
    </section>
  );
}
