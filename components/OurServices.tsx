"use client";

import { useRef, useState, useEffect, forwardRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { smoothScrollTo } from "../lib/smoothScroll";
import { 
  ArrowRight, 
  ClipboardCheck, 
  Globe, 
  Mail, 
  Ticket, 
  Tent, 
  Cpu, 
  CalendarDays, 
  PenTool, 
  Share2, 
  Video 
} from "lucide-react";

const services = [
  {
    id: "registration",
    title: "Registration System",
    description: "End-to-end event registration solutions. We handle everything from customized online forms to high-capacity onsite check-ins.",
    images: ["/services/regis/regis.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#6",
    icon: ClipboardCheck
  },
  {
    id: "website",
    title: "Website Design",
    description: "Professional event microsites and corporate landing pages designed to convert visitors flawlessly.",
    images: ["/services/web/web.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#13",
    icon: Globe
  },
  {
    id: "edm",
    title: "EDM Solution",
    description: "Professional electronic direct mail campaigns designed to drive registrations, boost attendance, and keep participants engaged.",
    images: ["/services/edm/edm_celebrate.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#24",
    icon: Mail
  },
  {
    id: "ticket",
    title: "Ticket Event",
    description: "Secure and scalable ticketing infrastructure with QR code entry, mobile scanning, and real-time reporting dashboards.",
    images: ["/services/ticket/ticket-event.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#29",
    icon: Ticket
  },
  {
    id: "festival",
    title: "Festival Tech",
    description: "Robust infrastructure for large-scale festivals: cashless payments, RFID wristbands, and live crowd management dashboards.",
    images: ["/services/fest/fest.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#30",
    icon: Tent
  },
  {
    id: "iot",
    title: "IOT & Hardware",
    description: "Specially engineered hardware for the MICE industry: RFID systems, check-in kiosks, and IOT integrations for seamless management.",
    images: ["/services/iot/iotscan.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#45",
    icon: Cpu
  },
  {
    id: "organizer",
    title: "Event Organizer",
    description: "Full-service event management from concept to wrap-up, including logistics, vendor management and on-site coordination.",
    images: ["/services/org/eventorganics.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#31",
    icon: CalendarDays
  },
  {
    id: "graphic",
    title: "Graphic Design",
    description: "Visually stunning event branding — from logo and print materials to digital assets and stage backdrops.",
    images: ["/services/graph/graph.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#55",
    icon: PenTool
  },
  {
    id: "scm",
    title: "Social Tools",
    description: "Boost engagement with interactive social media integrations — Line OA, Facebook, Instagram, and live photo walls.",
    images: ["/services/scm/socialinsta.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#56",
    icon: Share2
  },
  {
    id: "streaming",
    title: "Live Streaming",
    description: "Professional multi-camera live production with encoding and high-fidelity streaming to multiple global platforms.",
    images: ["/services/stream/live-stream.png"],
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#57",
    icon: Video
  }
];

// Animation variants for the image slider to prevent glitching on rapid scrolls
const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95
  })
};

// --- Internal Image Component ---
const ServiceImageSlider = ({ images, title, isActive }: { images: string[], title: string, isActive: boolean }) => {
  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 92%, transparent 100%)',
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover pointer-events-none brightness-[1.1]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={isActive}
          draggable={false}
        />
      </div>

      {/* Subtle depth overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/20" />
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map scroll to index (0 to 9) - 550vh track
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.floor(latest * (1 / 0.9) * services.length);
    const clampedIndex = Math.min(services.length - 1, Math.max(0, index));
    if (clampedIndex !== activeIndex) {
      const dir = clampedIndex > activeIndex ? 1 : -1;
      setActiveStep([clampedIndex, dir]);
    }
  });

  // Handle nav-jump event from Navbar/Footer
  useEffect(() => {
    const handleJump = (e: any) => {
      const targetId = e.detail?.targetId;
      const index = services.findIndex(s => s.id === targetId);

      if (index !== -1 && containerRef.current) {
        // Direct scroll to the exact position within the 550vh track.
        // getBoundingClientRect().top + scrollY always gives correct absolute position.
        const sectionTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollRange = sectionHeight - viewportHeight;
        
        // scrollYProgress mapping: index = floor(progress * (1/0.9) * 10)
        // Center of index i: progress = (i + 0.5) * 0.9 / 10
        const targetProgress = (index + 0.5) * 0.9 / services.length;
        const targetScrollY = sectionTop + (targetProgress * scrollRange);

        smoothScrollTo(targetScrollY);
      }
    };

    window.addEventListener('nav-jump', handleJump);
    return () => window.removeEventListener('nav-jump', handleJump);
  }, []);
 // Remove dependency on activeIndex

  // Section fade out with scale at the very end
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.97]);


  return (
    <section
      id="services"
      ref={containerRef}
      className="relative h-[550vh] pt-0 z-10"
    >
      {/* The main black background */}
      <div className="absolute inset-0 bg-black shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-[-1]" />
      
      {/* ═══ IN2IT STYLE — Top Glowing Orange Border Divider ═══ */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF6600] to-transparent h-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F97316] to-transparent h-[2px] shadow-[0_0_15px_rgba(255,102,0,0.6),0_0_30px_rgba(255,102,0,0.3)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40px] bg-[#FF6600]/15 blur-[25px] rounded-full pointer-events-none" />
      </div>
      <div className="w-full h-full">
        {/* Sticky Viewport (Responsive) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden block">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              onCanPlay={(e) => { e.currentTarget.playbackRate = 0.6; }}
              className="w-full h-full object-cover opacity-30 will-change-transform"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4" type="video/mp4" />
            </video>
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/28" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
          </div>

          {/* Content Layer */}
          <motion.div
            style={{
              opacity: contentOpacity,
              scale: contentScale
            }}
            className="relative h-full w-full flex flex-col justify-center"
          >
            <div className="container max-w-7xl mx-auto px-6 lg:px-10 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4 lg:gap-20 items-center justify-center z-10 h-full pb-8 lg:pb-0 pt-24 lg:pt-0">

              {/* Left Column: Heading + Service Info */}
              <div className="relative h-[280px] lg:h-[550px] w-full flex flex-col justify-center overflow-hidden lg:overflow-visible">
                
                {/* Dynamic "Our Services" Main Title */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    y: activeIndex === 0 ? (isMobile ? -140 : -300) : (isMobile ? -220 : -400), 
                    opacity: activeIndex === 0 ? 1 : 0,
                    filter: `blur(${activeIndex === 0 ? 0 : 8}px)`,
                    scale: activeIndex === 0 ? 1 : 0.8
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="absolute top-1/2 left-0 w-full space-y-4 z-20 origin-left"
                >
                  <h2 className="text-2xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-tight">
                    Our <span className="text-[#FF6600]">Services</span>
                  </h2>
                  <div className="w-8 lg:w-16 h-1 bg-[#4634F8] opacity-50 mt-1 lg:mt-0"></div>
                </motion.div>

                {/* Services Coverflow List */}
                {services.map((service, idx) => {
                  const distance = idx - activeIndex;

                  let y = activeIndex === 0 ? (isMobile ? 0 : -100) : (isMobile ? -50 : -140);
                  
                  let scale = 1;
                  let opacity = 1;
                  let pointerEvents = "auto" as any;

                  if (distance === -1) {
                    y = isMobile ? -160 : -220; // Replaces "Our Services"
                    scale = 0.55;
                    opacity = 0.25;
                    pointerEvents = "none";
                  } else if (distance === 1) {
                    y = isMobile ? 80 : 180; // Faint next
                    scale = 0.55;
                    opacity = 0.25;
                    pointerEvents = "none";
                  } else if (distance < -1) {
                    y = isMobile ? -220 : -350; // Animate out top
                    scale = 0.4;
                    opacity = 0;
                    pointerEvents = "none";
                  } else if (distance > 1) {
                    y = isMobile ? 180 : 350; // Animate out bottom
                    scale = 0.4;
                    opacity = 0;
                    pointerEvents = "none";
                  }

                  return (
                    <motion.div
                      key={service.id}
                      initial={false}
                      animate={{ y, scale, opacity }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      className="absolute top-1/2 left-0 w-full"
                      style={{ originX: 0, originY: 0, pointerEvents, willChange: "transform, opacity" }}
                    >
                      <h3 className="text-[18px] lg:text-[40px] font-bold text-white tracking-tighter leading-tight uppercase mb-1.5 lg:mb-6 drop-shadow-md flex items-center gap-2 lg:gap-4">
                        <service.icon className="w-5 h-5 lg:w-10 lg:h-10 text-[#FF6600]" />
                        {service.title}
                      </h3>

                      <motion.div 
                        initial={false}
                        animate={{ 
                          opacity: distance === 0 ? 1 : 0,
                          height: distance === 0 ? 'auto' : 0,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-[12px] lg:text-xl text-white/80 leading-relaxed max-w-md font-light mb-3 lg:mb-8 line-clamp-3 lg:line-clamp-none">
                          {service.description}
                        </p>

                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-sale-kit group w-fit font-bold !py-1.5 !px-3 lg:!py-3 lg:!px-7 !text-[10px] lg:!text-[16px]"
                        >
                          <span>Sale Kits</span>
                          <ArrowRight className="w-3 h-3 lg:w-5 lg:h-5 group-hover:translate-x-1 lg:group-hover:translate-x-2 transition-transform text-white" />
                        </a>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Column: Image Mockup with Slider & Progress Tubes */}
              <div className="relative w-full flex items-center justify-center">
                
                {/* Left Tube */}
                <div className="absolute -left-6 top-10 bottom-10 w-[2px] bg-white/10 rounded-full overflow-hidden hidden xl:block">
                  <motion.div 
                    className="w-full h-full bg-gradient-to-b from-[#4634F8] via-[#FF3366] to-[#FF6600] shadow-[0_0_15px_#FF6600]"
                    style={{ scaleY: scrollYProgress, originY: 0 }}
                  />
                </div>

                <div className="relative w-[80%] max-w-[320px] lg:max-w-none lg:w-full aspect-[4/3] lg:aspect-[4/5] overflow-hidden bg-transparent rounded-2xl lg:rounded-3xl shadow-2xl border border-white/5">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        y: { type: "spring", stiffness: 100, damping: 20 },
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.4 }
                      }}
                      className="w-full h-full absolute inset-0"
                      style={{ willChange: "transform, opacity" }}
                    >
                      <ServiceImageSlider
                        images={services[activeIndex].images}
                        title={services[activeIndex].title}
                        isActive={true}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Tube */}
                <div className="absolute -right-6 top-10 bottom-10 w-[2px] bg-white/10 rounded-full overflow-hidden hidden xl:block">
                  <motion.div 
                    className="w-full h-full bg-gradient-to-b from-[#4634F8] via-[#FF3366] to-[#FF6600] shadow-[0_0_15px_#FF6600]"
                    style={{ scaleY: scrollYProgress, originY: 0 }}
                  />
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
