"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { ImageData } from "./img-sphere";

// Dynamically import the sphere (it uses refs and pointer events — SSR-unsafe)
const SphereImageGrid = dynamic(() => import("./img-sphere"), { ssr: false });

/* ─── All partner logos fed into the sphere ─── */
const sphereLogos: ImageData[] = [
  { id: "abbott", src: "/partners/Abbott.png", alt: "Abbott" },
  { id: "amata", src: "/partners/AMATA.png", alt: "AMATA" },
  { id: "amazing", src: "/partners/Amazing_Thailand.png", alt: "Amazing Thailand" },
  { id: "blackitch", src: "/partners/Blackitch.png", alt: "Blackitch" },
  { id: "cmu", src: "/partners/CMU.png", alt: "CMU" },
  { id: "cru", src: "/partners/CRU.png", alt: "CRU" },
  { id: "child", src: "/partners/Child_Development_Foundation.png", alt: "Child Dev. Foundation" },
  { id: "delta", src: "/partners/Delta.png", alt: "Delta" },
  { id: "don", src: "/partners/DON_Creative.png", alt: "DON Creative" },
  { id: "iacio", src: "/partners/IACIO.png", alt: "IACIO" },
  { id: "icird", src: "/partners/ICIRD.png", alt: "ICIRD" },
  { id: "idext", src: "/partners/Idext.png", alt: "Idext" },
  { id: "ifeat", src: "/partners/IFEAT.png", alt: "IFEAT" },
  { id: "indeed", src: "/partners/Indeed_Creation.png", alt: "Indeed Creation" },
  { id: "indego", src: "/partners/Indego_Idea.png", alt: "Indego Idea" },
  { id: "kenan", src: "/partners/Kenan.png", alt: "Kenan" },
  { id: "kx", src: "/partners/KX.png", alt: "KX" },
  { id: "medcmu", src: "/partners/MedCMU.png", alt: "MedCMU" },
  { id: "menarini", src: "/partners/Menarini.png", alt: "Menarini" },
  { id: "meta", src: "/partners/Meta.png", alt: "Meta" },
  { id: "mice", src: "/partners/MICE_Youth_Challenge.png", alt: "MICE Youth Challenge" },
  { id: "mims", src: "/partners/MIMS.png", alt: "MIMS" },
  { id: "moph", src: "/partners/MOPH.png", alt: "MOPH" },
  { id: "motorexpo", src: "/partners/Motor_Expo.png", alt: "Motor Expo" },
  { id: "msdhs", src: "/partners/MSDHS.png", alt: "MSDHS" },
  { id: "otsuka", src: "/partners/Otsuka.png", alt: "Otsuka" },
  { id: "pata", src: "/partners/PATA.png", alt: "PATA" },
  { id: "proflex", src: "/partners/Proflex.png", alt: "Proflex" },
  { id: "sake", src: "/partners/Sake_Merchant.png", alt: "Sake Merchant" },
  { id: "site", src: "/partners/Site_Thailand.png", alt: "Site Thailand" },
  { id: "swire", src: "/partners/Swire_Coca_Cola.png", alt: "Swire Coca-Cola" },
  { id: "tat", src: "/partners/TAT.png", alt: "TAT" },
  { id: "tceb", src: "/partners/TCEB.png", alt: "TCEB" },
  { id: "tea", src: "/partners/TEA.png", alt: "TEA" },
  { id: "techsauce", src: "/partners/TechSauce.png", alt: "TechSauce" },
  { id: "thaiod", src: "/partners/Thai_IOD.png", alt: "Thai IOD" },
  { id: "norwegian", src: "/partners/Thai_Norwegian_Chamber.png", alt: "Thai-Norwegian Chamber" },
  { id: "thammasat", src: "/partners/Thammasat_University.png", alt: "Thammasat University" },
  { id: "tica", src: "/partners/TICA.png", alt: "TICA" },
  { id: "vnu", src: "/partners/vnu.png", alt: "VNU Exhibitions" },
  { id: "wrg", src: "/partners/WRG.png", alt: "WRG" },
  { id: "yindee", src: "/partners/Yindee.png", alt: "Yindee" },
  { id: "dbp", src: "/partners/DBP.png", alt: "DBP" },
  { id: "swire2", src: "/partners/SWIRE.png", alt: "SWIRE" },
  { id: "inorway", src: "/partners/iNorway.png", alt: "iNorway" },
];

/* ─── Main Section ─── */
export default function IntegrationsSection() {
  return (
    <section
      id="partners-section"
      className="w-full relative overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* ── Noise texture overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Subtle radial glow behind sphere ── */}
      <div
        className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.04) 0%, rgba(59,130,246,0.02) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Inner content ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          {/* ═══ LEFT COLUMN — Text ═══ */}
          <div className="text-center lg:text-left">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-violet-300/90">
                Trusted Partners
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white tracking-tight leading-[1.1] mb-6"
            >
              Powering <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                hundreds
              </span>{" "}
              of events
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 mb-10"
            >
              Connect to the largest ecosystem of event technology partners. We
              collaborate with leading brands, government agencies, and
              international organizations.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center lg:justify-start"
            >
              <button
                className="group relative px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                style={{
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #3B82F6 100%)",
                }}
              >
                <span className="relative z-10">View all integrations</span>
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: "0 0 40px rgba(139,92,246,0.4)" }}
                />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  500+
                </div>
                <div className="text-xs text-white/30 uppercase tracking-wider mt-1">
                  Events
                </div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  60+
                </div>
                <div className="text-xs text-white/30 uppercase tracking-wider mt-1">
                  Partners
                </div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  10+
                </div>
                <div className="text-xs text-white/30 uppercase tracking-wider mt-1">
                  Countries
                </div>
              </div>
            </motion.div>
          </div>

          {/* ═══ RIGHT COLUMN — 3D Logo Sphere ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <SphereImageGrid
              images={sphereLogos}
              containerSize={560}
              sphereRadius={240}
              autoRotate={true}
              autoRotateSpeed={0.2}
              dragSensitivity={0.4}
            />
          </motion.div>
        </div>
      </div>

      {/* ═══ IN2IT STYLE — Top Glowing Purple Border ═══ */}
      <div className="absolute top-0 left-0 w-full h-[2px] z-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[2px] shadow-[0_0_15px_rgba(168,85,247,0.6),0_0_30px_rgba(168,85,247,0.3)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40px] bg-purple-500/15 blur-[25px] rounded-full pointer-events-none" />
      </div>

      {/* ═══ IN2IT STYLE — Bottom Glowing Purple Border ═══ */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] z-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[2px] shadow-[0_0_15px_rgba(168,85,247,0.6),0_0_30px_rgba(168,85,247,0.3)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40px] bg-purple-500/15 blur-[25px] rounded-full pointer-events-none" />
      </div>

      {/* ═══ IN2IT STYLE — Side Accent Glows ═══ */}
      <div className="absolute top-0 left-0 w-[2px] h-full z-30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-[2px] h-full z-30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />
      </div>

      {/* Corner glow accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-600/5 blur-[40px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-[40px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/5 blur-[40px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-600/5 blur-[40px] rounded-full pointer-events-none z-0" />
    </section>
  );
}
