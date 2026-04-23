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

            <ElegantShape
                delay={0.3}
                width={600}
                height={140}
                rotate={12}
                gradient="from-indigo-500/[0.12]"
                className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
            />

            <ElegantShape
                delay={0.5}
                width={500}
                height={120}
                rotate={-15}
                gradient="from-rose-500/[0.12]"
                className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
            />

            <ElegantShape
                delay={0.4}
                width={300}
                height={80}
                rotate={-8}
                gradient="from-violet-500/[0.12]"
                className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
            />

            <ElegantShape
                delay={0.6}
                width={200}
                height={60}
                rotate={20}
                gradient="from-amber-500/[0.12]"
                className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
            />

            <ElegantShape
                delay={0.7}
                width={150}
                height={40}
                rotate={-25}
                gradient="from-cyan-500/[0.12]"
                className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
            />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
