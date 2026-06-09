/* eslint-disable @next/next/no-img-element */

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const servicesData = [
  {
    id: "01",
    category: "Rekayasa Fisik",
    title: "Custom Microcontroller",
    desc: "Kami merancang otak dari sistem Anda. Pemrograman logika sirkuit spesifik yang dieksekusi tanpa latensi untuk mengontrol ekosistem IoT secara presisi.",
    specs: ["ESP32 / Arduino", "Custom Firmware", "Low-Latency Logic"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "02",
    category: "Fabrikasi Digital",
    title: "3D Printing & Enclosure",
    desc: "Sirkuit presisi menuntut cangkang yang solid. Transformasi model CAD digital menjadi wujud fisik menggunakan material kelas industri dengan akurasi dimensi tingkat tinggi.",
    specs: ["Rapid Prototyping", "Industrial Grade", "Micrometer Precision"],
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "03",
    category: "Digital Blueprint",
    title: "Project E-Book",
    desc: "Literatur premium dan cetak biru komprehensif lengkap dengan skema kabel dan source code siap pakai. Untuk Anda yang ingin merakit dan menguasai arsitekturnya sendiri.",
    specs: ["Step-by-step Guide", "Source Code Included", "Circuit Schematics"],
    image:
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const images = gsap.utils.toArray<HTMLElement>(".img-parallax");

      images.forEach((img) => {
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const contents = gsap.utils.toArray<HTMLElement>(".content-fade");

      contents.forEach((content) => {
        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    // Struktur utama: Flex row di desktop, column di mobile
    <section
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white flex flex-col md:flex-row border-t border-neutral-900"
    >
      {/* =========================================
          KOLOM KIRI: STICKY TITLE (Editorial Vibe)
      ========================================= */}
      <div className="w-full md:w-5/12 lg:w-1/2 relative md:border-r border-neutral-900">
        {/* Posisi Sticky: Menempel di layar tanpa menghentikan scroll global */}
        <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 md:py-0 z-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#D67341]" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#D67341] uppercase">
              Lini Perakitan
            </span>
          </div>

          {/* Tipografi Masif, sangat bersih */}
          <h2 className="text-5xl lg:text-[5.5rem] font-medium tracking-tight text-white leading-[1.05]">
            Membawa <br />
            <span className="text-neutral-500 italic">abstraksi</span> <br />
            ke realitas.
          </h2>

          <p className="mt-8 text-lg text-neutral-400 font-light max-w-sm leading-relaxed border-l border-neutral-800 pl-6">
            Tiga pilar layanan kami dirancang untuk memastikan ide Anda tidak
            berhenti hanya sebagai konsep digital.
          </p>
        </div>
      </div>

      {/* =========================================
          KOLOM KANAN: SCROLLING PANELS
      ========================================= */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="relative min-h-[80vh] md:min-h-screen w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden border-b border-neutral-900 group"
          >
            {/* Background Parallax Image */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950">
              {/* Overlay Hitam untuk menjaga kontras teks (Dark Mode murni) */}
              <div className="absolute inset-0 bg-[#050505]/70 z-10 transition-colors duration-700 group-hover:bg-[#050505]/40" />
              <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/50 to-transparent z-10" />

              <img
                src={service.image}
                alt={service.title}
                className="img-parallax absolute top-[-10%] left-0 w-full h-[120%] object-cover grayscale-80 contrast-125 transition-all duration-700 group-hover:grayscale-20 group-hover:scale-105"
              />
            </div>

            {/* Konten Layanan (Tumpang tindih di atas gambar) */}
            <div className="content-fade relative z-20 w-full">
              <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#D67341] uppercase">
                    {service.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
                    {service.title}
                  </h3>
                </div>
                <span className="text-5xl font-light text-white/20 mb-1">
                  {service.id}
                </span>
              </div>

              <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed mb-10 max-w-xl">
                {service.desc}
              </p>

              {/* Minimalist Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {service.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D67341]" />
                    <span className="text-xs md:text-sm text-neutral-400 uppercase tracking-wider font-medium">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
