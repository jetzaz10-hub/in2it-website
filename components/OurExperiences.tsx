"use client";

import { useEffect, useRef } from "react";

export default function OurExperiences() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              console.log("Autoplay blocked by browser policy");
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experiences" className="py-8 bg-black">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Heading */}
        <div className="mb-6 text-center lg:text-left">
          <h2 className="section-heading text-white">
            Our <span className="text-[#F97316]">Experiences</span>
          </h2>
          <p className="mt-2 text-white/60 text-lg max-w-2xl mx-auto lg:mx-0">
            We partner with corporate, government, and international organizations,
            supporting events up to 100,000+ participants.
          </p>
        </div>

        {/* Large Video Frame */}
        <div className="relative w-full aspect-video lg:aspect-[21/8] rounded-[2rem] overflow-hidden group shadow-2xl border border-white/5 bg-neutral-00">
          <video
            ref={videoRef}
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=900&fit=crop"
            loop
            muted
            playsInline
            controls
            className="w-full h-full object-cover"
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.canva.com/design/DAG9n3Xa6_Y/XvXea3m4LcLRZkM4ozQWkg/view#1"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "linear-gradient(to right, #FF6600, #FF9900)" }}
          >
            View Portfolio
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
