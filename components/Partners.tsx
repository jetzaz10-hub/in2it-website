import Image from "next/image";

const ANIMATION = "marquee-partners 30s linear infinite";

const logos = [
  "/partners/partner_1.png",
  "/partners/partner_2.png",
  "/partners/partner_3.png",
  "/partners/partner_4.png",
  "/partners/partner_5.png",
  "/partners/partner_6.png",
  "/partners/partner_7.png",
  "/partners/partner_8.png",
  /* Remove trailing blank/invisible logos */
];

export default function Partners() {
  /* Triple the array so there's always content visible on both sides */
  const track = [...logos, ...logos, ...logos];

  return (
    <section className="bg-white py-14 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 mb-10">
        <h2 className="text-center text-sm font-bold tracking-[0.4em] text-gray-400 uppercase">
          TRUSTED PARTNERS
        </h2>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }} />

        {/* Scrolling track */}
        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0"
            style={{ animation: ANIMATION }}
          >
            {track.map((src, i) => (
              <div
                key={i}
                className="shrink-0 h-16 flex items-center justify-center px-6 transition-transform hover:scale-105"
              >
                <img src={src} alt={`Partner ${i}`} className="h-12 md:h-14 w-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>

          {/* Duplicate for seamless loop */}
          <div
            className="flex shrink-0"
            aria-hidden="true"
            style={{ animation: ANIMATION }}
          >
            {track.map((src, i) => (
              <div
                key={`dup-${i}`}
                className="shrink-0 h-16 flex items-center justify-center px-6 transition-transform hover:scale-105"
              >
                <img src={src} alt={`Partner ${i} dup`} className="h-12 md:h-14 w-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
