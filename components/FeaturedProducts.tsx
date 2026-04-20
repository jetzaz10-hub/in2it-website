"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const products = [
  {
    id: "nfc",
    name: "NFC / Digital BADGES (Customizible)",
    image: "/products/nfc.png",
    description:
      "Customizable smart badges for fast check-in, access control, and real-time tracking.",
    accent: "#7B2FBE",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#12"
  },
  {
    id: "social",
    name: "Social Media Tools for Event",
    image: "/products/scm.png",
    description:
      "We can use social media tools to help improve your marketing campaign Ex. Line OA, Facebook, and Instagram.",
    accent: "#4A32FF",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#56"
  },
  {
    id: "photobooth",
    name: "Photobooth / Kiosk (Customizible)",
    image: "/products/kiosk.png",
    description:
      "Photobooth makes your event more outstanding and attractive by allowing users to take pictures and print out instantly",
    accent: "#2233CC",
    link: "https://www.canva.com/design/DAGrhqIpyKM/FkG1h34DhZAuM5ufTXjwYg/view#46"
  },
];

function getCardStyle(offset: number) {
  const isCenter = offset === 0;
  // side cards sit further back and to the side
  const translateX = offset * 75;   // % of card width, horizontal spread
  const translateZ = isCenter ? 0 : -120;
  const rotateY = offset * -15;
  const scale = isCenter ? 1 : 0.82;
  const opacity = isCenter ? 1 : 0.55;
  const zIndex = isCenter ? 10 : 5;

  return {
    transform: `perspective(1200px) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex,
    transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    filter: isCenter ? "brightness(1)" : "brightness(0.5) saturate(0.6)",
  };
}

export default function FeaturedProducts() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + products.length) % products.length);
  const next = () => setCurrent((c) => (c + 1) % products.length);

  const resetAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 4500);
  };

  useEffect(() => {
    resetAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  /* ── Listen for Top Navbar jumps ── */
  useEffect(() => {
    const handleNavJump = (e: any) => {
      const targetId = e.detail?.targetId;
      const idx = products.findIndex(p => p.id === targetId);
      if (idx !== -1) {
        setCurrent(idx);
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
        resetAuto();
      }
    };
    window.addEventListener("nav-jump", handleNavJump);
    return () => window.removeEventListener("nav-jump", handleNavJump);
  }, []);

  const handleDragStart = (x: number) => { setDragging(true); setDragStart(x); };
  const handleDragEnd = (x: number) => {
    if (!dragging) return;
    setDragging(false);
    const delta = x - dragStart;
    if (delta < -50) { next(); resetAuto(); }
    else if (delta > 50) { prev(); resetAuto(); }
  };

  const getOffset = (idx: number) => {
    let offset = idx - current;
    if (offset > products.length / 2) offset -= products.length;
    if (offset < -products.length / 2) offset += products.length;
    return offset;
  };

  return (
    /* ── Section: warm peach gradient, matches Figma ── */
    <section
      id="products"
      className="py-20 relative overflow-hidden"
      style={{ background: "#000000" }}
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-8">

        {/* ── Heading ── */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white">
            Featured <span style={{ color: "#4A32FF" }}>Products</span>
          </h2>
        </div>

        {/* ── 3D Carousel stage ──
              Height is fixed so scaled cards never exceed the container.
              Cards are 420 px tall; center scale = 1 so max rendered = 420 px. */}
        <div
          className="relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
          style={{ height: "460px" }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        >
          {/* ◀ Left arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); resetAuto(); }}
            aria-label="Previous"
            className="absolute left-2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0
                   11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" />
            </svg>
          </button>

          {/* ── Cards ── */}
          {products.map((product, idx) => {
            const offset = getOffset(idx);
            if (Math.abs(offset) > 1) return null;
            const isCenter = offset === 0;

            return (
              <div
                key={product.id}
                onClick={() => { if (!isCenter) { setCurrent(idx); resetAuto(); } }}
                className="absolute rounded-[28px] cursor-pointer"
                style={{
                  ...getCardStyle(offset),
                  width: "340px",
                  height: "420px",
                  background: "#0C0F0F",
                  overflow: "hidden",
                  boxShadow: isCenter
                    ? `0 24px 60px -8px ${product.accent}60, 0 0 0 1px ${product.accent}30`
                    : "0 8px 24px rgba(0,0,0,0.5)",
                }}
              >
                {/* Product photo */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  draggable={false}
                  className="object-cover object-top pointer-events-none"
                  sizes="340px"
                  style={{ opacity: 0.65 }}
                />

                {/* Dark bottom gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, transparent 70%)",
                  }}
                />

                {/* Text content — always stays in bottom 160 px */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10">
                  <h3
                    className="text-white font-bold mb-1"
                    style={{
                      fontFamily: "'Chiron GoRound TC','Poppins',sans-serif",
                      fontSize: "17px",
                      lineHeight: "24px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-white/65 mb-3"
                    style={{
                      fontSize: "12px",
                      lineHeight: "18px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </p>
                  <a
                    href={product.link || "#contact"}
                    target={product.link ? "_blank" : undefined}
                    rel={product.link ? "noopener noreferrer" : undefined}
                    className="inline-block text-white font-semibold rounded-full px-4 py-1.5"
                    style={{
                      fontSize: "12px",
                      fontFamily: "'Poppins',sans-serif",
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.28)",
                    }}
                  >
                    See Details
                  </a>
                </div>
              </div>
            );
          })}

          {/* ▶ Right arrow */}
          <button
            onClick={() => { next(); resetAuto(); }}
            aria-label="Next"
            className="absolute right-2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0
                   111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
            </svg>
          </button>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex gap-2.5 items-center justify-center mt-5">
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => { setCurrent(idx); resetAuto(); }}
              aria-label={`Go to ${p.name}`}
              className="rounded-full transition-all"
              style={{
                width: idx === current ? "26px" : "8px",
                height: "8px",
                background: idx === current ? "#4A32FF" : "rgba(255,255,255,0.2)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
