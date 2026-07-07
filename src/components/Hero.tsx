'use client';

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LUMERLABS_PATH_DATA } from "../../logoData";

gsap.registerPlugin(ScrollTrigger);

// Load the video directly from the Next.js static public path
const videoSrc = "/149141-795734150_medium.mp4";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoMaskRef = useRef<SVGPathElement>(null);
  const whiteLogoRef = useRef<SVGPathElement>(null);
  const svgOverlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const logoContainer = logoContainerRef.current;
    const logoMask = logoMaskRef.current;
    const whiteLogo = whiteLogoRef.current;
    const svgOverlay = svgOverlayRef.current;
    const video = videoRef.current;
    const videoWrapper = videoWrapperRef.current;
    const content = contentRef.current;

    if (
      !container ||
      !logoContainer ||
      !logoMask ||
      !whiteLogo ||
      !svgOverlay ||
      !video ||
      !videoWrapper ||
      !content
    )
      return;

    // Ensure the video plays and is loop/muted
    video.muted = true;
    video.play().catch((err) => {
      console.log("Auto-play blocked or interrupted, attempting retry:", err);
      const playVideo = () => {
        video.play().catch(e => console.log(e));
        window.removeEventListener("click", playVideo);
      };
      window.addEventListener("click", playVideo);
    });

    // Layout calculation function
    const calculateLogoLayout = () => {
      logoMask.setAttribute("d", LUMERLABS_PATH_DATA);
      whiteLogo.setAttribute("d", LUMERLABS_PATH_DATA);

      const logoDimensions = logoContainer.getBoundingClientRect();
      const logoBoundingBox = logoMask.getBBox();

      if (logoBoundingBox.width === 0 || logoBoundingBox.height === 0) return;

      const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
      const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;
      const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

      const logoHorizontalPosition =
        logoDimensions.left +
        (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 -
        logoBoundingBox.x * logoScaleFactor;

      const logoVerticalPosition =
        logoDimensions.top +
        (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 -
        logoBoundingBox.y * logoScaleFactor;

      const transformStr = `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`;
      
      logoMask.setAttribute("transform", transformStr);
      whiteLogo.setAttribute("transform", transformStr);
    };

    // Calculate layout initially
    calculateLogoLayout();

    // Responsive border radius
    const getTargetBorderRadius = () => {
      return window.innerWidth < 768 ? "24px" : "40px";
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=1800", // Scroll length for the cinematic zoom and shrink sequence
        scrub: 1,      // Smooth scrubbing linked to scroll speed
        pin: true,     // Pin the hero section during the transition
        anticipatePin: 1,
        onUpdate: (self) => {
          const scrollProgress = self.progress;
          // Zoom transitions completes in 85% of total scroll distance
          const normalizedProgress = Math.min(1, scrollProgress / 0.85);

          // Exponential scale from 1 up to 950
          const overlayScale = Math.pow(950, normalizedProgress);
          gsap.set(svgOverlay, { scale: overlayScale });

          // Fade out the solid white logo path
          gsap.set(whiteLogo, { opacity: 1 - normalizedProgress });
        }
      },
    });

    // Shrink the video wrapper and round corners at the end of zoom sequence (0.85 to 1.0)
    tl.to(videoWrapper, {
      scale: 0.95,
      borderRadius: getTargetBorderRadius(),
      duration: 0.15,
      ease: "power2.inOut",
    }, 0.85)
    // Fade in the tagline content
    .to(content, {
      opacity: 1,
      y: 0,
      duration: 0.15,
      ease: "power2.out",
    }, 0.85)
    // Fade in global header navigation
    .to("header", {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      duration: 0.15,
      ease: "power2.out",
    }, 0.85);

    // Recalculate ScrollTrigger and layout on window resize
    const handleResize = () => {
      calculateLogoLayout();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black select-none"
      id="hero"
    >
      {/* Video card wrapper that shrinks and rounds */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full overflow-hidden origin-center bg-[#070708]"
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Ambient shadow gradient at the bottom of the video for typography visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />

        {/* Overlay Content: Taglines and Scroll indicator. Visible after shrink. */}
        <div
          ref={contentRef}
          className="absolute inset-x-0 bottom-12 px-8 md:px-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6 opacity-0 translate-y-8 z-30 pointer-events-none"
        >
          <div className="max-w-md">
            <p className="text-[#8E8E93] text-lg uppercase tracking-widest font-semibold mb-2">
              Lumer Labs
            </p>
            <h2 className="text-2xl md:text-3xl font-primary font-light text-[#F5F5F7] leading-tight tracking-tight">
              Your Journey Beyond Ordinary Starts Here.
            </h2>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-2 text-xs text-[#8E8E93] tracking-wider uppercase font-semibold">
            <span>Scroll to Enter</span>
            <div className="w-6 h-10 border border-[#8E8E93]/30 rounded-full flex justify-center items-start p-1.5">
              {/* Animated mouse wheel dot */}
              <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* SVG Mask Overlay */}
      <div
        ref={svgOverlayRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        style={{ transformOrigin: "50% 50%" }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="logoRevealMask">
              {/* Fill white to draw background rect everywhere */}
              <rect width="100%" height="100%" fill="white" />
              {/* Logo shape cuts a hole in the white mask */}
              <path ref={logoMaskRef} fill="black" />
            </mask>
          </defs>
          {/* Dark solid overlay everywhere EXCEPT the logo path */}
          <rect width="100%" height="100%" fill="#111117" mask="url(#logoRevealMask)" />
          {/* Solid white logo path rendered on top that fades out */}
          <path ref={whiteLogoRef} fill="white" className="opacity-100" />
        </svg>
      </div>

      {/* Anchor container for measuring dimensions */}
      <div
        ref={logoContainerRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] md:w-[480px] h-[150px] z-20 pointer-events-none opacity-0"
      />
    </div>
  );
}
