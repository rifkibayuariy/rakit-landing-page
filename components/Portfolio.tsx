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
    subtitle: "RFID Attendance System",
    description:
      "Sistem absensi RFID yang terintegrasi dengan dashboard monitoring dan rekapitulasi data secara real-time.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    stages: [
      "Requirement Analysis",
      "Hardware Prototype",
      "PCB Integration",
      "System Testing",
      "Deployment",
    ],
  },

  {
    id: "02",
    title: "IoT Monitoring",
    subtitle: "Industrial Monitoring",
    description:
      "Monitoring suhu, kelembapan dan status perangkat secara real-time melalui cloud dashboard.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
    stages: [
      "Architecture Design",
      "Sensor Integration",
      "Cloud Communication",
      "Field Validation",
      "Operational Launch",
    ],
  },

  {
    id: "03",
    title: "Smart Farming",
    subtitle: "Automated Irrigation",
    description:
      "Sistem otomatisasi pertanian berbasis sensor dan machine logic.",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop",
    stages: [
      "Research",
      "Prototype",
      "Automation Logic",
      "Calibration",
      "Deployment",
    ],
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
          const number = projectBlock.querySelector(".floating-number");
          const timeline = projectBlock.querySelector(".timeline-progress");

          gsap.to(image, {
            scale: 1.12,
            duration: 10,
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

          gsap.to(number, {
            y: -25,
            duration: 8,
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

          gsap.fromTo(
            timeline,
            {
              scaleY: 0,
            },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: projectBlock,
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            },
          );
        });

      gsap.to(".timeline-node", {
        opacity: 0.3,
        scale: 0.85,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
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
          Bukti yang
          <br />
          sudah bekerja
          <br />
          di lapangan.
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
                        h-[420px] md:h-[480px]
                        object-cover
                        scale-105
                      "
                    />

                    <div
                      className="
  absolute inset-0
  bg-gradient-to-t
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

                    <div
                      className="
                        floating-number
                        absolute
                        right-8
                        bottom-0
                        text-[7rem]
                        md:text-[10rem]
                        leading-none
                        text-white/[0.1]
                        font-light
                      "
                    >
                      {project.id}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}

              <div className="lg:col-span-4">
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-px h-full bg-neutral-900" />

                  <div
                    className="
                      timeline-progress
                      absolute
                      left-0
                      top-0
                      w-px
                      h-full
                      bg-[#D67341]
                      origin-top
                    "
                  />

                  {project.stages.map((stage, index) => (
                    <div
                      key={stage}
                      className="
                        relative
                        pb-18
                      "
                    >
                      <div
                        className="
                          timeline-node
                          absolute
                          -left-[53px]
                          top-3
                          w-3
                          h-3
                          bg-[#D67341]
                        "
                      />

                      <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-mono mb-3">
                        STEP {String(index + 1).padStart(2, "0")}
                      </div>

                      <h4
                        className="
                          text-2xl md:text-3xl
                          tracking-tight
                          leading-none
                          font-medium
                        "
                      >
                        {stage}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
