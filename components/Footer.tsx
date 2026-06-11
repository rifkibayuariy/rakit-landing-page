"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<string>("");

  // Jam Real-time untuk kesan Terminal System
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", {
          hour12: false,
          timeZone: "Asia/Jakarta",
        }) + " WIB",
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !marqueeRef.current) return;

      // 1. Efek Marquee Berjalan (Kinetic Typography)
      const marquee = marqueeRef.current?.querySelector(".marquee-track");

      if (marquee) {
        gsap.to(marquee, {
          x: "-50%",
          ease: "none",
          duration: 35,
          repeat: -1,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // 2. Animasi Reveal Teks Email Raksasa
      tl.fromTo(
        ".massive-text span",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.2, stagger: 0.1, ease: "expo.out" },
      );

      // 3. Animasi munculnya Grid Bawah
      tl.fromTo(
        ".footer-block",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=0.8",
      );
    },
    { scope: containerRef },
  );

  return (
    // Bagian atas melengkung (rounded-t-[3rem]) adalah tren absolut di web design 2024+
    <footer
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white overflow-hidden mt-[-2rem] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* Background Noise Minimalis */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/stardust.png")',
        }}
      />

      {/* =========================================
              1. MANIFESTO MARQUEE
          ========================================= */}

      <div
        ref={marqueeRef}
        className="relative border-b border-neutral-900 overflow-hidden"
      >
        <div className="absolute left-0 top-0 h-full w-32 md:w-48 z-10 pointer-events-none bg-linear-to-r from-[#050505] to-transparent" />

        <div className=" absolute right-0 top-0 h-full w-32 md:w-48 z-10 pointer-events-none bg-linear-to-l from-[#050505] to-transparent" />

        <div className="py-8 overflow-hidden">
          <div className="marquee-track flex w-max items-center">
            {[
              ...Array(2).fill([
                "ENGINEERED FOR REALITY",
                "FROM IDEA TO PROTOTYPE",
                "CUSTOM MICROCONTROLLER SYSTEMS",
                "DIGITAL FABRICATION",
                "LEARN • BUILD • SHIP",
              ]),
            ]
              .flat()
              .map((text, index) => (
                <div
                  key={index}
                  className="
              flex
              items-center
              shrink-0
            "
                >
                  <span
                    className="
                px-8
                md:px-12
                text-xl
                md:text-2xl
                leading-none
                font-light
                tracking-tight
                text-white
              "
                  >
                    {text}
                  </span>

                  <div
                    className="
                w-2
                h-2
                bg-[#D67341]
                mx-2
                md:mx-4
                shrink-0
              "
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-12">
        {/* =========================================
            2. THE MASSIVE "MAILTO" CTA (Antigravity Style)
        ========================================= */}
        <div className="w-full mb-24 md:mb-40">
          <p className="text-sm md:text-base font-mono tracking-[0.2em] text-neutral-500 uppercase mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-[#D67341]"></span>
            Kirimkan Cetak Biru Anda
          </p>

          <a
            href="mailto:hello@rakit.id"
            className="group block w-max relative overflow-hidden"
          >
            {/* Teknik CSS untuk memotong animasi teks yang muncul dari bawah */}
            <div className="massive-text flex overflow-hidden">
              <span className="inline-block text-[12vw] sm:text-[10vw] md:text-[8vw] font-medium tracking-tighter leading-[0.8] text-white group-hover:text-[#D67341] transition-colors duration-500 pr-4">
                hello@rakit.id
              </span>
            </div>

            {/* Garis bawah interaktif yang menyapu dari kiri ke kanan */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] md:h-[5px] bg-[#D67341] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-expo"></div>
          </a>
        </div>

        {/* =========================================
            3. BRUTALIST ARCHITECTURAL GRID
        ========================================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 border-t border-neutral-900 pt-16">
          {/* Block 1: Lokasi & Status */}
          <div className="footer-block flex flex-col">
            <h2 className="text-2xl md:text-xl font-bold tracking-widest text-white uppercase mb-6">
              RAKIT
            </h2>
          </div>

          {/* Block 2: Navigasi Utama */}
          <div className="footer-block flex flex-col">
            <h4 className="text-xs font-mono tracking-widest text-neutral-600 uppercase mb-6">
              Indeks
            </h4>
            <ul className="flex flex-col gap-4">
              {["Beranda", "Layanan", "Portofolio", "Basis Data FAQ"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xl md:text-2xl font-light text-neutral-400 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Block 3: Sosial Media Raksasa (Interactive) */}
          <div className="footer-block flex flex-col lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-600 uppercase mb-6">
              Jaringan
            </h4>
            <div className="flex flex-col border-t border-neutral-900">
              {[
                { name: "Instagram", url: "#" },
                { name: "YouTube", url: "#" },
                { name: "GitHub", url: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="flex items-center justify-between py-6 border-b border-neutral-900 group hover:border-[#D67341] transition-colors duration-500"
                >
                  <span className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-500 group-hover:text-white transition-colors duration-500">
                    {social.name}
                  </span>
                  {/* Panah Diagonal Raksasa */}
                  <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-[#D67341] group-hover:border-[#D67341] transition-all duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-neutral-500 group-hover:text-black group-hover:rotate-45 transition-all duration-500"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          4. THE SYSTEM BOTTOM BAR (Terminal Style)
      ========================================= */}
      <div className="relative z-20 w-full bg-[#020202] py-6 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-neutral-900">
        <div className="flex items-center gap-2">
          <p className="text-[12px] md:text-md text-neutral-600 font-medium tracking-wide">
            &copy; 2026 RAKIT DIGITAL.
          </p>
        </div>

        {/* Informasi Sistem & Waktu dengan gaya Terminal */}
        <div className="flex items-center gap-6 text-[10px] md:text-xs font-mono tracking-widest text-neutral-600 uppercase">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">LAT/LONG:</span>
            <span className="text-white">7.71°S 110.60°E</span>
          </div>
          <div className="hidden sm:block w-px h-3 bg-neutral-800" />
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">SYS_TIME:</span>
            <span className="tabular-nums w-[70px] text-right text-[#D67341]">
              {time}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
