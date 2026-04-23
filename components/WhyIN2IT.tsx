"use client";

import React from "react";
import { motion } from "framer-motion";

const whyFeatures = [
  {
    title: "One-stop Provider",
    description: "Everything from registration to staging under one expert roof.",
    icon: (
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[#FF6600]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[#FF6600]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[#FF6600]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[#FF6600]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[#FF6600]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6600]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tighter">
              Why <span className="text-[#FF6600]">IN2IT</span> ?
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
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
              className="group relative rounded-[32px] p-14 flex flex-col gap-6 overflow-hidden transition-all duration-500 bg-gradient-to-b from-zinc-900 to-[#FF6600]/10 border border-[#FF6600]/30 shadow-[0_10px_40px_rgba(255,102,0,0.05)] hover:-translate-y-4 hover:border-[#FF6600]/60 hover:to-[#FF6600]/30 hover:shadow-[0_20px_60px_rgba(255,102,0,0.2)]"
            >
              {/* Card Glow Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6600]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute bottom-[-10px] right-[-10px] w-20 h-20 bg-[#FF6600]/10 rounded-full blur-2xl group-hover:bg-[#FF6600]/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
