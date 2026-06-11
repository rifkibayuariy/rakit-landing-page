"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const buttonContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        ".cta-reveal-left",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" },
      );

      tl.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" },
        "-=0.8",
      );
    },
    { scope: containerRef },
  );

  // ==========================================
  // EFEK MAGNETIC BUTTON (HANYA AKTIF DI DESKTOP)
  // ==========================================
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Mematikan efek magnet di layar mobile agar tidak merusak layout
    if (
      window.innerWidth < 768 ||
      !buttonRef.current ||
      !buttonContentRef.current
    )
      return;

    const { clientX, clientY } = e;
    const { height, width, left, top } =
      buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.to(buttonContentRef.current, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (
      window.innerWidth < 768 ||
      !buttonRef.current ||
      !buttonContentRef.current
    )
      return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    });
    gsap.to(buttonContentRef.current, {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] bg-[#050505] text-white py-24 md:py-48 overflow-hidden border-t border-neutral-900 flex items-center"
    >
      {/* Background Ambience */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/stardust.png")',
        }}
      />

      <div className="relative z-10 w-full max-w-360 mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 lg:gap-10">
        {/* =========================================
            KOLOM KIRI: TIPOGRAFI SOLID & ELEGAN
        ========================================= */}
        <div className="w-full lg:w-7/12 flex flex-col items-start text-left">
          <div className="cta-reveal-left flex items-center gap-4 mb-8 md:mb-12">
            <div className="w-2 h-2 bg-[#D67341] rounded-full animate-pulse" />
            <span className="text-xs font-mono tracking-[0.3em] text-neutral-500 uppercase">
              Protokol Eksekusi
            </span>
          </div>

          <h2 className="cta-reveal-left text-5xl sm:text-6xl md:text-[6rem] lg:text-[7.5rem] font-semibold tracking-tighter text-white leading-[1.05] mb-2 md:mb-4">
            Punya ide project?
          </h2>

          {/* Tipografi diperbaiki: Solid, kombinasi ketebalan, dan sedikit sentuhan serif */}
          <h3 className="cta-reveal-left text-3xl sm:text-4xl md:text-[4rem] lg:text-[4.5rem] font-light tracking-tight text-[#D67341] leading-[1.1] mb-8 md:mb-12">
            Konsultasikan gratis <br className="hidden md:block" />
            <span className="italic font-serif text-neutral-400">
              sekarang!!
            </span>
          </h3>

          <p className="cta-reveal-left text-base md:text-xl text-neutral-400 font-light leading-relaxed max-w-xl border-l-2 border-[#D67341] pl-5 md:pl-6 py-1 md:py-2">
            Tim kami siap membantu mewujudkan ide teknologi Anda dari layar
            abstraksi hingga fabrikasi nyata.
          </p>
        </div>

        {/* =========================================
            KOLOM KANAN: ADAPTIVE BUTTON
        ========================================= */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end pb-8 lg:pb-10">
          <a
            href="#"
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // Mobile: Lebar 100% dengan padding (Kapsul). Desktop: Lingkaran Statis 288x288 px.
            className="relative flex items-center justify-center w-full py-5 px-6 rounded-full md:w-64 md:h-64 lg:w-72 lg:h-72 md:py-0 bg-white text-black hover:bg-[#D67341] transition-colors duration-500 z-20 cursor-pointer group shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(214,115,65,0.3)] shrink-0"
          >
            <div
              ref={buttonContentRef}
              // Mobile: Menyamping (Row). Desktop: Atas-Bawah (Col).
              className="flex flex-row md:flex-col items-center justify-center text-center pointer-events-none gap-3 md:gap-4"
            >
              <span className="font-bold text-lg md:text-2xl lg:text-3xl tracking-tight leading-none group-hover:text-white transition-colors duration-500">
                Konsultasi <br className="hidden md:block" /> Gratis
              </span>

              {/* Mobile: Panah standar menghadap kanan. Desktop: Panah diagonal. */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 group-hover:text-white transition-all duration-500 group-hover:translate-x-2 md:group-hover:translate-x-0 md:group-hover:rotate-45"
              >
                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                  className="md:hidden"
                ></line>
                <polyline
                  points="12 5 19 12 12 19"
                  className="md:hidden"
                ></polyline>

                {/* Panah khusus desktop */}
                <line
                  x1="5"
                  y1="19"
                  x2="19"
                  y2="5"
                  className="hidden md:block"
                ></line>
                <polyline
                  points="9 5 19 5 19 15"
                  className="hidden md:block"
                ></polyline>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
