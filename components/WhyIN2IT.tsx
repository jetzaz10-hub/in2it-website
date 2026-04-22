"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "One-Stop",
    subtitle: "Provider",
    description: "Everything from registration to staging under one roof.",
    bgColor: "bg-[#4A32FF]", // Brand Blue
    textColor: "text-white",
    borderColor: "border-[#4A32FF]",
    icon: (
      <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 48c0-10 8-18 18-18s18 8 18 18-8 18-18 18S16 58 16 48z"/>
        <path d="M80 48c0-10-8-18-18-18S44 38 44 48s8 18 18 18 18-8 18-18z"/>
        <line x1="34" y1="41" x2="44" y2="48"/>
        <line x1="44" y1="48" x2="34" y2="55"/>
        <line x1="62" y1="41" x2="52" y2="48"/>
        <line x1="52" y1="48" x2="62" y2="55"/>
      </svg>
    ),
  },
  {
    title: "Tech",
    subtitle: "Expertise",
    description: "Deep technical knowledge matched with operational experience.",
    bgColor: "bg-[#F97316]", // Brand Orange
    textColor: "text-white",
    borderColor: "border-[#F97316]",
    icon: (
      <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="28" y="28" width="40" height="40" rx="6"/>
        <rect x="37" y="37" width="22" height="22" rx="3"/>
        <line x1="16" y1="38" x2="28" y2="38"/><line x1="16" y1="48" x2="28" y2="48"/><line x1="16" y1="58" x2="28" y2="58"/>
        <line x1="68" y1="38" x2="80" y2="38"/><line x1="68" y1="48" x2="80" y2="48"/><line x1="68" y1="58" x2="80" y2="58"/>
        <line x1="38" y1="16" x2="38" y2="28"/><line x1="48" y1="16" x2="48" y2="28"/><line x1="58" y1="16" x2="58" y2="28"/>
        <line x1="38" y1="68" x2="38" y2="80"/><line x1="48" y1="68" x2="48" y2="80"/><line x1="58" y1="68" x2="58" y2="80"/>
      </svg>
    ),
  },
  {
    title: "Scalable",
    subtitle: "Solutions",
    description: "From intimate corporate workshops to large-scale festivals.",
    bgColor: "bg-[#00A6CB]", // Brand Cyan
    textColor: "text-white",
    borderColor: "border-[#00A6CB]",
    icon: (
      <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="16" y1="16" x2="16" y2="76"/>
        <line x1="16" y1="76" x2="82" y2="76"/>
        <polyline points="24,64 40,50 55,55 72,28"/>
        <polyline points="62,22 72,28 66,37"/>
      </svg>
    ),
  },
  {
    title: "Integrated",
    subtitle: "Systems",
    description: "Unified data flow between registration, social, and CRM.",
    bgColor: "bg-[#7C30C2]", // Purple
    textColor: "text-white",
    borderColor: "border-[#7C30C2]",
    icon: (
      <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="36" y="10" width="24" height="16" rx="4"/>
        <rect x="10" y="58" width="22" height="16" rx="4"/>
        <rect x="64" y="58" width="22" height="16" rx="4"/>
        <rect x="37" y="58" width="22" height="16" rx="4"/>
        <line x1="48" y1="26" x2="48" y2="42"/>
        <line x1="48" y1="42" x2="21" y2="58"/>
        <line x1="48" y1="42" x2="48" y2="58"/>
        <line x1="48" y1="42" x2="75" y2="58"/>
      </svg>
    ),
  },
  {
    title: "Custom",
    subtitle: "Tailored",
    description: "Solutions engineered to match your specific event goals.",
    bgColor: "bg-[#FF3366]", // Pink
    textColor: "text-white",
    borderColor: "border-[#FF3366]",
    icon: (
      <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="14" y1="28" x2="82" y2="28"/>
        <circle cx="32" cy="28" r="8" fill="currentColor" fillOpacity="0.2"/>
        <line x1="14" y1="48" x2="82" y2="48"/>
        <circle cx="60" cy="48" r="8" fill="currentColor" fillOpacity="0.2"/>
        <line x1="14" y1="68" x2="82" y2="68"/>
        <circle cx="40" cy="68" r="8" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
  },
];

