'use client';

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videoSrc = "/background-vid.mp4";
const logoSrc = "/lumer_labs_logo_svg.svg";

export function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftText = leftTextRef.current;
    const logo = logoRef.current;
    const rightText = rightTextRef.current;
    const video = videoRef.current;

    if (!section || !leftText || !logo || !rightText || !video) return;

    // Ensure video auto-plays and is muted/looped
    video.muted = true;
    video.play().catch((err) => {
      console.log("Showcase video autoplay interrupted:", err);
    });

    // co-ordinated GSAP reveal animation on viewport entry
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    tl.fromTo(
      logo,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    )
    .fromTo(
      leftText,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out",
      },
      "-=0.8" // start slightly before logo finish
    )
    .fromTo(
      rightText,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out",
      },
      "-=0.8"
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black text-[#F5F5F7] flex items-center justify-center overflow-hidden border-t border-[#1c1c1e]/40 z-30"
      id="showcase"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black select-none pointer-events-none">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        />
        {/* Soft dark vignette gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      </div>

      {/* 3-Column Grid: Left Text | SVG Logo | Right Text */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-12 md:gap-16 select-none">
        
        {/* Left Side: Brand Name */}
        <div className="flex justify-center md:justify-start">
          <div
            ref={leftTextRef}
            className="text-4xl md:text-5xl lg:text-[3.2vw] lg:leading-none font-primary font-semi-bold text-white tracking-tight opacity-0 select-none"
          >
            LumerLabs
          </div>
        </div>

        {/* Center: Brand SVG Logo */}
        <div className="flex justify-center">
          <img
            ref={logoRef}
            src={logoSrc}
            alt="LumerLabs Brand Logo"
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain opacity-0 pointer-events-none"
          />
        </div>

        {/* Right Side: Growth and Creative Agency Subtext */}
        <div className="flex justify-center md:justify-end">
          <div
            ref={rightTextRef}
            className="flex flex-col items-center md:items-end text-center md:text-right leading-tight opacity-0 select-none"
          >
            <span className="text-xl md:text-2xl lg:text-[2vw] lg:leading-tight font-primary font-semi-bold text-white tracking-tight whitespace-nowrap">
              Growth and
            </span>
            <span className="text-xl md:text-2xl lg:text-[2vw] lg:leading-tight font-primary font-semi-bold text-white tracking-tight whitespace-nowrap">
              Creative Agency
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
