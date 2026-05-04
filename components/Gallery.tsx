"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ShuffleGrid from "@/components/ui/shuffle-grid";
import { GalleryModal } from "@/components/ui/gallery-modal";

export default function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialImageId, setInitialImageId] = useState<number | null>(null);

  const openGalleryAt = (id: number) => {
    setInitialImageId(id);
    setIsModalOpen(true);
    window.dispatchEvent(new CustomEvent('gallery-modal-change', { detail: { isOpen: true } }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.dispatchEvent(new CustomEvent('gallery-modal-change', { detail: { isOpen: false } }));
    // Delay resetting the ID to allow for the modal closing animation
    setTimeout(() => setInitialImageId(null), 300);
  };

  return (
    <section
      id="gallery"
      className="py-20 lg:min-h-screen lg:flex lg:items-center bg-transparent overflow-hidden relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="max-w-[1440px] mx-auto px-6 sm:px-12 w-full"
      >
        {/* Two-column layout: Text Left + Grid Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-16">
          {/* Left Column — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="space-y-6"
          >
            <span className="block text-xs md:text-sm text-[#F97316] font-semibold uppercase tracking-[0.2em]">
              Our Gallery
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tighter leading-[1.1]">
              Events that{" "}
              <span className="text-[#F97316]">inspire</span>
            </h2>

            <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-md">
              From corporate conferences to large-scale festivals, we&apos;ve
              delivered <span className="text-white font-bold">500+</span>{" "}
              unforgettable experiences with cutting-edge technology and
              seamless execution.
            </p>

            <button
              onClick={() => {
                setIsModalOpen(true);
                window.dispatchEvent(new CustomEvent('gallery-modal-change', { detail: { isOpen: true } }));
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-sm tracking-tight transition-all hover:scale-[1.05]"
            >
              {/* Glossy Button Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6600] to-[#FF9900] rounded-full shadow-[0_0_30px_rgba(255,102,0,0.3)] transition-all group-hover:shadow-[0_0_50px_rgba(255,102,0,0.5)]" />

              <span className="relative z-10">VIEW ALL GALLERY</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </motion.div>

          {/* Right Column — Shuffle Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "linear" }}
          >
            <ShuffleGrid onItemClick={openGalleryAt} />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Purple Glow Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[4px] shadow-[0_0_30px_rgba(168,85,247,0.8),0_0_60px_rgba(168,85,247,0.5)]" />
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-full h-[120px] bg-purple-600/25 blur-[70px] rounded-[100%] pointer-events-none" />
      </div>

      {/* Full Gallery Modal */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialSelectedId={initialImageId}
      />
    </section>
  );
}
