"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Categorized logos based on their visual aspect ratio
const allLogos = [
  { src: "/partners/Abbott.png", alt: "Abbott", name: "Abbott", type: "square" },
  { src: "/partners/AMATA.png", alt: "AMATA", name: "AMATA", type: "wide" },
  { src: "/partners/Amazing_Thailand.png", alt: "Amazing Thailand", name: "TAT", type: "wide" },
  { src: "/partners/Blackitch.png", alt: "Blackitch", name: "Blackitch", type: "square" },
  { src: "/partners/CMU.png", alt: "Chiang Mai University", name: "CMU", type: "square" },
  { src: "/partners/CRU.png", alt: "Chiang Rai Rajabhat", name: "CRU", type: "wide" },
  { src: "/partners/Child_Development_Foundation.png", alt: "Child Development", name: "CDF", type: "wide" },
  { src: "/partners/Delta.png", alt: "Delta Electronics", name: "Delta", type: "square" },
  { src: "/partners/DON_Creative.png", alt: "DON Creative Agency", name: "DON", type: "wide" },
  { src: "/partners/IACIO.png", alt: "International CIO", name: "IACIO", type: "square" },
  { src: "/partners/ICIRD.png", alt: "ICIRD", name: "ICIRD", type: "square" },
  { src: "/partners/idext.png", alt: "idext MICE", name: "idext", type: "square" },
  { src: "/partners/iFEAT.png", alt: "iFEAT", name: "iFEAT", type: "square" },
  { src: "/partners/Indeed_Creation.png", alt: "Indeed Creation", name: "Indeed", type: "wide" },
  { src: "/partners/Indego_Idea.png", alt: "Indego Idea", name: "Indego", type: "wide" },
  { src: "/partners/Thai_Norwegian_Chamber.png", alt: "Thai-Norwegian", name: "TNCC", type: "wide" },
  { src: "/partners/Kenan.png", alt: "Kenan Foundation", name: "Kenan", type: "wide" },
  { src: "/partners/KX.png", alt: "Knowledge Exchange", name: "KX", type: "square" },
  { src: "/partners/MSDHS.png", alt: "MSDHS", name: "MSDHS", type: "square" },
  { src: "/partners/MOPH.png", alt: "Ministry of Health", name: "MOPH", type: "square" },
  { src: "/partners/MedCMU.png", alt: "MedCMU", name: "MedCMU", type: "square" },
  { src: "/partners/Menarini.png", alt: "Menarini", name: "Menarini", type: "wide" },
  { src: "/partners/Meta.png", alt: "Meta", name: "Meta", type: "square" },
  { src: "/partners/MIMS.png", alt: "MIMS Thailand", name: "MIMS", type: "square" },
  { src: "/partners/Motor_Expo.png", alt: "Motor Expo", name: "Motor Expo", type: "wide" },
  { src: "/partners/Otsuka.png", alt: "Otsuka", name: "Otsuka", type: "square" },
  { src: "/partners/PATA.png", alt: "PATA", name: "PATA", type: "square" },
  { src: "/partners/Proflex.png", alt: "Pro Flex", name: "Proflex", type: "wide" },
  { src: "/partners/Sake_Merchant.png", alt: "Sake Merchant", name: "Sake", type: "wide" },
  { src: "/partners/Site_Thailand.png", alt: "Site Thailand", name: "Site", type: "wide" },
  { src: "/partners/Swire_Coca_Cola.png", alt: "Swire Coca-Cola", name: "Swire", type: "wide" },
  { src: "/partners/TAT.png", alt: "Tourism Thailand", name: "TAT", type: "wide" },
  { src: "/partners/TCEB.png", alt: "TCEB", name: "TCEB", type: "wide" },
  { src: "/partners/TEA.png", alt: "Thai Exhibition", name: "TEA", type: "wide" },
  { src: "/partners/Techsauce.png", alt: "Techsauce", name: "Techsauce", type: "wide" },
  { src: "/partners/MICE_Youth_Challenge.png", alt: "MICE Youth", name: "MICE", type: "wide" },
  { src: "/partners/Thai_IOD.png", alt: "Thai IOD", name: "Thai IOD", type: "square" },
  { src: "/partners/Thammasat_University.png", alt: "Thammasat", name: "TU", type: "wide" },
  { src: "/partners/TICA.png", alt: "TICA", name: "TICA", type: "wide" },
  { src: "/partners/vnu.png", alt: "VNU Exhibitions", name: "VNU", type: "square" },
  { src: "/partners/WRG.png", alt: "World Robot Games", name: "WRG", type: "wide" },
  { src: "/partners/Yindee.png", alt: "Yindee Agency", name: "Yindee", type: "square" },
];

