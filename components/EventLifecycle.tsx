"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

/* ─── Helpers ─────────────────────────────────────────── */

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  // angleDeg: 0 = top, clockwise
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutSlice(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startDeg: number,
  endDeg: number
) {
  const o1 = polarToCartesian(cx, cy, outerR, startDeg);
  const o2 = polarToCartesian(cx, cy, outerR, endDeg);
  const i1 = polarToCartesian(cx, cy, innerR, startDeg);
  const i2 = polarToCartesian(cx, cy, innerR, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${o1.x.toFixed(2)} ${o1.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${o2.x.toFixed(2)} ${o2.y.toFixed(2)}`,
    `L ${i2.x.toFixed(2)} ${i2.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${i1.x.toFixed(2)} ${i1.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

function getTextArcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const mid = (startDeg + endDeg) / 2;
  const reverse = mid > 90 && mid < 270;

  let sDeg = startDeg;
  let eDeg = endDeg;

  if (reverse) {
    sDeg = endDeg;
    eDeg = startDeg;
  }

  const s = polarToCartesian(cx, cy, r, sDeg);
  const e = polarToCartesian(cx, cy, r, eDeg);
  const large = Math.abs(eDeg - sDeg) > 180 ? 1 : 0;
  const sweep = reverse ? 0 : 1;

  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

/* ─── Data ────────────────────────────────────────────── */

const phases = [
  {
    id: "pre",
    label: ["Pre", "Event"],
    startDeg: 0,
    endDeg: 120,
    midDeg: 60,
    gradFrom: "#00D4E8",
    gradTo: "#9933FF",
    colorActive: "#4A32FF",
    items: [
      {
        title: "Website • Branding • Conversion",
        description: "Your definitive digital presence. Custom UX/UI, unforgettable branding, and seamless content management—designed for flawless conversion."
      },
      {
        title: "Tickets • Gateways • Frictionless",
        description: "Secure ticketing and scalable payment gateways for maximized sales and zero-friction entry."
      },
      {
        title: "EDM • Social • Register",
        description: "Targeted digital activation utilizing Line OA, Facebook, and Instagram for unmatched pre-event buzz and registration drive."
      },
      {
        title: "3D Visuals • Space • Impact",
        description: "High-fidelity 3D production designs, essential print collateral (badges, lanyards), and dynamic motion graphics—defining your physical presence."
      },
    ],
  },
  {
    id: "day-of",
    label: ["Day of", "Event"],
    startDeg: 120,
    endDeg: 240,
    midDeg: 180,
    gradFrom: "#9933FF",
    gradTo: "#FF3366",
    colorActive: "#FF3366",
    items: [
      {
        title: "Check-In • Kiosks • Rapid",
        description: "Self-service digital kiosks and customized IoT hardware for rapid, seamless attendee registration and entry."
      },
      {
        title: "NFC • Control • Seamless",
        description: "Advanced smart technology for door scanning and badge tracking, delivering seamless crowd management."
      },
      {
        title: "Broadcast • Live • Global",
        description: "High-fidelity video broadcasting platforms with guaranteed suitable bandwidth for a flawless digital audience experience."
      },
      {
        title: "Stage • Tech • Flawless",
        description: "Dedicated on-ground technical staff ensuring flawless execution of stage production, product displays, and light and sound setups."
      },
    ],
  },
  {
    id: "post",
    label: ["Post", "Event"],
    startDeg: 240,
    endDeg: 360,
    midDeg: 300,
    gradFrom: "#FF3366",
    gradTo: "#FF8833",
    colorActive: "#FF6600",
    items: [
      {
        title: "Data • Success • Measure",
        description: "Granular, real-time reporting drawn directly from the registration system to measure attendee behavior and event success."
      },
      {
        title: "ROI • Digital • Track",
        description: "Precision measurement of your event's exact ROI and digital footprint through social media and EDM engagement analytics."
      },
      {
        title: "Recaps • Motion • Sustain",
        description: "Rapid-turnaround video editing and dynamic motion graphics to instantly package the event's best moments and sustain momentum."
      },
      {
        title: "Follow-Up • Trust • Connect",
        description: "Targeted email follow-ups and data management designed to build long-term customer trust and enduring connection."
      },
    ],
  },
];

const CX = 170, CY = 170;
const OUTER = 140, INNER = 90;

/* ─── Component ───────────────────────────────────────── */

/* ─── Detail Component ────────────────────────────────── */

interface PhaseItem {
  title: string;
  description: string;
}

interface PhaseDetailProps {
  phase: Omit<(typeof phases)[0], 'items'> & { items: PhaseItem[] };
  openItems: Record<string, boolean>;
  toggleItem: (i: string) => void;
}

function PhaseDetail({
  phase,
  openItems,
  toggleItem
}: PhaseDetailProps) {
  return (
    <div className="w-full px-4 lg:px-0">
      <div className="mb-5 flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: phase.colorActive }}
        />
        <h3 className="text-4xl font-bold text-white tracking-tight">
          {phase.label.join(" ")}
        </h3>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
        {phase.items.map((item: PhaseItem) => {
          const isOpen = !!openItems[item.title];
          return (
            <motion.div
              layout
              key={item.title}
              initial={false}
              animate={{ 
                backgroundColor: isOpen ? "#EEF9F8" : "#ffffff",
              }}
              whileHover={{ backgroundColor: isOpen ? "#EEF9F8" : "#F9FAFB" }}
              className="border-b border-gray-100 last:border-0"
            >
              <button
                onClick={() => toggleItem(item.title)}
                className="w-full flex items-center justify-between px-8 py-5 text-left"
              >
                <motion.span
                  layout
                  initial={false}
                  animate={{ 
                    color: isOpen ? "#000000" : "#1f2937",
                    fontSize: isOpen ? "1.1875rem" : "1.125rem",
                    fontWeight: isOpen ? 700 : 600,
                  }}
                  className="tracking-wide block"
                >
                  {item.title}
                </motion.span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? "rotate-180" : ""
                    }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-8 pb-6 text-[15px] text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Donut Component ─────────────────────────────────── */

function getClosestAngle(current: number, target: number) {
  const diff = ((target - current + 180) % 360 + 360) % 360 - 180;
  return current + diff;
}

interface DonutGraphicProps {
  activeId: string | null;
  hoverId: string | null;
  setHoverId: (id: string | null) => void;
  setActiveId: (id: string | null) => void;
  setOpenItems: (items: Record<string, boolean>) => void;
}

function DonutGraphic({ activeId, hoverId, setHoverId, setActiveId, setOpenItems }: DonutGraphicProps) {
  const prevAngleRef = useRef(0);
  const [mouseData, setMouseData] = useState<{ angle: number, color: string } | null>(null);

  const targetId = hoverId || activeId;
  const targetPhase = targetId ? phases.find(p => p.id === targetId) : null;
  const isPulled = !!targetPhase;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    // Fix: Ignore mouse movements in the empty corners of the SVG square
    const distance = Math.sqrt(dx * dx + dy * dy);
    const scale = rect.width / 340; // 340 is the SVG viewBox width
    const maxRadius = 165 * scale; // 165 limits it closely to the outer edge of the donut

    if (distance > maxRadius) {
      setMouseData(null); // Clear the gradient tracking
      return; // Stop running the rest of the function
    }

    const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

    let delta = rawAngle - (prevAngleRef.current % 360);
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const continuousAngle = prevAngleRef.current + delta;
    prevAngleRef.current = continuousAngle;

    let clockAngle = rawAngle + 90;
    if (clockAngle < 0) clockAngle += 360;

    const virtualPhase = phases.find(p => clockAngle >= p.startDeg && clockAngle < p.endDeg) || phases[phases.length - 1];
    setMouseData({ angle: continuousAngle, color: virtualPhase.colorActive });
  };

  const handleMouseLeave = () => {
    setHoverId(null);
    setMouseData(null);
  };

  // Determine where we want to go
  const rawTargetAngle = mouseData
    ? mouseData.angle
    : (targetPhase ? targetPhase.midDeg - 90 : 0);

  // Find the shortest path from our last known angle to prevent multi-spins
  const glowRotation = getClosestAngle(prevAngleRef.current || 0, rawTargetAngle);

  // Save the new continuous angle for the next frame
  if (prevAngleRef) {
    prevAngleRef.current = glowRotation;
  }

  const glowShadow = mouseData
    ? `inset -24px 0px 35px -12px ${mouseData.color}`
    : (targetPhase
      ? `inset -24px 0px 35px -12px ${targetPhase.colorActive}`
      : 'inset 0px 0px 0px 0px transparent');

  return (
    <>
      <svg
        viewBox="0 0 340 340"
        className="w-full h-full drop-shadow-2xl overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          {phases.map((p) => {
            const startPt = polarToCartesian(CX, CY, OUTER, p.startDeg);
            const endPt = polarToCartesian(CX, CY, OUTER, p.endDeg);
            const isSelected = p.id === activeId;
            const isHovered = p.id === hoverId && !isSelected;
            const textR = isSelected ? 123 : (isHovered ? 119 : 115);

            return (
              <g key={`defs-${p.id}`}>
                <linearGradient
                  id={`grad-${p.id}`}
                  gradientUnits="userSpaceOnUse"
                  x1={startPt.x}
                  y1={startPt.y}
                  x2={endPt.x}
                  y2={endPt.y}
                >
                  <stop offset="0%" stopColor={p.gradFrom} />
                  <stop offset="100%" stopColor={p.gradTo} />
                </linearGradient>
                <path
                  id={`textPath-${p.id}`}
                  d={getTextArcPath(CX, CY, textR, p.startDeg, p.endDeg)}
                />
              </g>
            );
          })}
        </defs>
        {phases.map((phase) => {
          const isSelected = phase.id === activeId;
          const isHovered = phase.id === hoverId && !isSelected;
          const isBright = isHovered || isSelected;
          const isEnlarged = isBright;

          const activeOuterR = isSelected ? OUTER + 16 : (isHovered ? OUTER + 8 : OUTER);
          const path = donutSlice(CX, CY, activeOuterR, INNER, phase.startDeg, phase.endDeg);

          const extrudeDist = isSelected ? 16 : (isHovered ? 8 : 0);
          const offset = polarToCartesian(0, 0, extrudeDist, phase.midDeg);
          const fontSize = isSelected ? "14" : (isHovered ? "13" : "12");

          return (
            <g
              key={phase.id}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: 'transform 0.5s ease-out'
              }}
            >
              <motion.path
                d={path}
                fill={`url(#grad-${phase.id})`}
                opacity={isBright ? 1 : 0.65}
                stroke={isBright ? "white" : `url(#grad-${phase.id})`}
                strokeWidth={isBright ? "1.5" : "2"}
                strokeLinejoin="round"
                className="transition-all duration-500 ease-out"
                style={{
                  filter: isEnlarged
                    ? `drop-shadow(0 0 16px ${phase.colorActive})`
                    : undefined,
                }}
                animate={isBright ? {
                  filter: [
                    `drop-shadow(0 0 10px ${phase.colorActive}77)`,
                    `drop-shadow(0 0 25px ${phase.colorActive}aa)`,
                    `drop-shadow(0 0 10px ${phase.colorActive}77)`
                  ],
                  strokeWidth: [1.5, 2.5, 1.5]
                } : {
                  filter: "none",
                  strokeWidth: 2
                }}
                transition={isBright ? {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                } : {
                  duration: 0.3
                }}
              />

              {/* Curved Text Label */}
              <text
                fill={isBright ? "white" : "rgba(255,255,255,0.75)"}
                fontSize={fontSize}
                fontWeight="800"
                letterSpacing="0.05em"
                className="transition-all duration-500 ease-out pointer-events-none"
                style={{
                  textShadow: isBright
                    ? '0px 2px 8px rgba(0,0,0,0.8)'
                    : '0px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                <textPath
                  href={`#textPath-${phase.id}`}
                  startOffset="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {phase.label.join(" ")}
                </textPath>
              </text>

              <path
                d={donutSlice(CX, CY, OUTER + 16, INNER, phase.startDeg, phase.endDeg)}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoverId(phase.id)}
                onMouseLeave={() => setHoverId(null)}
                onClick={() => {
                  setActiveId(phase.id);
                  setOpenItems({});
                }}
              />
            </g>
          );
        })}

        {/* Inner gap is intentionally left empty so HTML absolute div can render the glow without SVG clipping issues */}
        <circle cx={CX} cy={CY} r={INNER} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" className="pointer-events-none" />
      </svg>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{
          top: `${((CY - INNER) / 340) * 100}%`,
          bottom: `${((340 - CY - INNER) / 340) * 100}%`,
          left: `${((CX - INNER) / 340) * 100}%`,
          right: `${((340 - CX - INNER) / 340) * 100}%`,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-black pointer-events-none"
          animate={{
            rotate: glowRotation,
            boxShadow: glowShadow
          }}
          transition={{
            rotate: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
            boxShadow: { duration: 0.2 }
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center p-4">
          <Image
            src="/logo.svg" alt="IN2IT Logo" width={100} height={50}
            className="object-contain"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}

/* ─── Timeline Progress Component ──────────────────────── */
interface TimelineProgressProps {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  setOpenItems: (items: Record<string, boolean>) => void;
}

function TimelineProgress({ activeId, setActiveId, setOpenItems }: TimelineProgressProps) {
  const activeIdx = phases.findIndex((p) => p.id === activeId);

  return (
    <div className="mt-0 lg:mt-0 w-full max-w-[1100px] mx-auto px-10 relative z-30">
      <div className="relative flex justify-between items-center mb-8 pt-6">
        {/* START/FINISH Absolute Labels */}
        <div className="absolute -top-6 left-0 text-[11px] font-bold tracking-[0.3em] text-white/40">START</div>
        <div className="absolute -top-6 right-0 text-[11px] font-bold tracking-[0.3em] text-white/40 text-right">FINISH</div>

        {/* Background Track */}
        <div className="absolute top-1.5/2 left-0 right-0 h-[1.5px] bg-white/5 -translate-y-1.5/2 z-0" />

        {/* Active Progress Bar */}
        <div
          className="absolute top-1.5/2 left-0 h-[2px] -translate-y-1.5/2 z-0 transition-all duration-[1000ms] cubic-bezier(0.16,1,0.3,1)"
          style={{
            width: activeId ? `calc(${(activeIdx / (phases.length - 1)) * 100}% - 0px)` : "0%",
            background: activeId ? phases[activeIdx].colorActive : "transparent",
            boxShadow: activeId ? `0 0 10px ${phases[activeIdx].colorActive}` : "none",
          }}
        />

        {phases.map((phase, idx) => {
          const isActive = phase.id === activeId;
          const isPast = activeId ? idx < activeIdx : false;

          return (
            <div
              key={phase.id}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
              onClick={() => {
                setActiveId(phase.id);
                setOpenItems({});
              }}
            >
              {/* Point */}
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 bg-black flex items-center justify-center ${isActive
                  ? "scale-125 border-white"
                  : isPast
                    ? "border-white/40"
                    : "border-white/10 group-hover:border-white/30"
                  }`}
                style={isActive ? {
                  borderColor: phase.colorActive,
                  boxShadow: `0 0 20px ${phase.colorActive}`,
                  backgroundColor: phase.colorActive
                } : {}}
              >
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                )}
              </div>

              {/* Label */}
              <div
                className={`absolute top-8 text-center transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-30 translate-y-1"
                  }`}
              >
                <div className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap text-white">
                  {phase.label.join(" ")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EventLifecycle() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const activePhase = activeId ? phases.find((p) => p.id === activeId) : null;

  function toggleItem(item: string) {
    setOpenItems((prev) => (prev[item] ? {} : { [item]: true }));
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.4, once: true });

  useEffect(() => {
    if (isInView && !activeId) {
      setActiveId("pre");
    }
  }, [isInView, activeId]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionScale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.95, 1, 1, 0.95]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center pt-16 pb-24 bg-black overflow-hidden">
      {/* Scattered Purple Aura Backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-[-20%] w-[600px] h-[600px] bg-[#9933FF]/35 rounded-full blur-[110px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-1/3 left-[-20%] w-[700px] h-[700px] bg-[#4A32FF]/35 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '14s' }} />
      </div>

      {/* Top transition overlay */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

      {/* Intense IN2IT Orange Transition Gradient removed to unify with OurServices */}

      <motion.div
        style={{ scale: sectionScale, opacity: sectionOpacity }}
        className="relative z-10 max-w-[1280px] mx-auto px-8 w-full flex flex-col items-center"
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-heading text-white mb-8"
          >
            Your event lifecycle,{" "}
            <span style={{ color: "#FF3366" }}>from start to finish</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/85 text-xl max-w-none mx-auto"
          >
            A structured, end-to-end workflow where we plan, think and execute every detail to ensure seamless results.
          </motion.p>
        </div>

        {/* ─── Locked Layout (Donut + Details) ─── */}
        <div className="relative w-full max-w-[1000px] flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-20 mb-10 mt-6">
          {/* Donut Graphic (Always Left on Desktop) */}
          <div className="relative shrink-0 w-[280px] sm:w-[340px] md:w-[420px] aspect-square flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                scale: { type: "spring", damping: 12, stiffness: 100, delay: 0.1 },
                opacity: { duration: 0.4 }
              }}
              className="w-full h-full"
            >
              <DonutGraphic activeId={activeId} hoverId={hoverId} setHoverId={setHoverId} setActiveId={setActiveId} setOpenItems={setOpenItems} />
            </motion.div>

            {/* Mobile Tabs (Hidden on LG) */}
            <div className="flex lg:hidden gap-2 justify-center mt-6 flex-wrap absolute -bottom-16 w-[120%] left-[-10%] z-20">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => { setActiveId(phase.id); setOpenItems({}); }}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${activeId === phase.id
                    ? "text-white"
                    : "text-white/40 border border-white/10"
                    }`}
                  style={activeId === phase.id ? { background: phase.colorActive } : {}}
                >
                  {phase.label.join(" ")}
                </button>
              ))}
            </div>
          </div>

          {/* Phase Details (Always Right on Desktop) */}
          <div className="w-full lg:w-[420px] mt-10 lg:mt-0 flex flex-col justify-center shrink-0 lg:min-h-[420px]">
            {activePhase && (
              <div className="w-full animate-in fade-in zoom-in-95 duration-500">
                <PhaseDetail phase={activePhase} openItems={openItems} toggleItem={toggleItem} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
