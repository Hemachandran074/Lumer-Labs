'use client';

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import bannerImg from "../images/ChatGPT Image Jun 8, 2026, 08_40_04 AM.png";
import { ContactSlide } from "./ContactSlide";
import { HoverRevealText } from "./HoverRevealText";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const heading = headingRef.current;
    const image = imageRef.current;
    const imageWrapper = imageWrapperRef.current;
    const details = detailsRef.current;

    if (!heading) return;

    // 1. Title reveal animation (split words sliding up)
    const headingWords = heading.querySelectorAll(".word-inner");
    gsap.fromTo(
      headingWords,
      { y: "115%", rotate: 2 },
      {
        y: "0%",
        rotate: 0,
        duration: 1.0,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          once: true,
        },
      }
    );

    // 2. Parallax animation for the background image
    if (image && imageWrapper) {
      gsap.fromTo(
        image,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    // 3. Slide up reveal for description grid and button
    if (details) {
      gsap.fromTo(
        details,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: details,
            start: "top 90%",
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (
          t.vars.trigger === heading ||
          t.vars.trigger === imageWrapper ||
          t.vars.trigger === details
        ) {
          t.kill();
        }
      });
    };
  }, []);

  const titleText = "Let's Work Together";

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-black text-[#F5F5F7] px-8 md:px-16 py-12 flex flex-col justify-center overflow-hidden border-t border-[#1c1c1e]/40 transition-all duration-300 ${
        isMenuOpen ? "z-[9999]" : "z-30"
      }`}
      id="work-together"
    >
      {/* Parallax Earth Banner Wrapper */}
      <div
        ref={imageWrapperRef}
        className="relative w-full min-h-[60vh] md:min-h-[70vh] rounded-[24px] overflow-hidden flex flex-col justify-between p-8 md:p-12 bg-[#070708]"
      >
        {/* Parallax Background Image */}
        <img
          ref={imageRef}
          src={bannerImg.src}
          alt="Cinematic Earth Banner"
          className="absolute top-0 left-0 w-full h-[130%] object-cover origin-center opacity-60 pointer-events-none"
        />

        {/* Ambient shadow gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/70 pointer-events-none" />

        {/* Banner Content */}
        <div className="relative z-10 w-full flex-grow flex flex-col justify-between gap-12">
          {/* Main Title - Reveal Animation */}
          <div className="w-full text-center mt-6">
            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[7vw] font-primary font-bold tracking-tight leading-none text-white select-none uppercase"
            >
              {titleText.split(" ").map((word, idx) => (
                <span key={idx} className="word-mask mr-[0.25em] py-[0.1em] -my-[0.1em]">
                  <span className="word-inner inline-block transform origin-left">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          {/* Details Container */}
          <div
            ref={detailsRef}
            className="w-full opacity-0 max-w-6xl mx-auto pt-8 mt-auto"
          >
            {/* 3-Column Meta Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
              {/* Left Column: Phone number */}
              <div className="md:col-span-3 text-center md:text-left pt-2">
                <span className="text-[#8E8E93] tracking-widest font-mono font-medium text-xs md:text-sm">
                  +91 90255 07436
                </span>
              </div>

              {/* Center Column: Description + Button */}
              <div className="md:col-span-6 flex flex-col items-center gap-6 text-center">
                <p className="text-white/80 font-light leading-relaxed text-xs md:text-sm max-w-xl">
                  LumerLabs helps businesses build, market, and scale through customized digital solutions. By combining strategy, design, and technology that derive growth and lasting results.
                </p>
                
                {/* Let's Talk CTA button - inline flex for text and arrow */}
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full bg-white text-black font-sans font-bold hover:bg-neutral-200 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-black/20 cursor-pointer text-sm"
                  id="lets-talk-trigger"
                >
                  <HoverRevealText text="Let's Talk" className="font-sans font-bold" />
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right Column: Copyright Timeline */}
              <div className="md:col-span-3 text-center md:text-right pt-2">
                <span className="text-[#8E8E93] tracking-widest font-mono font-medium text-xs md:text-sm">
                  ©2025 - 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu Drawer Slide-out (Let's Talk Form) */}
      <ContactSlide isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </section>
  );
}
