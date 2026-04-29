"use client";

import { motion } from "framer-motion";

const contactItems = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#in2it-icon-grad)" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    label: "LEAD CONSULTANT",
    value: "Teerawee Insorn [Poii]",
    href: "https://www.linkedin.com/in/teerawee-insorn-032b18115/",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#in2it-icon-grad)" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "EMAIL",
    value: "service@in2it.co.th",
    href: "mailto:service@in2it.co.th",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#in2it-icon-grad)" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "PHONE",
    value: "+66 87 458 8833",
    href: "tel:+66874588833",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#in2it-icon-grad)" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "LOCATION",
    value: "Chiang Mai, Thailand",
    href: "https://maps.app.goo.gl/Ks9dDHsbVPWDeiRj9",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="max-w-[1280px] mx-auto px-8"
      >
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Ready to Elevate Your Next<br />
              <span style={{ color: "#4A32FF" }}> EVENT ?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-md">
              Contact our team for a specialized consultation and a tailored
              proposal for your event technology needs.
            </p>

            {/* Shared SVG Gradient for Icons */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
              <defs>
                <linearGradient id="in2it-icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6600" />
                  <stop offset="100%" stopColor="#4A32FF" />
                </linearGradient>
              </defs>
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0D0D11]/75 backdrop-blur-lg border border-white/10 flex items-center justify-center shrink-0 shadow-[0_8px_25px_rgba(0,0,0,0.6)]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-white font-semibold text-base hover:text-[#FF6600] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-semibold text-base">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 rounded-none overflow-hidden h-[320px] lg:h-[380px] w-full border border-white/10 shadow-2xl"
          >
            <iframe
              title="IN2IT Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3778.0725262915894!2d98.9424547!3d18.7502972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da311f30471e43%3A0x1bcce57cf5e3e91a!2sIN2IT%20Company%20Limited!5e0!3m2!1sth!2sth!4v1776653858514!5m2!1sth!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
