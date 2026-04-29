"use client";

import { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Share2, Camera, Nfc, ArrowRight } from "lucide-react";

const products = [
  {
    id: "social-product",
    num: "01",
    title: "Social Media Tools",
    description: "Improve your marketing campaign with integrated social media tools including Line OA, Facebook, and Instagram.",
    icon: Share2,
    image: "/products/scm.png",
    colors: {
      inner: "bg-[#050314] border-[#4634F8]/20",
      text: "text-[#6A5AF9]",
      textHover: "group-hover:text-[#887DFB]",
      iconBg: "bg-[#4634F8]/10",
      shadow: "group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(70,52,248,0.15)]",
      glow: "bg-[#4634F8]",
      hex: "#4634F8"
    },
    rotate: "-rotate-3",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#56",
  },
  {
    id: "photobooth",
    num: "02",
    title: "Interactive Photobooths",
    description: "Photobooths make your event more outstanding by allowing users to take pictures and print instantly.",
    icon: Camera,
    image: "/products/kiosk.png",
    colors: {
      inner: "bg-[#140005] border-[#E60039]/20",
      text: "text-[#E60039]",
      textHover: "group-hover:text-[#FF3366]",
      iconBg: "bg-[#E60039]/10",
      shadow: "group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(230,0,57,0.15)]",
      glow: "bg-[#E60039]",
      hex: "#E60039"
    },
    rotate: "rotate-2",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#46"
  },
  {
    id: "nfc",
    num: "03",
    title: "NFC & Digital Badges",
    description: "Customizable smart badges for fast check-in, access control, and real-time tracking.",
    icon: Nfc,
    image: "/products/nfc.png",
    colors: {
      inner: "bg-[#140800] border-[#FF6600]/20",
      text: "text-[#FF6600]",
      textHover: "group-hover:text-[#FF8833]",
      iconBg: "bg-[#FF6600]/10",
      shadow: "group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(255,102,0,0.15)]",
      glow: "bg-[#FF6600]",
      hex: "#FF6600"
    },
    rotate: "-rotate-2",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#12"
  },
];

const iconVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.85,
  },
  onscreen: {
    y: -100, // Floats high out from the back
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1.0,
    },
  },
};

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
    <section id="products" className="py-32 bg-transparent text-white overflow-hidden relative">
      
      {/* Background Ambient Glows (Breathing Animation) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#FF6600]/30 rounded-full blur-[130px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] bg-[#4634F8]/20 rounded-full blur-[150px]" 
        />
      </div>

      <div className="container max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* Heading Section */}
        <div className="flex flex-col items-center mb-48">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center inline-block max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase text-white mb-6">
              Featured <span className="text-[#FF6600]">Products</span>
            </h2>
            <div className="w-full h-1 bg-gradient-to-r from-[#4634F8] via-[#E60039] to-[#FF6600] mt-1 opacity-40 rounded-full mx-auto origin-center" />
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="w-full flex justify-center mt-16">
          <div className="flex flex-wrap gap-16 md:gap-20 lg:gap-24 items-center justify-center px-2">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }} 
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full sm:w-[340px] md:w-[360px] cursor-pointer group mt-24"
                onClick={() => window.open(product.link, "_blank")}
              >
                {/* The Card Itself (Explicitly z-10 to overlay image) */}
                <div className={`w-full h-full bg-[#0A0A0A] rounded-3xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 transform ${product.rotate} group-hover:rotate-0 group-hover:-translate-y-4 transition-all duration-500 z-10 relative ${product.colors.shadow}`}>
                  
                  {/* Floating Product Icon (Positioned BEHIND the card container) */}
                  <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 z-[-1] w-[160px] h-[160px] pointer-events-none">
                    <motion.div
                      initial="offscreen"
                      whileInView="onscreen"
                      exit="offscreen"
                      viewport={{ amount: 0.3 }}
                      variants={iconVariants}
                      className="w-full h-full relative"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                      />
                    </motion.div>
                  </div>

                  <div 
                    className={`w-full h-full min-h-[340px] rounded-[20px] ${product.colors.inner} p-8 pt-16 flex flex-col border relative overflow-hidden transition-colors duration-300`}
                    style={{ '--card-glow': product.colors.hex } as React.CSSProperties}
                  >
                    
                    {/* Bottom Gradient Glow */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-3/4 z-0 pointer-events-none transition-opacity duration-500 opacity-80 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at bottom center, var(--card-glow) -20%, transparent 65%)`,
                        filter: "blur(35px)",
                      }}
                    />
                    
                    {/* Bottom border line glow */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] z-[5] pointer-events-none opacity-90 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)",
                        boxShadow: `0 0 20px 3px var(--card-glow)`,
                      }}
                    />

                    {/* Big Number & Icon */}
                    <div className="flex items-start justify-between mb-8 relative z-10">
                      <span className={`text-[64px] leading-none font-bold tracking-tighter ${product.colors.text} drop-shadow-[0_0_15px_currentColor]`}>
                        {product.num}
                      </span>
                      <div className={`p-3 rounded-2xl ${product.colors.iconBg} backdrop-blur-sm ${product.colors.text} opacity-60 group-hover:opacity-100 transition-all`}>
                        <product.icon strokeWidth={2} className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-auto relative z-10">
                      <h3 className={`text-2xl font-bold text-white mb-4 leading-tight transition-colors ${product.colors.textHover}`}>
                        {product.title}
                      </h3>
                      <p className="text-white/60 text-[15px] leading-relaxed font-light group-hover:text-white/80 transition-colors">
                        {product.description}
                      </p>
                    </div>

                    {/* Interactive Button */}
                    <div className={`mt-8 inline-flex items-center gap-2 font-bold text-sm tracking-widest uppercase ${product.colors.text} opacity-70 group-hover:opacity-100 transition-all relative z-10 origin-left`}>
                      SALE KITS
                      <ArrowRight strokeWidth={3} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    
                    {/* Subtle Background Glow inside the note */}
                    <div className={`absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-[60px] opacity-20 pointer-events-none ${product.colors.glow}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
