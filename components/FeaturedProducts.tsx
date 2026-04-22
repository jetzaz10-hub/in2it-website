"use client";

import { useState, useRef, useEffect } from "react";
import CardFlip from "@/components/ui/flip-card";
import { motion } from "framer-motion";

const products = [
  {
    id: "nfc",
    title: "NFC / Digital BADGES",
    subtitle: "Customizable Smart Access",
    description: "Customizable smart badges for fast check-in, access control, and real-time tracking during large-scale events.",
    image: "/products/nfc.png",
    features: [
      "Smart Chip Tech",
      "Fast Check-in Flow",
      "Access Control",
      "Real-time Tracking",
    ],
    color: "#FF6600",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#12"
  },
  {
    id: "social",
    title: "Social Media Tools",
    subtitle: "Integrated Marketing",
    description: "Improve your marketing campaign with integrated social media tools including Line OA, Facebook, and Instagram.",
    image: "/products/scm.png",
    features: [
      "Line OA Sync",
      "Facebook Outreach",
      "Instagram Reach",
      "Global Metrics",
    ],
    color: "#4A32FF",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#56"
  },
  {
    id: "photobooth",
    title: "Photobooth / Kiosk",
    subtitle: "Interactive Experiences",
    description: "Photobooths make your event more outstanding and attractive by allowing users to take pictures and print instantly.",
    image: "/products/kiosk.png",
    features: [
      "Instant Printing",
      "Interactive UI",
      "Attractive Kiosk",
      "Memory Capture",
    ],
    color: "#FF6600",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#46"
  },
];

export default function FeaturedProducts() {
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current && trackRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      
      if (trackWidth > sliderWidth) {
        setConstraints({ left: -(trackWidth - sliderWidth + 48), right: 48 });
      } else {
        setConstraints({ left: 0, right: 0 });
      }
    }
  }, []);

  return (
    <section id="products" className="py-32 bg-[#030303] text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4634F8] rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF6600] rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700" />
      </div>

      <div className="container max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Balanced Heading */}
        <div className="flex flex-col items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "linear" }}
            className="text-center inline-block"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase mb-4 leading-tight">
              Featured <span className="text-[#FF6600]">Products</span>
            </h2>
            {/* Adaptive Underline */}
            <div className="w-full h-1 bg-gradient-to-r from-[#4634F8] to-[#FF6600] opacity-40 mt-2"></div>
          </motion.div>
        </div>

        {/* Centered Draggable Track */}
        <div 
          ref={sliderRef} 
          className="cursor-grab active:cursor-grabbing w-full flex justify-center"
        >
          <motion.div 
            ref={trackRef}
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.1}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-8 md:gap-12 lg:gap-16 items-center px-4"
            style={{ width: "max-content", minWidth: "fit-content" }}
          >
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: "linear" }}
                className="shrink-0 w-[300px] md:w-[400px]"
              >
                <CardFlip
                  title={product.title}
                  subtitle={product.subtitle}
                  description={product.description}
                  features={product.features}
                  color={product.color}
                  link={product.link}
                  imgSrc={product.image}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
