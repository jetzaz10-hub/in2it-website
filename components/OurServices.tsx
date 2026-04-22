"use client";

import { useRef, useState, useEffect, forwardRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Counter from "./ui/Counter";

// --- ElegantShape Component for Ambient Background ---
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} backdrop-blur-md border border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]`}
        />
      </motion.div>
    </motion.div>
  );
}

const services = [
  {
    id: "registration",
    title: "Registration System",
    description: "End-to-end event registration solutions with 15+ years of experience. We handle everything from customized online forms to high-capacity onsite check-ins.",
    images: ["/services/regis/regis1.png", "/services/regis/regis2.png", "/services/regis/regis 3.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#6"
  },
  {
    id: "website",
    title: "Website Design",
    description: "Professional event microsites and corporate landing pages designed with 15+ years of UI/UX expertise to convert visitors flawlessly.",
    images: ["/services/web/web1.png", "/services/web/web 2.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#13"
  },
  {
    id: "edm",
    title: "EDM Solution",
    description: "Professional electronic direct mail campaigns designed to drive registrations, boost attendance, and keep participants engaged.",
    images: ["/services/edm/edm1.png", "/services/edm/edm2.png", "/services/edm/edm3.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#24"
  },
  {
    id: "ticket",
    title: "Ticket Event",
    description: "Secure and scalable ticketing infrastructure with QR code entry, mobile scanning, and real-time reporting dashboards.",
    images: ["/services/ticket/ticket2.png", "/services/ticket/ticket 2.png", "/services/ticket/ticket 3.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#29"
  },
  {
    id: "festival",
    title: "Festival Tech",
    description: "Robust infrastructure for large-scale festivals: cashless payments, RFID wristbands, and live crowd management dashboards.",
    images: ["/services/fest/fes1.png", "/services/fest/fes2.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#30"
  },
  {
    id: "iot",
    title: "IOT & Hardware",
    description: "Specially engineered hardware for the MICE industry: RFID systems, check-in kiosks, and IOT integrations for seamless management.",
    images: ["/services/iot/iot 1.png", "/services/iot/iot2.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#45"
  },
  {
    id: "organizer",
    title: "Event Organizer",
    description: "Full-service event management from concept to wrap-up, including logistics, vendor management and on-site coordination.",
    images: ["/services/org/org 1.png", "/services/org/org 2.png", "/services/org/org 3.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#31"
  },
  {
    id: "graphic",
    title: "Graphic Design",
    description: "Visually stunning event branding — from logo and print materials to digital assets and stage backdrops.",
    images: ["/services/graph/graph1.jpg", "/services/graph/graph2.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#55"
  },
  {
    id: "social",
    title: "Social Tools",
    description: "Boost engagement with interactive social media integrations — Line OA, Facebook, Instagram, and live photo walls.",
    images: ["/services/scm/scm1.png", "/services/scm/scm2.png", "/services/scm/scm3.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#56"
  },
  {
    id: "streaming",
    title: "Live Streaming",
    description: "Professional multi-camera live production with encoding and high-fidelity streaming to multiple global platforms.",
    images: ["/services/stream/stream1.png", "/services/stream/stream2.png", "/services/stream/stream3.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#57"
  }
];

// --- Internal Image Slider Component ---
const ServiceImageSlider = ({ images, title, isActive }: { images: string[], title: string, isActive: boolean }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const dragThreshold = 50;

  const next = () => setImgIdx((prev) => (prev + 1) % images.length);
  const prev = () => setImgIdx((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (!isActive || images.length <= 1) return;
    const interval = setInterval(next, 5000); // 5s auto-play
    return () => clearInterval(interval);
  }, [isActive, images.length]);

  return (
    <div className="relative w-full h-full group overflow-hidden cursor-grab active:cursor-grabbing">
      {/* Draggable Image Track */}
      <motion.div
        className="flex w-full h-full"
        animate={{ x: `-${imgIdx * 100}%` }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        drag={images.length > 1 ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -dragThreshold) {
            next();
          } else if (info.offset.x > dragThreshold) {
            prev();
          }
        }}
      >
        {images.map((src, i) => (
          <div key={i} className="relative min-w-full h-full shrink-0">
            <Image
              src={src}
              alt={`${title} - image ${i + 1}`}
              fill
              className="object-cover pointer-events-none" // prevent ghosting during drag
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={isActive && i === imgIdx}
            />
          </div>
        ))}
      </motion.div>

      {/* Cinematic Fade Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80 z-10 pointer-events-none" />

      {/* Controls (Only if multiple images) */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-black/50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-black/50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-0 w-full flex justify-center gap-1.5 z-20">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${i === imgIdx ? "w-4 bg-white" : "w-1 bg-white/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function OurServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [[activeIndex, direction], setActiveStep] = useState([0, 0]);

  // Map scroll to index (0 to 9) - 550vh track
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.floor(latest * (1 / 0.9) * services.length);
    const clampedIndex = Math.min(services.length - 1, Math.max(0, index));
    if (clampedIndex !== activeIndex) {
      const dir = clampedIndex > activeIndex ? 1 : -1;
      setActiveStep([clampedIndex, dir]);
    }
  });

  // Section fade in/out with scale
  const contentOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0.97, 1, 1, 0.97]);

  // Parallax for ambient shapes
  const shapeYLeft = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const shapeYRight = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative h-[550vh] bg-black"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="w-full h-full"
      >
        {/* PC Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden hidden lg:block">

          {/* Background Layer */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <motion.div style={{ y: shapeYLeft }}>
              <ElegantShape
                delay={0.3}
                width={600}
                height={140}
                rotate={12}
                gradient="from-[#4634F8]/[0.1]"
                className="left-[-5%] top-[10%]"
              />
            </motion.div>
            <motion.div style={{ y: shapeYRight }}>
              <ElegantShape
                delay={0.5}
                width={500}
                height={120}
                rotate={-15}
                gradient="from-[#FF6600]/[0.05]"
                className="right-[-5%] top-[60%]"
              />
            </motion.div>
          </div>

          {/* Content Layer */}
          <motion.div
            style={{ 
              opacity: contentOpacity,
              scale: contentScale
            }}
            className="relative h-full w-full flex flex-col justify-center"
          >
            <div className="container max-w-7xl mx-auto px-10 grid grid-cols-2 gap-20 items-center z-10">

              {/* Left Column: Heading + Service Info */}
              <div className="relative h-[550px] flex flex-col justify-center space-y-12">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Our <span className="text-[#FF6600]">Services</span>
                  </h2>
                  <div className="w-16 h-1 bg-[#4634F8] opacity-50"></div>
                </div>

                <div className="relative h-[320px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-3 text-[#FF6600] text-xl font-bold">
                        <span>{(activeIndex + 1).toString().padStart(2, '0')}</span>
                        <div className="w-10 h-px bg-[#FF6600]/30" />
                        <span className="text-white/20">10</span>
                      </div>

                      <h3 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tighter leading-tight uppercase">
                        {services[activeIndex].title}
                      </h3>

                      <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-md font-light">
                        {activeIndex === 0 || activeIndex === 1 ? (
                          <>
                            {activeIndex === 0 ? "End-to-end event registration solutions with " : "Professional event microsites and corporate landing pages designed with "}
                            <Counter value={15} className="font-bold text-white" />+ years of {activeIndex === 0 ? "experience" : "UI/UX expertise"}. {activeIndex === 0 ? "We handle everything from customized online forms to high-capacity onsite check-ins." : "to convert visitors flawlessly."}
                          </>
                        ) : services[activeIndex].description}
                      </p>

                      <a
                        href={services[activeIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-fit flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-7 py-3.5 rounded-full font-bold text-base transition-all"
                      >
                        Sale Kits
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-[#FF6600]" />
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Image Mockup with Slider */}
              <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
                <AnimatePresence mode="popLayout" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    initial={{ y: direction > 0 ? 300 : -300, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: direction > 0 ? -300 : 300, opacity: 0, scale: 0.95 }}
                    transition={{
                      y: { type: "spring", stiffness: 100, damping: 20 },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.4 }
                    }}
                    className="w-full h-full"
                  >
                    <ServiceImageSlider
                      images={services[activeIndex].images}
                      title={services[activeIndex].title}
                      isActive={true}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Progress Pillar */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-1 h-48 bg-white/5 rounded-full overflow-hidden z-20 pointer-events-none">
                  <motion.div
                    style={{ scaleY: scrollYProgress, originY: 0 }}
                    className="absolute inset-0 w-full bg-gradient-to-b from-[#FF6600] to-[#4634F8] rounded-full"
                  />
                </div>
              </div>

            </div>

            {/* Bottom Dots (Vertical Scroll Progress) */}
            <div className="absolute bottom-10 left-0 w-full flex justify-center gap-2 z-30">
              {services.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? "w-8 bg-[#FF6600] shadow-[0_0_8px_#FF6600]" : "w-3 bg-white/10"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile Fallback with Slider */}
        <div className="lg:hidden block bg-black py-20 px-8 space-y-16">
          <div className="space-y-4 mb-16">
            <h2 className="text-3xl font-black text-white uppercase">Our <span className="text-[#FF6600]">Services</span></h2>
            <div className="w-12 h-1 bg-[#4634F8] opacity-50"></div>
          </div>
          {services.map((s, idx) => (
            <div key={s.id} className="space-y-6">
              <div className="text-[#FF6600] font-bold">{(idx + 1).toString().padStart(2, '0')} / 10</div>
              <div className="relative aspect-video overflow-hidden border border-white/10">
                <ServiceImageSlider images={s.images} title={s.title} isActive={true} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{s.title}</h3>
              <p className="text-white/50 text-base leading-relaxed">{s.description}</p>
              <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FF6600] font-bold text-sm">
                LEARN MORE <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
