"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";


const navLinks = [
  {
    label: "Services",
    href: "#services",
    hasDropdown: true,
    items: [
      { label: "Registration System", id: "registration" },
      { label: "Website Design", id: "website" },
      { label: "EDM", id: "edm" },
      { label: "Ticket Event", id: "ticket" },
      { label: "IOT & Hardware Design", id: "iot" },
      { label: "Event Organizer", id: "organizer" },
      { label: "Graphic Design", id: "graphic" },
      { label: "Social Media Tools For Event", id: "scm" },
      { label: "Live Streaming Service", id: "streaming" },
    ],
  },
  {
    label: "Products",
    href: "#products",
    hasDropdown: true,
    items: [
      { label: "NFC / Digital BADGES", id: "nfc" },
      { label: "Social Media Tools for Event", id: "social" },
      { label: "Photobooth / Kiosk", id: "photobooth" },
    ],
  },
  { label: "Project", href: "#experiences", hasDropdown: false, items: [] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [highlighterStyle, setHighlighterStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, label: string) => {
    const el = e.currentTarget;
    setOpenMenu(label);
    setHoveredLink(label);
    setHighlighterStyle({
      left: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
    setHoveredLink(null);
    setHighlighterStyle(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <style>{`
        @keyframes breathingGlow {
          0% { box-shadow: 0 0 5px rgba(74, 50, 255, 0.4), 0 0 10px rgba(255, 51, 102, 0.2); }
          50% { box-shadow: 0 0 20px rgba(74, 50, 255, 0.6), 0 0 30px rgba(255, 51, 102, 0.4); }
          100% { box-shadow: 0 0 5px rgba(74, 50, 255, 0.4), 0 0 10px rgba(255, 51, 102, 0.2); }
        }
        .animate-glow-pulse {
          animation: breathingGlow 3s ease-in-out infinite;
        }
      `}</style>
      <nav
        className={`
          w-full max-w-[1180px] rounded-full flex items-center justify-between px-8 py-3.5
          bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative
        `}
      >
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex-shrink-0 flex items-center justify-center cursor-pointer"
          >
            <Image src="/logo.svg" alt="IN2IT Logo" width={88} height={43} priority className="object-contain" />
          </Link>

          {/* Desktop Nav - Left Aligned */}
          <div className="hidden md:flex items-center gap-2 relative">
            {/* Nav Highlighter Pill */}
            <div 
              className="absolute h-10 bg-gray-100 rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none z-0"
              style={{
                left: highlighterStyle.left,
                width: highlighterStyle.width,
                opacity: highlighterStyle.opacity,
              }}
            />

            {navLinks.map((link, idx) => (
              <div
                key={link.label}
                className="relative z-10"
                onMouseEnter={(e) => handleMouseEnter(e, link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={link.href}
                  className={`
                    flex items-center gap-1.5 px-5 py-2 text-[13px] font-bold tracking-wider uppercase transition-colors duration-300
                    ${hoveredLink === link.label ? "text-[#4A32FF]" : "text-gray-800"}
                  `}
                >
                  <span className="text-[9px] opacity-30 font-black mr-0.5">0{idx + 1}</span>
                  {link.label}
                  {link.hasDropdown && (
                    <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${openMenu === link.label ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  )}
                </a>
                
                {/* Dropdown menu */}
                {link.hasDropdown && openMenu === link.label && (
                  <div className="absolute top-[100%] left-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                      {link.items.map((item) => (
                        <a
                          key={item.id}
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new CustomEvent('nav-jump', { detail: { targetId: item.id } }));
                          }}
                          className="block px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#4A32FF] transition-all border-l-2 border-transparent hover:border-[#4A32FF]"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA + Mobile menu toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://in2it-service.com/registration/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-white text-[13px] font-black uppercase tracking-widest px-8 py-3 rounded-full transition-all hover:scale-[1.05] active:scale-95 animate-glow-pulse"
            style={{ background: "linear-gradient(to right, #FF6600, #FF3366, #4A32FF)" }}
          >
            Sale Site
          </a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */ }
  {
    mobileOpen && (
      <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-100 py-4 px-4 md:hidden">
        {navLinks.map((link) => (
          <div key={link.label}>
            <a
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-2 text-sm font-semibold text-gray-800 border-b border-gray-100 last:border-0"
            >
              {link.label}
            </a>
            {link.hasDropdown && (
              <div className="pl-4 pb-2">
                {link.items.map((item) => (
                  <a
                    key={item.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('nav-jump', { detail: { targetId: item.id } }));
                      setMobileOpen(false);
                    }}
                    className="block py-2 text-sm text-gray-600"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        <a
          href="https://in2it-service.com/registration/"
          className="mt-3 block text-center text-white text-sm font-semibold px-5 py-3 rounded-full"
          style={{ background: "linear-gradient(135deg, #4634F8 0%, #6CE8FD 100%)" }}
        >
          Sale Site
        </a>
      </div>
    )
  }
    </header >
  );
}
