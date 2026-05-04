"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothScrollTo } from "../lib/smoothScroll";

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
      { label: "Festival Tech", id: "festival" },
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
      { label: "Social Media Tools for Event", id: "social-product" },
      { label: "Photobooth / Kiosk", id: "photobooth" },
    ],
  },
  { label: "Project", href: "#experiences", hasDropdown: false, items: [] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Gallery modal listener
  useEffect(() => {
    const handleGalleryModal = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsModalOpen(customEvent.detail.isOpen);
      setIsVisible(!customEvent.detail.isOpen);
    };
    window.addEventListener('gallery-modal-change', handleGalleryModal);
    return () => window.removeEventListener('gallery-modal-change', handleGalleryModal);
  }, []);

  // Mouse hover at top to reveal navbar + auto-hide when mouse leaves
  useEffect(() => {
    if (isModalOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      const inHero = window.scrollY < 300;

      if (e.clientY <= 80) {
        // Mouse near top → show navbar, cancel pending hide
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
          hideTimerRef.current = null;
        }
        setIsVisible(true);
      } else if (!inHero && e.clientY > 150 && !openMenu) {
        // Mouse moved away → schedule hide (only outside hero)
        if (!hideTimerRef.current) {
          hideTimerRef.current = setTimeout(() => {
            if (window.scrollY >= 300) setIsVisible(false);
            hideTimerRef.current = null;
          }, 1500);
        }
      }
    };

    // Throttle mousemove to reduce re-renders (fires at most every 100ms)
    let lastCall = 0;
    const throttled = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCall < 100) return;
      lastCall = now;
      handleMouseMove(e);
    };

    window.addEventListener('mousemove', throttled, { passive: true });
    return () => {
      window.removeEventListener('mousemove', throttled);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isModalOpen, openMenu]);

  // Scroll handler for navbar hide/show
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isModalOpen || (window as any).__navJumpActive) {
        lastScrollY = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setOpenMenu(null);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isModalOpen]);

  // Programmatic scroll helper — sets flag, scrolls, cleans up
  const doScroll = useCallback((targetY: number) => {
    (window as any).__navJumpActive = true;
    smoothScrollTo(targetY);
    setTimeout(() => { (window as any).__navJumpActive = false; }, 1500);
  }, []);

  // Nav-jump for dropdown sub-items (dispatches event for OurServices/FeaturedProducts)
  const handleNavJump = useCallback((id: string) => {
    (window as any).__navJumpActive = true;
    window.dispatchEvent(new CustomEvent('nav-jump', { detail: { targetId: id } }));
    setMobileOpen(false);
    // Delay menu close so dropdown exit animation doesn't interfere
    setTimeout(() => setOpenMenu(null), 50);
    setTimeout(() => { (window as any).__navJumpActive = false; }, 1500);
  }, []);

  // Click handler for parent section links (Services, Products, Project)
  const handleSectionClick = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    const offset = href === "#products" ? 20 : 100;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    doScroll(top);
    setTimeout(() => {
      setOpenMenu(null);
      setMobileOpen(false);
    }, 100);
  }, [doScroll]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-6 pointer-events-none transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div ref={navRef} className={`
        relative w-full max-w-7xl flex items-center justify-between px-8 py-3.5
        bg-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-full
        transition-all duration-500 pointer-events-auto shadow-2xl
        ${scrolled ? "max-w-5xl translate-y-[-10px] bg-gray-900/70" : ""}
      `}>
        {/* Logo (Scroll to Top) */}
        <div 
          onClick={() => doScroll(0)}
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          role="button"
          aria-label="Scroll to top"
        >
          <Image
            src="/logo/in2it-logoo.png"
            alt="IN2IT Logo"
            width={120}
            height={40}
            className="w-auto h-10 object-contain"
            draggable={false}
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative group"
              onMouseEnter={() => link.hasDropdown && setOpenMenu(link.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.href.startsWith("#")) {
                    handleSectionClick(link.href);
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-[14px] font-semibold text-white/80 hover:text-white transition-colors uppercase tracking-wider"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openMenu === link.label ? "rotate-180" : ""}`} />
                )}
              </a>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {link.hasDropdown && openMenu === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 pt-2 w-64"
                  >
                    <div className="bg-gray-900/90 backdrop-blur-2xl border border-gray-700 rounded-2xl p-2 shadow-2xl">
                      {link.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={(e) => { e.stopPropagation(); handleNavJump(item.id); }}
                          className="w-full text-left px-4 py-2.5 text-md font-medium text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-all"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://in2it-service.com/registration/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-[13px] font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all hover:scale-[1.05] active:scale-95 shadow-[0_0_20px_rgba(255,102,0,0.3)]"
            style={{ background: "linear-gradient(to right, #FF6600, #FF3366)" }}
          >
            Sale Site
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-white/80 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-3xl p-6 lg:hidden pointer-events-auto shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.label} className="flex flex-col gap-2">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        handleSectionClick(link.href);
                      }
                      if (!link.hasDropdown) setMobileOpen(false);
                    }}
                    className="text-lg font-bold text-white/90"
                  >
                    {link.label}
                  </a>
                  {link.hasDropdown && (
                    <div className="flex flex-col gap-1 pl-4 border-l border-gray-800">
                      {link.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleNavJump(item.id)}
                          className="text-left py-2 text-sm text-white/60 hover:text-white"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <hr className="border-gray-800 my-2" />
              <a
                href="https://in2it-service.com/registration/"
                className="text-center text-white text-sm font-black uppercase tracking-widest py-4 rounded-full"
                style={{ background: "linear-gradient(to right, #FF6600, #FF3366)" }}
              >
                Sale Site
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
