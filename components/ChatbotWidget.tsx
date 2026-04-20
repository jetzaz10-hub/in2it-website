"use client";

import { useState } from "react";
import Image from "next/image";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div
          className="w-[340px] rounded-3xl shadow-2xl overflow-hidden"
          style={{ background: "#e8e8e8" }}
        >
          {/* Header — Electric Indigo gradient */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{
              background: "linear-gradient(135deg, #3B2DCC 0%, #4A32FF 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              {/* Logo in header - KEEPING SVG LOGO */}
              <div className="flex items-center bg-white/10 px-2 py-1.5 rounded-xl border border-white/10">
                <Image src="/logo.svg" alt="IN2IT Logo" width={60} height={30} className="invert brightness-0" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-widest leading-none">CHAT</span>
                <span className="text-white font-bold text-sm tracking-widest leading-none">BOT</span>
              </div>
            </div>
            {/* Window controls */}
            <div className="flex items-center gap-3">
              <button className="text-white/70 hover:text-white" aria-label="Minimize">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <button className="text-white/70 hover:text-white" aria-label="More">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
                </svg>
              </button>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white" aria-label="Close">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat body with IN2IT watermark */}
          <div className="relative px-4 pt-5 pb-3 min-h-[260px]" style={{ background: "#e8e8e8" }}>
            {/* Watermark logo - KEEPING SVG LOGO */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
              style={{ opacity: 0.1 }}
            >
              <Image src="/logo.svg" alt="IN2IT Logo" width={140} height={70} className="grayscale brightness-0" />
              <span className="text-[8px] font-bold text-black/50 tracking-[0.4em] uppercase mt-2">IN2IT COMPANY</span>
            </div>

            {/* Bot message */}
            <div className="flex items-start gap-3 mb-4 relative z-10">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "#4A32FF" }}
              >
                {/* RESTORING Robot icon */}
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a2 2 0 012 2v1h3a2 2 0 012 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h3V4a2 2 0 012-2zm0 5.5a1 1 0 100 2 1 1 0 000-2zM9 9.5a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              </div>
              <div
                className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-gray-800 max-w-[200px]"
                style={{ background: "#ffffff" }}
              >
                Hi! This is IN2IT Chatbot.<br />How can i help you?
              </div>
            </div>

            {/* Typing indicator */}
            <div className="flex justify-end mb-4 relative z-10">
              <div
                className="px-4 py-3 rounded-2xl rounded-tr-sm flex items-center gap-1"
                style={{ background: "#ffffff" }}
              >
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div className="text-center py-2 text-xs text-gray-500" style={{ background: "#e8e8e8" }}>
            <span className="hover:text-gray-700 cursor-pointer">Help</span>
            <span className="mx-2">|</span>
            <span className="hover:text-gray-700 cursor-pointer">Contact Admin</span>
          </div>

          {/* Input area */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200" style={{ background: "#ffffff" }}>
            <input
              type="text"
              placeholder="Any Question? Ex. How can I contact your team?"
              className="flex-1 text-xs text-gray-500 placeholder:text-gray-400 focus:outline-none bg-transparent"
            />
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white"
              style={{ background: "#4A32FF" }}
              aria-label="Send"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating trigger button — RESTORING Speech bubble icon */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        style={{ background: "#4A32FF" }}
        aria-label="Open chatbot"
      >
        {open ? (
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 11H7v-2h6v2zm3-4H7V7h9v2z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
