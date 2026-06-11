/* eslint-disable @next/next/no-img-element */

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const projects = [
  {
    id: "01",
    title: "Smart Attendance",
    subtitle: "Connecting Physical Access With Digital Records",

    description:
      "Sistem absensi RFID yang terintegrasi dengan dashboard monitoring dan rekapitulasi data secara real-time.",

    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",

    challenge:
      "Proses absensi manual membutuhkan waktu lama dan rentan terhadap kesalahan pencatatan.",

    solution:
      "Mengembangkan sistem RFID berbasis ESP32 yang terhubung ke dashboard monitoring dan database cloud.",

    outcome:
      "Pencatatan kehadiran menjadi otomatis, real-time, dan dapat diakses dari mana saja.",

    tags: ["ESP32", "RFID", "Dashboard"],
  },

  {
    id: "02",
    title: "IoT Monitoring",
    subtitle: "Monitoring Critical Operations In Real Time",

    description:
      "Monitoring suhu, kelembapan, dan status perangkat melalui cloud dashboard.",

    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",

    challenge:
      "Data operasional tidak dapat dipantau secara langsung sehingga potensi gangguan terlambat diketahui.",

    solution:
      "Membangun jaringan sensor yang mengirimkan data secara real-time ke platform monitoring cloud.",

    outcome:
      "Status perangkat dan kondisi lingkungan dapat dipantau 24/7 secara terpusat.",

    tags: ["MQTT", "Cloud", "ESP32"],
  },

  {
    id: "03",
    title: "Smart Farming",
    subtitle: "Automating Irrigation Through Sensor Intelligence",

    description:
      "Sistem otomatisasi pertanian berbasis sensor dan machine logic.",

    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop",

    challenge:
      "Penyiraman dilakukan secara manual sehingga tidak konsisten dan boros sumber daya.",

    solution:
      "Mengintegrasikan sensor kelembapan tanah dengan logika otomatisasi berbasis microcontroller.",

    outcome:
      "Irigasi berjalan otomatis sesuai kondisi aktual lahan dan lebih efisien.",

    tags: ["IoT", "Sensors", "Automation"],
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils
        .toArray<HTMLElement>(".project-block")
        .forEach((projectBlock) => {
          const image = projectBlock.querySelector(".showcase-image");
          const title = projectBlock.querySelector(".showcase-title");

          gsap.to(image, {
            y: -10,
            scale: 1.03,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(title, {
            y: -4,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.from(projectBlock, {
            opacity: 0,
            y: 100,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: projectBlock,
              start: "top 80%",
            },
          });
        });

      gsap.fromTo(
        ".light-pass",
        {
          xPercent: -120,
        },
        {
          xPercent: 120,
          duration: 8,
          repeat: -1,
          ease: "none",
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#050505] border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-32 pb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-[#D67341]" />

          <span className="text-[10px] tracking-[0.3em] uppercase text-[#D67341] font-mono">
            Field Reports
          </span>
        </div>

        <h2 className="text-5xl md:text-[5rem] lg:text-[6rem] leading-[0.9] tracking-tight font-medium max-w-5xl">
          Dari ide,
          <br />
          menjadi sistem
          <br />
          nyata.
        </h2>
      </div>
      <div className="space-y-0">
        {projects.map((project) => (
          <section
            key={project.id}
            className="
              project-block
              min-h-screen
              border-t
              border-neutral-900
            "
          >
            <div
              className="
                max-w-7xl
                mx-auto
                px-8
                md:px-16
                lg:px-24
                py-32
                grid
                lg:grid-cols-12
                gap-24
              "
            >
              {/* LEFT */}

              <div className="lg:col-span-8">
                <div className="lg:sticky lg:top-24">
                  <div className="relative border border-neutral-900 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="
                        showcase-image
                        w-full
                        h-105 md:h-120
                        object-cover
                        scale-105
                      "
                    />

                    <div
                      className="
  absolute inset-0
  bg-linear-to-t
  from-black/50
  via-black/10
  to-transparent
"
                    />

                    <div
                      className="light-pass absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.08) 50%, transparent 100%)",
                      }}
                    />

                    <div className="absolute inset-0 p-10 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] tracking-[0.3em] uppercase text-[#D67341] font-mono">
                          CASE {project.id}
                        </div>
                      </div>

                      <div>
                        <h3
                          className="
                            showcase-title
                            text-4xl md:text-5xl lg:text-6xl
                            leading-[0.9]
                            tracking-tight
                            font-medium
                          "
                        >
                          {project.title}
                        </h3>

                        <p className="mt-4 text-neutral-300 max-w-md">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-8 right-8">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#D67341]" />

                        <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-mono">
                          DEPLOYED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}

              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <div className="space-y-12">
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[#D67341] font-mono mb-3">
                        Challenge
                      </div>

                      <p className="text-neutral-300 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    <div className="border-t border-neutral-900 pt-10">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[#D67341] font-mono mb-3">
                        Solution
                      </div>

                      <p className="text-neutral-300 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    <div className="border-t border-neutral-900 pt-10">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[#D67341] font-mono mb-3">
                        Outcome
                      </div>

                      <p className="text-neutral-300 leading-relaxed">
                        {project.outcome}
                      </p>
                    </div>

                    <div className="border-t border-neutral-900 pt-10">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-mono mb-4">
                        Technology
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag) => (
                          <div
                            key={tag}
                            className="
                px-3
                py-2
                border
                border-[#D67341]
                text-xs
                uppercase
                tracking-wider
                text-neutral-400
              "
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
