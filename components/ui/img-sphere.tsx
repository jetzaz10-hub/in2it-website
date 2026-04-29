"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ==========================================
// TYPES
// ==========================================

export interface ImageData {
  id: string;
  src: string;
  alt: string;
}

export interface SphereImageGridProps {
  images: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  dragSensitivity?: number;
  className?: string;
}

// ==========================================
// MATH
// ==========================================

const toRad = (deg: number) => deg * (Math.PI / 180);

// ==========================================
// COMPONENT
// ==========================================

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 500,
  sphereRadius = 220,
  autoRotate = true,
  autoRotateSpeed = 0.2,
  dragSensitivity = 0.35,
  className = "",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [, forceRender] = useState(0);

  // Use refs for all animation state to avoid re-render overhead
  const rotRef = useRef({ x: 15, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoveredRef = useRef<number | null>(null);

  // Pre-compute sphere positions once
  const spherePositions = useRef<{ theta: number; phi: number }[]>([]);

  useEffect(() => {
    setIsMounted(true);

    const golden = (1 + Math.sqrt(5)) / 2;
    const angleInc = (2 * Math.PI) / golden;
    const positions: { theta: number; phi: number }[] = [];

    for (let i = 0; i < images.length; i++) {
      const t = i / images.length;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleInc * i;

      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;
      phi = 10 + (phi / 180) * 160;

      // Minimal randomization
      theta = (theta + (Math.random() - 0.5) * 12) % 360;
      phi = Math.max(5, Math.min(175, phi + (Math.random() - 0.5) * 6));

      positions.push({ theta, phi });
    }

    spherePositions.current = positions;
  }, [images.length]);

  // Track last tick time to limit CPU overhead
  const lastTickRef = useRef<number>(0);

  // ── Main animation loop — directly mutate DOM for max performance ──
  const tick = useCallback((timestamp: number) => {
    if (timestamp - lastTickRef.current < 22) { // Caps at approx 45 FPS
      animRef.current = requestAnimationFrame(tick);
      return;
    }
    lastTickRef.current = timestamp;

    const vel = velRef.current;
    const rot = rotRef.current;

    // Apply momentum decay
    vel.x *= 0.94;
    vel.y *= 0.94;
    if (Math.abs(vel.x) < 0.001) vel.x = 0;
    if (Math.abs(vel.y) < 0.001) vel.y = 0;

    // Update rotation
    rot.x += vel.x;
    rot.y += vel.y + (draggingRef.current ? 0 : autoRotate ? autoRotateSpeed : 0);

    const rotXRad = toRad(rot.x);
    const rotYRad = toRad(rot.y);
    const cosRY = Math.cos(rotYRad);
    const sinRY = Math.sin(rotYRad);
    const cosRX = Math.cos(rotXRad);
    const sinRX = Math.sin(rotXRad);

    const fadeStart = -15;
    const fadeEnd = -sphereRadius * 0.55;
    const imageSize = Math.max(50, Math.min(66, containerSize * 0.115));
    const half = containerSize / 2;

    // Directly update each DOM element
    for (let i = 0; i < spherePositions.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;

      const pos = spherePositions.current[i];
      const thetaRad = toRad(pos.theta);
      const phiRad = toRad(pos.phi);

      // Sphere → world coords
      const sx = sphereRadius * Math.sin(phiRad) * Math.cos(thetaRad);
      const sy = sphereRadius * Math.cos(phiRad);
      const sz = sphereRadius * Math.sin(phiRad) * Math.sin(thetaRad);

      // Y rotation
      const x1 = sx * cosRY + sz * sinRY;
      const z1 = -sx * sinRY + sz * cosRY;

      // X rotation
      const y2 = sy * cosRX - z1 * sinRX;
      const z2 = sy * sinRX + z1 * cosRX;

      // Visibility
      const isVisible = z2 > fadeEnd;
      let opacity = 1;
      if (z2 <= fadeStart) {
        opacity = Math.max(0, (z2 - fadeEnd) / (fadeStart - fadeEnd));
      }

      // Scale
      const depthNorm = (z2 + sphereRadius) / (2 * sphereRadius);
      const isHovered = hoveredRef.current === i;
      const scale = (0.5 + depthNorm * 0.6) * (isHovered ? 1.25 : 1);
      const size = imageSize * scale;
      const zIndex = Math.round(1000 + z2) + (isHovered ? 500 : 0);

      // Direct DOM manipulation — zero React re-renders
      el.style.transform = `translate(${half + x1 - size / 2}px, ${half + y2 - size / 2}px)`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = isVisible ? String(opacity) : "0";
      el.style.zIndex = String(zIndex);
      el.style.pointerEvents = opacity > 0.3 ? "auto" : "none";
    }

    animRef.current = requestAnimationFrame(tick);
  }, [sphereRadius, containerSize, autoRotate, autoRotateSpeed]);

  useEffect(() => {
    if (!isMounted) return;
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isMounted, tick]);

  // ── Pointer handlers ──
  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    velRef.current.x = dy * dragSensitivity * 0.25;
    velRef.current.y = dx * dragSensitivity * 0.25;
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  // ── Render ──
  if (!isMounted || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="w-16 h-16 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none touch-none ${className}`}
      style={{
        width: containerSize,
        height: containerSize,
        cursor: draggingRef.current ? "grabbing" : "grab",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* ═══ Central Gradient Core — subtle blue-purple ═══ */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: sphereRadius * 0.85,
          height: sphereRadius * 0.85,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.12) 40%, rgba(59,130,246,0.06) 70%, transparent 90%)",
          filter: "blur(40px)",
        }}
      />
      {/* Inner soft core */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: sphereRadius * 0.3,
          height: sphereRadius * 0.3,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(139,92,246,0.1) 40%, rgba(99,102,241,0.06) 70%, transparent 100%)",
          filter: "blur(10px)",
        }}
      />
      {/* Subtle shimmer ring */}
      <div
        className="absolute pointer-events-none animate-pulse"
        style={{
          width: sphereRadius * 0.5,
          height: sphereRadius * 0.5,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(139,92,246,0.06)",
          boxShadow: "0 0 25px rgba(99,102,241,0.04), 0 0 50px rgba(139,92,246,0.02)",
        }}
      />

      {/* Logo items — positioned via direct DOM manipulation */}
      {images.map((img, idx) => (
        <div
          key={img.id}
          ref={(el) => { itemRefs.current[idx] = el; }}
          className="absolute will-change-transform"
          style={{ opacity: 0 }}
          onMouseEnter={() => { hoveredRef.current = idx; }}
          onMouseLeave={() => { hoveredRef.current = null; }}
        >
          {/* White circle */}
          <div
            className="w-full h-full rounded-full overflow-hidden flex items-center justify-center transition-shadow duration-300"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid rgba(255,255,255,0.15)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget;
              t.style.border = "2px solid rgba(139,92,246,0.5)";
              t.style.boxShadow = "0 0 16px rgba(139,92,246,0.25), 0 0 35px rgba(139,92,246,0.08)";
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget;
              t.style.border = "1.5px solid rgba(255,255,255,0.15)";
              t.style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-[72%] h-[72%] object-contain pointer-events-none select-none"
              draggable={false}
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SphereImageGrid;
