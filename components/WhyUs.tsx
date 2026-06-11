"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const reasons = [
  {
    title: "Transfer Knowledge",
    description:
      "Dokumentasi lengkap, source code terstruktur, dan knowledge transfer sehingga sistem dapat dikembangkan secara mandiri setelah implementasi.",
  },
  {
    title: "Built Around Your Needs",
    description:
      "Setiap solusi dirancang dari kebutuhan operasional yang nyata, bukan sekadar menyesuaikan template yang sudah ada.",
  },
  {
    title: "Rapid Prototyping",
    description:
      "Ide dapat divalidasi lebih cepat melalui iterasi prototipe sebelum masuk ke tahap produksi yang lebih besar.",
  },
  {
    title: "Reliable Execution",
    description:
      "Pendekatan engineering yang terukur untuk memastikan sistem stabil dan dapat digunakan dalam jangka panjang.",
  },
  {
    title: "Efficient Investment",
    description:
      "Fokus pada solusi yang memberikan dampak nyata tanpa kompleksitas dan biaya yang tidak diperlukan.",
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".why-label", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".title-word", {
        yPercent: 120,
        opacity: 0,
        duration: 1.4,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".why-title",
          start: "top 80%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".reason-item").forEach((item) => {
        const line = item.querySelector(".reason-line");
        const title = item.querySelector(".reason-title");
        const desc = item.querySelector(".reason-desc");
        const dot = item.querySelector(".reason-dot");

        gsap.from(item, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
          },
        });

        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
            },
          },
        );

        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",

          onEnter: () => {
            gsap.to(title, {
              color: "#ffffff",
              x: 10,
              duration: 0.6,
            });

            gsap.to(desc, {
              opacity: 1,
              duration: 0.6,
            });

            gsap.to(dot, {
              scale: 1.6,
              duration: 0.4,
            });

            gsap.to(item, {
              opacity: 1,
              duration: 0.5,
            });
          },

          onLeave: () => {
            gsap.to(title, {
              color: "#737373",
              x: 0,
              duration: 0.6,
            });

            gsap.to(dot, {
              scale: 1,
              duration: 0.4,
            });
          },

          onEnterBack: () => {
            gsap.to(title, {
              color: "#ffffff",
              x: 10,
              duration: 0.6,
            });

            gsap.to(dot, {
              scale: 1.6,
              duration: 0.4,
            });
          },

          onLeaveBack: () => {
            gsap.to(title, {
              color: "#737373",
              x: 0,
              duration: 0.6,
            });

            gsap.to(dot, {
              scale: 1,
              duration: 0.4,
            });
          },
        });

        gsap.to(title, {
          y: -4,
          repeat: -1,
          yoyo: true,
          duration: 3,
          ease: "sine.inOut",
        });
      });

      gsap.to(".ghost-text", {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-neutral-900 bg-[#050505]"
    >
      {/* GRID */}

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* GHOST */}

      <div
        className="
          ghost-text
          absolute
          top-40
          left-0
          whitespace-nowrap
          text-[18vw]
          md:text-[14vw]
          leading-none
          font-medium
          text-white/[0.025]
          pointer-events-none
        "
      >
        ENGINEERED FOR REALITY
      </div>

      <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-32 md:py-40">
        {/* HEADER */}

        <div className="mb-32">
          <div className="why-label flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#D67341]" />

            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D67341]">
              Why Rakit
            </span>
          </div>

          <div className="why-title">
            <div className="overflow-hidden">
              <span className="title-word inline-block text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-tight font-medium">
                Cara Kami
              </span>
            </div>

            <div className="overflow-hidden">
              <span className="title-word inline-block text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-tight font-medium">
                Membangun
              </span>
            </div>

            <div className="overflow-hidden">
              <span className="title-word inline-block text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-tight font-medium">
                Sistem.
              </span>
            </div>
          </div>
        </div>

        {/* LIST */}

        <div>
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="
                reason-item
                py-14
                md:py-20
                border-t
                border-neutral-900
                opacity-60
              "
            >
              <div className="reason-line origin-left h-px bg-neutral-800 mb-10" />

              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-5 flex items-start gap-5">
                  <div
                    className="
                      reason-dot
                      mt-4
                      w-2
                      h-2
                      bg-[#D67341]
                      shrink-0
                    "
                  />

                  <h3
                    className="
                      reason-title
                      text-3xl
                      md:text-5xl
                      tracking-tight
                      leading-[0.95]
                      font-medium
                      text-neutral-500
                    "
                  >
                    {reason.title}
                  </h3>
                </div>

                <div className="lg:col-span-7">
                  <p
                    className="
                      reason-desc
                      text-base
                      md:text-lg
                      text-neutral-400
                      leading-relaxed
                      max-w-xl
                    "
                  >
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
