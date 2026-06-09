"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const textParallaxRef = useRef<HTMLHeadingElement>(null);

  // Efek Magnetic pada Tombol & Parallax pada Teks Utama
  useEffect(() => {
    const btn = btnRef.current;
    const textBlock = textParallaxRef.current;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    // QuickTo untuk performa mouse tracking super mulus
    const btnX = btn
      ? gsap.quickTo(btn, "x", { duration: 0.4, ease: "power2.out" })
      : null;
    const btnY = btn
      ? gsap.quickTo(btn, "y", { duration: 0.4, ease: "power2.out" })
      : null;
    const textX = textBlock
      ? gsap.quickTo(textBlock, "x", { duration: 1, ease: "power3.out" })
      : null;
    const textY = textBlock
      ? gsap.quickTo(textBlock, "y", { duration: 1, ease: "power3.out" })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      // 1. Logika Magnetic Button
      if (btn && btnX && btnY) {
        const rect = btn.getBoundingClientRect();
        // Cek apakah kursor berada di dekat area tombol (radius magnet)
        const distance = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2),
        );

        if (distance < 100) {
          btnX((e.clientX - (rect.left + rect.width / 2)) * 0.3);
          btnY((e.clientY - (rect.top + rect.height / 2)) * 0.3);
        } else {
          // Kembali ke asal jika kursor menjauh
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
          });
        }
      }

      // 2. Logika Parallax Text (Bergeser berlawanan arah mouse untuk efek 3D)
      if (textBlock && textX && textY) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.015; // Angka pengali kecil agar elegan
        const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
        textX(moveX);
        textY(moveY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      const progress = { value: 0 };

      gsap.set(".view-frame", { scale: 1.1, opacity: 0 });

      // --- PROLOG: BOOTING SEQUENCES ---
      tl.to(
        progress,
        {
          value: 100,
          duration: 2.2,
          ease: "expo.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(progress.value)
                .toString()
                .padStart(3, "0");
            }
          },
        },
        0,
      );

      tl.to(".load-line", { scaleX: 1, duration: 2.2, ease: "expo.inOut" }, 0);
      tl.to(".load-text-1", { opacity: 1, duration: 0.4 }, 0.2)
        .to(".load-text-1", { opacity: 0, duration: 0.4 }, 1.0)
        .to(".load-text-2", { opacity: 1, duration: 0.4 }, 1.2)
        .to(".load-text-2", { opacity: 0, duration: 0.4 }, 1.8);

      tl.to(
        ".preloader-content",
        { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" },
        2.0,
      ).to(
        ".preloader-bg",
        { yPercent: -101, duration: 1.2, ease: "expo.inOut" },
        2.2,
      );

      // --- BABAK 1: FOREGROUND KINETIC REVEAL ---

      tl.fromTo(
        ".view-frame",
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" },
        2.6,
      );

      // Kinetic Typography Masuk
      tl.fromTo(
        ".hero-word",
        { yPercent: 120, rotate: 3, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "expo.out",
          onComplete: () => {
            // === ANIMASI BERKELANJUTAN (IDLE ANIMATION) ===
            // Memulai efek Zero-Gravity Float setelah teks selesai muncul
            gsap.to(".hero-word", {
              y: "-=6", // Mengambang naik turun 6px
              rotation: "random(-1, 1)", // Rotasi mikro untuk kesan fluida
              duration: 3,
              yoyo: true, // Bolak-balik
              repeat: -1, // Terus menerus
              ease: "sine.inOut",
              stagger: {
                each: 0.2,
                from: "random", // Mengambang asinkron per kata
              },
            });
          },
        },
        2.5,
      );

      tl.fromTo(
        ".hero-desc-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: "expo.out" },
        2.8,
      )
        .fromTo(
          ".hero-desc",
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 1.5, stagger: 0.1, ease: "expo.out" },
          2.9,
        )
        .fromTo(
          ".scroll-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power2.out" },
          3.2,
        );

      // Cyber-Scramble Effect
      tl.call(
        () => {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
          document.querySelectorAll(".scramble-text").forEach((el) => {
            const htmlElement = el as HTMLElement;
            const original = htmlElement.dataset.value || "";
            let iteration = 0;

            const interval = setInterval(() => {
              htmlElement.innerText = original
                .split("")
                .map((letter, index) => {
                  if (index < iteration) return original[index];
                  return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

              if (iteration >= original.length) clearInterval(interval);
              iteration += 1 / 3;
            }, 30);
          });
        },
        undefined,
        2.6,
      );

      // Continuous Indikator
      gsap.to(".scroll-dot", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.inOut",
      });

      // Continuous Breathing Pulse pada Titik Tembaga
      gsap.to(".copper-dot", {
        opacity: 0.5,
        textShadow: "0px 0px 0px #D67341",
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-svh bg-[#050505] text-white overflow-hidden flex flex-col justify-center perspective-[1000px]"
    >
      {/* The Cinematic Viewport Frame */}
      <div className="view-frame absolute inset-3 md:inset-6 border border-neutral-900 pointer-events-none z-30 opacity-0">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D67341]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#D67341]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#D67341]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D67341]" />
      </div>

      {/* --- PRELOADER (BOOT SEQUENCE) --- */}
      <div className="preloader-bg fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303]">
        <div className="preloader-content flex flex-col items-center justify-center w-full max-w-sm px-8">
          <div className="w-full flex justify-between items-end mb-4 text-[#D67341]">
            <span
              className="text-[10px] font-mono tracking-[0.2em] uppercase scramble-text"
              data-value="BOOT_SEQUENCE"
            >
              BOOT_SEQUENCE
            </span>
            <span className="text-sm font-mono font-light">
              [ <span ref={counterRef}>000</span> ]
            </span>
          </div>
          <div className="w-full h-px bg-neutral-900 overflow-hidden origin-left">
            <div className="load-line w-full h-full bg-[#D67341] scale-x-0 origin-left" />
          </div>
          <div className="relative w-full h-8 mt-4 flex justify-start items-start">
            <span className="load-text-1 absolute text-[9px] tracking-[0.3em] font-medium text-neutral-500 uppercase w-full text-center opacity-0">
              Menginisialisasi Protokol...
            </span>
            <span className="load-text-2 absolute text-[9px] tracking-[0.3em] font-medium text-neutral-500 uppercase w-full text-center opacity-0">
              Kalibrasi Fabrikasi Fisik...
            </span>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 w-full px-8 sm:px-12 md:px-20 lg:px-32 max-w-7xl mx-auto py-20 md:py-0">
        {/* Micro-UI Technical Specs */}
        <div className="absolute top-4 right-10 md:top-0 md:right-32 flex flex-col items-end gap-1 text-[8px] font-mono text-neutral-600 uppercase tracking-widest">
          <span className="scramble-text" data-value="SYS.OP // RAKIT_CORE">
            SYS.OP // RAKIT_CORE
          </span>
          <span
            className="hidden sm:block scramble-text"
            data-value="LAT: -7.702 / LNG: 110.601"
          >
            LAT: -7.702 / LNG: 110.601
          </span>
        </div>

        {/* Intro Label */}
        <div className="overflow-hidden mb-8 md:mb-14 flex items-center gap-3">
          <span className="text-[#D67341] font-light text-sm md:text-base">
            [
          </span>
          <span
            className="scramble-text text-[10px] md:text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase pt-0.5"
            data-value="RAKIT DIGITAL"
          >
            RAKIT LAB
          </span>
          <span className="text-[#D67341] font-light text-sm md:text-base">
            ]
          </span>
        </div>

        {/* Headline Raksasa dengan efek Parallax & Fluid Breathing */}
        <h1
          ref={textParallaxRef}
          className="text-[2.6rem] leading-[1.15] sm:text-5xl md:text-7xl lg:text-[6.5rem] font-medium tracking-tight text-white md:leading-[1.05] max-w-4xl flex flex-wrap will-change-transform"
        >
          <span className="inline-block pb-1 md:pb-3 mr-[0.25em]">
            <span className="hero-word inline-block transform-gpu">
              Merekayasa
            </span>
          </span>
          <span className="inline-block pb-1 md:pb-3 mr-[0.25em]">
            <span className="hero-word inline-block transform-gpu">kode.</span>
          </span>
          <div className="w-full h-0 hidden md:block"></div>
          <span className="inline-block pb-1 md:pb-3 mr-[0.25em] mt-1 md:mt-2">
            <span className="hero-word inline-block text-neutral-400 transform-gpu">
              Mencetak
            </span>
          </span>
          <span className="inline-block pb-1 md:pb-3 mr-[0.25em] mt-1 md:mt-2">
            <span className="hero-word inline-block text-neutral-400 transform-gpu">
              realitas
              <span className="copper-dot inline-block text-[#D67341] drop-shadow-[0_0_15px_rgba(214,115,65,0.8)]">
                .
              </span>
            </span>
          </span>
        </h1>

        {/* Description & Structural Layout */}
        <div className="mt-10 md:mt-20 pl-6 md:pl-24 lg:pl-40 flex flex-col gap-8 md:gap-10 relative">
          <div className="hero-desc-line absolute left-0 top-0 bottom-0 w-px bg-neutral-900 origin-top" />
          <div className="absolute -left-px top-2 w-0.75 h-6 bg-[#D67341] shadow-[0_0_8px_#D67341] opacity-0 hero-desc" />

          <p className="hero-desc text-xs sm:text-base md:text-lg lg:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
            Kami adalah jembatan antara layar monitor dan dunia nyata.
            Spesialisasi dalam perancangan{" "}
            <strong className="text-white font-medium">
              IoT, Custom Microcontroller,
            </strong>{" "}
            hingga{" "}
            <strong className="text-white font-medium">3D Printing</strong>{" "}
            tingkat industri.
          </p>

          {/* Magnetic CTA Button */}
          <div className="hero-desc mt-2 w-full sm:w-fit">
            <button
              ref={btnRef}
              className="group relative flex items-center justify-between sm:justify-start gap-6 w-full sm:w-fit px-6 sm:px-8 py-3.5 bg-black/40 backdrop-blur-sm border border-neutral-800 rounded-full overflow-hidden transition-colors duration-500 hover:border-[#D67341] cursor-pointer shadow-xl will-change-transform"
            >
              <div className="absolute inset-0 w-full h-full bg-[#D67341] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full" />

              <span className="relative z-10 text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase text-white group-hover:text-[#050505] transition-colors duration-500 delay-75 pt-0.5">
                Konsultasi Proyek
              </span>

              <div className="relative z-10 flex items-center justify-center w-4 h-4 overflow-hidden">
                <svg
                  className="absolute w-4 h-4 text-[#D67341] group-hover:text-[#050505] transform group-hover:translate-x-6 group-hover:-translate-y-6 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                <svg
                  className="absolute w-4 h-4 text-[#D67341] group-hover:text-[#050505] transform -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator hidden sm:flex absolute bottom-10 left-10 md:bottom-12 md:left-16 flex-col items-center gap-4 z-20">
        <div className="w-px h-10 md:h-12 bg-neutral-900 relative overflow-hidden">
          <div className="scroll-dot absolute top-0 left-0 w-full h-1/3 bg-[#D67341]" />
        </div>
        <span
          className="text-[9px] md:text-[10px] font-medium tracking-[0.2em] text-neutral-500 uppercase rotate-180 scramble-text"
          data-value="SCROLL"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL
        </span>
      </div>
    </section>
  );
}
