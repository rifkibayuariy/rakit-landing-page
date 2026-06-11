"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "01",
    name: "Zerick Syahputra",
    role: "Mahasiswa Informatika",
    content:
      "E-book nya sangat membantu belajar dari dasar. Penjelasannya mudah dipahami, langkah perakitannya terstruktur, dan source code langsung siap dieksekusi.",
  },
  {
    id: "02",
    name: "Arya Andrean Pratama",
    role: "IoT Enthusiast",
    content:
      "Jasa pembuatan project custom di sini andal. Logika sirkuit mikrokontroler dieksekusi tanpa latensi tinggi dan cangkang mekaniknya sangat presisi.",
  },
  {
    id: "03",
    name: "Pingkan Ramadhani",
    role: "Mahasiswa Teknik Elektro",
    content:
      "Dukungan fabrikasi prototype cetak 3D menyelamatkan tugas akhir saya. Akurasi dimensinya presisi dan hasil cetakannya kokoh standar industri.",
  },
  {
    id: "04",
    name: "Rifki Bayu Ariyanto",
    role: "Web Developer",
    content:
      "Integrasi antara modul hardware dan arsitektur platform web di ekosistem ini rapi sekali. Dokumentasinya komprehensif, pengerjaan cepat, dan minim bug.",
  },
];

// Ikon Bintang Presisi Tinggi
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-[#D67341]"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 45, // Diperlambat agar lebih tenang dan elegan
        repeat: -1,
      });

      const handleEnter = () =>
        gsap.to(tween, { timeScale: 0.15, duration: 1, ease: "power2.out" });
      const handleLeave = () =>
        gsap.to(tween, { timeScale: 1, duration: 1, ease: "power2.in" });

      track.addEventListener("mouseenter", handleEnter);
      track.addEventListener("mouseleave", handleLeave);

      return () => {
        track.removeEventListener("mouseenter", handleEnter);
        track.removeEventListener("mouseleave", handleLeave);
        tween.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white py-32 md:py-48 overflow-hidden border-t border-neutral-900"
    >
      {/* Latar Belakang Murni */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/stardust.png")',
        }}
      />

      {/* =========================================
          HEADER EDITORIAL
      ========================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 mb-24 md:mb-32">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#D67341] uppercase">
              Umpan Balik Sistem
            </span>
            <div className="w-12 h-px bg-neutral-800" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1] max-w-3xl">
            Dipercaya oleh mereka yang merakit{" "}
            <span className="text-neutral-500 italic">realitas.</span>
          </h2>
        </div>
      </div>

      {/* =========================================
          FRAMELESS MARQUEE TRACK
      ========================================= */}
      <div className="relative w-full z-10 cursor-grab active:cursor-grabbing">
        {/* CSS Masking untuk Fade Out Mulus di Ujung Layar */}
        <div className="w-full overflow-hidden pb-8">
          <div
            ref={trackRef}
            className="flex flex-row w-max will-change-transform items-stretch"
          >
            {[...testimonialsData, ...testimonialsData].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                // Tanpa background, murni pemisah garis vertikal (border-r)
                className="w-[85vw] sm:w-150 md:w-175 flex flex-col justify-between shrink-0 px-6 md:px-12 group"
              >
                <div className="bg-white px-16 py-12">
                  <div className="flex flex-col">
                    {/* Bintang Penanda Testimoni (Sangat minimalis) */}
                    <div className="flex items-center gap-1.5 mb-8 opacity-80">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>

                    {/* Teks Kutipan */}
                    <h3 className="text-xl sm:text-xl md:text-2xl font-light tracking-tight text-neutral-950 leading-relaxed md:leading-[1.4] mb-16">
                      &ldquo;{item.content}&rdquo;
                    </h3>
                  </div>

                  {/* Identitas Penulis */}
                  <div className="flex items-center gap-6 mt-auto">
                    {/* Aksen Tembaga Pengganti Avatar */}
                    <div className="w-12 h-px bg-[#D67341]/40 group-hover:bg-[#D67341] transition-colors duration-500" />

                    <div className="flex flex-col">
                      <span className="text-base font-medium text-neutral-950 tracking-wide">
                        {item.name}
                      </span>
                      <span className="text-[10px] md:text-xs text-neutral-500 font-mono tracking-widest uppercase mt-1">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