export default function WhyIN2IT() {
  return (
    <section className="relative pt-12 pb-16 bg-black overflow-hidden">
      {/* Subtle Smoke-like Moving Gradient Background */}
      <style>{`
        @keyframes whySmokeMove {
          0% { transform: translate(-100%, 0%) skewX(-15deg) scale(1); opacity: 0; }
          25% { transform: translate(-50%, -5%) skewX(-10deg) scale(1.1); opacity: 0.05; }
          50% { transform: translate(0%, 5%) skewX(-15deg) scale(1); opacity: 0.08; }
          75% { transform: translate(50%, -5%) skewX(-10deg) scale(1.1); opacity: 0.05; }
          100% { transform: translate(100%, 0%) skewX(-15deg) scale(1); opacity: 0; }
        }
        .why-smoke-wisp {
          position: absolute;
          height: 140%;
          width: 100%;
          filter: blur(160px);
          z-index: 0;
          pointer-events: none;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Smoke Layers */}
      <div className="why-smoke-wisp top-[-20%] left-0"
        style={{
          background: 'linear-gradient(90deg, transparent, #4A32FF, transparent)',
          animation: 'whySmokeMove 60s ease-in-out infinite'
        }} />
      <div className="why-smoke-wisp top-[-20%] left-0"
        style={{
          background: 'linear-gradient(90deg, transparent, #FF3366, transparent)',
          animation: 'whySmokeMove 45s ease-in-out infinite',
          animationDelay: '-15s'
        }} />
      <div className="why-smoke-wisp top-[-20%] left-0"
        style={{
          background: 'linear-gradient(90deg, transparent, #00A6CB, transparent)',
          animation: 'whySmokeMove 80s ease-in-out infinite',
          animationDelay: '-30s'
        }} />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8"
      >
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="text-center mb-10"
        >
          <h2 className="section-heading-xl text-white">
            Why <span style={{ color: "#4A32FF" }}>IN2IT</span> ?
          </h2>
          <p className="mt-6 text-white/50 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge technology with decade-long event expertise to deliver flawless experiences.
          </p>
        </motion.div>

        {/* Poster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 xl:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: "linear" }}
              className={`
                group relative flex flex-col min-h-[380px] lg:min-h-[400px] xl:min-h-[440px] p-6 lg:p-5 xl:p-7
                ${f.bgColor} ${f.textColor} 
                rounded-3xl shadow-2xl overflow-hidden
                transition-all duration-500 hover:-translate-y-3 cursor-pointer
              `}
              style={{
                boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5)`
              }}
            >
              {/* Massive SVG Icon Replacement */}
              <div className="w-full flex justify-center items-start pt-2 xl:pt-4 flex-1">
                <div className="w-[85%] lg:w-[90%] aspect-square transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-3">
                  {f.icon}
                </div>
              </div>

              {/* Bottom Information */}
              <div className="flex flex-col relative z-10">
                <div className="h-[80px] lg:h-[60px] xl:h-[80px] mb-4">
                  <h3 className="text-2xl lg:text-xl xl:text-2xl font-black tracking-normal leading-none mb-1">
                    {f.title}
                  </h3>
                  <h3 className="text-xl lg:text-lg xl:text-xl font-extrabold tracking-normal opacity-90">
                    {f.subtitle}
                  </h3>
                </div>

                <div className="flex justify-between items-start gap-3">
                  <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-widest leading-normal w-[80%] opacity-80 mix-blend-color-burn">
                    {f.description}
                  </p>

                  <div className="w-6 h-6 shrink-0 opacity-60 mix-blend-color-burn mt-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L12 22M2 12L22 12M5 5L19 19M19 5L5 19" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
