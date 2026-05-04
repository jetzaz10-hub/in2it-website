"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Counter from "./ui/Counter";

export default function MetricsSection() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleGalleryModal = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsHidden(customEvent.detail.isOpen);
    };
    window.addEventListener('gallery-modal-change', handleGalleryModal);
    return () => window.removeEventListener('gallery-modal-change', handleGalleryModal);
  }, []);

  return (
    <section className={`w-full relative z-20 py-16 bg-black transition-opacity duration-500 ${isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Card 1: Events Delivered */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 rounded-[2rem] border border-white/10 p-6 lg:p-8 relative overflow-hidden flex flex-col justify-end min-h-[180px] group hover:border-white/20 transition-colors duration-500"
        >
          <img src="/events-bg.png" alt="Events Background" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/60 to-black/30" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#4A32FF] opacity-20 blur-[100px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-40 z-0" />
          
          <div className="relative z-10">
            <div className="text-6xl lg:text-7xl font-semibold tracking-tighter text-white">
              <Counter value={500} />+
            </div>
            <div className="text-sm font-medium tracking-[0.2em] text-white/50 uppercase mt-4">
              Events Delivered
            </div>

          </div>
        </motion.div>

        {/* Stacked Cards: Clients & Years */}
        <div className="flex flex-col gap-5">
          {/* Card 2: Global Clients */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 rounded-[2rem] border border-white/10 p-6 relative overflow-hidden flex flex-col justify-end min-h-[110px] group hover:border-white/20 transition-colors duration-500"
          >
            <img src="/clients-bg.png" alt="Clients Background" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/60 to-black/30" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#8A2BE2] opacity-15 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-30 z-0" />
            
            <div className="relative z-10">
              <div className="text-4xl lg:text-5xl font-semibold tracking-tighter text-white">
                <Counter value={50} />+
              </div>
              <div className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase mt-3">
                Global Clients
              </div>
            </div>
          </motion.div>

          {/* Card 3: Years Expertise */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 rounded-[2rem] border border-white/10 p-6 relative overflow-hidden flex flex-col justify-end min-h-[110px] group hover:border-white/20 transition-colors duration-500"
          >
            <img src="/years-bg.png" alt="Years Background" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/60 to-black/30" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF3366] opacity-15 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-30 z-0" />
            
            <div className="relative z-10">
              <div className="text-4xl lg:text-5xl font-semibold tracking-tighter text-white">
                <Counter value={15} />+
              </div>
              <div className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase mt-3">
                Years Expertise
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
