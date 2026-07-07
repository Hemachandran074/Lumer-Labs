'use client';

import React, { useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, InstagramIcon, NewTwitterIcon, Linkedin02Icon } from "@hugeicons/core-free-icons";
import { usePathname, useRouter } from "next/navigation";
import { HoverRevealText } from "./HoverRevealText";

interface MenuSlideProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Home", index: "01", targetId: "hero" },
  { label: "About us", index: "02", targetId: "about" },
  { label: "Services", index: "03", targetId: "services" },
  // { label: "How do we do", index: "04", targetId: "about" },
  { label: "Contact", index: "04", targetId: "work-together" },
];

export function MenuSlide({ isOpen, onClose }: MenuSlideProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    onClose();

    if (pathname === "/") {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
    } else {
      setTimeout(() => {
        router.push(`/#${targetId}`);
      }, 400);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex justify-end transition-visibility duration-500 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative w-full sm:w-[480px] h-screen bg-[#000000] border-l border-[#1c1c1e] text-[#F5F5F7] px-8 md:px-10 py-10 flex flex-col justify-between overflow-y-auto transition-transform duration-500 ease-out z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header Row */}
        <div className="flex justify-between items-center w-full">
          <div className="text-xl font-primary font-semibold text-white select-none relative pr-4">
            LumerLabs
            <span className="absolute top-[0.1em] right-0 text-[10px] font-sans font-light select-none">
              TM
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-[#8E8E93] hover:text-white transition-colors duration-300 p-2 cursor-pointer focus:outline-none"
            aria-label="Close menu"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="w-6 h-6 pointer-events-none" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex flex-col mt-12 flex-grow text-left">
          <nav className="flex flex-col gap-6 w-full">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className="flex justify-between items-center w-full border-b border-[#1c1c1e] pb-2 text-lg md:text-xl font-light text-[#8E8E93] hover:text-white hover:border-white/30 transition-all duration-300"
              >
                {/* ✅ Swapped plain span for HoverRevealText */}
                <HoverRevealText
                  text={item.label}
                  className="tracking-wide font-sans"
                />
                <span className="font-mono text-xs text-white tracking-widest">
                  {item.index}
                </span>
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full my-8" />

          {/* Contacts */}
          <div className="flex flex-col gap-3 font-sans">
            <a            
              href="mailto:lumerlabs@gmail.com"
              className="text-xl font-medium text-white hover:text-white transition-colors duration-300"
            >
              lumerlabs@gmail.com
            </a>

            <div className="text-xs font-mono text-[#8E8E93] tracking-wider">
              +91 9025507436
            </div>

            <div className="text-xs text-[#8E8E93] font-light leading-relaxed">
              Coimbatore,<br />
              Tamil Nadu, India
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="w-full pt-6 mt-8 flex flex-col gap-3 text-left">
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/lumer_labs/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[#1c1c1e] hover:border-white/20 hover:bg-[#121214] flex items-center justify-center text-[#8E8E93] hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <HugeiconsIcon icon={InstagramIcon} className="w-4 h-4 pointer-events-none" />
            </a>
            <a
              href="https://x.com/lumerlabs"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[#1c1c1e] hover:border-white/20 hover:bg-[#121214] flex items-center justify-center text-[#8E8E93] hover:text-white transition-all duration-300"
              aria-label="Twitter X"
            >
              <HugeiconsIcon icon={NewTwitterIcon} className="w-4 h-4 pointer-events-none" />
            </a>
            <a
              href="https://www.linkedin.com/in/lumerlabsglh/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[#1c1c1e] hover:border-white/20 hover:bg-[#121214] flex items-center justify-center text-[#8E8E93] hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <HugeiconsIcon icon={Linkedin02Icon} className="w-4 h-4 pointer-events-none" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}