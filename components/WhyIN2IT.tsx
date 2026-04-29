"use client";

import React from "react";
import { motion } from "framer-motion";
import { GradientCard } from "./ui/gradient-card";

const whyFeatures = [
  {
    title: "One-stop Provider",
    description: "Everything from registration to staging under one expert roof.",
    icon: (
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[var(--card-color)]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[var(--card-color)]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[var(--card-color)]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[var(--card-color)]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
      <svg className="w-20 h-20 md:w-24 md:h-24 text-white/90 mb-2 transition-colors duration-300 group-hover:text-[var(--card-color)]" viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tighter">
              Why <span className="text-[#FF3366]">IN2IT</span> ?
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-none mx-auto leading-relaxed">
              We combine cutting-edge technology with decade-long event expertise to deliver flawless experiences.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {whyFeatures.map((feature, i) => {
            const cardColors = [
              { right: "rgba(172, 92, 255, 0.95)", left: "rgba(56, 189, 248, 0.95)", center: "rgba(161, 58, 229, 0.95)" }, // Purple/Blue
              { right: "rgba(249, 115, 22, 0.95)", left: "rgba(234, 179, 8, 0.95)", center: "rgba(239, 68, 68, 0.95)" },    // Orange/Yellow/Red
              { right: "rgba(34, 197, 94, 0.95)", left: "rgba(6, 182, 212, 0.95)", center: "rgba(16, 185, 129, 0.95)" },    // Green/Cyan
              { right: "rgba(236, 72, 153, 0.95)", left: "rgba(168, 85, 247, 0.95)", center: "rgba(219, 39, 119, 0.95)" },  // Pink/Purple
              { right: "rgba(59, 130, 246, 0.95)", left: "rgba(139, 92, 246, 0.95)", center: "rgba(37, 99, 235, 0.95)" },    // Blue/Indigo
            ];
            const color = cardColors[i % cardColors.length];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <GradientCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  colorRight={color.right}
                  colorLeft={color.left}
                  colorCenter={color.center}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
