"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

/**
 * SphereImageGrid - Advanced Interactive 3D Image Sphere Component
 * Adapted with Fibonacci distribution and collision detection.
 */

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;
  phi: number;
  radius: number;
}

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

interface RotationState {
  x: number;
  y: number;
  z: number;
}

interface VelocityState {
  x: number;
  y: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  radiansToDegrees: (radians: number): number => radians * (180 / Math.PI),
  normalizeAngle: (angle: number): number => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  }
};

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 600,
  sphereRadius = 220,
  dragSensitivity = 0.8,
  momentumDecay = 0.95,
  maxRotationSpeed = 5,
  baseImageScale = 0.14,
  hoverScale = 1.2,
  perspective = 1000,
  autoRotate = true,
  autoRotateSpeed = 0.2,
  className = ''
}) => {

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [rotation, setRotation] = useState<RotationState>({ x: 15, y: 15, z: 0 });
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const velocity = useRef<VelocityState>({ x: 0, y: 0 });
  const isDragging = useRef<boolean>(false);
  const animationFrame = useRef<number | null>(null);

  const actualSphereRadius = sphereRadius || containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const imageCount = images.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
      const t = i / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
      if (phi < 90) {
        phi = Math.max(5, phi - poleBonus);
      } else {
        phi = Math.min(175, phi + poleBonus);
      }

      phi = 15 + (phi / 180) * 150;
      const randomOffset = (Math.random() - 0.5) * 20;
      theta = (theta + randomOffset) % 360;
      
      positions.push({ theta, phi, radius: actualSphereRadius });
    }
    return positions;
  }, [images.length, actualSphereRadius]);

  useEffect(() => {
    setImagePositions(generateSpherePositions());
  }, [generateSpherePositions]);

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1; z = z1;

      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2; z = z2;

      const isVisible = z > -30;
      let fadeOpacity = z <= -10 ? Math.max(0, (z + 30) / 20) : 1;

      const isPoleImage = pos.phi < 30 || pos.phi > 150;
      const distanceFromCenter = Math.sqrt(x * x + y * y);
      const distanceRatio = Math.min(distanceFromCenter / actualSphereRadius, 1);
      const centerScale = Math.max(0.3, 1 - distanceRatio * (isPoleImage ? 0.4 : 0.7));

      const depthScale = (z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      return { x, y, z, scale, zIndex: Math.round(1000 + z), isVisible, fadeOpacity, originalIndex: index };
    });

    const adjustedPositions = [...positions];
    for (let i = 0; i < adjustedPositions.length; i++) {
      const pos = adjustedPositions[i];
      if (!pos.isVisible) continue;
      let adjustedScale = pos.scale;
      const imageSize = baseImageSize * adjustedScale;

      for (let j = 0; j < adjustedPositions.length; j++) {
        if (i === j) continue;
        const other = adjustedPositions[j];
        if (!other.isVisible) continue;
        const otherSize = baseImageSize * other.scale;
        const dx = pos.x - other.x;
        const dy = pos.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (imageSize + otherSize) / 2 + 25;
        if (distance < minDistance && distance > 0) {
          const overlap = minDistance - distance;
          const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6);
          adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
        }
      }
      adjustedPositions[i].scale = Math.max(0.25, adjustedScale);
    }
    return adjustedPositions;
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

  const updatePhysics = useCallback(() => {
    if (!isDragging.current) {
      velocity.current.x *= momentumDecay;
      velocity.current.y *= momentumDecay;

      if (autoRotate || Math.abs(velocity.current.x) > 0.01 || Math.abs(velocity.current.y) > 0.01) {
        setRotation(prev => ({
          x: SPHERE_MATH.normalizeAngle(prev.x + velocity.current.x),
          y: SPHERE_MATH.normalizeAngle(prev.y + velocity.current.y + (autoRotate ? autoRotateSpeed : 0)),
          z: prev.z
        }));
      }
    }
  }, [autoRotate, autoRotateSpeed, momentumDecay]);

  useEffect(() => {
    const animate = () => {
      updatePhysics();
      animationFrame.current = requestAnimationFrame(animate);
    };
    if (isMounted) animationFrame.current = requestAnimationFrame(animate);
    return () => { if (animationFrame.current) cancelAnimationFrame(animationFrame.current); };
  }, [isMounted, updatePhysics]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = (e.clientX - lastMousePos.current.x) * dragSensitivity;
      const dy = (e.clientY - lastMousePos.current.y) * dragSensitivity;
      velocity.current = { x: -dy * 0.5, y: dx * 0.5 };
      setRotation(prev => ({
        x: SPHERE_MATH.normalizeAngle(prev.x - dy * 0.1),
        y: SPHERE_MATH.normalizeAngle(prev.y + dx * 0.1),
        z: prev.z
      }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseUp = () => { isDragging.current = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragSensitivity]);

  const worldPositions = calculateWorldPositions();

  if (!isMounted) return null;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: containerSize, height: containerSize, perspective: `${perspective}px` }}>
      <div className="relative w-full h-full" onMouseDown={handleMouseDown}>
        {images.map((image, index) => {
          const pos = worldPositions[index];
          if (!pos || !pos.isVisible) return null;
          const isHovered = hoveredIndex === index;
          const size = baseImageSize * pos.scale;
          
          return (
            <div
              key={image.id}
              className="absolute cursor-pointer transition-transform duration-200"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${containerSize/2 + pos.x}px`,
                top: `${containerSize/2 + pos.y}px`,
                opacity: pos.fadeOpacity,
                zIndex: pos.zIndex,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.25 : 1})`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedImage(image)}
            >
              <div className="w-full h-full rounded-full bg-white border border-white/10 shadow-lg overflow-hidden flex items-center justify-center p-0">
                <img src={image.src} alt={image.alt} className="w-[95%] h-[95%] object-contain pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
          <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-square bg-white p-8 flex items-center justify-center">
              <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-full object-contain" />
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full text-white flex items-center justify-center hover:bg-black/70 transition-all"><X size={20} /></button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title || selectedImage.alt}</h3>
              {selectedImage.description && <p className="text-zinc-400 text-sm leading-relaxed">{selectedImage.description}</p>}
              {!selectedImage.description && <p className="text-zinc-400">Trusted Global Partner</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SphereImageGrid;
