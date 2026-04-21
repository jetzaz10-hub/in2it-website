"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const services = [
  {
    id: "registration",
    label: "Registration System",
    heading: "Registration System",
    description:
      "End-to-end event registration solutions with 15+ years of experience. We handle everything from customized online forms to high-capacity onsite check-ins for 2,000+ attendees.",
    tags: ["Custom Forms", "Onsite Check-in", "2,000+ Capacity"],
    images: [
      "/services/regis/regis1.jpg",
      "/services/regis/regis2.jpg",
      "/services/regis/regis3.jpg",
    ],
    cta: "See Details",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#6"
  },
  {
    id: "website",
    label: "Website Design",
    heading: "Event Website Design",
    description:
      "Professional event microsites and corporate landing pages designed with 15+ years of UI/UX expertise to convert visitors into participants flawlessly.",
    tags: ["15+ Years Exp", "Tailored UI/UX", "Mobile Optimized"],
    images: [
      "/services/web/web1.jpg",
    ],
    cta: "See Details",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#13"
  },
  {
    id: "edm",
    label: "EDM",
    heading: "EDM & Email Marketing",
    description:
      "Professional electronic direct mail campaigns designed to drive registrations, boost attendance, and keep participants engaged before and after events.",
    tags: ["HTML Email", "Automation", "Analytics"],
    images: [
      "/services/edm/edm1.jpg",
      "/services/edm/edm2.jpg",
    ],
    cta: "See Details",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#24"
  },
  {
    id: "ticket",
    label: "Ticket Event",
    heading: "Ticket Event System",
    description:
      "End-to-end ticketing platform with QR code entry, mobile scanning, real-time capacity tracking and instant reporting dashboards.",
    tags: ["QR Entry", "Mobile App", "Real-time Reports"],
    images: [
      "/services/ticket/ticket1.jpg",
      "/services/ticket/ticket2.jpg",
      "/services/ticket/ticket3.jpg",
    ],
    cta: "See Details",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#29"
  },
  {
    id: "festival",
    label: "Festival Technology",
    heading: "Festival Technology",
    description:
      "Robust infrastructure for large-scale festivals: cashless payments, RFID wristbands, crowd management, and live dashboards for operators.",
    tags: ["RFID", "Cashless", "Crowd Management"],
    images: [
      "/services/fest/fes1.jpg",
    ],
    cta: "See Details",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#30"
  },
  {
    id: "iot",
    label: "IOT & Hardware Design",
    heading: "IOT & Hardware Design",
    description:
      "Specially engineered hardware for the MICE industry: RFID systems, check-in kiosks, and IOT integrations for seamless event onsite management.",
    tags: ["RFID Specialists", "Kiosks", "IOT Event Hub"],
    images: [
      "/services/iot/iot1.jpg",
      "/services/iot/iot3.jpg",
    ],
    cta: "See Details",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#45"
  },
  {
    id: "organizer",
    label: "Event Organizer",
    heading: "Event Organizer",
    description:
      "Full-service event management from concept to post-event wrap-up, including logistics, vendor management and on-site coordination.",
    tags: ["Full-service", "Logistics", "On-site Team"],
    images: [
      "/services/org/org1.jpg",
      "/services/org/org2.jpg",
      "/services/org/org3.jpg",
    ],
    cta: "See Details",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#31"
  },
  {
    id: "graphic",
    label: "Graphic Design",
    heading: "Graphic Design",
    description:
      "Visually stunning event branding — from logo and print materials to digital assets and stage backdrops tailored to every event.",
    tags: ["Branding", "Print", "Digital Assets"],
    images: [
      "/services/org/org1.jpg",
      "/services/org/org2.jpg",
      "/services/org/org3.jpg",
    ],
    cta: "See Details",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#55"
  },
  {
    id: "scm",
    label: "Social Media Tools for Event",
    heading: "Social Media Tools for Event",
    description:
      "We can use social media tools to help improve your marketing campaign — Line OA, Facebook, Instagram, live photo walls and more.",
    tags: ["Line OA", "Facebook", "Instagram"],
    images: [
      "/services/scm/scm1.jpg",
    ],
    cta: "See Details",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#56"
  },
  {
    id: "streaming",
    label: "Live Streaming Service",
    heading: "Live Streaming Service",
    description:
      "Professional multi-camera live production with encoding, streaming to YouTube/Facebook, and full recording for post-event replay.",
    tags: ["Multi-camera", "YouTube", "Recording"],
    images: [
      "/services/org/org3.jpg",
    ],
    cta: "See Details",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#57"
  },
];

