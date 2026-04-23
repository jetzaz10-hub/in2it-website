"use client";

import React from "react";
import { motion } from "framer-motion";

const whyFeatures = [
  {
    title: "One-stop Provider",
    description: "Everything from registration to staging under one expert roof.",
    icon: (
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[#4A32FF]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 48c0-10 8-18 18-18s18 8 18 18-8 18-18 18S16 58 16 48z" />
        <path d="M80 48c0-10-8-18-18-18S44 38 44 48s8 18 18 18 18-8 18-18z" />
        <line x1="34" y1="41" x2="44" y2="48" />
        <line x1="44" y1="48" x2="34" y2="55" />
        <line x1="62" y1="41" x2="52" y2="48" />
        <line x1="52" y1="48" x2="62" y2="55" />
      </svg>
    ),
  },
  {
    title: "Tech Expertise",
    description: "Deep technical knowledge matched with real operational experience.",
    icon: (
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[#4A32FF]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="28" y="28" width="40" height="40" rx="6" />
        <rect x="37" y="37" width="22" height="22" rx="3" />
        <line x1="16" y1="38" x2="28" y2="38" /><line x1="16" y1="48" x2="28" y2="48" /><line x1="16" y1="58" x2="28" y2="58" />
        <line x1="68" y1="38" x2="80" y2="38" /><line x1="68" y1="48" x2="80" y2="48" /><line x1="68" y1="58" x2="80" y2="58" />
        <line x1="38" y1="16" x2="38" y2="28" /><line x1="48" y1="16" x2="48" y2="28" /><line x1="58" y1="16" x2="58" y2="28" />
        <line x1="38" y1="68" x2="38" y2="80" /><line x1="48" y1="68" x2="48" y2="80" /><line x1="58" y1="68" x2="58" y2="80" />
      </svg>
    ),
  },
  {
    title: "Scalable",
    description: "From intimate corporate workshops to large-scale festivals.",
    icon: (
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[#4A32FF]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="16" y1="16" x2="16" y2="76" />
        <line x1="16" y1="76" x2="82" y2="76" />
        <polyline points="24,64 40,50 55,55 72,28" />
        <polyline points="62,22 72,28 66,37" />
      </svg>
    ),
  },
  {
    title: "Integrated",
    description: "Unified data flow between registration, social media, and CRM.",
    icon: (
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[#4A32FF]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="36" y="10" width="24" height="16" rx="4" />
        <rect x="10" y="58" width="22" height="16" rx="4" />
        <rect x="64" y="58" width="22" height="16" rx="4" />
        <rect x="37" y="58" width="22" height="16" rx="4" />
        <line x1="48" y1="26" x2="48" y2="42" />
        <line x1="48" y1="42" x2="21" y2="58" />
        <line x1="48" y1="42" x2="48" y2="58" />
        <line x1="48" y1="42" x2="75" y2="58" />
      </svg>
    ),
  },
  {
    title: "Customization",
    description: "Solutions tailored to match your goals and requirements.",
    icon: (
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[#4A32FF]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="14" y1="28" x2="82" y2="28" />
        <circle cx="32" cy="28" r="8" fill="currentColor" fillOpacity="0.2" />
        <line x1="14" y1="48" x2="82" y2="48" />
        <circle cx="60" cy="48" r="8" fill="currentColor" fillOpacity="0.2" />
        <line x1="14" y1="68" x2="82" y2="68" />
        <circle cx="40" cy="68" r="8" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
  },
];

export default function WhyIN2IT() {
  return (
    <section id="why-in2it" className="bg-black py-20 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4A32FF]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-5xl font-bold text-white mb-8 uppercase tracking-tighter">
              Why <span className="text-[#4A32FF]">IN2IT</span> ?
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-none mx-auto leading-relaxed">
              We combine cutting-edge technology with decade-long event expertise to deliver flawless experiences.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {whyFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-[32px] p-12 md:p-14 flex flex-col gap-6 overflow-hidden transition-all duration-500 bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:-translate-y-4 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_rgba(74,50,255,0.15)]"
            >
              {/* Blue Border Stroke with Glow */}
              <div className="absolute inset-0 rounded-[32px] border-2 border-[#4A32FF]/20 group-hover:border-[#4A32FF]/60 shadow-[0_0_10px_rgba(74,50,255,0.1)] group-hover:shadow-[0_0_20px_rgba(74,50,255,0.3)] transition-all duration-500" />

              {/* Dreamy Blue Shimmer Layer */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(74,50,255,0.15)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A32FF]/5 via-transparent to-[#4A32FF]/5 opacity-40" />

              {/* Card Glow Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A32FF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon Container */}
              <div className="relative w-16 h-16 rounded-2xl bg-[#4A32FF]/10 flex items-center justify-center text-[#4A32FF] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {feature.icon}
              </div>

              {/* Text Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#4A32FF] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute bottom-[-10px] right-[-10px] w-20 h-20 bg-[#4A32FF]/10 rounded-full blur-2xl group-hover:bg-[#4A32FF]/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
