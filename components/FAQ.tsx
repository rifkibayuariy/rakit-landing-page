"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "01",
    question: "Bagaimana cara memesan layanan?",
    answer:
      'Anda dapat memulai dengan menekan tombol "Konsultasi Gratis" atau menghubungi kontak kami. Tim engineer kami akan menjadwalkan diskusi awal untuk menganalisis spesifikasi teknis dan ruang lingkup proyek Anda sebelum menyusun proposal pengerjaan.',
  },
  {
    id: "02",
    question: "Berapa lama waktu pengerjaan project?",
    answer:
      "Durasi sangat bergantung pada kompleksitas fitur, arsitektur sirkuit, dan ketersediaan komponen. Rata-rata proyek standar mikrokontroler beserta fabrikasi 3D printing membutuhkan waktu eksekusi antara 7 hingga 14 hari kerja.",
  },
  {
    id: "03",
    question: "Apakah ada revisi project?",
    answer:
      "Ya, kami memberikan garansi revisi untuk memastikan hasil akhir—baik baris kode (firmware) maupun wujud fisik—beroperasi sesuai dengan kesepakatan spesifikasi awal tanpa biaya tambahan, selama masih dalam ruang lingkup awal.",
  },
  {
    id: "04",
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menerima pembayaran melalui transfer antar bank dan e-wallet. Sistem pembayaran umumnya dibagi menjadi tahap DP (Down Payment) untuk pengadaan komponen perangkat keras, dan pelunasan saat proyek siap diserahterimakan.",
  },
];

const scrambleTimers = new WeakMap<HTMLElement, number>();

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
        ".faq-header-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
      );

      tl.fromTo(
        ".faq-item-row",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.5",
      );
    },
    { scope: containerRef },
  );

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // PERBAIKAN: Menghapus overflow-hidden agar fitur CSS Sticky bisa bernapas
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-32 md:py-48 border-t border-neutral-900"
    >
      {/* Background Ambience */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/stardust.png")',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row gap-20 lg:gap-32 items-start">
        {/* =========================================
            KOLOM KIRI: STICKY EDITORIAL HEADER
        ========================================= */}
        {/* Fitur 'lg:sticky lg:top-32 lg:self-start' sekarang akan bekerja 100% sempurna */}
        <div className="w-full lg:w-5/12 flex flex-col lg:sticky lg:top-32 lg:self-start">
          <div className="faq-header-text flex items-center gap-4 mb-8">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#D67341] uppercase">
              INFO // FAQ_SYSTEM
            </span>
            <div className="w-12 h-px bg-neutral-800" />
          </div>

          <h2 className="faq-header-text text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter text-white leading-[1.05] mb-8">
            Frequently <br />
            <span className="text-neutral-600 italic">Asked.</span>
          </h2>

          <p className="faq-header-text text-base md:text-xl text-neutral-400 font-light leading-relaxed max-w-sm border-l-2 border-[#D67341] pl-6 py-2">
            Rangkuman jawaban atas pertanyaan umum mengenai layanan,
            operasional, dan garansi proyek kami.
          </p>
        </div>

        {/* =========================================
            KOLOM KANAN: KINETIC ACCORDION
        ========================================= */}
        <div className="w-full lg:w-7/12 flex flex-col pt-4">
          {faqData.map((item, index) => (
            <FAQRow
              key={item.id}
              item={item}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================
// SUB-KOMPONEN INDIVIDU FAQ
// =========================================
function FAQRow({
  item,
  isOpen,
  onClick,
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isOpen && numRef.current) {
      const el = numRef.current;
      const original = item.id;
      const chars = "0123456789!@#$%^&*";
      let iter = 0;

      if (scrambleTimers.has(el)) clearInterval(scrambleTimers.get(el));

      const timer = window.setInterval(() => {
        el.innerText = original
          .split("")
          .map((_, idx) => {
            if (idx < iter) return original[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iter >= original.length) {
          clearInterval(timer);
          scrambleTimers.delete(el);
        }
        iter += 0.5;
      }, 30);
      scrambleTimers.set(el, timer);
    } else if (numRef.current) {
      numRef.current.innerText = item.id;
    }
  }, [isOpen, item.id]);

  useEffect(() => {
    if (isOpen && answerRef.current) {
      gsap.fromTo(
        answerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 },
      );
    }
  }, [isOpen]);

  return (
    <div
      ref={rowRef}
      className="faq-item-row w-full border-b border-neutral-900 first:border-t first:border-neutral-900 group"
    >
      <button
        onClick={onClick}
        className="w-full py-10 md:py-12 text-left flex items-start justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#D67341]/[0.03] to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out z-0" />

        <div className="flex gap-6 md:gap-12 items-start relative z-10 w-full pr-8">
          <span
            ref={numRef}
            className={`text-sm md:text-base font-mono pt-2 md:pt-3 transition-colors duration-500 shrink-0 ${isOpen ? "text-[#D67341]" : "text-neutral-700 group-hover:text-[#D67341]/60"}`}
          >
            {item.id}
          </span>

          <h3
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] transition-colors duration-500 ${isOpen ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"}`}
          >
            {item.question}
          </h3>
        </div>

        <div
          className={`relative w-8 h-8 shrink-0 mt-2 flex items-center justify-center rounded-full border transition-all duration-500 z-10 bg-[#050505] hidden sm:flex
                        ${isOpen ? "border-[#D67341] bg-[#D67341]/10" : "border-neutral-800 group-hover:border-neutral-600"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-4 h-4 transition-all duration-500 ${isOpen ? "text-[#D67341] rotate-45" : "text-neutral-500 rotate-0 group-hover:text-white"}`}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] pb-12" : "grid-rows-[0fr] pb-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            ref={answerRef}
            className="pl-[3rem] md:pl-[4.5rem] pr-6 md:pr-20"
          >
            <p className="text-base md:text-xl lg:text-2xl text-neutral-400 font-light leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
