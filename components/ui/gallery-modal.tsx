import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { galleryData, type GalleryItem } from "@/constants/gallery-data";
import { WebGLShader } from "@/components/ui/web-gl-shader";

export function GalleryModal({
  isOpen,
  onClose,
  initialSelectedId = null
}: {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedId?: number | null
}) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isAllView, setIsAllView] = useState(false);
  const [direction, setDirection] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | "ALL">("ALL");

  const categories = useMemo(() => {
    return ["ALL", ...Array.from(new Set(galleryData.map(item => item.category)))];
  }, []);

  // Filter unique projects for the initial grid view
  const uniqueProjects = useMemo(() => {
    const seen = new Set();
    return galleryData.filter(item => {
      if (seen.has(item.eventId)) return false;
      seen.add(item.eventId);
      return true;
    });
  }, []);

  // Determine which list to show and sort by newest year first
  // isAllView true = ALL PROJECTS (unique)
  // isAllView false = ALL PHOTOS (everything)
  const displayPhotos = useMemo(() => {
    let photos = isAllView ? uniqueProjects : galleryData;
    if (selectedCategory !== "ALL") {
      photos = photos.filter(p => p.category === selectedCategory);
    }
    return [...photos].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }, [isAllView, uniqueProjects, selectedCategory]);

  // Get all photos for the current event
  const eventPhotos = useMemo(() => {
    if (!selectedImage) return [];
    return galleryData.filter(item => item.eventId === selectedImage.eventId);
  }, [selectedImage]);

  const currentIndex = eventPhotos.findIndex(p => p.id === selectedImage?.id);

  const paginate = (newDirection: number) => {
    const nextIndex = (currentIndex + newDirection + eventPhotos.length) % eventPhotos.length;
    setDirection(newDirection);
    setSelectedImage(eventPhotos[nextIndex]);
  };

  // Set initial selected image if provided
  useEffect(() => {
    if (isOpen && initialSelectedId !== null) {
      const item = galleryData.find(i => i.id === initialSelectedId);
      if (item) setSelectedImage(item);
    }
  }, [isOpen, initialSelectedId]);

  // Close modal on escape key and navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImage) setSelectedImage(null);
        else onClose();
      } else if (selectedImage && eventPhotos.length > 1) {
        if (e.key === "ArrowLeft") paginate(-1);
        if (e.key === "ArrowRight") paginate(1);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-gallery-open", "true");
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-gallery-open");
    };
  }, [isOpen, selectedImage, eventPhotos, onClose]);

  // Reset selected image and view when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedImage(null);
        setIsAllView(false);
      }, 300);
    }
  }, [isOpen]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8"
        >
          {/* Animated WebGL Shader Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <WebGLShader />
            {/* Dark overlay to ensure the popup remains legible */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Clickable backdrop area to close modal */}
          <div className="absolute inset-0 z-10 cursor-pointer" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-20 w-full max-w-[1440px] h-[95vh] md:h-full md:max-h-[800px] bg-zinc-950/80 border border-white/5 rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  {selectedImage && (
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h3 className="text-xl font-bold text-white uppercase tracking-[0.2em]">
                    {selectedImage ? selectedImage.name : "Gallery"}
                  </h3>
                </div>

                {/* View Mode Toggle Switch */}
                {!selectedImage && (
                  <div className="hidden md:flex bg-white/5 p-1 rounded-full border border-white/10 relative w-[280px] h-10 items-center">
                    <motion.div
                      className="absolute bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      initial={false}
                      animate={{
                        x: isAllView ? "100%" : "0%",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{
                        width: "calc(50% - 4px)",
                        height: "32px",
                        left: "4px"
                      }}
                    />
                    <button
                      onClick={() => setIsAllView(false)}
                      className={`flex-1 relative z-10 text-[10px] font-bold tracking-[0.2em] transition-colors duration-300 ${!isAllView ? 'text-black' : 'text-white/40 hover:text-white'}`}
                    >
                      ALL PHOTOS
                    </button>
                    <button
                      onClick={() => setIsAllView(true)}
                      className={`flex-1 relative z-10 text-[10px] font-bold tracking-[0.2em] transition-colors duration-300 ${isAllView ? 'text-black' : 'text-white/40 hover:text-white'}`}
                    >
                      ALL PROJECTS
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden p-4 md:p-8 relative">
              <AnimatePresence mode="wait" initial={false}>
                {!selectedImage ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col"
                  >
                    {/* Mobile View All Switch */}
                    <div className="md:hidden flex justify-center mb-8">
                      <div className="bg-white/5 p-1 rounded-full border border-white/10 relative w-[240px] h-10 flex items-center">
                        <motion.div
                          className="absolute bg-white rounded-full"
                          initial={false}
                          animate={{
                            x: isAllView ? "100%" : "0%",
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          style={{
                            width: "calc(50% - 4px)",
                            height: "32px",
                            left: "4px"
                          }}
                        />
                        <button
                          onClick={() => setIsAllView(false)}
                          className={`flex-1 relative z-10 text-[9px] font-bold tracking-[0.2em] transition-colors duration-300 ${!isAllView ? 'text-black' : 'text-white/40'}`}
                        >
                          ALL PHOTOS
                        </button>
                        <button
                          onClick={() => setIsAllView(true)}
                          className={`flex-1 relative z-10 text-[9px] font-bold tracking-[0.2em] transition-colors duration-300 ${isAllView ? 'text-black' : 'text-white/40'}`}
                        >
                          ALL PROJECTS
                        </button>
                      </div>
                    </div>

                    {/* Category Filter Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${
                            selectedCategory === cat 
                              ? 'bg-[#FF6600] text-white border border-[#FF6600] shadow-[0_0_15px_rgba(255,102,0,0.3)]' 
                              : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
                      {displayPhotos.map((item) => (
                        <motion.div
                          key={item.id}
                          layoutId={`card-${item.id}`}
                          whileHover={{ y: -5 }}
                          onClick={() => setSelectedImage(item)}
                          className="relative aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer group bg-zinc-900 border border-white/5"
                        >
                          <Image
                            src={item.src}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {/* Overlay with Name - Only shows text if isAllView is true (ALL PROJECTS view) */}
                          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity flex flex-col justify-end p-6 ${isAllView ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            {isAllView && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <div className="flex items-center gap-2 mb-1.5">
                                  <div className="h-[1px] w-3 bg-[#FF6600]" />
                                  <span 
                                    onClick={(e) => { e.stopPropagation(); setSelectedCategory(item.category); }}
                                    className="text-[#FF6600] text-[8px] font-black tracking-[0.2em] uppercase line-clamp-1 hover:text-white transition-colors cursor-pointer"
                                  >
                                    {item.category}
                                  </span>
                                </div>
                                <p className="text-white font-bold text-lg mb-1 leading-tight line-clamp-2">{item.name}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-white/60 text-xs font-bold tracking-tighter uppercase">{item.year}</span>
                                  <span className="text-white/40 text-[10px] uppercase">View Project</span>
                                </div>
                              </motion.div>
                            )}
                            {!isAllView && (
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col lg:flex-row gap-6 lg:gap-10 overflow-y-auto lg:overflow-hidden custom-scrollbar pr-2 lg:pr-0 pb-4 lg:pb-0"
                  >
                    {/* Left: Slider Area */}
                    <div className="relative w-full h-[45vh] lg:h-auto lg:flex-1 shrink-0 bg-zinc-900/50 rounded-3xl overflow-hidden group border border-white/5">
                      <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                          key={selectedImage.id}
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                          }}
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={1}
                          onDragEnd={(e, { offset, velocity }) => {
                            const swipe = offset.x;
                            if (swipe < -50) paginate(1);
                            else if (swipe > 50) paginate(-1);
                          }}
                          className="absolute inset-0 flex items-center justify-center p-4"
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={selectedImage.src}
                              alt={selectedImage.name}
                              fill
                              className="object-contain pointer-events-none select-none"
                              priority
                              sizes="(max-width: 1024px) 100vw, 66vw"
                            />
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Overlays */}
                      {eventPhotos.length > 1 && (
                        <>
                          <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                            onClick={() => paginate(-1)}
                          >
                            <ChevronLeft className="w-8 h-8" />
                          </button>
                          <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                            onClick={() => paginate(1)}
                          >
                            <ChevronRight className="w-8 h-8" />
                          </button>

                          {/* Indicator dots */}
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {eventPhotos.map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-[#FF6600]' : 'w-2 bg-white/20'}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Right: Info Panel */}
                    <div className="w-full lg:w-[400px] flex flex-col justify-start space-y-6 lg:py-6 lg:overflow-y-auto custom-scrollbar lg:pr-2 shrink-0">
                      <div className="my-auto flex flex-col gap-6">
                        <div>
                          <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 mb-3"
                        >
                          <div className="h-[1px] w-4 bg-[#FF6600]" />
                          <span 
                            onClick={() => { setSelectedCategory(selectedImage.category); setSelectedImage(null); }}
                            className="text-[#FF6600] text-[10px] font-black tracking-[0.3em] uppercase hover:text-white transition-colors cursor-pointer"
                          >
                            {selectedImage.category}
                          </span>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tighter">
                          {selectedImage.name}
                        </h2>
                        <div className="h-1.5 w-20 bg-gradient-to-r from-[#4634F8] to-[#FF6600] rounded-full" />
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                          <span className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1 block">Project Year</span>
                          <span className="text-2xl font-bold text-white tracking-tight">{selectedImage.year}</span>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                          <span className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1 block">Participants</span>
                          <span className="text-2xl font-bold text-[#FF6600] tracking-tight">{selectedImage.participants}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-bold uppercase text-xs tracking-widest opacity-60">Success Story</h4>
                        <p className="text-white/60 leading-relaxed text-sm md:text-base">
                          Our team delivered a custom-built event ecosystem for {selectedImage.name}.
                          Integrating real-time tracking, seamless onsite registration, and interactive
                          engagement tools to support over {selectedImage.participants} attendees.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedImage(null);
                          setIsAllView(true);
                        }}
                        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all uppercase tracking-widest text-xs"
                      >
                        Explore More Projects
                      </button>
                    </div>
                  </div>
                </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
