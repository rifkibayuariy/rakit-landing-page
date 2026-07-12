"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface NavItem {
    name: string;
    url: string;
}

// 1. Data Indeks - Navigasi Lurus Terintegrasi dengan Section Anda
const indeksData: NavItem[] = [
    { name: "Beranda", url: "#hero" },
    { name: "Layanan Kami", url: "#services" },
    { name: "Portofolio Proyek", url: "#portfolio" },
    { name: "Kenapa Kami", url: "#why-us" },
    { name: "Ulasan Klien", url: "#review" },
    { name: "Basis Data FAQ", url: "#faq" },
];

// 2. Data Jaringan - Tautan Eksternal Bisnis Asli
const jaringanData: NavItem[] = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/rakitprojects?igsh=NjlkOWhvd25mcWgy",
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@rakitprojects?_r=1&_t=ZS-91UxH118ZXE",
    },
    { name: "X / Twitter", url: "https://x.com/Rakitproject" },
    { name: "Threads", url: "https://www.threads.com/@rakitprojects" },
    { name: "Shopee Store", url: "http://shopee.co.id/rakitproject" },
    { name: "Lynk.id", url: "https://lynk.id/rakitproject" },
];

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

            // 1. Efek Marquee Berjalan (Kinetic Typography) Super Lambat ala Apple
            const marquee = marqueeRef.current?.querySelector(".marquee-track");
            if (marquee) {
                gsap.to(marquee, {
                    x: "-50%",
                    ease: "none",
                    duration: 50, // Diperlambat menjadi 50s untuk ketenangan visual premium
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
                {
                    y: "0%",
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "expo.out",
                },
            );

            // 3. Animasi munculnya Grid Bawah
            tl.fromTo(
                ".footer-block",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                },
                "-=0.8",
            );
        },
        { scope: containerRef },
    );

    return (
        <footer
            ref={containerRef}
            className="relative w-full bg-[#050505] text-white overflow-hidden rounded-t-[3rem] md:rounded-t-[5rem] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
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
					1. MANIFESTO MARQUEE (Calm Speed)
				========================================= */}
            <div
                ref={marqueeRef}
                className="relative border-b border-neutral-900 overflow-hidden py-10"
            >
                <div className="absolute left-0 top-0 h-full w-32 md:w-48 z-10 pointer-events-none bg-linear-to-r from-[#050505] to-transparent" />
                <div className="absolute right-0 top-0 h-full w-32 md:w-48 z-10 pointer-events-none bg-linear-to-l from-[#050505] to-transparent" />

                <div className="marquee-track flex w-max items-center gap-4">
                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 shrink-0"
                        >
                            {[
                                "ENGINEERED FOR REALITY",
                                "FROM IDEA TO PROTOTYPE",
                                "CUSTOM MICROCONTROLLER SYSTEMS",
                                "DIGITAL FABRICATION",
                                "LEARN • BUILD • SHIP",
                            ].map((text, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center shrink-0"
                                >
                                    <span className="px-8 md:px-12 text-xl md:text-2xl font-light tracking-[0.15em] text-white/40 uppercase">
                                        {text}
                                    </span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#D67341]/40 mx-2 shrink-0" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-12">
                {/* =========================================
						2. THE MASSIVE "MAILTO" CTA
					========================================= */}
                <div className="w-full mb-24 md:mb-36">
                    <p className="text-sm md:text-base font-mono tracking-[0.2em] text-neutral-500 uppercase mb-8 flex items-center gap-4">
                        <span className="w-12 h-px bg-[#D67341]"></span>
                        Inisiasi Cetak Biru Anda
                    </p>

                    <a
                        href="mailto:rakit@gmail.com"
                        onClick={() => {
                            if (typeof window !== "undefined" && window.gtag) {
                                window.gtag("event", "click_email", {
                                    category: "Contact",
                                    label: "Email Footer Raksasa",
                                });
                            }
                        }}
                        className="group block w-max relative"
                    >
                        <div className="massive-text flex">
                            <span className="inline-block text-[10vw] sm:text-[9vw] md:text-[7vw] font-medium tracking-tighter leading-[0.8] text-white group-hover:text-[#D67341] transition-colors duration-500 pr-4">
                                rakit@gmail.com
                            </span>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-0.75 md:h-1.25 bg-[#D67341] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                    </a>
                </div>

                {/* =========================================
						3. BRUTALIST ARCHITECTURAL GRID
					========================================= */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 border-t border-neutral-900 pt-16">
                    {/* Block 1: Identitas & Status Operasional */}
                    <div className="footer-block flex flex-col items-start">
                        <div className="flex gap-4">
                            <div className="relative h-8 w-6">
                                <Image
                                    src="/rakit-logo.png"
                                    alt="Rakit Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
                                RAKIT<span className="text-[#D67341]">.</span>
                            </h2>
                        </div>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-xs mb-8">
                            Solusi perakitan mikrokontroler presisi tinggi dan
                            pencetakan prototype fisik tingkat industri.
                        </p>
                        <div className="flex items-center gap-3 px-4 py-2 border border-neutral-800 rounded-full bg-[#0A0A0A]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                                Sistem Aktif
                            </span>
                        </div>
                    </div>

                    {/* Block 2: Indeks Navigasi Internal */}
                    <div className="footer-block flex flex-col">
                        <h4 className="text-xs font-mono tracking-widest text-neutral-600 uppercase mb-6">
                            Indeks Halaman
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {indeksData.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.url}
                                        className="text-base md:text-lg font-light text-neutral-400 hover:text-white transition-colors duration-300 relative group w-max block"
                                    >
                                        {item.name}
                                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Block 3: Jaringan Bisnis Eksternal (Lebar: 2 Kolom) */}
                    <div className="footer-block flex flex-col lg:col-span-2">
                        <h4 className="text-xs font-mono tracking-widest text-neutral-600 uppercase mb-6">
                            Jaringan Ekosistem
                        </h4>
                        <div className="flex flex-col border-t border-neutral-900/60">
                            {jaringanData.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                        if (
                                            typeof window !== "undefined" &&
                                            window.gtag
                                        ) {
                                            window.gtag(
                                                "event",
                                                "click_jaringan",
                                                {
                                                    category: "Social Links",
                                                    label: social.name,
                                                },
                                            );
                                        }
                                    }}
                                    className="flex items-center justify-between py-4 border-b border-neutral-900 group hover:border-[#D67341] transition-colors duration-500"
                                >
                                    <span className="text-xl md:text-2xl font-light tracking-tight text-neutral-400 group-hover:text-white transition-colors duration-500">
                                        {social.name}
                                    </span>

                                    {/* Bubble Arrow Diagonal */}
                                    <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-[#D67341] group-hover:border-[#D67341] transition-all duration-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-4 h-4 text-neutral-500 group-hover:text-black group-hover:rotate-45 transition-all duration-500"
                                        >
                                            <line
                                                x1="5"
                                                y1="12"
                                                x2="19"
                                                y2="12"
                                            ></line>
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
					4. THE SYSTEM BOTTOM BAR
				========================================= */}
            <div className="relative z-20 w-full bg-[#020202] py-6 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-neutral-900">
                <div className="flex items-center gap-2">
                    <p className="text-[12px] text-neutral-600 font-medium tracking-wide">
                        &copy; 2026 RAKIT. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-6 text-[10px] md:text-xs font-mono tracking-widest text-neutral-600 uppercase">
                    <div className="flex items-center gap-2">
                        <span className="text-neutral-500">LOC:</span>
                        <span className="text-white">Yogakarta, ID</span>
                    </div>
                    <div className="hidden sm:block w-px h-3 bg-neutral-800" />
                    <div className="flex items-center gap-2">
                        <span className="text-neutral-500">SYS_TIME:</span>
                        <span className="whitespace-nowrap tabular-nums w-24 text-right text-[#D67341]">
                            {time}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
