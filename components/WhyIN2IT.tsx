"use client";

import React from "react";

const features = [
  {
    title: "One-Stop",
    subtitle: "Provider",
    description: "Everything from registration to staging under one roof.",
    bgColor: "bg-[#4A32FF]", // Brand Blue
    textColor: "text-white",
    borderColor: "border-[#4A32FF]",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="8" />
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
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        {/* Continuous paths to prevent internal segment overlapping */}
        <path d="M10 35 L45 35 Q75 35 75 10" stroke="currentColor" strokeWidth="10" strokeLinecap="square" fill="none" />
        <path d="M90 65 L55 65 Q25 65 25 90" stroke="currentColor" strokeWidth="10" strokeLinecap="square" fill="none" />
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
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        {/* Spark shape using bevel joins to cleanly slice sharp corners */}
        <path d="M50 10 Q50 50 10 50 Q50 50 50 90 Q50 50 90 50 Q50 50 50 10 Z" stroke="currentColor" strokeWidth="9" strokeLinejoin="bevel" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    title: "Integrated",
    subtitle: "Systems",
    description: "Unified data flow between registration, social, and CRM.",
    bgColor: "bg-[#7C30C2]", // Bright Lime (like the 'Goals' ref card, adapted as a high-contrast pop)
    textColor: "text-white",
    borderColor: "border-[#7C30C2]",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        {/* Arrow shaft stops exactly before the corner boundary to avoid miter overlaps */}
        <path d="M20 80 L74 26" stroke="currentColor" strokeWidth="10" strokeLinecap="square" />
        <path d="M45 20 L80 20 L80 55" stroke="currentColor" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
    ),
  },
  {
    title: "Custom",
    subtitle: "Tailored",
    description: "Solutions engineered to match your specific event goals.",
    bgColor: "bg-[#FF3366]", // Grey (like the 'Results' ref card)
    textColor: "text-white",
    borderColor: "border-[#FF3366]",
    icon: (
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        {/* Modular frame brackets representing tailoring, focus, and customization */}
        <path d="M 15 35 L 35 35 L 35 15" stroke="currentColor" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M 65 15 L 65 35 L 85 35" stroke="currentColor" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M 85 65 L 65 65 L 65 85" stroke="currentColor" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M 35 85 L 35 65 L 15 65" stroke="currentColor" strokeWidth="10" strokeLinecap="square" strokeLinejoin="miter" />
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
      
      {/* Smoke Layers - Optimized for very slow, subtle organic movement */}
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

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="section-heading-xl text-white">
            Why <span style={{ color: "#4A32FF" }}>IN2IT</span> ?
          </h2>
          <p className="mt-4 text-white/50 text-xl font-medium tracking-wide max-w-2xl mx-auto uppercase">
            Tactical solutions for modern events
          </p>
        </div>

        {/* Poster Grid - Restored Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 xl:gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`
                group relative flex flex-col min-h-[380px] lg:min-h-[400px] xl:min-h-[440px] p-6 lg:p-5 xl:p-7
                ${f.bgColor} ${f.textColor} 
                rounded-3xl shadow-2xl overflow-hidden
                transition-all duration-500 hover:-translate-y-3 cursor-pointer
              `}
              style={{ 
                // Dynamically calculated shadow glow based on brand color
                boxShadow: `0 10px 30px -10px rgba(0,0,0,0.5)`
              }}
              onMouseEnter={(e) => {
                const color = f.bgColor.match(/\[(.*?)\]/)?.[1] || "#000000";
                e.currentTarget.style.boxShadow = `0 30px 60px -12px rgba(0,0,0,0.7), 0 0 35px ${color}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 30px -10px rgba(0,0,0,0.5)`;
              }}
            >
              {/* Massive Geometric Icon */}
              <div className="w-full flex justify-center items-start pt-2 xl:pt-4 flex-1">
                <div className="w-[85%] lg:w-[90%] aspect-square transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-3">
                  {f.icon}
                </div>
              </div>

              {/* Bottom Information */}
              <div className="flex flex-col relative z-10">
                {/* Title & Subtitle Area - Fixed height to align the description below */}
                <div className="h-[80px] lg:h-[60px] xl:h-[80px] mb-4">
                  <h3 className="text-2xl lg:text-xl xl:text-2xl font-black tracking-normal leading-none mb-1">
                    {f.title}
                  </h3>
                  <h3 className="text-xl lg:text-lg xl:text-xl font-extrabold tracking-normal opacity-90">
                    {f.subtitle}
                  </h3>
                </div>

                {/* Description & Logo Area */}
                <div className="flex justify-between items-start gap-3">
                  <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-widest leading-normal w-[80%] opacity-80 mix-blend-color-burn">
                    {f.description}
                  </p>

                  {/* Small Base Logo Indicator */}
                  <div className="w-6 h-6 shrink-0 opacity-60 mix-blend-color-burn mt-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L12 22M2 12L22 12M5 5L19 19M19 5L5 19" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
