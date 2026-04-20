"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Services: {
    href: "#services",
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
    ]
  },
  Products: {
    href: "#products",
    items: [
      { label: "NFC / DIGITAL BADGES (Customizable)", id: "nfc" },
      { label: "Social Media Tools for Event", id: "social" },
      { label: "Photobooth / Kiosk (Customizable)", id: "photobooth" },
    ]
  },
};

export default function Footer() {
  return (
    // ... wrapping unchanged sections
    <footer className="bg-[#050314] pt-16 pb-8 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1.5fr] gap-12 mb-12">

          {/* Brand column — matches Figma left column */}
          <div>
            <div className="mb-4">
              <Image src="/logo/in2it-logo.svg" alt="IN2IT Logo" width={88} height={43} className="object-contain" />
            </div>

            <p className="text-white/60 text-sm leading-relaxed max-w-[280px]">
              Revolutionizing event technology for the digital age. Trusted by thousands of organizers globally.
            </p>

            {/* Social icons — Figma shows 3 circular outlined icons */}
            <div className="flex gap-3 mt-6">
              {/* Share icon */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#4A32FF] transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </a>
              {/* Linkedin icon */}
              <a href="https://th.linkedin.com/company/in2it-company" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#4A32FF] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* Facebook icon */}
              <a href="https://www.facebook.com/in2itservice/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#4A32FF] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns — Figma: "SERVICES" and "PRODUCTS" in Electric Indigo uppercase */}
          {Object.entries(footerLinks).map(([title, section]) => (
            <div key={title}>
              {/* Section header: Figma uses Electric Indigo #4A32FF, uppercase, bold, small tracking */}
              <h4 className="font-bold text-sm tracking-widest uppercase mb-5" style={{ color: "#4A32FF" }}>
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.items.map((link) => (
                  <li key={link.id}>
                    <a
                      href={section.href}
                      onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent('nav-jump', { detail: { targetId: link.id } }));
                      }}
                      className="text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — Figma: separator line then centered copyright text */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-xs">
            © Copyright 2018 IN2IT CO.,LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
