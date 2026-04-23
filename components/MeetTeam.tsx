"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MeetTeam() {
  return (
    <section id="team" className="bg-black overflow-hidden">
      {/* Text header — centered, black bg */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pt-20 pb-5 text-center bg-black"
      >
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
        <p className="mt-4 text-white/70 text-base max-w-lg mx-auto px-1">
          Where creativity meets event technology.
          <br />
          One team, All solutions, From planning to post-event success.
        </p>
      </motion.div>

      {/* Team photo — full width, black & white style with blue glow on left */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full" 
        style={{ height: "clamp(340px, 45vw, 550px)" }}
      >
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
      </motion.div>

    </section>
  );
}
