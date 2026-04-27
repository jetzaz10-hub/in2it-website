'use client'
import React, { useRef, useState } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x, y });
      const rotateX = -(y / rect.height) * 5; 
      const rotateY = (x / rect.width) * 5; 
      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  // Extract colors with different opacities for the border and glow
  const borderColor = colorCenter.replace("0.7)", "0.4)");
  const glowColor = colorCenter.replace("0.7)", "0.15)");
  const insetGlow = colorCenter.replace("0.7)", "0.05)");

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-full rounded-[32px] overflow-hidden group"
      style={{
        border: `1px solid ${borderColor}`,
        transformStyle: "preserve-3d",
        backgroundColor: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(40px)",
        boxShadow: `0 0 25px ${glowColor}, inset 0 0 15px ${insetGlow}, 0 8px 32px 0 rgba(0,0,0,0.37)`,
      }}
      initial={{ y: 0 }}
      animate={{
        y: isHovered ? -16 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: 1000,
        boxShadow: isHovered 
          ? `0 0 35px ${colorCenter.replace("0.7)", "0.3)")}, inset 0 0 25px ${colorCenter.replace("0.7)", "0.1)")}, 0 15px 40px 0 rgba(0,0,0,0.45)` 
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
      {/* Subtle glass reflection overlay */}
      <motion.div
        className="absolute inset-0 z-[35] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(2px)",
        }}
        animate={{
          opacity: isHovered ? 0.7 : 0.5,
          rotateX: -rotation.x * 0.2,
          rotateY: -rotation.y * 0.2,
          z: 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Dark background with black gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #000000 70%)",
        }}
        animate={{ z: -1 }}
      />

      {/* Noise texture overlay */}
      <motion.div
        className="absolute inset-0 opacity-30 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        animate={{ z: -0.5 }}
      />

      {/* Subtle finger smudge texture for realism */}
      <motion.div
        className="absolute inset-0 opacity-10 mix-blend-soft-light z-[11] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='smudge'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' seed='5' stitchTiles='stitch'/%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23smudge)'/%3E%3C/svg%3E")`,
          backdropFilter: "blur(1px)",
        }}
        animate={{ z: -0.25 }}
      />

      {/* Purple/blue glow effect matching the image */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, ${colorRight} -10%, transparent 70%),
            radial-gradient(ellipse at bottom left, ${colorLeft} -10%, transparent 70%)
          `,
          filter: "blur(40px)",
        }}
        animate={{
          opacity: isHovered ? 0.9 : 0.8,
          y: isHovered ? rotation.x * 0.5 : 0,
          z: 0
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Central purple glow as seen in the image */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-[21]"
        style={{
          background: `
            radial-gradient(circle at bottom center, ${colorCenter} -20%, transparent 60%)
          `,
          filter: "blur(45px)",
        }}
        animate={{
          opacity: isHovered ? 0.85 : 0.75,
          y: isHovered ? `calc(10% + ${rotation.x * 0.3}px)` : "10%",
          z: 0
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Enhanced bottom border glow for premium look */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-[25]"
        style={{
          background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
        }}
        animate={{
          boxShadow: isHovered
            ? `0 0 20px 4px ${colorRight}, 0 0 30px 6px ${colorCenter}, 0 0 40px 8px ${colorLeft}`
            : `0 0 15px 3px ${colorRight}, 0 0 25px 5px ${colorCenter}, 0 0 35px 7px ${colorLeft}`,
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-1/4 w-[1px] z-[25] rounded-full"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 80%)",
        }}
        animate={{
          boxShadow: isHovered
            ? `0 0 20px 4px ${colorRight}, 0 0 30px 6px ${colorCenter}, 0 0 40px 8px ${colorLeft}`
            : `0 0 15px 3px ${colorRight}, 0 0 25px 5px ${colorCenter}, 0 0 35px 7px ${colorLeft}`,
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-1/4 z-[25]"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.55) 15%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 85%)",
        }}
        animate={{
          boxShadow: isHovered
            ? `0 0 20px 4px ${colorRight}, 0 0 30px 6px ${colorCenter}, 0 0 40px 8px ${colorLeft}`
            : `0 0 15px 3px ${colorRight}, 0 0 25px 5px ${colorCenter}, 0 0 35px 7px ${colorLeft}`,
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-1/4 w-[1px] z-[25] rounded-full"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 80%)",
        }}
        animate={{
          boxShadow: isHovered
            ? `0 0 20px 4px ${colorRight}, 0 0 30px 6px ${colorCenter}, 0 0 40px 8px ${colorLeft}`
            : `0 0 15px 3px ${colorRight}, 0 0 25px 5px ${colorCenter}, 0 0 35px 7px ${colorLeft}`,
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-1/3 z-[25]"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.55) 15%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 85%)",
        }}
        animate={{
          boxShadow: isHovered
            ? `0 0 20px 4px ${colorRight}, 0 0 30px 6px ${colorCenter}, 0 0 40px 8px ${colorLeft}`
            : `0 0 15px 3px ${colorRight}, 0 0 25px 5px ${colorCenter}, 0 0 35px 7px ${colorLeft}`,
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Card content */}
      <motion.div
        className="relative flex flex-col h-full p-12 md:p-14 gap-6 z-40"
        animate={{ z: 2 }}
      >
        {/* Icon Container matching original layout */}
        <div 
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
          style={{
            backgroundColor: isHovered ? colorCenter.replace("0.7)", "0.2)") : colorCenter.replace("0.7)", "0.1)"),
            color: isHovered ? colorCenter.replace("0.7)", "1)") : colorCenter.replace("0.7)", "0.8)"),
            transition: "all 0.3s ease"
          }}
        >
          {icon}
        </div>

        <motion.div
          className="relative mb-auto"
          animate={{
            z: isHovered ? 5 : 2,
            rotateX: isHovered ? -rotation.x * 0.3 : 0,
            rotateY: isHovered ? -rotation.y * 0.3 : 0
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.h3
            className="text-2xl font-bold mb-3 tracking-tight transition-colors duration-300"
            style={{ color: isHovered ? colorCenter.replace("0.7)", "1)") : "#ffffff" }}
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{
              filter: "blur(0px)",
              opacity: 1,
              transition: { duration: 1.2, delay: 0.2 }
            }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-base leading-relaxed transition-colors duration-300"
            style={{ color: isHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}
            initial={{ filter: "blur(3px)", opacity: 0.7 }}
            animate={{
              filter: "blur(0px)",
              opacity: 1,
              transition: { duration: 1.2, delay: 0.4 }
            }}
          >
            {description}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