export default function OurServices() {
  const [activeId, setActiveId] = useState(services[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [highlighter, setHighlighter] = useState({ top: 0, height: 0, opacity: 0 });
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const trackRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* ── Continuous Scroll Observer for Desktop ── */
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024 || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Calculate tracking bounds matching css dimensions (80vh padding)
      const startTrackingY = rect.top + (0.8 * vh);
      const endTrackingY = rect.bottom - (0.8 * vh);

      const pxScrolled = (vh / 2) - startTrackingY;
      const totalScrollable = endTrackingY - startTrackingY;

      if (totalScrollable <= 0) return;

      let ratio = pxScrolled / totalScrollable;
      ratio = Math.max(0, Math.min(1, ratio));

      const continuousProgress = ratio * (services.length - 1);
      setScrollProgress(continuousProgress);
      setActiveId(services[Math.round(continuousProgress)].id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Click nav item → jump precisely ── */
  const scrollToService = (id: string) => {
    const isDesktopScreen = window.innerWidth >= 1024;
    const el = sectionRefs.current[`${id}-${isDesktopScreen ? 'desktop' : 'mobile'}`];

    if (isDesktopScreen && trackRef.current) {
      const idx = services.findIndex(s => s.id === id);
      if (idx !== -1) {
        const rect = trackRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const trackTopAbsolute = window.scrollY + rect.top;
        const startTrackingY = trackTopAbsolute + (0.8 * vh);
        const endTrackingY = trackTopAbsolute + rect.height - (0.8 * vh);
        const totalScrollable = endTrackingY - startTrackingY;

        const ratio = idx / (services.length - 1);
        const targetPxScrolled = ratio * totalScrollable;

        // Mathematically mapped back from pxScrolled = (vh / 2) - startTrackingY relative to viewport
        const targetScrollY = targetPxScrolled + trackTopAbsolute + (0.3 * vh);

        // Use instant snap so the CSS transition handles the visual slide perfectly
        window.scrollTo({ top: targetScrollY, behavior: "auto" });
        return;
      }
    }

    if (el) {
      if (!isDesktopScreen) {
        // Sticky nav is around 80px, give it 120px clearance
        const targetTop = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      } else {
        el.scrollIntoView({ block: "center" });
      }
    }
  };

  /* ── Listen for Top Navbar jumps ── */
  useEffect(() => {
    const handleNavJump = (e: Event) => {
      const customEvent = e as CustomEvent;
      const targetId = customEvent.detail?.targetId;
      if (targetId && services.some(s => s.id === targetId)) {
        scrollToService(targetId);
      }
    };
    window.addEventListener("nav-jump", handleNavJump);
    return () => window.removeEventListener("nav-jump", handleNavJump);
  }, []);

  /* ── Intersection Observer for Mobile only ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.innerWidth < 1024) {
            setActiveId((entry.target as HTMLElement).dataset.id!);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    services.forEach((service) => {
      const elMobile = sectionRefs.current[`${service.id}-mobile`];
      if (elMobile) obs.observe(elMobile);
    });

    return () => obs.disconnect();
  }, []);

  /* ── Scroll nav pill into view when active changes ── */
  useEffect(() => {
    const navEl = navRef.current;
    if (navEl) {
      const activeBtn = navEl.querySelector(`[data-id="${activeId}"]`) as HTMLElement | null;
      if (activeBtn) {
        if (window.innerWidth >= 1024) {
          const targetScrollTop = activeBtn.offsetTop - navEl.clientHeight / 2 + activeBtn.clientHeight / 2;
          navEl.scrollTo({ top: targetScrollTop, behavior: "smooth" });
        }
        setHighlighter({
          top: activeBtn.offsetTop,
          height: activeBtn.offsetHeight,
          opacity: 1
        });
      }
    }
  }, [activeId]);

  return (
    <section id="services" className="py-16 bg-black">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Heading */}
        <div className="text-left mb-10">
          <h2 className="section-heading-xl text-white">Our
            <span style={{ color: "#4A32FF" }}> SERVICES</span>
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-2xl">
            Precision tools for modern events. We offer a full spectrum of
            technological solutions.
          </p>
        </div>

        <div ref={trackRef} className="flex flex-col lg:flex-row gap-10 items-start relative lg:pb-0 lg:h-[550vh]">
          {/* ── Virtual Scroll Track for Desktop ── */}
          <div className="hidden lg:flex absolute top-0 right-0 w-10 h-full flex-col pointer-events-none z-0 pt-[80vh] pb-[80vh]">
            {services.map((s) => (
              <div
                key={s.id}
                ref={(el) => { sectionRefs.current[`${s.id}-desktop`] = el; }}
                data-id={s.id}
                data-desktop="true"
                className="flex-1"
              />
            ))}
          </div>

          {/* ── Left compact sticky nav ── */}
          <div className="hidden lg:block w-[260px] shrink-0 sticky top-28 self-start z-20">
            <div
              ref={navRef}
              className="flex flex-col gap-0.5 max-h-[70vh] overflow-y-auto pr-1 scrollbar-hide relative"
            >
              {/* Magic Highlighter Box */}
              <div
                className="absolute left-0 w-full transition-all duration-300 ease-in-out pointer-events-none rounded-xl bg-[#4A32FF]/8 border-l-[3px] border-[#4A32FF] z-0"
                style={{
                  top: `${highlighter.top}px`,
                  height: `${highlighter.height}px`,
                  opacity: highlighter.opacity,
                }}
              />

              {services.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <button
                    key={s.id}
                    data-id={s.id}
                    onClick={() => scrollToService(s.id)}
                    className={`
                      group text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative z-10
                      ${isActive
                        ? "text-[#4A32FF]"
                        : "text-white/40 hover:text-white/70 hover:bg-white/3"
                      }
                    `}
                  >
                    {isActive && (
                      <svg className="w-2.5 h-2.5 text-[#4A32FF] shrink-0" viewBox="0 0 10 10" fill="currentColor">
                        <polygon points="0,0 10,5 0,10" />
                      </svg>
                    )}
                    <span className={isActive ? "" : "pl-[14px]"}>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right sticky viewing area ── */}
          <div className="flex-1 flex flex-col lg:block lg:sticky lg:top-32 w-full lg:h-[600px] gap-12 lg:gap-0 relative lg:overflow-hidden lg:rounded-[2rem]">
            {services.map((service, idx) => {
              const activeIdx = services.findIndex(s => s.id === activeId);
              const isActive = activeIdx === idx;

              const diff = scrollProgress - activeIdx;

              let dy = 0;
              if (isActive) {
                // Gentle scroll-linked movement (parallax) before snapping
                dy = -diff * 40;
              } else if (idx < activeIdx) {
                dy = -100;
              } else {
                dy = 100;
              }

              return (
                <div
                  key={service.id}
                  ref={(el) => { sectionRefs.current[`${service.id}-mobile`] = el; }}
                  data-id={service.id}
                  style={{ "--dy": `${dy}%` } as React.CSSProperties}
                  className={`
                    lg:absolute lg:inset-0 lg:transition-transform lg:duration-[1000ms] lg:ease-[cubic-bezier(0.16,1,0.3,1)]
                    lg:[transform:translateY(var(--dy))]
                    ${isActive ? "lg:pointer-events-auto lg:z-10" : "lg:pointer-events-none lg:z-0"}
                  `}
                >
                  <ServiceBlock
                    service={service}
                    isActive={isActive}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Individual service block ── */
import { forwardRef } from "react";

const ServiceBlock = forwardRef<
  HTMLDivElement,
  { service: (typeof services)[0]; isActive: boolean }
>(function ServiceBlock({ service, isActive }, ref) {
  const [imgIdx, setImgIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setImgIdx((prev) => (prev + 1) % service.images.length);
  const prev = () => setImgIdx((prev) => (prev - 1 + service.images.length) % service.images.length);

  const resetAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 4500);
  };

  useEffect(() => {
    if (!isActive) {
      if (autoRef.current) clearInterval(autoRef.current);
      return;
    }
    resetAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, imgIdx, service.images.length]);

  const handleDragStart = (x: number) => {
    setDragging(true);
    setDragStart(x);
    setDragOffset(0);
    if (autoRef.current) clearInterval(autoRef.current);
  };

  const handleDragMove = (x: number) => {
    if (!dragging) return;
    setDragOffset(x - dragStart);
  };

  const handleDragEnd = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragOffset < -50) { next(); resetAuto(); }
    else if (dragOffset > 50) { prev(); resetAuto(); }
    setDragOffset(0);
  };

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-6 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40"}`}
    >
      {/* Image carousel */}
      <div 
        className="relative rounded-3xl overflow-hidden h-[320px] group bg-[#080808] select-none cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div 
          className="flex w-full h-full transition-transform ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ 
            transform: `translateX(calc(-${imgIdx * 100}% + ${dragging ? dragOffset : 0}px))`,
            transitionDuration: dragging ? '0ms' : '600ms'
          }}
        >
          {service.images.map((img, i) => (
            <div key={`${service.id}-${i}`} className="relative min-w-full h-full">
              <Image
                src={img}
                alt={service.heading}
                fill
                draggable={false}
                className="object-cover pointer-events-none"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
        {/* Shadow overlay logic (if needed) */}
        {/* Arrow Left (Mobile hidden, only visible on desktop hover) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
            resetAuto();
          }}
          className="absolute z-20 left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm hidden md:flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </button>
        {/* Arrow Right (Mobile hidden, only visible on desktop hover) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
            resetAuto();
          }}
          className="absolute z-20 right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </button>
        {/* Dots */}
        <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {service.images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setImgIdx(i);
                resetAuto();
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === imgIdx ? "bg-white w-5" : "bg-white/40 w-1.5"}`}
            />
          ))}
        </div>
      </div>

      {/* Text */}
      <div>
        <h3 className="text-white text-2xl font-bold mb-3">{service.heading}</h3>
        <p className="text-white/60 leading-relaxed mb-5 max-w-xl">{service.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-white/60 bg-white/5 border border-white/10 rounded-full px-4 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={service.link || "#contact"}
          target={service.link ? "_blank" : undefined}
          rel={service.link ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-full text-white transition-all hover:opacity-90 hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #FF6600 0%, #ff8533 100%)" }}
        >
          {service.cta}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      {/* Subtle divider */}
      <div className="h-px bg-white/5" />
    </div>
  );
});
