"use client";

import { ReactNode } from "react";
import { ElegantShape } from "./ui/elegant-shape";

interface UnifiedBackgroundWrapperProps {
  children: ReactNode;
}

export default function UnifiedBackgroundWrapper({ children }: UnifiedBackgroundWrapperProps) {
  return (
    <div className="relative w-full bg-[#030303]">
      {/* Shared Ambient Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="sticky top-0 h-screen w-full">
            {/* Soft Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="absolute -top-48 left-0 w-full h-48 bg-gradient-to-t from-[#FF6600]/50 via-[#FF6600]/10 to-transparent pointer-events-none" />
        {children}
      </div>
    </div>
  );
}
