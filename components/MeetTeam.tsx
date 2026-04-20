"use client";

import Image from "next/image";

export default function MeetTeam() {
  return (
    <section id="team" className="bg-black overflow-hidden">
      {/* Text header — centered, black bg */}
      <div className="pt-20 pb-5 text-center bg-black">
        <h2
          className="font-extrabold uppercase tracking-tight leading-none"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            color: "#ffffff",
          }}
        >
          MEET OUR{" "}
          <span style={{ color: "#4A32FF" }}>TEAM</span>
        </h2>
        <p className="mt-4 text-white/60 text-base max-w-lg mx-auto px-4">
          Where creativity meets event technology.
          <br />
          One team. All solutions. From planning to post-event success.
        </p>
      </div>

      {/* Team photo — full width, black & white style with blue glow on left */}
      <div className="relative w-full" style={{ height: "clamp(340px, 45vw, 550px)" }}>
        {/* Blue glow on left — matches Figma's indigo radial on left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-2/5 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at left center, rgba(74,50,255,0.35) 0%, transparent 65%)",
          }}
        />

        <Image
          src="/team/teamm.png"
          alt="IN2IT Team"
          fill
          className="object-cover object-center"
          style={{ filter: "grayscale(100%)" }}
        />

        {/* Dark fade at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 z-10"
          style={{
            background: "linear-gradient(to top, #000000 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Stats Block */}
      <div className="w-full relative z-20 py-16" style={{ background: "linear-gradient(to right, #4A32FF, #8A2BE2)" }}>
        <div className="max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row items-center justify-around gap-12 text-center text-white">
          <div>
            <div className="text-5xl md:text-6xl font-extrabold mb-3">500+</div>
            <div className="text-xs tracking-[0.15em] uppercase font-semibold text-white/90">Events Delivered</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-extrabold mb-3">50+</div>
            <div className="text-xs tracking-[0.15em] uppercase font-semibold text-white/90">Global Clients</div>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-extrabold mb-3">10+</div>
            <div className="text-xs tracking-[0.15em] uppercase font-semibold text-white/90">Years Expertise</div>
          </div>
        </div>
      </div>
    </section>
  );
}
