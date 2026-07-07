'use client';

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImg from "../images/Futuristic Visor Portrait.png";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const textEl = textRef.current;
    const image = imageRef.current;
    const imageWrapper = imageWrapperRef.current;

    if (!textEl || !heading) return;

    // 1. Heading slide-up staggered reveal (once)
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

    // 2. Staggered description text scroll-highlight animation
    const words = textEl.querySelectorAll(".highlight-word");
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: textEl,
        start: "top 80%",   // Start highlighting as text enters viewport
        end: "bottom 60%",  // Finish highlighting
        scrub: 0.5,         // Smooth link to scroll movement
      },
    });

    textTl.fromTo(
      words,
      { color: "rgba(245, 245, 247, 0.15)" }, // Dimmed base color
      {
        color: "rgba(245, 245, 247, 1)",      // Lit-up full contrast white
        stagger: 0.1,
        ease: "none",
      }
    );

    // 3. Parallax scroll effect for the wide banner image
    if (image && imageWrapper) {
      gsap.fromTo(
        image,
        { yPercent: -10 },
        {
          yPercent: 10,
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (
          t.vars.trigger === textEl ||
          t.vars.trigger === imageWrapper ||
          t.vars.trigger === heading
        ) {
          t.kill();
        }
      });
    };
  }, []);

  const contentText =
    "We are a creative digital agency helping businesses build powerful brands, modern websites, and meaningful digital experiences.";

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black text-[#F5F5F7] px-8 md:px-16 pt-24 pb-8 flex flex-col justify-between overflow-hidden z-30"
      id="about"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col flex-grow justify-between h-full">
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full pt-4">
          {/* Title: ABOUT US - manual word split for reveal */}
          <div className="lg:col-span-6">
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl lg:text-[5.5vw] font-primary font-bold tracking-tight leading-none uppercase select-none"
            >
              {"ABOUT US".split(" ").map((word, idx) => (
                <span key={idx} className="word-mask mr-[0.25em] py-[0.1em] -my-[0.1em]">
                  <span className="word-inner inline-block transform origin-left">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          {/* Description text that highlights on scroll */}
          <div className="lg:col-span-6 pt-0 lg:-mt-1.5">
            <p
              ref={textRef}
              className="text-sm md:text-base lg:text-lg font-sans leading-relaxed text-left max-w-xl select-none"
            >
              {contentText.split(" ").map((word, idx) => (
                <span
                  key={idx}
                  className="highlight-word inline-block mr-[0.22em] transition-colors duration-300"
                  style={{ color: "rgba(245, 245, 247, 0.15)" }}
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Bottom Section: Divider + Stretched Image Container */}
        <div className="relative w-[calc(100vw-2rem)] left-1/2 -ml-[calc(50vw-1rem)] md:w-[calc(100vw-6rem)] md:-ml-[calc(50vw-3rem)] min-h-dvh flex flex-col flex-grow justify-end mt-8 overflow-hidden">
          {/* Small metadata row above image */}
          <div className="flex justify-between items-center border-[#1c1c1e] pt-4 font-sans text-xs md:text-sm text-[#8E8E93] tracking-widest font-light select-none">
            <span>LumerLabs™</span>
            <span>©2025 – 2026</span>
          </div>

          {/* Image Container with Parallax Effect, flexing to take remaining vertical viewport space */}
          <div
            ref={imageWrapperRef}
            className="relative w-full flex-grow overflow-hidden bg-[#070708] rounded-sm mt-4 min-h-[35vh]"
          >
            <img
              ref={imageRef}
              src={aboutImg.src}
              alt="Abstract rendering for Lumer Labs about section"
              className="absolute top-0 left-0 w-full h-[120%] object-cover origin-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
