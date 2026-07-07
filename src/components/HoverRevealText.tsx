'use client';

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HoverRevealTextProps {
  text: string;
  className?: string;
}

export function HoverRevealText({ text, className = "" }: HoverRevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const root = containerRef.current;
    if (!root) return;

    // data-attribute query — no ref-array timing issues
    const chars = root.querySelectorAll<HTMLSpanElement>("[data-char]");
    if (!chars.length) return;

    let tl: gsap.core.Timeline;

    const onEnter = () => {
      tl?.kill();
      tl = gsap.timeline();
      tl.to(chars, {
        yPercent: 110,
        skewY: 6,
        duration: 0.35,
        ease: "power2.in",
        stagger: { each: 0.02, from: "start" },
      })
      .set(chars, { yPercent: -110, skewY: -6 })
      .to(chars, {
        yPercent: 0,
        skewY: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: { each: 0.025, from: "start" },
      });
    };

    // Listen directly on this component's own root — no closest() guessing
    root.addEventListener("mouseenter", onEnter);
    return () => root.removeEventListener("mouseenter", onEnter);
  }, { scope: containerRef, dependencies: [text] });

  return (
    <span ref={containerRef} className={`inline-flex leading-none ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="char-mask">
          <span data-char className="char-inner">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}