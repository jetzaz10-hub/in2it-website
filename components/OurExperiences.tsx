"use client";

import { motion } from "framer-motion";
import { ZoomParallax } from "./ui/zoom-parallax";

export default function OurExperiences() {
  // Zoom parallax items: center (index 0) = video with frame, surrounding = service images
  const parallaxItems = [
    {
      src: "/videos/beyond_the_elephant.mov",
      alt: "IN2IT Beyond the Elephant",
      type: "video" as const,
    },
    {
      src: "/services/regis/regis.png",
      alt: "Registration System",
    },
    {
      src: "/services/web/web.png",
      alt: "Website Design",
    },
    {
      src: "/services/edm/edm_celebrate.png",
      alt: "EDM Solution",
    },
    {
      src: "/services/ticket/ticket-event.png",
      alt: "Ticket Event",
    },
    {
      src: "/services/fest/fest.png",
      alt: "Festival Tech",
    },
    {
      src: "/services/iot/iot.png",
      alt: "IOT & Hardware",
    },
  ];

  return (
    <section id="experiences" className="bg-black overflow-hidden relative">
      {/* ── Zoom Parallax Section ── */}
      <div className="relative">
        {/* Heading overlaid on top of parallax */}
        <div className="sticky top-0 z-30 pointer-events-none pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              Our <span className="text-[#F97316]">Experiences</span>
            </h2>
            <p className="mt-4 text-white/50 text-base md:text-lg max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              We partner with corporate, government, and international organizations
              <br />
              supporting events up to <span className="text-white font-bold">100,000+</span> participants.
            </p>
          </motion.div>
        </div>

        <ZoomParallax items={parallaxItems} />
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center mt-12 mb-20 relative z-20">
        <a
          href="https://www.canva.com/design/DAG9n3Xa6_Y/XvXea3m4LcLRZkM4ozQWkg/view#1"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-white text-base tracking-tight transition-all hover:scale-[1.05]"
        >
          {/* Glossy Button Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6600] to-[#FF9900] rounded-full shadow-[0_0_30px_rgba(255,102,0,0.3)] transition-all group-hover:shadow-[0_0_50px_rgba(255,102,0,0.5)]" />

          <span className="relative z-10">VIEW FULL PORTFOLIO</span>
          <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      {/* Bottom Purple Glow Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] z-20">
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-full h-[120px] bg-purple-600/25 blur-[70px] rounded-[100%] pointer-events-none" />
      </div>
    </section>
  );
}
