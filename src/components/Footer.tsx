'use client';

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import footerBg from "../images/service-8 2.png";
import { HugeiconsIcon } from "@hugeicons/react";
import { InstagramIcon, NewTwitterIcon, Linkedin02Icon } from "@hugeicons/core-free-icons";
import { usePathname, useRouter } from "next/navigation";
import { HoverRevealText } from "./HoverRevealText";


gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { label: "Home", index: "01", targetId: "hero" },
  { label: "About us", index: "02", targetId: "about" },
  { label: "Services", index: "03", targetId: "services" },
  // { label: "How do we do", index: "04", targetId: "about" },
  { label: "Contact", index: "04", targetId: "work-together" },
];

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const imageWrapper = imageWrapperRef.current;
    const content = contentRef.current;

    if (!section) return;

    // 1. Parallax scroll effect for the cosmic background image
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

    // 2. Simple fade-in reveal for footer content
    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === imageWrapper || t.vars.trigger === section) {
          t.kill();
        }
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black text-[#F5F5F7] px-8 md:px-16 pt-28 pb-12 flex flex-col justify-between overflow-hidden border-t border-[#1c1c1e]/40 z-30"
      id="contact"
    >
      {/* Background Planet Image Parallax Wrapper */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 w-full h-full overflow-hidden bg-[#000000]"
      >
        <img
          ref={imageRef}
          src={footerBg.src}
          alt="Saturn Cosmic Background"
          className="absolute top-[-10%] left-0 w-full h-[120%] object-cover origin-center opacity-45 pointer-events-none"
        />
        {/* Soft shadow gradients to anchor text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div
        ref={contentRef}
        className="relative z-10 w-full flex-grow flex flex-col justify-between gap-16 max-w-6xl mx-auto"
      >
        {/* Top Info & Navigation Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start w-full">
          {/* Left Column: Contact details and text-based socials */}
          <div className="md:col-span-6 flex flex-col gap-4 text-left">
            {/* Direct click-to-email */}
            <a
              href="mailto:lumerlabs@gmail.com"
              className="text-2xl md:text-3xl lg:text-4xl font-primary font-normal text-white hover:text-white transition-colors duration-300"
            >
              lumerlabs@gmail.com
            </a>
            
            {/* Phone */}
            <div className="text-sm font-mono text-[#8E8E93] tracking-wider mt-1">
              +91 9025507436
            </div>

            {/* Address */}
            <div className="text-sm text-[#8E8E93] font-sans font-light leading-relaxed mt-2">
              Coimbatore,<br />
              Tamil Nadu, India
            </div>

            {/* Monospace slash-separated text links for socials */}
            <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-[#8E8E93] mt-6 uppercase">
              <a
                href="https://www.instagram.com/lumer_labs/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                <HugeiconsIcon icon={InstagramIcon} />
              </a>
              <span className="text-[#1c1c1e] select-none">/</span>
              <a
                href="https://x.com/lumerlabs"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                <HugeiconsIcon icon={NewTwitterIcon} />
              </a>
              <span className="text-[#1c1c1e] select-none">/</span>
              <a
                href="https://www.linkedin.com/in/lumerlabsglh/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                <HugeiconsIcon icon={Linkedin02Icon} />
              </a>
            </div>
          </div>

          {/* Right Column: Monospace aligned Navigation Menu */}
          <div className="md:col-span-6 flex justify-end w-full">
            <nav className="flex flex-col gap-5 w-full max-w-[320px] font-sans">
              {menuItems.map((item, idx) => (
                <a
                  key={idx}
                  href={`#${item.targetId}`}
                  onClick={(e) => handleNavClick(e, item.targetId)}
                  className="flex justify-between items-center w-full border-b border-[#1c1c1e] pb-2.5 text-sm md:text-base font-light text-[#8E8E93] hover:text-white hover:border-white/30 transition-all duration-300 group"
                >
                <HoverRevealText
                    text={item.label}
                    className="tracking-wide"
                  />
                  <span className="font-mono text-xs text-white tracking-widest group-hover:translate-x-1 transition-transform duration-300">
                    {item.index}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Area: Massive Logo Watermark and Metadata */}
        <div className="w-full flex flex-col gap-6 items-center">
          {/* Gigantic LumerLabs Text Logo with Circled TM */}
          <div className="w-full text-center relative select-none mt-auto">
            <h1 className="text-[12.5vw] font-primary font-semi-bold tracking-tight text-white leading-none inline-block relative pr-[3vw]">
              LumerLabs
              <span className="absolute top-[1.5vw] right-[0.2vw] text-[0.8vw] md:text-[0.9vw] w-[2vw] h-[2vw] flex items-center justify-center font-sans tracking-normal select-none">
                TM
              </span>
            </h1>
          </div>

          {/* Metadata Footer Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#8E8E93]/60 font-mono tracking-wider w-full border-t border-[#1c1c1e]/40 pt-6">
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                const curtain = document.getElementById("page-transition-curtain");
                if (curtain) {
                  curtain.style.pointerEvents = "auto";
                  gsap.set(curtain, { yPercent: 100 });
                  gsap.to(curtain, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power3.inOut",
                    onComplete: () => {
                      router.push("/privacy");
                    },
                  });
                } else {
                  router.push("/privacy");
                }
              }}
              className="hover:text-white transition-colors duration-300"
            >
              Privacy
            </a>
            
            <div>2026 © All rights reserved</div>
            
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                const curtain = document.getElementById("page-transition-curtain");
                if (curtain) {
                  curtain.style.pointerEvents = "auto";
                  gsap.set(curtain, { yPercent: 100 });
                  gsap.to(curtain, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power3.inOut",
                    onComplete: () => {
                      router.push("/terms");
                    },
                  });
                } else {
                  router.push("/terms");
                }
              }}
              className="hover:text-white transition-colors duration-300"
            >
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
