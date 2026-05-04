'use client'
import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface GradientCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorRight: string;
  colorLeft: string;
  colorCenter: string;
}

export const GradientCard = ({ title, description, icon, colorRight, colorLeft, colorCenter }: GradientCardProps) => {
  // Helper to reliably change the alpha channel of an rgba string
  const setOpacity = (colorStr: string, alpha: string) => {
    return colorStr.replace(/[\d.]+\)$/, `${alpha})`);
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Throttled mouse move handler to reduce re-renders
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 5;
      const rotateY = (x / rect.width) * 5;
      setRotation({ x: rotateX, y: rotateY });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  }, []);

  // Extract colors with different opacities for the border and glow
  const glowColor = setOpacity(colorCenter, "0.1");
  const insetGlow = setOpacity(colorCenter, "0.03");
  
  const shadowRight = setOpacity(colorRight, "0.3");
  const shadowCenter = setOpacity(colorCenter, "0.3");
  const shadowLeft = setOpacity(colorLeft, "0.3");

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-full rounded-[32px] overflow-hidden group"
      style={{
        "--card-color": setOpacity(colorCenter, "1"),
        borderWidth: "1px",
        borderStyle: "solid",
        transformStyle: "preserve-3d",
        backgroundColor: "rgba(255,255,255,0.03)",
        willChange: "transform",
      } as React.CSSProperties}
      initial={{ y: 0, rotateX: 0, rotateY: 0, borderColor: setOpacity(colorCenter, "0.35") }}
      animate={{
        y: isHovered ? -16 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        borderColor: isHovered ? setOpacity(colorCenter, "0.6") : setOpacity(colorCenter, "0.35"),
        boxShadow: isHovered
          ? `0 0 35px ${setOpacity(colorCenter, "0.3")}, inset 0 0 25px ${setOpacity(colorCenter, "0.1")}, 0 15px 40px 0 rgba(0,0,0,0.45)`
          : `0 0 25px ${glowColor}, inset 0 0 15px ${insetGlow}, 0 8px 32px 0 rgba(0,0,0,0.37)`
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Glass reflection overlay — CSS only, no motion needed */}
      <div
        className="absolute inset-0 z-[35] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
          opacity: isHovered ? 0.7 : 0.5,
          transition: "opacity 0.4s ease-out",
        }}
      />

      {/* Dark background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
        }}
      />

      {/* Noise texture overlay — static, no animation needed */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Color glow effect — combined into one layer instead of two */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, ${colorRight} -10%, transparent 70%),
            radial-gradient(ellipse at bottom left, ${colorLeft} -10%, transparent 70%),
            radial-gradient(circle at bottom center, ${colorCenter} -20%, transparent 60%)
          `,
          filter: "blur(40px)",
          opacity: isHovered ? 0.9 : 0.8,
          transition: "opacity 0.4s ease-out",
        }}
      />

      {/* Bottom border glow — single element instead of 5 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-[25] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
          boxShadow: `0 0 15px 3px ${shadowRight}, 0 0 25px 5px ${shadowCenter}, 0 0 35px 7px ${shadowLeft}`,
          opacity: isHovered ? 1 : 0.9,
          transition: "opacity 0.4s ease-out, box-shadow 0.4s ease-out",
        }}
      />
      {/* Left edge glow */}
      <div
        className="absolute bottom-0 left-0 h-1/4 w-[1px] z-[25] rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 80%)",
          boxShadow: `0 0 15px 3px ${shadowCenter}`,
          transition: "opacity 0.4s ease-out",
        }}
      />
      {/* Right edge glow */}
      <div
        className="absolute bottom-0 right-0 h-1/4 w-[1px] z-[25] rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 80%)",
          boxShadow: `0 0 15px 3px ${shadowCenter}`,
          transition: "opacity 0.4s ease-out",
        }}
      />

      {/* Card content */}
      <div className="relative flex flex-col h-full p-12 md:p-14 gap-6 z-40">
        {/* Icon Container - Glassmorphism Style */}
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg"
          style={{
            backgroundColor: isHovered ? setOpacity(colorCenter, "0.25") : setOpacity(colorCenter, "0.15"),
            color: isHovered ? setOpacity(colorCenter, "1") : setOpacity(colorCenter, "0.8"),
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${isHovered ? setOpacity(colorCenter, "0.4") : setOpacity(colorCenter, "0.2")}`,
            boxShadow: `inset 0 1px 1px ${setOpacity(colorCenter, "0.4")}`,
          }}
        >
          {icon}
        </div>

        <div className="relative mb-auto">
          <h3
            className="text-2xl font-bold mb-3 tracking-tight transition-colors duration-300"
            style={{ color: isHovered ? setOpacity(colorCenter, "1") : "#ffffff" }}
          >
            {title}
          </h3>

          <p
            className="text-base leading-relaxed transition-colors duration-300"
            style={{ color: isHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.8)" }}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
