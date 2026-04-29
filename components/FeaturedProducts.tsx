"use client";

import { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Nfc, Share2, Camera, ArrowRight } from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: "nfc",
    num: "01",
    title: "NFC & Digital Badges",
    description: "Customizable smart badges for fast check-in, access control, and real-time tracking.",
    icon: Nfc,
    image: "/products/products/nfc.png",
    colors: {
      inner: "bg-[#140800] border-[#FF6600]/20",
      text: "text-[#FF6600]",
      iconBg: "bg-[#FF6600]/10",
      shadow: "shadow-[0_20px_50px_rgba(255,102,0,0.2)]",
      glow: "bg-[#FF6600]",
      hex: "#FF6600",
    },
    rotate: -5,
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#12",
  },
  {
    id: "social-product",
    num: "02",
    title: "Social Media Tools",
    description: "Improve your marketing campaign with integrated social media tools including Line OA, Facebook, and Instagram.",
    icon: Share2,
    image: "/products/products/scm.png",
    colors: {
      inner: "bg-[#050314] border-[#4634F8]/20",
      text: "text-[#6A5AF9]",
      iconBg: "bg-[#4634F8]/10",
      shadow: "shadow-[0_20px_50px_rgba(70,52,248,0.2)]",
      glow: "bg-[#4634F8]",
      hex: "#4634F8",
    },
    rotate: 5,
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#56",
  },
  {
    id: "photobooth",
    num: "03",
    title: "Interactive Photobooths",
    description: "Photobooths make your event more outstanding by allowing users to take pictures and print instantly.",
    icon: Camera,
    image: "/products/products/kiosk.png",
    colors: {
      inner: "bg-[#140005] border-[#E60039]/20",
      text: "text-[#E60039]",
      iconBg: "bg-[#E60039]/10",
      shadow: "shadow-[0_20px_50px_rgba(230,0,57,0.2)]",
      glow: "bg-[#E60039]",
      hex: "#E60039",
    },
    rotate: -3,
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#46",
  },
];

const cardVariants: Variants = {
  offscreen: {
    y: 300,
    rotate: 0,
    opacity: 0,
  },
  onscreen: (customRotate: number) => ({
    y: 0,
    rotate: customRotate,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 1.0,
    },
  }),
};

export default function FeaturedProducts() {
  // Handle nav-jump event from Navbar/Footer
  useEffect(() => {
    const handleJump = (e: any) => {
      const targetId = e.detail?.targetId;
      const isProduct = products.some((p) => p.id === targetId);

      if (isProduct) {
        const section = document.getElementById("products");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    window.addEventListener("nav-jump", handleJump);
    return () => window.removeEventListener("nav-jump", handleJump);
  }, []);

  return (
    <section
      id="products"
      className="py-32 bg-transparent text-white overflow-hidden relative"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[20%] left-[5%] w-[600px] h-[600px] bg-[#FF6600]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[600px] h-[600px] bg-[#4634F8]/20 rounded-full blur-[140px]" />
      </div>

      <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Heading Section */}
        <div className="flex flex-col items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center inline-block max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase text-white mb-6">
              Featured <span className="text-[#FF6600]">Products</span>
            </h2>
            <div className="w-full h-1 bg-gradient-to-r from-[#4634F8] via-[#E60039] to-[#FF6600] mt-1 mx-auto opacity-50 rounded-full" />
          </motion.div>
        </div>

        {/* Overlapping Stack Cards Track */}
        <div className="w-full flex flex-col items-center relative max-w-[600px] mx-auto pb-32">
          {products.map((product, i) => {
            return (
              <motion.div
                key={product.id}
                className="relative flex justify-center items-center w-full"
                style={{
                  height: "480px",
                  marginBottom: i === products.length - 1 ? "0px" : "-260px",
                  zIndex: i + 10,
                }}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.6, margin: "0px 0px -10% 0px" }}
                custom={product.rotate}
                variants={cardVariants}
              >
                {/* Card Splash Glow */}
                <div
                  className="absolute inset-4 z-0 opacity-40 blur-[60px] rounded-full pointer-events-none transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${product.colors.hex}, transparent 70%)`,
                  }}
                />

                {/* The Card Frame */}
                <div
                  onClick={() => window.open(product.link, "_blank")}
                  className={`relative w-[90%] sm:w-[480px] h-[450px] cursor-pointer group rounded-[2.5rem] p-8 border border-white/10 overflow-hidden backdrop-blur-xl ${product.colors.inner} ${product.colors.shadow} transition-all duration-500 hover:border-white/20 hover:-translate-y-2`}
                >
                  {/* Subtle lines/glows */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] z-10 opacity-60 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${product.colors.hex}, transparent)`,
                      boxShadow: `0 0 15px 2px ${product.colors.hex}`,
                    }}
                  />

                  {/* Card Info Layer */}
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-5xl font-bold tracking-tighter ${product.colors.text} drop-shadow-[0_0_15px_rgba(255,102,0,0.3)]`}>
                        {product.num}
                      </span>
                      <div className={`p-3 rounded-2xl ${product.colors.iconBg} ${product.colors.text}`}>
                        <product.icon strokeWidth={2.5} className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                      {product.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light max-w-[280px] mb-6">
                      {product.description}
                    </p>

                    <div className={`mt-auto inline-flex items-center gap-2 font-bold text-xs tracking-widest uppercase ${product.colors.text} opacity-80 group-hover:opacity-100 transition-all`}>
                      SALE KITS
                      <ArrowRight strokeWidth={3} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card Image Layer (positioned dynamically on the bottom-right) */}
                  <div className="absolute right-[-20px] bottom-[-20px] w-[240px] h-[240px] z-0 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                      sizes="240px"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
