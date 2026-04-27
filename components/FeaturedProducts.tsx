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
    id: "social-product",
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
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#56",
    imgPosition: "object-top"
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
  // Handle nav-jump event from Navbar/Footer
  useEffect(() => {
    const handleJump = (e: any) => {
      const targetId = e.detail?.targetId;
      const isProduct = products.some(p => p.id === targetId);
      
      if (isProduct) {
        const section = document.getElementById('products');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('nav-jump', handleJump);
    return () => window.removeEventListener('nav-jump', handleJump);
  }, []);

  return (
    <section id="products" className="py-20 lg:min-h-screen lg:flex lg:items-center bg-transparent text-white overflow-hidden relative">
      {/* Background layer removed for unified look */}

      <div className="container max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Balanced Heading */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "linear" }}
            className="text-center inline-block"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-2 leading-tight">
              Featured <span className="text-[#FF6600]">Products</span>
            </h2>
            {/* Adaptive Underline */}
            <div className="w-full h-1 bg-gradient-to-r from-[#4634F8] to-[#FF6600] opacity-40 mt-1"></div>
          </motion.div>
        </div>

        {/* Centered Track */}
        <div className="w-full flex justify-center">
          <div className="flex flex-wrap gap-8 md:gap-12 lg:gap-16 items-center justify-center px-4">
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
                  imgPosition={(product as any).imgPosition}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
