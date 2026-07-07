'use client';

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HoverRevealText } from "./HoverRevealText";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "AI Business Automation",
    desc: "Reduce manual work and improve efficiency with intelligent automation solutions. We connect your tools, automate repetitive tasks, and create workflows that help your business operate more efficiently.",
  },
  {
    title: "App Development",
    desc: "Develop powerful mobile applications that deliver a smooth user experience across devices. We create scalable apps designed to improve customer engagement, streamline operations, and support business growth.",
  },
  {
    title: "Brand Identity Design",
    desc: "Build a brand that looks professional, memorable, and consistent across every customer touchpoint. From logo creation to complete brand guidelines, we design visual identities that help your business stand out and build trust.",
  },
  {
    title: "Graphic Designing",
    desc: "Create stunning visual assets that command attention and communicate your brand's message effectively. From brand guidelines to modern marketing collateral, we shape cohesive visual experiences across all touchpoints.",
  },
  {
    title: "SEO and Growth",
    desc: "Help more customers discover your business online through proven search optimization strategies. We improve your visibility, attract qualified traffic, and support sustainable growth.",
  },
  {
    title: "Video and Media",
    desc: "Through still images or moving media, tell your story visually. From the first frame through the edited video, we capture and highlight your brand's vision with professional cinematic output.",
  },
  {
    title: "Web Development",
    desc: "Build fast, secure, and scalable websites tailored to your business needs. Whether you're launching a company website, customer portal, or e-commerce platform, we develop solutions that perform reliably and support long-term growth.",
  },
];

export function Services() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entrance Staggered Reveal Animation (runs once when section enters viewport)
    const headingWords = section.querySelectorAll(".word-inner-heading");
    const serviceWords = section.querySelectorAll(".word-inner-service");
    
    const headingTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true,
      },
    });

    headingTl.fromTo(
      headingWords,
      { y: "115%", rotate: 2 },
      {
        y: "0%",
        rotate: 0,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.08,
      }
    )
    .fromTo(
      serviceWords,
      { y: "115%", rotate: 2 },
      {
        y: "0%",
        rotate: 0,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.02,
      },
      "-=0.7"
    );

    return () => {
      if (headingTl.scrollTrigger) headingTl.scrollTrigger.kill();
      headingTl.kill();
    };
  }, []);

  const titleText = "OUR SERVICES";

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-screen bg-black text-[#F5F5F7] px-8 md:px-16 pt-20 pb-8 md:pt-24 md:pb-12 flex flex-col justify-between overflow-hidden border-t border-[#1c1c1e]/40 z-30"
      id="services"
    >
      <div className="w-full flex flex-col justify-between h-full max-w-7xl mx-auto flex-grow">
        
        {/* Top Header Row */}
        <div className="w-full flex justify-between items-end pb-4 border-b border-[#1c1c1e]/15">
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl font-primary font-semibold tracking-tight uppercase select-none text-left"
          >
            {titleText.split(" ").map((word, idx) => (
              <span key={idx} className="word-mask mr-[0.25em] py-[0.1em] -my-[0.1em] inline-block overflow-hidden">
                <span className="word-inner-heading word-inner inline-block transform origin-left">
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <Link
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              const curtain = document.getElementById("page-transition-curtain");
              if (curtain) {
                curtain.style.pointerEvents = "auto";
                gsap.to(curtain, {
                  yPercent: -100,
                  duration: 0.8,
                  ease: "power3.inOut",
                  onComplete: () => {
                    router.push("/services");
                  },
                });
              } else {
                router.push("/services");
              }
            }}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[#1c1c1e] text-xs font-sans uppercase tracking-widest text-[#8E8E93] hover:text-white hover:border-white/50 hover:bg-[#121214]/50 transition-all duration-300 transform active:scale-95 select-none shrink-0 cursor-pointer mb-2"
          >
            <HoverRevealText
              text="Know More"
              className="tracking-wide"
            />
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Main Content Area (sized to fit comfortably within viewport constraints) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center flex-grow py-4 md:py-6 relative min-h-0">
          
          {/* Left Column: Service Description (cross-fading absolute elements) */}
          <div className="lg:col-span-1 relative h-36 sm:h-40 lg:h-[350px] flex items-center justify-start border-l border-white/5 pl-4 lg:pl-8 order-2 lg:order-1 min-h-0">
            {services.map((item, idx) => (
              <p
                key={idx}
                className="absolute top-1/2 -translate-y-1/2 left-4 lg:left-8 text-xs md:text-sm font-sans font-light leading-relaxed text-white max-w-xs md:max-w-md text-left pointer-events-none transition-all duration-500 ease-out"
                style={{
                  opacity: hoveredIndex === idx ? 1 : 0,
                  transform: hoveredIndex === idx ? "translateY(-50%) translateY(0px)" : "translateY(-50%) translateY(12px)",
                }}
              >
                {item.desc}
              </p>
            ))}
          </div>

          {/* Right Column: Interactive vertical titles list with aligned brackets */}
          <div className="lg:col-span-2 flex flex-col justify-center gap-1 md:gap-2 order-1 lg:order-2 w-full pr-0 md:pr-8 min-h-0">
            {services.map((item, idx) => (
              <div 
                key={idx} 
                onMouseEnter={() => setHoveredIndex(idx)}
                className="relative w-full flex items-center justify-center py-1 md:py-2 min-h-[36px] sm:min-h-[44px] md:min-h-[56px]"
              >
                {/* Title */}
                <h3
                  className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-primary tracking-tight font-medium cursor-pointer text-center select-none uppercase transition-all duration-500 ease-out transform origin-center"
                  style={{
                    color: hoveredIndex === idx ? "#FFFFFF" : "#8E8E93",
                    opacity: hoveredIndex === idx ? 1.0 : 0.3,
                    transform: hoveredIndex === idx ? "scale(1.1)" : "scale(1.0)",
                  }}
                >
                  {item.title.split(" ").map((word, wIdx) => (
                    <span key={wIdx} className="word-mask mr-[0.25em] py-[0.1em] -my-[0.1em] inline-block overflow-hidden">
                      <span className="word-inner-service word-inner inline-block transform origin-left">
                        {word}
                      </span>
                    </span>
                  ))}
                </h3>
                
                {/* Arrow link button that routes to the service price plan page */}
                <Link
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    const curtain = document.getElementById("page-transition-curtain");
                    if (curtain) {
                      curtain.style.pointerEvents = "auto";
                      gsap.to(curtain, {
                        yPercent: -100,
                        duration: 0.8,
                        ease: "power3.inOut",
                        onComplete: () => {
                          router.push("/services");
                        },
                      });
                    } else {
                      router.push("/services");
                    }
                  }}
                  className="absolute right-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#1c1c1e] text-[#8E8E93] hover:text-white hover:border-white/50 hover:bg-[#121214]/50 transition-all duration-500 ease-out cursor-pointer"
                  style={{
                    opacity: hoveredIndex === idx ? 1.0 : 0.0,
                    transform: hoveredIndex === idx ? "translateX(0px) scale(1)" : "translateX(-5px) scale(0.9)",
                    pointerEvents: hoveredIndex === idx ? "auto" : "none",
                  }}
                >
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </Link>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