// Triple for seamless infinite loop
const loopedLogos = [...allLogos, ...allLogos, ...allLogos];

export default function IntegrationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const scrollY = useRef(0);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScroll = useRef(0);
  const halfHeight = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.7, 1, 1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0.2, 1, 1, 0.2]);

  // Measure half-height for looping
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfHeight.current = trackRef.current.scrollHeight / 3;
      }
    };
    const id = requestAnimationFrame(() => {
      measure();
      setTimeout(measure, 500);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    const speed = 0.5;
    const animate = () => {
      if (!isDragging.current && trackRef.current && halfHeight.current > 0) {
        scrollY.current += speed;
        if (scrollY.current >= halfHeight.current) {
          scrollY.current -= halfHeight.current;
        }
        trackRef.current.style.transform = `translateY(-${scrollY.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Drag — mouse
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startScroll.current = scrollY.current;
    e.preventDefault();
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return;
      const dy = startY.current - e.clientY;
      let next = startScroll.current + dy;
      const h = halfHeight.current;
      if (h > 0) {
        if (next < 0) next += h;
        if (next >= h) next -= h;
      }
      scrollY.current = next;
      trackRef.current.style.transform = `translateY(-${next}px)`;
    };
    const onMouseUp = () => { isDragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Drag — touch
  useEffect(() => {
    const el = trackRef.current?.parentElement;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startY.current = e.touches[0].clientY;
      startScroll.current = scrollY.current;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !trackRef.current) return;
      const dy = startY.current - e.touches[0].clientY;
      let next = startScroll.current + dy;
      const h = halfHeight.current;
      if (h > 0) {
        if (next < 0) next += h;
        if (next >= h) next -= h;
      }
      scrollY.current = next;
      trackRef.current.style.transform = `translateY(-${next}px)`;
    };
    const onTouchEnd = () => { isDragging.current = false; };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-32 bg-[#020202] text-white overflow-hidden relative">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">
          
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
                Hundreds of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400">
                  favourite tools
                </span>
              </h1>
              
              <p className="text-xl text-zinc-500 leading-relaxed mb-12 max-w-md font-medium">
                Create endless possibilities. Connect to the largest library of integrations 
                that your team is already using.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-black text-sm uppercase tracking-widest transition-all"
              >
                <span>View All Integrations</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>

          {/* Right: Vertical Scrolling Grid */}
          <div
            className="relative h-[500px] md:h-[650px] overflow-hidden cursor-grab active:cursor-grabbing rounded-[2.5rem] border border-white/5 bg-zinc-950/20 backdrop-blur-3xl shadow-2xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
            onMouseDown={onMouseDown}
          >
            <div
              ref={trackRef}
              className="absolute top-0 left-0 right-0 grid grid-cols-4 gap-3 p-4"
            >
              {loopedLogos.map((logo, idx) => (
                <div
                  key={`${logo.alt}-${idx}`}
                  className={`
                    group relative flex items-center justify-center bg-zinc-900/40 border border-white/5 
                    rounded-2xl transition-all duration-300 hover:bg-zinc-800/80 hover:border-white/20
                    ${logo.type === "wide" ? "col-span-2 h-20 md:h-28" : "col-span-1 h-20 md:h-28"}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:to-cyan-500/10 transition-all" />
                  
                  <div className={`
                    relative bg-white rounded-xl flex items-center justify-center shadow-inner overflow-hidden
                    ${logo.type === "wide" ? "w-[85%] h-[70%]" : "w-[75%] h-[75%]"}
                  `}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain p-2 md:p-4 pointer-events-none select-none"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}