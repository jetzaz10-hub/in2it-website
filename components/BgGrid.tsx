"use client";

interface BgGridProps {
  opacity?: number;
  mask?: string;
}

const BgGrid = ({ 
  opacity = 0.05, 
  mask = "radial-gradient(ellipse at center, black 30%, transparent 80%)" 
}: BgGridProps) => (
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,${opacity}) 1px, transparent 1px), 
        linear-gradient(to bottom, rgba(255,255,255,${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px",
      animation: "gridDrift 40s linear infinite",
      maskImage: mask,
      WebkitMaskImage: mask,
    }}
  />
);

export default BgGrid;
