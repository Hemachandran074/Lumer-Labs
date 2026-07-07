'use client';

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "./LenisProvider";

export function Preloader() {
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTransitionedRef = useRef(false);

  // 1. Initial mounting check (bypass if visited, lock scroll if not)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSeenIntro = localStorage.getItem("lumerlabs_intro_seen");
    if (hasSeenIntro) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      // Disable default scrolling
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      // Stop Lenis physics scrolling
      if (lenis) {
        lenis.stop();
      }
    }
  }, [lenis]);

  // 2. Extra trigger when lenis becomes available to make sure it is locked
  useEffect(() => {
    if (isVisible && lenis) {
      lenis.stop();
    }
  }, [isVisible, lenis]);

  // 3. Smooth curtain transition reveal
  const triggerTransition = () => {
    if (hasTransitionedRef.current || !containerRef.current) return;
    hasTransitionedRef.current = true;

    // Slide container up past the screen
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        // Mark as seen, restore scrolling, and hide element
        localStorage.setItem("lumerlabs_intro_seen", "true");
        document.body.style.overflow = "";
        document.body.style.height = "";
        if (lenis) {
          lenis.start();
        }
        setIsVisible(false);
      },
    });
  };

  // Check progress and trigger transition near the end (0.8s left)
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime >= video.duration - 0.8 && !hasTransitionedRef.current) {
      triggerTransition();
    }
  };

  // Fallback if ended is reached without time update triggering
  const handleEnded = () => {
    if (!hasTransitionedRef.current) {
      triggerTransition();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-black z-[999999] select-none pointer-events-auto flex items-center justify-center transform translate-y-0"
      data-lenis-prevent
    >
      <video
        ref={videoRef}
        src="/preloader_animation_video.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="absolute top-0 left-0 w-full h-full object-cover object-[48%_50%] pointer-events-none"
      />
    </div>
  );
}
